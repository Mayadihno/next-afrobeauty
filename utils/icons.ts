import { FaFacebook, FaRegEyeSlash } from "react-icons/fa6";
import { FaInstagram, FaAngleDown } from "react-icons/fa";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import {
  MdClose,
  MdOutlineAddShoppingCart,
  MdOutlineMail,
  MdOutlineRemoveShoppingCart,
  MdDelete,
  MdAdd,
} from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import { IoLocationOutline, IoCall } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export const ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  search: CiSearch,
  down: FaAngleDown,
  heart: IoIosHeartEmpty,
  cart: SlHandbag,
  menu: CiMenuBurger,
  close: MdClose,
  naira: TbCurrencyNaira,
  addToCart: MdOutlineAddShoppingCart,
  eye: FiEye,
  location: IoLocationOutline,
  call: IoCall,
  message: MdOutlineMail,
  remove: MdOutlineRemoveShoppingCart,
  heartFilled: IoIosHeart,
  clear: TiDelete,
  delete: MdDelete,
  minus: LuMinus,
  add: MdAdd,
  eyelock: FaRegEyeSlash,
  gogogle: FcGoogle,
};
