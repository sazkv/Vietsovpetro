/** Shared UI glyphs, drawn on the same 24px grid as service icons. */
type IconName="up-right"|"left"|"down"|"search"|"menu"|"close"|"plus"|"chevron-down";
const paths:Record<IconName,string>={
 "up-right":'<path d="M7 17 17 7M7 7h10v10"/>',
 "left":'<path d="m12 19-7-7 7-7M5 12h14"/>',
 "down":'<path d="M12 5v14m-7-7 7 7 7-7"/>',
 "search":'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 "menu":'<path d="M4 7h16M4 12h16M4 17h16"/>',
 "close":'<path d="M18 6 6 18M6 6l12 12"/>',
 "plus":'<path d="M12 5v14M5 12h14"/>',
 "chevron-down":'<path d="m6 9 6 6 6-6"/>'
};
export default function UIIcon({name,size=18,className=""}:{name:IconName;size?:number;className?:string}){
 return <svg className={className} aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:paths[name]}}/>;
}
