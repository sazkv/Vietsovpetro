import SourceMedia from "@/components/source-media";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SourceCopy({html}: {html: string}) {
  const withBasePath = basePath ? html.replace(/href="\/(vi|ru|en)\//g, `href="${basePath}/$1/`) : html;
  return <><div className="source-copy" dangerouslySetInnerHTML={{__html: withBasePath}}/><SourceMedia/></>;
}
