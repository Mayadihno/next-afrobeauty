import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaAngleDown } from "react-icons/fa";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import {
  MdClose,
  MdOutlineAddShoppingCart,
  MdOutlineMail,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import { IoLocationOutline, IoCall } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

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
};
