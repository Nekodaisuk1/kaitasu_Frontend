"use client";

import { useRef } from "react";

import SubscriptionPage from "@/components/subscription/SubscriptionPage";
import { SAMPLE_PRODUCTS } from "@/lib/data/sampleProducts";

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <SubscriptionPage products={SAMPLE_PRODUCTS} scrollRef={scrollRef} />
  );
}

