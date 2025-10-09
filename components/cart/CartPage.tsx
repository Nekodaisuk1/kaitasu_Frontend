import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types/product";
import type { Screen } from "@/types/navigation";

type CartPageProps = {
  cartItems: Product[];
  onUpdateQuantity: (id: number, change: number) => void;
  onNavigate: (screen: Screen) => void;
};

const CartPage = ({ cartItems, onUpdateQuantity, onNavigate }: CartPageProps) => (
  <div className="flex-1 bg-white p-6 ml-[232px]" data-oid="qie1-gm">
    <div className="max-w-sm mx-auto" data-oid="-j93.-d">
      <h2 className="text-base font-bold mb-4" data-oid="gdwztq6">
        買い物かご
      </h2>

      <div className="space-y-3 mb-6" data-oid=":2r1yrd">
        {cartItems.map((item) => (
          <Card
            key={item.id}
            className="p-3 bg-white border-2 border-gray-200 rounded-lg"
            style={{ width: "970px", height: "111px" }}
            data-oid="5rgf5dd">
            <div className="flex items-center gap-3" data-oid=".a7yvq5">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
                data-oid="b0g5711"
              />
              <div className="flex-1" data-oid="yd66:be">
                <h4 className="text-sm font-medium" data-oid="5tlgvsv">
                  {item.name}
                </h4>
              </div>
              <div className="text-right" data-oid="f:g9-vr">
                <div className="text-xs mb-1" data-oid="3_9wxay">
                  数量
                </div>
                <div className="flex items-center gap-1" data-oid="zdp13dt">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-5 h-5 rounded bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    data-oid="g4qqy_k">
                    <Image
                      src="/images/mainasu.png"
                      alt="数量を減らす"
                      width={20}
                      height={20}
                      className="h-full w-full object-contain"
                      data-oid="2h.nwkc"
                    />
                  </Button>
                  <div
                    className="flex items-center justify-center text-xs"
                    style={{
                      width: "73px",
                      height: "26px",
                      flexShrink: 0,
                      borderRadius: "5px",
                      border: "1px solid #FDA900",
                      background: "#FFF"
                    }}
                    data-oid="weymacu">
                    {item.quantity}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-5 h-5 rounded bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    data-oid="4kc4n3t">
                    <Image
                      src="/images/plus.png"
                      alt="数量を増やす"
                      width={20}
                      height={20}
                      className="h-full w-full object-contain"
                      data-oid=".gef-yq"
                    />
                  </Button>
                </div>
              </div>
              <div className="text-right" data-oid="8ke_pvk">
                <span className="font-bold text-sm" data-oid="jo1znli">
                  ¥{item.price}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="border-t-2 border-gray-200 pt-4 mb-6" data-oid="lx.9fs:">
        <div className="flex justify-between text-base font-bold" data-oid="e-466ve">
          <span data-oid="qr0:wva">合計 {cartItems.length}点</span>
          <span data-oid="5tmrc4s">
            ¥
            {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </span>
        </div>
      </div>

      <div className="flex gap-3" data-oid="ufdhcq:">
        <Button
          variant="outline"
          className="flex-1 text-sm border-2 border-[#fda900] text-[#fda900] rounded-md bg-transparent"
          onClick={() => onNavigate("order")}
          data-oid="8i_h.o.">
          注文確認
        </Button>
        <Button
          className="flex-1 bg-[#fda900] text-sm border-2 border-[#fda900] rounded-md hover:bg-[#fda900]/90"
          onClick={() => onNavigate("catalog")}
          data-oid="mgchczd">
          買い物を続ける
        </Button>
      </div>
    </div>
  </div>
);

export default CartPage;
