import type {ReactNode} from "react";

/**
 * Fifteen original technical pictograms, in the EXACT order of home-content.json.
 * One system: 64px artboard, 1.85px round strokes, no enclosure, no old pentagons.
 */
const glyphs:ReactNode[]=[
  // 01 Offshore structural design: platform elevation + blueprint axis.
  <><path d="M7 49h50M14 49l4-19h28l4 19M19 30l13 9 13-9M24 30v19M40 30v19M13 30h38M23 23h22M28 23V9h9v14M37 13h8M45 13v10"/><path className="v-icon-highlight" d="M9 55h46M32 7v-4"/></>,
  // 02 Exploration and reservoir survey: actual strata and sensor scan.
  <><path d="M7 17c8-5 15-5 23-1 9 5 18 5 27-1M7 29c8-5 15-5 23-1 9 5 18 5 27-1M7 42c8-5 15-5 23-1 9 5 18 5 27-1"/><path d="M14 8v6M14 4h13M27 4l5 4-5 4M30 17v21"/><path className="v-icon-highlight" d="M30 35l-5 8m5-8 5 8M8 53h48"/></>,
  // 03 Field operation: piping network + flow control.
  <><path d="M6 43h16V19h21v24h15M14 43V31M50 43V31M22 31h21M32 19V8M25 8h14M12 54h40"/><circle cx="32" cy="31" r="7"/><path className="v-icon-highlight" d="M32 26v10M28 31h8"/></>,
  // 04 Well drilling and logging: rig with vertical drill string.
  <><path d="M9 54h46M21 54 32 8l11 46M26 37h12M29 24h6M17 54v-9h30v9M32 8V4M14 45h6M44 45h6M32 37v17"/><path className="v-icon-highlight" d="m27 41 5 5 5-5"/></>,
  // 05 Gas: pipelines, compression impeller, pressure dial.
  <><path d="M7 44h13l8-8h9l8 8h12M9 55v-11M55 55V44M18 23h28M18 23V9h28v14M31 9V4"/><circle cx="33" cy="36" r="8"/><path className="v-icon-highlight" d="M33 36l4-5M30 36h6"/></>,
  // 06 Operation / maintenance: hex-free impeller and wrench.
  <><circle cx="21" cy="34" r="11"/><circle cx="21" cy="34" r="4"/><path d="M21 23v-6m-11 17H4m17 11v6m11-17h6m-25-8-4-4m20 20 4 4m-4-20 4-4M13 42l-4 4"/><path d="M46 9a11 11 0 0 0-8 15l12 12 7-7-12-12a11 11 0 0 0 1-8Z"/><path className="v-icon-highlight" d="m50 37 9 9-7 7-9-9"/></>,
  // 07 Marine transportation and diving: vessel and dive flag.
  <><path d="M7 38h50l-8 13H15L7 38ZM20 38V24h21v14M25 24v-9h12v9M37 14h12v10H37M9 57c6-3 12-3 18 0s12 3 18 0 9-3 12-1"/><path className="v-icon-highlight" d="M43 14v-9m0 0h10m-10 0 10 9"/></>,
  // 08 Technical and language training: book + mechanical caliper.
  <><path d="M7 16c9-4 17-3 25 2 8-5 16-6 25-2v34c-9-4-17-3-25 2-8-5-16-6-25-2V16ZM32 18v34M13 25c5-1 9 0 13 2M38 27c4-2 8-3 13-2M13 35h13M38 35h13"/><path className="v-icon-highlight" d="M19 44h7m12 0h7"/></>,
  // 09 Oil spill response: containment boom deployed on waves.
  <><path d="M5 40c7-4 13-4 20 0s14 4 21 0 9-3 13-1M5 52c7-4 13-4 20 0s14 4 21 0 9-3 13-1M9 30l46-6M15 29l3 13M25 27l3 15M36 26l3 16M47 24l3 17"/><path className="v-icon-highlight" d="M30 5c0 8-7 11-7 18a7 7 0 0 0 14 0c0-7-7-10-7-18Z"/></>,
  // 10 Port cargo and supplies: crane loading pallet.
  <><path d="M9 54h47M14 54V12h29M16 18h27M31 12l11 6M43 18v17M43 35v6M39 41h8M9 39h18v15M27 45h14v9M11 39v-9h18v9M18 30V17"/><path className="v-icon-highlight" d="M43 41v5m-9 8V41m0 0h18"/></>,
  // 11 Laboratory analysis: sample chemistry and calibrated flask.
  <><path d="M20 8h24M24 8v18L12 48a8 8 0 0 0 7 12h26a8 8 0 0 0 7-12L40 26V8M19 43h26M27 35h10"/><circle cx="27" cy="49" r="2"/><circle cx="38" cy="53" r="2"/><path className="v-icon-highlight" d="M30 19h4m-4 7h4"/></>,
  // 12 IT communications: network transceiver / satellite links.
  <><rect x="8" y="30" width="18" height="22" rx="2"/><rect x="38" y="30" width="18" height="22" rx="2"/><path d="M13 37h8M13 43h8M43 37h8M43 43h8M26 41h12M32 30V17M32 17l-8-8M32 17l8-8M32 9V4"/><path className="v-icon-highlight" d="M19 15c-4 5-4 10 0 14M45 15c4 5 4 10 0 14M12 11c-7 9-7 18 0 26M52 11c7 9 7 18 0 26"/></>,
  // 13 Medical: monitor, pulse and clinical cross.
  <><path d="M8 18h48v34H8V18ZM15 43h34M15 34h8l5-10 8 20 5-10h8"/><path className="v-icon-highlight" d="M32 8v8M28 12h8"/></>,
  // 14 EPCI offshore engineering: heavy-lift crane and jacket.
  <><path d="M5 54h54M16 54 24 29h18l8 25M18 45h30M24 29l12 25 6-25M30 29V9h23M53 9v25m-5 0h10M30 9l10 8M42 9v20"/><path className="v-icon-highlight" d="M53 34v7m-5 0h10M30 8V4"/></>,
  // 15 Road and abnormal-load freight: flatbed truck.
  <><path d="M5 23h35v28H5V23ZM40 35h12l8 10v6H40V35ZM46 35v10h14M11 29h23M11 36h23M9 51v5M57 51v5"/><circle cx="16" cy="53" r="5"/><circle cx="50" cy="53" r="5"/><path className="v-icon-highlight" d="M14 15h26v8M19 15V9h16v6"/></>
];
export default function ServiceIcon({index,className=""}:{index:number;className?:string}){
 return <svg className={className} width="64" height="64" viewBox="0 0 64 64"
  fill="none" stroke="currentColor" strokeWidth="1.85"
  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  {glyphs[index%glyphs.length]}
 </svg>;
}
