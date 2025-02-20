import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import authContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(authContext);

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="bg-primary text-white p-4 flex md:justify-center items-center">
      <div className="flex justify-between items-center gap-6">
        {/* profile Picture */}
        {user && (
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="profile picture"
              className="w-[80px] h-[80px] rounded-full object-cover"
            />

            <div className="p-[2px] bg-white absolute top-[60px] right-2 rounded-full">
              <div className="w-[16px] h-[16px] rounded-full bg-green-400 "></div>
            </div>
          </div>
        )}

        {/* profile content */}
        <div>
          <h3 className="text-2xl font-semibold">{user?.displayName}</h3>
          <p className="text-sm text-gray-200 italic">
            Hey, Welcome to your Planning!
          </p>
        </div>
        {/* Action Button */}
        <details className="dropdown dropdown-end  absolute right-2 md:right-24">
          <summary className="btn m-1">
            <GiHamburgerMenu />
          </summary>
          <ul className="menu dropdown-content bg-white font-medium text-primary rounded-box z-[1] w-32 p-2 shadow">
            {user ? (
              <Link className="ml-2" onClick={handleLogout}>
                LogOut
              </Link>
            ) : (
              <Link className="ml-2" to="login">
                Login
              </Link>
            )}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;
