#!/usr/bin/env python3
"""Restore the actual source award photographs as consistent, alpha-transparent assets.
Never synthesize medals, ranks, orders, ribbons, colours or insignia.

Run only with an Internet-enabled environment (GitHub Actions):
  python scripts/prepare_awards_assets.py

Input: official Vietsovpetro award JPEG/PNG URLs.
Output: public/awards/*.png, preserved-source contact sheet, manifest.
Processing: border-connected neutral-paper removal; source-preserving LANCZOS resize;
mild JPEG sharpening; tight transparent bounding boxes.
"""
from __future__ import annotations
import io
import json
from pathlib import Path
from urllib.parse import quote
import requests
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/"public"/"awards"
REVIEW=ROOT/"tmp"/"medal-review"
PUBLIC.mkdir(parents=True,exist_ok=True)
REVIEW.mkdir(parents=True,exist_ok=True)
ROOT_URL="https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/"
FILES={
 "sv":"danhhieu/sv.png", "hcm":"danhhieu/hcm.jpg",
 "ld1":"danhhieu/ld1.jpg", "ld2":"danhhieu/ld2.jpg", "ld3":"danhhieu/ld3.jpg",
 "dl":"danhhieu/dl.jpg", "dl2":"danhhieu/dl2.jpg", "dl3":"danhhieu/dl3.jpg",
 "qc":"danhhieu/qc.jpg", "bv":"danhhieu/bv.jpg",
 "cc1":"danhhieu/cc1.jpg", "cc3":"danhhieu/cc3.jpg",
 "ahld":"lanhdao/ahld.jpg"
}
HEADERS={"User-Agent":"Mozilla/5.0 (compatible; VSP redesign media archival migration/1.0)",
         "Referer":"https://www.vietsov.com.vn/"}
def obtain(src:str)->bytes:
    url=ROOT_URL+src
    errors=[]
    for host in [url,url.replace("https://www.vietsov.com.vn/","https://vietsov.com.vn/")]:
        try:
            r=requests.get(host,headers=HEADERS,timeout=28)
            r.raise_for_status()
            raw=r.content
            if len(raw)<750:raise RuntimeError("incomplete media response")
            Image.open(io.BytesIO(raw)).verify()
            return raw
        except Exception as exc:errors.append(str(exc))
    raise RuntimeError(f"Could not fetch {src}: {'; '.join(errors)}")

