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
