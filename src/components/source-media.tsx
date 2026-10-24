"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

export default function SourceMedia() {
  const pathname = usePathname();
  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".source-copy img"));
    const hide = (event: Event) => { (event.currentTarget as HTMLImageElement).hidden = true; };
    for (const image of images) {
      if (image.complete && image.naturalWidth === 0) image.hidden = true;
      else image.addEventListener("error", hide);
    }
    return () => { for (const image of images) image.removeEventListener("error", hide); };
  }, [pathname]);
  return null;
}
