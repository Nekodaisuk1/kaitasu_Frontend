"use client";

import { Button } from "@/components/ui/button";
import type { Product, Screen } from "@/types/page";

type SubscriptionAddProps = {
  onNavigate: (screen: Screen) => void;
  product: Product | null;
};

export function SubscriptionAdd({ onNavigate, product }: SubscriptionAddProps) {
  return (
    <div className="flex-1 bg-white p-6 ml-[232px] min-h-screen" data-oid="subscription-add-page">
      <div className="mx-auto w-[903px]">
        <h1 className="text-base font-bold">定期購入に商品を追加</h1>
        <p className="text-sm text-[#adadad] mt-2">このページの内容は後で追加します。</p>

        {/* オレンジ色の四角（外枠） */}
        <div
          className="mt-4 p-4"
          style={{
            borderRadius: "14.469px",
            border: "6px solid #FDA900",
            background: "#FFF",
            width: "900px",
            height: "633px",
            flexShrink: 0
          }}
          data-oid="subscription-add-orange-frame"
        >
          {/* 先ほど追加したセクション（内側のオレンジは削除し、内容のみ配置） */}
          {product ? (
            <div
              data-oid="subscription-add-product-row"
              style={{
                display: "flex",
                width: "781px",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div
                className="overflow-hidden rounded bg-white"
                style={{ width: "160px", height: "106.473px", flexShrink: 0 }}
                data-oid="subscription-add-product-image"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  style={{ width: "160px", height: "106.473px", aspectRatio: "160 / 106.473", objectFit: "cover", flexShrink: 0 }}
                />
              </div>
              <div
                style={{
                  color: "#101010",
                  fontFamily: '"BIZ UDPGothic"',
                  fontSize: "32px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: "1.664px"
                }}
                data-oid="subscription-add-product-name"
              >
                {product.name}
              </div>
              <div
                style={{
                  color: "#101010",
                  fontFamily: '"BIZ UDPGothic"',
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: "1.872px"
                }}
                data-oid="subscription-add-product-price"
              >
                ¥{product.price}
              </div>
            </div>
          ) : (
            <div data-oid="subscription-add-no-product">商品が選択されていません。</div>
          )}
        </div>

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
