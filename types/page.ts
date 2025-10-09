export type Screen =
  | "dashboard"
  | "catalog"
  | "catalogLanding"
  | "cart"
  | "order"
  | "history"
  | "profile"
  | "subscription"
  | "subscriptionAdd"
  | "subscriptionList";

export type SidebarNavKey = Screen | "subscription";

export type SidebarIconProps = {
  fill: string;
  stroke: string;
};

export type SidebarIconComponent = (props: SidebarIconProps) => JSX.Element;

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export type LandingCardContent = {
  title: string;
  renderIcon?: () => JSX.Element | null;
};

export type SubscriptionEntry = {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  frequencyDays: number;
};
