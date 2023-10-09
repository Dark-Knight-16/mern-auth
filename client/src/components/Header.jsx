import { Link, NavLink } from "react-router-dom";
import { BarIcon } from "./BarIcon";
import { CrossIcon } from "./CrossIcon";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

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


  // signout
  const handleSignOut = async () => {
    try{
      await fetch('/api/auth/sign-out')
      dispatch(signOut())
      navigate('/sign-in')
    }
    catch(err){
      console.log(err)
    }
  }


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
            : "hidden lg:flex lg:gap-5"
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

          {currentUser ? (
            <li className="p-2 text-white bg-red-500 rounded-md" onClick={handleSignOut}>
              <NavLink to={"/sign-out"}>Sign Out</NavLink>
            </li>
          ) : (
            <li className="p-2 text-white bg-green-500 rounded-md">
              <NavLink to={"/sign-in"}>Sign In</NavLink>
            </li>
          )}
        </ul>
        {currentUser && (
          <img
            className="hidden lg:block lg:w-[50px] lg:h-[50px] lg:rounded-[50%] lg:cursor-pointer"
            src={currentUser.user.profilePicture}
            alt={currentUser.user.username}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
