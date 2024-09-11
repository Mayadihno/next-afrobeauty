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

export interface Image {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
  blurWidth: number;
  blurHeight: number;
}

export interface SellerProp {
  sellerId?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  shopName: string;
  country?: string;
  state?: string;
  image?: File;
  password: string;
  confirmPassword: string;
  accountType: string;
}

export interface CartItem {
  id: number;
  category: string;
  title: string;
  name?: string;
  price: number;
  image: Image;
  brand: string;
  Weight: string;
  sellerId: string;
  qty: number;
  gender?: string;
  size?: string;
  colors?: { label: string; value: string };
  processingTime?: { label: string; value: string };
}

export interface PaymentInfo {
  type: string;
  value?: string;
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

export interface IFormInput {
  name: string;
  description: string;
  size: string[];
  gender: string;
  image: FileList | null;
  colors: { label: string; value: string }[];
  discountPrice: number;
  price: number;
  quantity: number;
  processingTime: { label: string; value: string };
  category: { label: string; value: string }[];
  subcategory: { label: string; value: string }[];
}

export interface Shop {
  _id: string;
  shopName: string;
  fullName: string;
  email: string;
  shopAddress: string;
  image?: string;
  description?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: { label: string; value: string }[];
  subcategory: { label: string; value: string }[];
  colors: { label: string; value: string }[];
  createdAt: string;
  discountPrice: number;
  gender: string;
  image: string[];
  isAvailable: boolean;
  price: number;
  processingTime: { label: string; value: string };
  quantity: number;
  reviews: any[];
  shop: Shop;
  shopId: string;
  sizes: string[];
  sold_out: number;
  updatedAt: string;
  __v: number;
}

export interface UserProductResponse {
  products: Product[];
  totalPages: number;
  totalProducts: number;
}

export interface ProductResponse {
  limit: number;
  page: number;
  products: Product[];
  total: number;
  totalPages: number;
}