def clean_image(image:Image.Image):
    rgb=np.array(image.convert("RGB"),dtype=np.uint8)
    height,width=rgb.shape[:2]
    sample=max(2,min(12,height//20,width//20))
    patches=np.concatenate([
        rgb[:sample,:sample].reshape(-1,3),rgb[:sample,-sample:].reshape(-1,3),
        rgb[-sample:,:sample].reshape(-1,3),rgb[-sample:,-sample:].reshape(-1,3)],axis=0)
    bg=np.median(patches,axis=0)
    # Remove paper only when four corners genuinely resemble neutral/white
    # background. Preserve photography and dark insignia backgrounds.
    neutral=float(bg.max()-bg.min())<37 and float(bg.mean())>=175
    spread=float(np.percentile(np.max(np.abs(patches.astype(np.float32)-bg),axis=1),80))
    use_mask=bool(neutral and spread<40)
    rgba=cv2.cvtColor(rgb,cv2.COLOR_RGB2RGBA)
    coverage=0
    if use_mask:
        lab=cv2.cvtColor(rgb,cv2.COLOR_RGB2LAB).astype(np.float32)
        lab_bg=cv2.cvtColor(np.uint8([[bg]]),cv2.COLOR_RGB2LAB).astype(np.float32)[0,0]
        d=np.sqrt(((lab-lab_bg[None,None,:])**2).sum(axis=2))
        # Candidate neutral background at original sampled paper tone
        cand=np.uint8((d<29) & (rgb.min(axis=2)>min(165,int(bg.min())-35)))
        # Only remove connected background touching image edges.
        count,seg,_stats,_centroids=cv2.connectedComponentsWithStats(cand,connectivity=8)
        boundary=np.unique(np.r_[seg[0,:],seg[-1,:],seg[:,0],seg[:,-1]])
        mask=np.isin(seg,boundary[boundary!=0]).astype(np.uint8)*255
        # Some medals have white patches in the center: remain untouched
        coverage=float(np.count_nonzero(mask))/(height*width)
        if 0.09<coverage<0.91:
            # Soft 1px edge for original small icons; avoids jagged medal contours
            blur=cv2.GaussianBlur(mask,(3,3),0.55)
            rgba[:,:,3]=np.uint8(255-blur)
        else:
            use_mask=False
    if not use_mask:
        rgba[:,:,3]=255
    out=Image.fromarray(rgba,"RGBA")
    if use_mask:
        bbox=out.getbbox()
        if bbox:
            pad=max(5,int(max(height,width)*.04))
            x0,y0,x1,y1=bbox
            out=out.crop((max(0,x0-pad),max(0,y0-pad),min(width,x1+pad),min(height,y1+pad)))
    return out,use_mask,coverage,tuple(map(int,bg))

def upscale(image:Image.Image):
    long=max(image.size)
    goal=max(long,min(1300,max(740,long*3)))
    ratio=goal/long
    if ratio>1:
        image=image.resize((round(image.width*ratio),round(image.height*ratio)),Image.Resampling.LANCZOS)
        image=image.filter(ImageFilter.UnsharpMask(radius=1.25,percent=95,threshold=2))
    return image

def contact_sheet(rows):
    W=1280;cw=320;ch=310
    H=((len(rows)+3)//4)*ch
    sheet=Image.new("RGB",(W,H),(232,237,240))
    dr=ImageDraw.Draw(sheet)
    for i,(name,source,processed) in enumerate(rows):
        x=(i%4)*cw;y=(i//4)*ch
        # checkerboard showing transparent cutout effect
        dr.rectangle((x+4,y+4,x+cw-6,y+ch-8),fill=(247,249,250))
        orig=ImageOps.contain(source.convert("RGB"),(130,217))
        mask=ImageOps.contain(processed,(130,217))
        sheet.paste(orig,(x+8+(130-orig.width)//2,y+14+(217-orig.height)//2))
        sheet.paste(mask,(x+176+(130-mask.width)//2,y+14+(217-mask.height)//2),mask)
        dr.text((x+10,y+250),name,fill=(22,48,65))
        dr.text((x+10,y+268),f"source {source.width}x{source.height}",fill=(71,91,102))
        dr.text((x+176,y+268),f"PNG {processed.width}x{processed.height}",fill=(71,91,102))
    sheet.save(REVIEW/"comparison-contact-sheet.jpg",quality=88)

def main():
    manifest={}
    sheets=[]
    for name,path in FILES.items():
        try:
            data=obtain(path)
            image=Image.open(io.BytesIO(data))
            image.load()
            src=image.copy()
            # This output is NOT artificial reconstruction.
            cleaned,transparent,coverage,bg=clean_image(image)
            cleaned=upscale(cleaned)
            dst=PUBLIC/f"{name}.png"
            cleaned.save(dst,"PNG",optimize=True)
            (REVIEW/f"{name}-original{Path(path).suffix}").write_bytes(data)
            sheets.append((name,src,cleaned))
            manifest[path]={"asset":f"/awards/{name}.png","original":f"{ROOT_URL}{path}",
                "originalPx":list(image.size),"outputPx":list(cleaned.size),
                "backgroundRemoved":transparent,"removedCoverage":round(coverage,3),
                "backgroundRGB":bg,"bytes":dst.stat().st_size}
            print(f"{name}: {image.size} -> {cleaned.size} transparency={transparent} coverage={coverage:.2f}",flush=True)
        except Exception as exc:
            print(f"FAIL: {name} {exc}",flush=True)
            raise
    (PUBLIC/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n")
    contact_sheet(sheets)
    print(f"Prepared {len(manifest)} genuine images; contact sheet: {REVIEW/'comparison-contact-sheet.jpg'}",flush=True)

if __name__=="__main__": main()
