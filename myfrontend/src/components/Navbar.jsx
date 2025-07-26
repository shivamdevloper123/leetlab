import { Link } from "react-router-dom";
import { Code, LogOut, User, HomeIcon, Contact2 } from "lucide-react";
import ThemeToggle from "./Themetoggle";
import LogoutButton from "./LogoutButton";
import { getAvatarStyle } from "./getAvtarStyle";
import { useRef } from "react";

const Navbar = ({ authUser }) => {
  const { color, char, fullName } = getAvatarStyle(authUser?.name);

  // Inside your component
  const dropdownRef = useRef(null);

  const handleCloseDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.checked = false;
    }
  };

  return (

    <nav className="navbar bg-base-200/80 text-base-content shadow-sm top-0 mt-2 mb-5 sticky z-50 rounded-3xl backdrop-blur-md">
      {/* Left */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <img src="/vite.png" alt="logo" className="h-12 w-12 rounded-full" />
        </Link>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* mobile menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 bg-base-100 rounded-box shadow"
          >
            <li>
              <Link to="/" className="text-sm">
                <HomeIcon className="w-3 h-3 " />
                Home
              </Link>
            </li>
            <li>
              <Link to="/problem" className="text-sm">
                <Code className="w-3 h-3 " />
                Problem
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm">
                <Contact2 className="w-3 h-3 " />
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1  flex gap-16 justify-center ">
          <li>
            <Link to="/" className="text-sm">
              <HomeIcon className="w-3 h-3 " />
              Home
            </Link>
          </li>
          <li>
            <Link to="/problem" className="text-sm">
              <Code className="w-3 h-3 " />
              Problem
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-sm">
              <Contact2 className="w-3 h-3 " />
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        <ThemeToggle />

        {authUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              htmlFor="dropdown-toggle"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-2xl font-bold uppercase text-white ${color}`}
              >
                {char}
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <>
                <li>
                  <p className="text-base font-semibold">{fullName}</p>
                  <hr className="border-gray-300/50" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-sm"
                    onClick={handleCloseDropdown}
                  >
                    <User className="w-4 h-4 mr-2" /> My Profile
                  </Link>
                </li>
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="text-sm"
                      onClick={handleCloseDropdown}
                    >
                      <Code className="w-4 h-4 mr-2" /> Add Problem
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton
                  
                    className="text-sm  hover:bg-primary hover:text-white"
                    onClick={handleCloseDropdown}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                     Logout
                  </LogoutButton >
                </li>
              </>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>

  );
};

export default Navbar;

