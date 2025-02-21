import { TiHomeOutline } from "react-icons/ti";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 p-[14px] flex justify-around items-center fixed w-full bottom-0">
      <Link to="/">
        <TiHomeOutline size={25} />
      </Link>
      <BsPencilSquare size={25} />
      <Link to="/addTask" className="bg-primary text-white rounded-full p-2">
        <FaPlus size={25} />
      </Link>
      <LuMessageCircleMore size={25} />
      <button className="cursor-pointer">
        <CgProfile size={25} />
      </button>
    </div>
  );
};

export default Footer;
