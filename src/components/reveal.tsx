"use client";
import {useEffect,useRef,type ReactNode} from "react";

/** CSS transform/opacity only. Respects reduced motion and never blocks content. */
export default function Reveal({children,className=""}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=ref.current;if(!node)return;
  if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  node.classList.add("r-reveal--ready");
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries)if(entry.isIntersecting){node.classList.add("r-reveal--visible");observer.unobserve(node);}
  },{rootMargin:"0px 0px -45px 0px",threshold:0.08});
  observer.observe(node);
  return()=>{observer.disconnect();node.classList.remove("r-reveal--ready");};
 },[]);
 return <div ref={ref} className={`r-reveal ${className}`}>{children}</div>;
}
