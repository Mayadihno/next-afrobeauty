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
