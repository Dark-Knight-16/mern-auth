import { Link, NavLink } from "react-router-dom";
import { BarIcon } from "./BarIcon";
import { CrossIcon } from "./CrossIcon";
import { useState, useEffect } from "react";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth >= 1024) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  return (
    <header className="flex justify-between items-center px-5 py-5 bg-lime-200 lg:py-5 lg:px-20">
      <div className="text-2xl font-semibold text-violet-600 lg:text-3xl">
        <Link to={"/"}>
          <h1>Auth Project</h1>
        </Link>
      </div>

      <div className="flex justify-center items-center text-violet-600 cursor-pointer lg:hidden">
        <button onClick={handleClick}>{toggleMenu ? "" : <BarIcon />}</button>
      </div>

      <nav
        className={`${
          toggleMenu
            ? "block absolute top-0 right-0 left-0 pt-40 h-full bg-lime-200"
            : "hidden lg:block"
        }`}
      >
        <ul
          className={`flex text-violet-600 ${
            toggleMenu
              ? "flex-col gap-8 justify-center items-center"
              : "gap-10 items-center font-medium"
          }`}
        >
          {toggleMenu && (
            <li className="flex absolute top-5 right-5 justify-center items-center">
              <button onClick={handleClick}>
                <CrossIcon />
              </button>
            </li>
          )}
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
          <li className="p-2 text-white bg-green-500 rounded-md">
            <NavLink to={"/sign-in"}>Sign In</NavLink>
          </li>
          <li className="p-2 text-white bg-blue-500 rounded-md">
            <NavLink to={"/sign-up"}>Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
