"use client";

import {useEffect} from "react";
import type {Locale} from "@/lib/original-content";

export default function LocaleAttributes({locale}: {locale: Locale}) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return null;
}
