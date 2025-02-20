import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-primary text-white p-4 flex md:justify-center items-center">
      <div className="flex justify-between items-center gap-6">
        {/* profile Picture */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/YWJ2WV6/IMG-20220606-171523-01.jpg"
            alt="profile picture"
            className="w-[80px] h-[80px] rounded-full object-cover"
          />

          <div className="p-[2px] bg-white absolute top-[60px] right-2 rounded-full">
            <div className="w-[16px] h-[16px] rounded-full bg-green-400 "></div>
          </div>
        </div>
        {/* profile content */}
        <div>
          <h3 className="text-2xl font-semibold">Md. Arif Hassan</h3>
          <p className="text-sm text-gray-200 italic">
            Hey, Welcome to your Planning!
          </p>
        </div>
        {/* Action Button */}
        <details className="dropdown dropdown-end  absolute right-2 md:right-24">
          <summary className="btn m-1">
            <GiHamburgerMenu />
          </summary>
          <ul className="menu dropdown-content bg-white text-primary rounded-box z-[1] w-32 p-2 shadow">
            <Link>Login</Link>
            <Link>Register</Link>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;
