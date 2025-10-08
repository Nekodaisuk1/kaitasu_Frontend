"use client";

import { Button } from "@/components/ui/button";
import type { Screen } from "@/types/page";

type SubscriptionAddProps = {
  onNavigate: (screen: Screen) => void;
};

export function SubscriptionAdd({ onNavigate }: SubscriptionAddProps) {
  return (
    <div className="flex-1 bg-white p-6 ml-[232px] min-h-screen" data-oid="subscription-add-page">
      <div className="mx-auto w-[903px]">
        <h1 className="text-base font-bold">定期購入に商品を追加</h1>
        <p className="text-sm text-[#adadad] mt-2">このページの内容は後で追加します。</p>
        <div className="mt-4">
          <Button
            variant="outline"
            className="border-2 border-[#fda900] text-[#fda900]"
            onClick={() => onNavigate("subscription")}
            data-oid="subscription-add-back">
            定期購入ページに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}

