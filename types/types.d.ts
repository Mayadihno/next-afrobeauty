type NavItem = {
  id: string;
  label: string;
  link: string;
  icon?: string;
};

type LoginProp = {
  password: string;
  email: string;
};

type RegisterProp = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ProductProp = {
  id: number;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  weight?: number;
  seller?: string;
  category?: string;
  stock?: string;
  qty: number;
  brand?: string;
};

// types.ts
export interface Image {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
  blurWidth: number;
  blurHeight: number;
}

export interface CartItem {
  id: number;
  category: string;
  title: string;
  price: number;
  image: Image;
  brand: string;
  Weight: string;
  sellerId: string;
  qty: number;
}

export interface PaymentInfo {
  type: string;
}

export interface ShippingFee {
  shippingCompany: string;
  shippingPrice: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  companyName: string;
  country: string;
  state: string;
}

export interface Order {
  paymentInfo: PaymentInfo;
  _id: string;
  cartItems: CartItem[];
  shippingFee: ShippingFee;
  userData: UserData;
  totalPrice: number;
  status: string;
  paidAt: string;
  createdAt: string;
  __v: number;
}
