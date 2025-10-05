"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart as ShoppingCartOutline,
  Calendar as CalendarOutline,
  Clock as ClockOutline,
  User as UserOutline,
  Search,
  Heart,
  Plus,
  Minus } from
"lucide-react";

type Screen =
"dashboard" |
"catalog" |
"cart" |
"order" |
"history" |
"profile";

type SidebarNavKey = Screen | "subscription";

type SidebarIconProps = {
  fill: string;
  stroke: string;
};

type SidebarIconComponent = (props: SidebarIconProps) => JSX.Element;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const sampleProducts: Product[] = [
{
  id: 1,
  name: "トップリブ 特製",
  description: "ナンバー 260g",
  price: 350,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 2,
  name: "ビーフステーキ",
  description: "プレミアム 300g",
  price: 450,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 3,
  name: "チキンカツ",
  description: "ジューシー 200g",
  price: 280,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 4,
  name: "ポークソテー",
  description: "厚切り 250g",
  price: 380,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 5,
  name: "ハンバーグ",
  description: "手作り 180g",
  price: 320,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 6,
  name: "サーモン焼き",
  description: "ノルウェー産 220g",
  price: 420,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 7,
  name: "エビフライ",
  description: "大ぶり 3本",
  price: 390,
  image: "/images/food-item.jpg",
  quantity: 1
},
{
  id: 8,
  name: "唐揚げ",
  description: "ジューシー 6個",
  price: 300,
  image: "/images/food-item.jpg",
  quantity: 1
}];

const SIDEBAR_ACTIVE_BG =
  "url(\"data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22192%22%20height=%22100%22%20viewBox=%220%200%20192%20100%22%20fill=%22none%22%3E%3Cpath%20d=%22M0%2040.0005C0%2028.9548%208.9543%2020.0005%2020%2020.0005H192V79.2693H20C8.95431%2079.2693%200%2070.315%200%2059.2693V40.0005Z%22%20fill=%22white%22/%3E%3Cpath%20d=%22M192%2079.2695H172C183.046%2079.2697%20192%2088.224%20192%2099.2695V79.2695Z%22%20fill=%22white%22/%3E%3Cpath%20d=%22M192%2020H172C183.046%2019.9998%20192%2011.0456%20192%200V20Z%22%20fill=%22white%22/%3E%3C/svg%3E\")";

const SIDEBAR_LABEL_BASE_STYLE = {
  display: "flex",
  width: "118px",
  height: "52.616px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4.5px",
  color: "#ffffff",
  textAlign: "center" as const,
  fontFamily: '"BIZ UDPGothic"',
  fontSize: "20px",
  fontStyle: "normal" as const,
  fontWeight: 700,
  lineHeight: "100%",
  letterSpacing: "1.04px"
};

const SIDEBAR_LABEL_SELECTED_STYLE = {
  color: "#101010",
  textAlign: "center" as const,
  fontFamily: '"BIZ UDPGothic"',
  fontSize: "20px",
  fontStyle: "normal" as const,
  fontWeight: 700,
  lineHeight: "100%",
  letterSpacing: "1.04px"
};

const SIDEBAR_ICON_STYLE = {
  display: "flex",
  width: "31.5px",
  height: "34.616px",
  flexShrink: 0,
  justifyContent: "center",
  alignItems: "center"
};

