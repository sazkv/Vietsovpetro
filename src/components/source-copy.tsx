import SourceMedia from "@/components/source-media";
import {presentContent} from "@/lib/present-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SourceCopy({html,title,omitFirstImage=false,className=""}:{
  html:string; title?:string; omitFirstImage?:boolean; className?:string;
}){
  const normalized=presentContent(html,{title,omitFirstImage});
  const withBasePath=basePath?normalized.replace(/href="\/(vi|ru|en)\//g,`href="${basePath}/$1/`):normalized;
  return <><div className={`source-copy ${className}`.trim()} dangerouslySetInnerHTML={{__html:withBasePath}}/><SourceMedia/></>;
}
