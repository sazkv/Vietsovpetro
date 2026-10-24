import type {ReactNode} from "react";

/** Original line drawings for the 15 categories in the source service index.
 * Deliberately industrial rather than legacy site pictograms. */
const shapes:ReactNode[]=[
  <><path d="M9 50h46M16 49V30h32v19M12 30h40M18 30V22h26v8M24 22V9h13v13M30 9V4M37 15l10 8M47 23h7M21 37h22M24 37v12M40 37v12"/></>,
  <><path d="M7 16c9-5 18-5 27 0s16 5 23 0M7 27c9-5 18-5 27 0s16 5 23 0M7 39c9-5 18-5 27 0s16 5 23 0M13 49c6-4 12-4 18 0s13 4 21 0"/><circle cx="34" cy="27" r="4"/></>,
  <><path d="M12 53h40M19 53l13-43 13 43M24 38h16M27 27h10M30 15h4M20 53V43h24v10M32 10V4M13 48h-5"/></>,
  <><path d="M5 46l9 10h36l9-10M13 44h43l-7-15H22l-9 15ZM28 29V16h15v13M28 16h15M6 60c6-3 12-3 18 0s12 3 18 0 12-3 18 0"/></>,
  <><path d="M15 53h34M21 53l11-42 11 42M22 37h20M26 25h12M31 11V4M15 53V42M49 53V42M8 42h9M49 42h7M30 45h4"/></>,
  <><path d="M23 10a18 18 0 0 1 23 23l11 11-9 9-11-11a18 18 0 0 1-23-23l11 11 10-10-11-11Z"/><path d="m45 45 6 6"/></>,
  <><path d="M8 15c9-4 17-4 24 0 7-4 15-4 24 0v37c-9-4-17-4-24 0-7-4-15-4-24 0V15ZM32 15v37M15 24c5-2 9-2 12 0M37 24c5-2 9-2 12 0M15 33h12M37 33h12"/></>,
  <><path d="M6 24h52M6 40h52M13 24v16M51 24v16M26 24v16M38 24v16M6 32h52M32 16c-8-8-7-11 0-17 7 6 8 9 0 17Z"/><path d="M21 52h22"/></>,
  <><path d="M7 54h50M14 54V19h36v35M14 28h36M14 39h36M26 19V7h12v12M20 45h8v9M36 45h8v9M10 19h44M32 7V3"/></>,
  <><path d="M9 52h46M14 52V18h8v34M22 25h29M51 25V52M26 18h29M36 18V7h12v11M14 36h37M29 52V36M43 52V36M14 18h-5"/></>,
  <><path d="M5 25c8-4 16-4 24 0s16 4 30 0M5 36c8-4 16-4 24 0s16 4 30 0M15 18V8h34v10M15 18c0 20 7 30 17 37 10-7 17-17 17-37M28 38h8"/></>,
  <><path d="M12 16h15v15H12zM39 11h14v14H39zM40 42h14v14H40zM8 44h17v14H8zM27 23l12-5M27 30l14 16M25 51l15-1"/><circle cx="34" cy="33" r="3"/></>,
  <><path d="M20 6h24M25 6v20L13 49a7 7 0 0 0 6 10h26a7 7 0 0 0 6-10L39 26V6M23 42h18M19 49h26M28 35h8"/></>,
  <><rect x="13" y="9" width="38" height="46" rx="2"/><path d="M23 22h18M32 13v18M18 43h28M25 39v10M39 39v10"/></>,
  <><path d="M6 45V25h28v20M34 32h12l11 11v11H6v-9h51M13 54a5 5 0 1 0 10 0M43 54a5 5 0 1 0 10 0M11 30h18M11 36h18M48 37v7h9"/></>
];
export default function ServiceIcon({index,className=""}:{index:number,className?:string}){
 return <svg className={className} viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" focusable="false" aria-hidden="true">{shapes[index%shapes.length]}</svg>;
}