const SidebarHomeIcon: SidebarIconComponent = ({ fill, stroke }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 34 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.7432 0.5C17.5497 0.5 18.2899 0.711917 18.9521 1.13379L19.2314 1.32715L19.2324 1.32812L31.3486 10.501H31.3477C31.8648 10.8813 32.2695 11.3663 32.5596 11.9492C32.8525 12.5333 33 13.1558 33 13.8096V33.3662C33 34.1093 32.7175 34.76 32.1807 35.2969C31.6438 35.8337 30.9931 36.1162 30.25 36.1162H21.5107C20.8695 36.1162 20.308 35.8948 19.8613 35.4482L19.8604 35.4473C19.4147 34.9997 19.1934 34.4382 19.1934 33.7979V22.877H14.3066V33.7979C14.3066 34.4393 14.0854 35.0015 13.6387 35.4482C13.1923 35.8945 12.6315 36.1162 11.9912 36.1162H3.25C2.50693 36.1162 1.85619 35.8337 1.31934 35.2969C0.78249 34.76 0.5 34.1093 0.5 33.3662V13.8096C0.5 13.1558 0.647519 12.5333 0.94043 11.9492C1.23298 11.3659 1.63907 10.8799 2.15723 10.499L14.2676 1.32812C14.9908 0.776359 15.822 0.500017 16.7432 0.5ZM3.75 32.8662H11.0566V21.9434C11.0566 21.3023 11.2803 20.7412 11.7285 20.2949C12.1745 19.8478 12.7347 19.625 13.375 19.625H20.125C20.7661 19.625 21.3269 19.8484 21.7744 20.2959C22.2208 20.7423 22.4434 21.303 22.4434 21.9434V32.8662H29.75V13.8096C29.75 13.6539 29.7172 13.5251 29.6582 13.4141C29.5923 13.2901 29.5017 13.179 29.3818 13.0801L17.2725 3.95312L17.2588 3.94238L17.2451 3.93066C17.1089 3.81226 16.9523 3.75195 16.75 3.75195C16.5476 3.75195 16.392 3.81216 16.2578 3.92969L16.2441 3.94238L16.2295 3.95312L4.12891 13.0723C4.00367 13.1777 3.90828 13.2933 3.83887 13.4199C3.78206 13.5236 3.74904 13.6482 3.75 13.8057V32.8662Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

const SidebarCatalogIcon: SidebarIconComponent = ({ fill }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.914 1.97034C17.2738 1.56623 17.7201 1.23721 18.2241 1.00451C18.728 0.7718 19.2785 0.640574 19.8399 0.619293C20.4014 0.598011 20.9614 0.687145 21.4838 0.880947C22.0062 1.07475 22.4794 1.36892 22.8729 1.74447L23.09 1.97034L30.997 10.8507H36.9981C37.42 10.8498 37.8373 10.9325 38.2228 11.0931C38.6082 11.2538 38.9531 11.4888 39.2347 11.7829C39.5164 12.077 39.7285 12.4235 39.8572 12.7996C39.9859 13.1758 40.0283 13.5732 39.9816 13.9658L39.7966 15.4076L39.5956 16.8004L39.4307 17.8432L39.2397 18.9631L39.0226 20.1395L38.7773 21.3592L38.5039 22.6033C38.3592 23.2307 38.2037 23.8575 38.0375 24.4837C37.5925 26.1363 37.0338 27.7603 36.3648 29.3454L35.9205 30.3618L35.4903 31.2804L35.0842 32.0973L34.8952 32.4624L34.3946 33.3847C33.7513 34.5329 32.537 35.2105 31.2523 35.3083L30.9307 35.3196H9.05531C8.35247 35.3246 7.6614 35.1507 7.05591 34.8165C6.45042 34.4823 5.95324 34.0005 5.61749 33.4223L5.15108 32.5753L4.7892 31.8789L4.59821 31.4931L4.19613 30.6479C3.27797 28.6519 2.53304 26.5898 1.96858 24.4818C1.85944 24.0725 1.75489 23.6621 1.65496 23.2508L1.36948 22.0311L1.11416 20.8378L0.888989 19.684L0.687947 18.5791L0.513041 17.5364L0.36427 16.5708L0.183332 15.2852L0.0506448 14.2387L0.0164677 13.9507C-0.0251189 13.5809 0.0122512 13.2071 0.126404 12.851C0.240557 12.4948 0.429213 12.1635 0.681397 11.8762C0.933582 11.589 1.24426 11.3516 1.59536 11.1778C1.94646 11.004 2.33096 10.8973 2.72651 10.8639L2.99993 10.8507H9.00907L16.914 1.97034ZM35.8502 14.6151H4.14587L4.27051 15.5261L4.4233 16.5576L4.60826 17.6945L4.82539 18.9141C4.90581 19.332 4.99024 19.7599 5.0787 20.1978L5.36619 21.5286C5.51898 22.2024 5.68786 22.8875 5.86879 23.5689C6.379 25.4715 7.05129 27.3327 7.87921 29.1346L8.27326 29.9647L8.63915 30.6875L8.96685 31.2954L9.1116 31.5552H30.8784L31.188 30.9849L31.5438 30.2979L31.9339 29.5017C32.6717 27.9488 33.5161 25.8916 34.1353 23.5689C34.3866 22.6278 34.6097 21.6716 34.8088 20.7324L35.0902 19.3433L35.3315 18.0088L35.438 17.3707L35.629 16.1717L35.7838 15.0989L35.8502 14.6151ZM15.9531 19.9531L16.9583 25.5998C17.0285 26.0848 16.8941 26.5762 16.5838 26.97C16.2735 27.3638 15.8115 27.629 15.2959 27.7093C14.7803 27.7896 14.2515 27.6787 13.8218 27.4001C13.392 27.1216 13.095 26.6973 12.9937 26.2172L11.9885 20.5705C11.9364 20.3233 11.9378 20.0689 11.9926 19.8222C12.0475 19.5755 12.1547 19.3417 12.3079 19.1345C12.461 18.9274 12.6571 18.7511 12.8843 18.6162C13.1116 18.4813 13.3655 18.3905 13.631 18.3492C13.8964 18.3078 14.1681 18.3168 14.4298 18.3756C14.6915 18.4343 14.9379 18.5417 15.1544 18.6913C15.371 18.8408 15.5532 19.0296 15.6904 19.2464C15.8276 19.4631 15.9169 19.7035 15.9531 19.9531ZM26.1298 18.3796L26.363 18.4041C26.8496 18.4792 27.2897 18.7193 27.5996 19.0785C27.9095 19.4377 28.0676 19.891 28.0437 20.3522L28.0176 20.5705L27.0124 26.2172C26.9271 26.6898 26.6524 27.1142 26.2444 27.4038C25.8363 27.6933 25.3256 27.8262 24.8165 27.7753C24.3074 27.7244 23.8382 27.4935 23.5047 27.1298C23.1712 26.7661 22.9984 26.297 23.0217 25.8182L23.0478 25.5998L24.053 19.9531C24.1333 19.4982 24.389 19.0867 24.7719 18.7967C25.1547 18.5066 25.6379 18.3582 26.1298 18.3796ZM20.002 4.37959L14.2422 10.8507H25.7619L20.002 4.37959Z"
      fill={fill}
    />
  </svg>
);

const SidebarCartIcon: SidebarIconComponent = ({ fill }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 38 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.9445 13.7402C11.7807 13.5242 11.685 13.2643 11.6696 12.9936C11.6542 12.723 11.7198 12.4539 11.858 12.2207C11.9961 11.9874 12.2007 11.8007 12.4454 11.6842C12.6902 11.5677 12.9641 11.5267 13.2323 11.5665C13.5909 11.618 13.9144 11.8098 14.1318 12.0997L19.8735 19.7554V1.98329C19.8735 1.62072 20.0176 1.273 20.274 1.01662C20.5303 0.760243 20.8781 0.616211 21.2406 0.616211C21.6032 0.616211 21.9509 0.760243 22.2073 1.01662C22.4637 1.273 22.6077 1.62072 22.6077 1.98329V19.7554L28.3495 12.0997C28.5123 11.8846 28.7351 11.7224 28.9897 11.6335C29.2444 11.5445 29.5197 11.5327 29.7811 11.5996C30.0424 11.6664 30.2782 11.809 30.4589 12.0094C30.6395 12.2097 30.757 12.459 30.7965 12.7258C30.822 12.9037 30.8122 13.0848 30.7676 13.2589C30.7231 13.4329 30.6446 13.5965 30.5368 13.7402L22.3343 24.6769C22.3179 24.6988 22.2878 24.7097 22.2687 24.7316C22.1776 24.8384 22.0706 24.9307 21.9515 25.005C21.9092 25.0405 21.8634 25.0716 21.8148 25.0979C21.6365 25.187 21.4399 25.2333 21.2406 25.2333C21.0413 25.2333 20.8448 25.187 20.6665 25.0979C20.6179 25.0716 20.5721 25.0405 20.5297 25.005C20.4106 24.9307 20.3036 24.8384 20.2126 24.7316C20.1934 24.7097 20.1634 24.6988 20.147 24.6769L11.9445 13.7402ZM13.7217 40.9452C13.7229 41.6213 13.5229 42.2824 13.1469 42.8443C12.771 43.4063 12.2363 43.8435 11.6109 44.1004C11.1442 44.2926 10.6407 44.3792 10.1365 44.354C9.63241 44.3288 9.14008 44.1925 8.69483 43.9547C8.24958 43.7169 7.86243 43.3836 7.5611 42.9786C7.25977 42.5737 7.05173 42.1071 6.95187 41.6123C6.85675 41.1438 6.86097 40.6605 6.96427 40.1938C7.06757 39.727 7.26765 39.2871 7.55158 38.9025C7.83551 38.5178 8.19697 38.1971 8.61261 37.9609C9.02825 37.7247 9.48882 37.5783 9.96457 37.5312C10.4403 37.4841 10.9206 37.5373 11.3745 37.6875C11.8284 37.8376 12.2457 38.0813 12.5996 38.4028C12.9534 38.7243 13.2358 39.1164 13.4287 39.5539C13.6215 39.9913 13.7204 40.4644 13.7189 40.9424L13.7217 40.9452ZM35.595 40.9452C35.5963 41.6213 35.3962 42.2824 35.0203 42.8443C34.6444 43.4063 34.1096 43.8435 33.4842 44.1004C33.0175 44.2926 32.514 44.3792 32.0099 44.354C31.5057 44.3288 31.0134 44.1925 30.5682 43.9547C30.1229 43.7169 29.7358 43.3836 29.4344 42.9786C29.1331 42.5737 28.9251 42.1071 28.8252 41.6123C28.7344 41.1457 28.7421 40.6653 28.8476 40.2019C28.9532 39.7384 29.1543 39.3021 29.4382 38.9208C29.7221 38.5395 30.0824 38.2217 30.4961 37.9877C30.9099 37.7537 31.3679 37.6087 31.8409 37.5618C32.314 37.515 32.7915 37.5675 33.2431 37.7158C33.6947 37.8642 34.1104 38.1051 34.4635 38.4233C34.8166 38.7416 35.0994 39.13 35.2937 39.5638C35.4881 39.9975 35.5898 40.4671 35.5923 40.9424L35.595 40.9452ZM36.2785 15.6541C35.916 15.6541 35.5682 15.7982 35.3119 16.0545C35.0555 16.3109 34.9115 16.6586 34.9115 17.0212L33.5444 27.9579H9.18295L6.17537 9.96706C6.12253 9.64923 5.95914 9.36027 5.71402 9.15117C5.46891 8.94207 5.15781 8.82626 4.83562 8.82418H2.10146C1.73889 8.82418 1.39116 8.96821 1.13478 9.22459C0.878407 9.48097 0.734375 9.82869 0.734375 10.1913C0.734375 10.5538 0.878407 10.9016 1.13478 11.1579C1.39116 11.4143 1.73889 11.5583 2.10146 11.5583H3.67634L7.5862 35.0175C7.63717 35.3377 7.80116 35.629 8.04845 35.8386C8.29573 36.0483 8.60994 36.1624 8.93414 36.1604H33.5416C33.9042 36.1604 34.2519 36.0163 34.5083 35.76C34.7647 35.5036 34.9087 35.1559 34.9087 34.7933C34.9087 34.4307 34.7647 34.083 34.5083 33.8266C34.2519 33.5702 33.9042 33.4262 33.5416 33.4262H10.0825L9.62588 30.692H33.5225C34.1888 30.6919 34.8321 30.4484 35.3315 30.0073C35.831 29.5663 36.1522 28.9581 36.2348 28.2969L37.6237 17.0321C37.6237 16.6696 37.4797 16.3219 37.2233 16.0655C36.967 15.8091 36.6192 15.6651 36.2567 15.6651L36.2785 15.6541Z"
      fill={fill}
    />
  </svg>
);

const SidebarHistoryIcon: SidebarIconComponent = ({ fill }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 36 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.9455 34.5179C13.93 34.5179 10.3766 33.2993 7.28537 30.8619C4.1941 28.4246 2.18636 25.3091 1.26216 21.5155C1.13469 21.0374 1.23029 20.5996 1.54898 20.2018C1.86767 19.8041 2.2979 19.5727 2.83967 19.5077C3.34957 19.444 3.81167 19.5396 4.22596 19.7945C4.64026 20.0495 4.92708 20.4319 5.08642 20.9418C5.85127 23.81 7.42878 26.1524 9.81894 27.9689C12.2091 29.7854 14.918 30.6937 17.9455 30.6937C21.6741 30.6937 24.8374 29.3953 27.4354 26.7987C30.0333 24.202 31.3317 21.0387 31.3304 17.3088C31.3291 13.5788 30.0308 10.4162 27.4354 7.82079C24.84 5.22539 21.6767 3.92642 17.9455 3.92387C15.7465 3.92387 13.691 4.43377 11.7789 5.45357C9.86675 6.47338 8.25737 7.8756 6.95075 9.66026H10.297C10.8387 9.66026 11.2932 9.84382 11.6603 10.211C12.0275 10.5781 12.2104 11.0319 12.2091 11.5724C12.2078 12.1129 12.0243 12.5673 11.6584 12.9357C11.2926 13.3041 10.8387 13.4871 10.297 13.4845H2.64846C2.10669 13.4845 1.65288 13.301 1.28702 12.9338C0.921168 12.5667 0.737603 12.1129 0.736328 11.5724V3.92387C0.736328 3.3821 0.919893 2.92829 1.28702 2.56243C1.65415 2.19658 2.10796 2.01301 2.64846 2.01174C3.18895 2.01046 3.6434 2.19403 4.01181 2.56243C4.38021 2.93084 4.56314 3.38465 4.56059 3.92387V6.50524C6.1859 4.46564 8.17005 2.88813 10.513 1.77272C12.856 0.657314 15.3335 0.0996094 17.9455 0.0996094C20.3357 0.0996094 22.5748 0.554059 24.6628 1.46296C26.7509 2.37186 28.5674 3.59817 30.1124 5.14189C31.6574 6.68562 32.8843 8.50215 33.7932 10.5915C34.7021 12.6808 35.1559 14.9199 35.1547 17.3088C35.1534 19.6977 34.6996 21.9368 33.7932 24.0261C32.8869 26.1154 31.6599 27.9319 30.1124 29.4757C28.5648 31.0194 26.7483 32.2463 24.6628 33.1565C22.5773 34.0667 20.3382 34.5205 17.9455 34.5179ZM19.8576 16.5439L24.6379 21.3242C24.9885 21.6748 25.1638 22.121 25.1638 22.6627C25.1638 23.2045 24.9885 23.6507 24.6379 24.0012C24.2874 24.3518 23.8412 24.5271 23.2995 24.5271C22.7577 24.5271 22.3115 24.3518 21.961 24.0012L16.607 18.6473C16.4158 18.4561 16.2724 18.2413 16.1768 18.0029C16.0812 17.7645 16.0334 17.5172 16.0334 17.261V9.66026C16.0334 9.11849 16.2169 8.66468 16.5841 8.29882C16.9512 7.93297 17.405 7.7494 17.9455 7.74813C18.486 7.74685 18.9404 7.93042 19.3088 8.29882C19.6772 8.66722 19.8602 9.12104 19.8576 9.66026V16.5439Z"
      fill={fill}
    />
  </svg>
);

const SidebarSubscriptionIcon: SidebarIconComponent = ({ fill }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M34 4.25391H30V2.25391C30 1.72347 29.7893 1.21477 29.4142 0.839693C29.0391 0.46462 28.5304 0.253906 28 0.253906C27.4696 0.253906 26.9609 0.46462 26.5858 0.839693C26.2107 1.21477 26 1.72347 26 2.25391V4.25391H14V2.25391C14 1.72347 13.7893 1.21477 13.4142 0.839693C13.0391 0.46462 12.5304 0.253906 12 0.253906C11.4696 0.253906 10.9609 0.46462 10.5858 0.839693C10.2107 1.21477 10 1.72347 10 2.25391V4.25391H6C4.4087 4.25391 2.88258 4.88605 1.75736 6.01127C0.632141 7.13648 0 8.66261 0 10.2539V34.2539C0 35.8452 0.632141 37.3713 1.75736 38.4965C2.88258 39.6218 4.4087 40.2539 6 40.2539H34C35.5913 40.2539 37.1174 39.6218 38.2426 38.4965C39.3679 37.3713 40 35.8452 40 34.2539V10.2539C40 8.66261 39.3679 7.13648 38.2426 6.01127C37.1174 4.88605 35.5913 4.25391 34 4.25391ZM36 34.2539C36 34.7843 35.7893 35.293 35.4142 35.6681C35.0391 36.0432 34.5304 36.2539 34 36.2539H6C5.46957 36.2539 4.96086 36.0432 4.58579 35.6681C4.21071 35.293 4 34.7843 4 34.2539V20.2539H36V34.2539ZM36 16.2539H4V10.2539C4 9.72347 4.21071 9.21477 4.58579 8.83969C4.96086 8.46462 5.46957 8.25391 6 8.25391H10V10.2539C10 10.7843 10.2107 11.293 10.5858 11.6681C10.9609 12.0432 11.4696 12.2539 12 12.2539C12.5304 12.2539 13.0391 12.0432 13.4142 11.6681C13.7893 11.293 14 10.7843 14 10.2539V8.25391H26V10.2539C26 10.7843 26.2107 11.293 26.5858 11.6681C26.9609 12.0432 27.4696 12.2539 28 12.2539C28.5304 12.2539 29.0391 12.0432 29.4142 11.6681C29.7893 11.293 30 10.7843 30 10.2539V8.25391H34C34.5304 8.25391 35.0391 8.46462 35.4142 8.83969C35.7893 9.21477 36 9.72347 36 10.2539V16.2539Z"
      fill={fill}
    />
  </svg>
);

const SidebarProfileIcon: SidebarIconComponent = ({ stroke }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29.4168 36.5039V32.6706C29.4168 30.6372 28.6091 28.6872 27.1713 27.2494C25.7335 25.8116 23.7835 25.0039 21.7502 25.0039H10.2502C8.21684 25.0039 6.26679 25.8116 4.82901 27.2494C3.39123 28.6872 2.5835 30.6372 2.5835 32.6706V36.5039"
      stroke={stroke}
      strokeWidth="3.83333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0002 17.3372C20.2343 17.3372 23.6668 13.9048 23.6668 9.67057C23.6668 5.43639 20.2343 2.00391 16.0002 2.00391C11.766 2.00391 8.3335 5.43639 8.3335 9.67057C8.3335 13.9048 11.766 17.3372 16.0002 17.3372Z"
      stroke={stroke}
      strokeWidth="3.83333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default function JapaneseFoodApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [hoveredNav, setHoveredNav] = useState<SidebarNavKey | null>(null);
  const [monthlyBudget, setMonthlyBudget] = useState(7500);
  const [cartItems, setCartItems] = useState<Product[]>([
  {
    id: 1,
    name: "トップリブ 特製",
    description: "ナンバー 260g",
    price: 350,
    image: "/images/food-item.jpg",
    quantity: 1
  },
  {
    id: 2,
    name: "ビーフステーキ",
    description: "プレミアム 300g",
    price: 450,
    image: "/images/food-item.jpg",
    quantity: 1
  },
  {
    id: 3,
    name: "チキンカツ",
    description: "ジューシー 200g",
    price: 280,
    image: "/images/food-item.jpg",
    quantity: 1
  }]
  );
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const topButtonIconSize = 126;

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
    items.
    map((item) =>
    item.id === id ?
    { ...item, quantity: Math.max(0, item.quantity + change) } :
    item
    ).
    filter((item) => item.quantity > 0)
    );
  };

  const updateProductQuantity = (id: number, change: number) => {
    setProducts((items) =>
    items.map((item) =>
    item.id === id ?
    { ...item, quantity: Math.max(1, item.quantity + change) } :
    item
    )
    );
  };

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        return items.map((item) =>
        item.id === product.id ?
        { ...item, quantity: item.quantity + product.quantity } :
        item
        );
      } else {
        return [...items, { ...product }];
      }
    });
  };

  const Sidebar = () => {
    const renderSidebarButton = (
      key: SidebarNavKey,
      label: string,
      Icon: SidebarIconComponent,
      dataOid: string,
      onClick?: () => void
    ) => {
      const isActive = key !== "subscription" && currentScreen === key;
      const isHovered = hoveredNav === key;
      const showHighlight = isActive || isHovered;
      const highlightOpacity = isActive ? 1 : isHovered ? 0.4 : 0;
      const iconFill = isActive ? "#209fde" : "#ffffff";
      const iconStroke = isActive ? "#209fde" : "#ffffff";

      return (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          className="w-full flex justify-end px-0 py-0 bg-transparent hover:bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{ height: "99.27px" }}
          onMouseEnter={() => setHoveredNav(key)}
          onMouseLeave={() => setHoveredNav(null)}
          onClick={onClick}
          data-oid={dataOid}>

          <span
            className="flex items-center justify-end"
            style={{
              width: "100%",
              height: "99.27px",
              flexShrink: 0
            }}>

            <span
              className="flex items-center relative"
              style={{
                width: "192px",
                height: "99.27px",
                flexShrink: 0,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "right center",
                justifyContent: "flex-start",
                paddingLeft: "20px",
                gap: "12px",
                transform: "translateX(1px)"
              }}>

              <span
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: showHighlight ? SIDEBAR_ACTIVE_BG : "none",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                opacity: highlightOpacity,
                pointerEvents: "none",
                zIndex: 0
              }}>
              </span>

              <span style={{ ...SIDEBAR_ICON_STYLE, position: "relative", zIndex: 1 }}>
                <Icon fill={iconFill} stroke={iconStroke} />
              </span>
              <span
              className="text-xs font-medium"
              style={{
                ...SIDEBAR_LABEL_BASE_STYLE,
                ...(isActive ? SIDEBAR_LABEL_SELECTED_STYLE : {}),
                color: isActive ? "#101010" : "#ffffff",
                position: "relative",
                zIndex: 1
              }}>
                {label}
              </span>
            </span>
          </span>
        </Button>
      );
    };

    return (
      <div
        className="w-[232px] bg-[#fda900] flex flex-col items-center py-6 space-y-8 fixed left-0 top-0 h-full z-10 rounded-tr-[20px] rounded-br-[20px]"
        data-oid="ehf5pv5">

        {/* Logo Section */}
        <div className="flex flex-col items-center" data-oid="pm140hy">
          <img
          src="/images/logo_kaitasu.png"
          alt="かいたす"
          className="h-[72px] w-[72px]"
          data-oid="kaitasu-logo" />
        </div>

        <nav className="w-full flex flex-col items-end space-y-2 pr-0" data-oid="bglg0.p">
          {renderSidebarButton("dashboard", "ホーム", SidebarHomeIcon, "lqzeqpl", () => setCurrentScreen("dashboard"))}
          {renderSidebarButton("catalog", "買い出し", SidebarCatalogIcon, "iu4097_", () => setCurrentScreen("catalog"))}
          {renderSidebarButton("cart", "買い物かご", SidebarCartIcon, "1yqj0f6", () => setCurrentScreen("cart"))}
          {renderSidebarButton("history", "購入履歴", SidebarHistoryIcon, "rzbvl29", () => setCurrentScreen("history"))}
          {renderSidebarButton("subscription", "定期購入", SidebarSubscriptionIcon, "sub-btn-1")}
          {renderSidebarButton("profile", "マイページ", SidebarProfileIcon, "jyqaqbq", () => setCurrentScreen("profile"))}
        </nav>
      </div>
    );
  };


  const Dashboard = () =>
  <div
    className="flex-1 bg-white p-6 ml-[232px] min-h-screen"
    data-oid="ysuosjy">

      <div
      className="mx-auto w-[903px] space-y-4"
      data-oid=":xr07ip">

        {/* Notification Card */}
        <Card
        className="w-[903px] p-4"
        style={{
          borderRadius: "14.469px",
          border: "5px solid var(--primary, #FDA900)",
          background: "var(--card, #FFF)"
        }}
        data-oid="2bp9lo4">

          <h3
          className="text-center font-medium mb-3 text-sm"
          data-oid="aek175l">

            お知らせ
          </h3>
          <div className="h-12 bg-[#adadad] rounded" data-oid="v_esgva"></div>
        </Card>

        {/* Budget Card */}
        <Card
        className="w-[903px] p-4"
        style={{
          borderRadius: "14.469px",
          border: "5px solid var(--primary, #FDA900)",
          background: "var(--card, #FFF)"
        }}
        data-oid="t2fyzfc">

          <div
          className="flex justify-between items-end mb-2"
          data-oid=":be0a2k">

            <span className="text-sm font-medium" data-oid=":6v2jl-">
              今月の予算 ▶
            </span>
            <div className="flex items-baseline gap-2" data-oid="qq2w-88">
              <span className="font-bold text-lg">残り</span>
              <span className="font-bold text-[36px] leading-none">
                ¥{monthlyBudget.toLocaleString("ja-JP")}
              </span>
            </div>
          </div>
          <div className="text-xs text-[#adadad] mb-2" data-oid="woecoz3">
            今月の支出　¥12,500
          </div>
          <div
          className="w-full bg-[#adadad] rounded-full h-[34px] mb-1"
          data-oid="pk6di4e">

            <div
            className="bg-[#209fde] h-[34px] rounded-full"
            style={{ width: "60%" }}
            data-oid="5_0shjj">
          </div>
          </div>
          <div className="text-xs text-right text-[#209fde]" data-oid="6x91r4a">
            使用率: 60%
          </div>
        </Card>

        <div className="mx-auto flex justify-center gap-[61px] w-[903px]" data-oid="ta8f1it">
          <Button
          variant="outline"
          className="w-[180px] h-[180px] text-center border-[5px] border-[#fda900] bg-white hover:bg-gray-50 rounded-[20px] flex-col px-6 pb-6 pt-[17px] relative"
          style={{
            filter: "drop-shadow(4.5px 4.5px 0 #E4E2E2)"
          }}
          onClick={() => setCurrentScreen("catalog")}
          data-oid="6g1e2.x">

            <div className="flex h-[145px] flex-col items-center justify-between">
              <span
              className="text-[#101010] font-['BIZ_UDPGothic'] text-[20px] font-bold leading-normal"
              data-oid="1417ieu">

                買い出し
              </span>
              <div className="flex w-full justify-center">
                <div style={{ width: "126px", height: "126px" }}>
                  <SidebarCatalogIcon fill="#209fde" stroke="#209fde" />
                </div>
              </div>
            </div>
          </Button>
          <Button
          variant="outline"
          className="w-[180px] h-[180px] text-center border-[5px] border-[#fda900] bg-white hover:bg-gray-50 rounded-[20px] flex-col px-6 pb-6 pt-[17px] relative"
          style={{
            filter: "drop-shadow(4.5px 4.5px 0 #E4E2E2)"
          }}
          onClick={() => setCurrentScreen("catalog")}
          data-oid="eljule7">

            <div className="flex h-[145px] flex-col items-center justify-between">
              <span
              className="text-[#101010] font-['BIZ_UDPGothic'] text-[20px] font-bold leading-normal"
              data-oid="_8lynit">

                定期購入の確認
              </span>

              <div className="flex w-full justify-center">
                <div style={{ width: "110px", height: "110px", padding: "10px" }}>
                  <SidebarSubscriptionIcon fill="#209fde" stroke="#209fde" />
                </div>
              </div>
            </div>
          </Button>
          <Button
          variant="outline"
          className="w-[180px] h-[180px] text-center border-[5px] border-[#fda900] bg-white hover:bg-gray-50 rounded-[20px] flex-col px-6 pb-6 pt-[17px] relative"
          style={{
            filter: "drop-shadow(4.5px 4.5px 0 #E4E2E2)"
          }}
          onClick={() => setCurrentScreen("history")}
          data-oid="vhz4ae4">

            <div className="flex h-[145px] flex-col items-center justify-between">
              <span
              className="text-[#101010] font-['BIZ_UDPGothic'] text-[20px] font-bold leading-normal"
              data-oid="pu-k0wb">

                購入履歴
              </span>

              <div className="flex w-full justify-center">
                <div style={{ width: "91px", height: "91px" }}>
                  <SidebarHistoryIcon fill="#209fde" stroke="#209fde" />
                </div>
              </div>
            </div>
          </Button>
          <Button
          variant="outline"
          className="w-[180px] h-[180px] text-center border-[5px] border-[#fda900] bg-white hover:bg-gray-50 rounded-[20px] flex-col px-6 pb-6 pt-[17px] relative"
          style={{
            filter: "drop-shadow(4.5px 4.5px 0 #E4E2E2)"
          }}
          onClick={() => setCurrentScreen("profile")}
          data-oid="oodndhw">

            <div className="flex h-[145px] flex-col items-center justify-between">
              <span
              className="text-[#101010] font-['BIZ_UDPGothic'] text-[20px] font-bold leading-normal"
              data-oid="5s21wmk">

                マイページ
              </span>

              <div className="flex w-full justify-center">
                <div
                style={{
                  width: "65.386px",
                  height: "84.068px",
                  flexShrink: 0
                }}>
                  <SidebarProfileIcon fill="#209fde" stroke="#209fde" />
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>;


  const Catalog = () =>
  <div
    className="flex-1 bg-white p-6 ml-[232px] relative min-h-screen"
    data-oid="d95y1m5">

      <div
      className="absolute right-0 top-0 bottom-0 w-1 bg-[#fda900]"
      data-oid="kh0_yce">
    </div>

      <div className="max-w-4xl mx-auto" data-oid="psedc55">
        <div className="relative mb-6" data-oid="gfk0oa_">
          <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#adadad]"
          size={18}
          data-oid="wum_nxs" />


          <Input
          placeholder="商品名で検索"
          className="pl-12 h-12 border-2 border-[#209fde] text-sm rounded-lg bg-white shadow-sm focus:border-[#209fde] focus:ring-2 focus:ring-[#209fde]/20"
          data-oid="fsk2zzr" />

        </div>

        <div className="flex gap-[25px] mb-6" data-oid="br-d9o3">
          <Button
          variant="ghost"
          className="border border-transparent p-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "max-content",
            minWidth: "160px",
            height: "60px",
            padding: "0 24px",
            flexShrink: 0,
            borderRadius: "20px",
            border: "2px solid var(--, #FDA900)",
            background: "var(--, #FFF)",
            boxShadow: "4.5px 4.5px 0 0 #E4E2E2"
          }}
          data-oid=".zvc9j.">

            <span
            style={{
              color: "var(--, #101010)",
              fontFamily: '"BIZ UDPGothic"',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "1.664px"
            }}
            data-oid="btn-text-health">

              健康重視
            </span>
          </Button>
          <Button
          variant="ghost"
          className="border border-transparent p-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "max-content",
            minWidth: "160px",
            height: "60px",
            padding: "0 24px",
            flexShrink: 0,
            borderRadius: "20px",
            border: "2px solid var(--, #FDA900)",
            background: "var(--, #FFF)",
            boxShadow: "4.5px 4.5px 0 0 #E4E2E2"
          }}
          data-oid="jm:hia2">

            <span
            style={{
              color: "var(--, #101010)",
              fontFamily: '"BIZ UDPGothic"',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "1.664px"
            }}
            data-oid="btn-text-favorite">

              お気に入り
            </span>
          </Button>
          <Button
          variant="ghost"
          className="border border-transparent p-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "max-content",
            minWidth: "160px",
            height: "60px",
            padding: "0 24px",
            flexShrink: 0,
            borderRadius: "20px",
            border: "2px solid var(--, #FDA900)",
            background: "var(--, #FFF)",
            boxShadow: "4.5px 4.5px 0 0 #E4E2E2"
          }}
          data-oid="oxpz50q">

            <span
            style={{
              color: "var(--, #101010)",
              fontFamily: '"BIZ UDPGothic"',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "1.664px"
            }}
            data-oid="btn-text-price">

              価格順
            </span>
          </Button>
          <Button
          variant="ghost"
          className="border border-transparent p-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "max-content",
            minWidth: "160px",
            height: "60px",
            padding: "0 24px",
            flexShrink: 0,
            borderRadius: "20px",
            border: "2px solid var(--, #FDA900)",
            background: "var(--, #FFF)",
            boxShadow: "4.5px 4.5px 0 0 #E4E2E2"
          }}
          data-oid="apgxdwh">

            <span
            style={{
              color: "var(--, #101010)",
              fontFamily: '"BIZ UDPGothic"',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "1.664px"
            }}
            data-oid="btn-text-subscription">

              定期購入
            </span>
          </Button>
        </div>

        <div className="flex justify-center gap-[25px] mb-6" data-oid="uy6_dcp">
          {[1, 2, 3, 4, 5].map((num) => {
            const isActive = num === 1;
            return (
              <Button
                key={num}
                size="sm"
                variant="ghost"
                className="border border-transparent p-0"
                style={{
                  display: "flex",
                  width: "60px",
                  height: "60px",
                  padding: "14px 19px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                  borderRadius: "20px",
                  background: isActive ? "var(--, #FDA900)" : "var(--, #FFF)",
                  backgroundColor: isActive ? "#FDA900" : "#FFF",
                  boxShadow: isActive ?
                    "0 4px 4px 0 rgba(0, 0, 0, 0.25) inset" :
                    "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                  color: "var(--, #101010)",
                  fontFamily: '"BIZ UDPGothic"',
                  fontSize: "32px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  letterSpacing: "1.664px"
                }}
                data-oid="9r7o0ii">

                  {num}
                </Button>
            );
          })}
          <span className="text-sm self-center font-medium" data-oid="xd09rri">
            ...
          </span>
          <Button
          size="sm"
          variant="ghost"
          className="border border-transparent p-0"
          style={{
            display: "flex",
            width: "60px",
            height: "60px",
            padding: "14px 19px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "20px",
            background: "var(--, #FFF)",
            backgroundColor: "#FFF",
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            color: "var(--, #101010)",
            fontFamily: '"BIZ UDPGothic"',
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            letterSpacing: "1.664px"
          }}
          data-oid="f8qlkjv">

            15
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6" data-oid="h7qwqv1">
          {products.map((product) =>
        <Card
          key={product.id}
          className="p-4 bg-white border-2 border-[#e0e0e0] rounded-xl shadow-sm hover:shadow-md transition-shadow"
          data-oid="3w-11ql">

              <div className="relative mb-3" data-oid="8gipz64">
                <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg"
              data-oid="q.-_y:_" />


                <Heart
              className="absolute top-2 right-2 text-[#209fde] fill-[#209fde]"
              size={18}
              data-oid="eo3z5j5" />

              </div>
              <h4 className="text-sm font-bold mb-1" data-oid="d:mf1eo">
                {product.name}
              </h4>
              <p className="text-xs text-[#adadad] mb-3" data-oid="ms.1o9h">
                {product.description}
              </p>
              <div
            className="flex justify-between items-center"
            data-oid="r7z2qp8">

                <span
              className="font-bold text-base text-[#209fde]"
              data-oid="eq4gt6a">

                  ¥{product.price}
                </span>
                <div className="flex items-center gap-2" data-oid="4z4g4a-">
                  <Button
                size="icon"
                variant="outline"
                className="w-7 h-7 border-2 border-[#209fde] rounded-md bg-white hover:bg-[#209fde]/10"
                onClick={() => updateProductQuantity(product.id, -1)}
                data-oid="les5kg0">

                    <Minus
                  size={12}
                  className="text-[#209fde]"
                  data-oid="d7ycg-q" />

                  </Button>
                  <span
                className="text-sm w-6 text-center font-medium"
                data-oid="f1loo1.">

                    {product.quantity}
                  </span>
                  <Button
                size="icon"
                variant="outline"
                className="w-7 h-7 border-2 border-[#209fde] rounded-md bg-white hover:bg-[#209fde]/10"
                onClick={() => updateProductQuantity(product.id, 1)}
                data-oid=":--ycbg">

                    <Plus
                  size={12}
                  className="text-[#209fde]"
                  data-oid="olbxiee" />

                  </Button>
                </div>
              </div>
            </Card>
        )}
        </div>

        {/* Cart Summary */}
        <div
        className="flex justify-between items-center bg-[#fda900] text-white p-4 rounded-xl border-2 border-[#fda900] shadow-md"
        data-oid="t2ub1nx">

          <span className="text-base font-bold" data-oid="5rigjnl">
            {cartItems.length}点 ¥
            {cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
          </span>
          <Button
          className="bg-white text-[#fda900] text-base font-bold px-8 h-11 border-2 border-white rounded-lg hover:bg-gray-50 shadow-sm"
          onClick={() => setCurrentScreen("cart")}
          data-oid="b9c3xju">

            購入
          </Button>
        </div>
      </div>
    </div>;


  const Cart = () =>
  <div className="flex-1 bg-white p-6 ml-[232px]" data-oid="qie1-gm">
      <div className="max-w-sm mx-auto" data-oid="-j93.-d">
        <h2 className="text-base font-bold mb-4" data-oid="gdwztq6">
          買い物かご
        </h2>

        <div className="space-y-3 mb-6" data-oid=":2r1yrd">
          {cartItems.map((item, index) =>
        <Card
          key={item.id}
          className="p-3 bg-white border-2 border-gray-200 rounded-lg"
          data-oid="5rgf5dd">

              <div className="flex items-center gap-3" data-oid=".a7yvq5">
                <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
              data-oid="b0g5711" />


                <div className="flex-1" data-oid="yd66:be">
                  <h4 className="text-sm font-medium" data-oid="5tlgvsv">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#adadad]" data-oid="_b89cis">
                    {item.description}
                  </p>
                </div>
                <div className="text-right" data-oid="f:g9-vr">
                  <div className="text-xs mb-1" data-oid="3_9wxay">
                    数量
                  </div>
                  <div className="flex items-center gap-1" data-oid="zdp13dt">
                    <Button
                  size="icon"
                  variant="outline"
                  className="w-5 h-5 border border-gray-300 rounded bg-transparent"
                  onClick={() => updateQuantity(item.id, -1)}
                  data-oid="g4qqy_k">

                      <Minus size={10} data-oid="2h.nwkc" />
                    </Button>
                    <span
                  className="text-xs w-4 text-center"
                  data-oid="weymacu">

                      {item.quantity}
                    </span>
                    <Button
                  size="icon"
                  variant="outline"
                  className="w-5 h-5 border border-gray-300 rounded bg-transparent"
                  onClick={() => updateQuantity(item.id, 1)}
                  data-oid="4kc4n3t">

                      <Plus size={10} data-oid=".gef-yq" />
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
        )}
        </div>

        <div
        className="border-t-2 border-gray-200 pt-4 mb-6"
        data-oid="lx.9fs:">

          <div
          className="flex justify-between text-base font-bold"
          data-oid="e-466ve">

            <span data-oid="qr0:wva">合計 {cartItems.length}点</span>
            <span data-oid="5tmrc4s">
              ¥
              {cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
            </span>
          </div>
        </div>

        <div className="flex gap-3" data-oid="ufdhcq:">
          <Button
          variant="outline"
          className="flex-1 text-sm border-2 border-[#fda900] text-[#fda900] rounded-md bg-transparent"
          onClick={() => setCurrentScreen("order")}
          data-oid="8i_h.o.">

            注文確認
          </Button>
          <Button
          className="flex-1 bg-[#fda900] text-sm border-2 border-[#fda900] rounded-md hover:bg-[#fda900]/90"
          onClick={() => setCurrentScreen("catalog")}
          data-oid="mgchczd">

            買い物を続ける
          </Button>
        </div>
      </div>
    </div>;


  const Order = () =>
  <div className="flex-1 bg-white p-6 ml-[232px]" data-oid="syv6qb8">
      <div className="max-w-sm mx-auto" data-oid="9cyq3uk">
        <h2 className="text-base font-bold mb-4" data-oid="ycsxz70">
          注文確認
        </h2>

        {/* Delivery Address */}
        <Card
        className="p-4 mb-4 bg-white border-2 border-[#fda900] rounded-lg"
        data-oid="jk:2_ry">

          <div className="flex items-start justify-between" data-oid="ih9dsxw">
            <div data-oid="r6l2mt0">
              <h3
              className="font-medium mb-2 text-sm flex items-center"
              data-oid="fp4z1m-">

                <span className="mr-2" data-oid="qyv7-tr">
                  📍
                </span>
                配達先
              </h3>
              <p className="text-sm" data-oid="itribae">
                徳島県鳴門市○○○
              </p>
              <p className="text-sm" data-oid=".5ob1_r">
                西口○○
              </p>
            </div>
            <Button
            size="sm"
            className="bg-[#fda900] text-white text-xs border-2 border-[#fda900] rounded-md hover:bg-[#fda900]/90"
            data-oid="5zhtpvt">

              変更
            </Button>
          </div>
        </Card>

        {/* Order Summary */}
        <Card
        className="p-4 mb-4 bg-white border-2 border-[#fda900] rounded-lg"
        data-oid="8zvem9v">

          <div className="space-y-2" data-oid=":x26-uf">
            <div className="flex justify-between text-sm" data-oid="0qqfqwa">
              <span data-oid="s1w10pe">小計</span>
              <span data-oid="vizf-74">¥5,000</span>
            </div>
            <div className="flex justify-between text-sm" data-oid="u9:dvh7">
              <span data-oid="-7g8x72">配送料</span>
              <span data-oid="z4m-3lx">¥100</span>
            </div>
            <div
            className="border-t-2 border-gray-200 pt-2 flex justify-between font-bold text-sm"
            data-oid=".dfs9ab">

              <span data-oid="7b245_-">合計</span>
              <span data-oid="21xx5:h">¥5,100</span>
            </div>
          </div>
        </Card>

        {/* Delivery Schedule */}
        <Card
        className="p-4 mb-6 bg-white border-2 border-[#fda900] rounded-lg"
        data-oid="a13j9dc">

          <h3
          className="font-medium mb-2 text-sm flex items-center"
          data-oid="qfwuago">

            <span className="mr-2" data-oid="riz.ufg">
              📅
            </span>
            配達メモ
          </h3>
          <p className="text-sm" data-oid="zeyhnax">
            2025年 9月1日午後16:00
          </p>
          <p className="text-sm" data-oid=":zrymkx">
            ご注文予定
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3" data-oid="nz7v1jm">
          <Button
          variant="outline"
          className="flex-1 text-sm border-2 border-[#fda900] text-[#fda900] rounded-md bg-transparent"
          onClick={() => setCurrentScreen("cart")}
          data-oid="-fxs0ta">

            かごに戻る
          </Button>
          <Button
          className="flex-1 bg-[#fda900] text-white text-sm border-2 border-[#fda900] rounded-md hover:bg-[#fda900]/90"
          data-oid="khc3gs1">

            注文を確定してサイトへ
          </Button>
        </div>
      </div>
    </div>;


  const History = () =>
  <div className="flex-1 bg-white p-6 ml-[232px]" data-oid="n3s1kmy">
      <div className="max-w-sm mx-auto" data-oid="me-dwvn">
        <h2 className="text-base font-bold mb-4" data-oid="x::kret">
          購入履歴
        </h2>

        <div className="space-y-3" data-oid="4c1ea9l">
          {Array.from({ length: 6 }).map((_, i) =>
        <Card
          key={i}
          className="p-3 bg-white border-2 border-gray-200 rounded-lg"
          data-oid="giqzpfm">

              <div className="flex items-center gap-3" data-oid="jlp_i_y">
                <div className="text-xs" data-oid="jflct6b">
                  <div data-oid="mtapic7">2025年</div>
                  <div data-oid="op7puzz">9月1日</div>
                </div>
                <img
              src="/images/food-item.jpg"
              alt="トップリブ 特製"
              className="w-12 h-12 object-cover rounded"
              data-oid="wur3l8e" />


                <div className="flex-1" data-oid="kmj3p4f">
                  <h4 className="text-sm font-medium" data-oid="uwyj:6y">
                    トップバリュ 特製
                  </h4>
                  <p className="text-xs text-[#adadad]" data-oid="p5nlqyv">
                    ナンバー 260g
                  </p>
                  <Badge
                variant="secondary"
                className="text-xs border border-gray-300 rounded"
                data-oid="_ne7wd0">

                    お気に入りに追加
                  </Badge>
                </div>
                <div className="text-right" data-oid="t6t6kx-">
                  <div className="text-xs" data-oid="9d22m2g">
                    1コ
                  </div>
                  <div className="font-bold text-sm" data-oid="8yen38r">
                    ¥350
                  </div>
                </div>
              </div>
            </Card>
        )}
        </div>
      </div>
    </div>;


  const Profile = () =>
  <div className="flex-1 bg-white p-6 ml-[232px]" data-oid="3pchgx4">
      <div className="max-w-sm mx-auto space-y-4" data-oid=":530dgu">
        <h2 className="text-base font-bold" data-oid="0a9t2n.">
          マイページ
        </h2>

        <Card
        className="p-4 bg-white border-2 border-gray-200 rounded-lg"
        data-oid="6:a7mk2">

          <div className="flex items-center gap-3" data-oid="mhd5qso">
            <div
            className="w-12 h-12 bg-[#adadad] rounded-full"
            data-oid="v96ohmr">
          </div>
            <div data-oid="w32:5lp">
              <h3 className="font-medium text-sm" data-oid="2y3hjo1">
                水口 和佳さん
              </h3>
              <Button
              size="sm"
              variant="outline"
              className="text-xs border-2 border-gray-300 rounded-md bg-transparent"
              data-oid="541gvwr">

                名前を変更
              </Button>
            </div>
          </div>
        </Card>

        <Card
        className="p-4 bg-white border-2 border-gray-200 rounded-lg"
        data-oid="o4a2j0u">

          <h3 className="font-medium mb-3 text-sm" data-oid="xkxxiap">
            予算設定
          </h3>
          <div className="space-y-3" data-oid="prr6v6o">
            <div data-oid="zve5:m0">
              <label className="text-sm block mb-1" data-oid="d68qzu_">
                今月の予算
              </label>
              <div className="flex items-center gap-2" data-oid="lirbdor">
                <span className="text-sm" data-oid="zr1baos">
                  ¥
                </span>
                <Input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="flex-1 text-sm border-2 border-gray-300 rounded-md"
                data-oid="_x89egx" />

              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;


  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard data-oid="ylfph:g" />;
      case "catalog":
        return <Catalog data-oid="wcl4:a0" />;
      case "cart":
        return <Cart data-oid="13gj:ol" />;
      case "order":
        return <Order data-oid="h1.bjtn" />;
      case "history":
        return <History data-oid="3.1vred" />;
      case "profile":
        return <Profile data-oid="faqj1gy" />;
      default:
        return <Dashboard data-oid="fntgw1v" />;
    }
  };

  return (
    <div className="h-screen bg-white" data-oid="i339shy">
      <Sidebar data-oid="7_f:5ci" />
      {renderScreen()}
    </div>);

}
