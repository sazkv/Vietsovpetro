/** Exact Lucide 24px icon paths (ISC license, https://lucide.dev/license).
 * Consistent thin interface glyphs; never illustrations masquerading as medals. */
export default function AwardUIIcon({name,size=22}:{name:"previous"|"next"|"close"|"expand";size?:number}){
 return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24"
  fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
   {name==="previous"&&<path d="m15 18-6-6 6-6"/>}
   {name==="next"&&<path d="m9 18 6-6-6-6"/>}
   {name==="close"&&<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>}
   {name==="expand"&&<><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/></>}
 </svg>;
}
