import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useToast } from "@chakra-ui/react";

function Navbar(props) {
  const cookies = new Cookies();
  const [message, setMessage] = useState(-1);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    setMessage(-1);
  }, [message]);

  const toast = useToast();

  function logout() {
    cookies.remove("authToken");
    setMessage(1);
    props.setLogin(false);
    props.setUser({ isAdmin: false });
    props.setToken("");
  }

  return (
    <nav className="bg-black text-white shadow mont p-1">
      {/* <nav className="bg-white shadow mont p-1 "> */}
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-0">
        <div>
          <div className="flex items-center justify-between   md:block">
            <img
              className="w-16 inline rounded-full"
              src="../logo.png"
              alt="Astronomy logo"
            />
            <span className="px-2  md:text-lg text-sm text-white">
              Ashlesha Astronomy Club
            </span>

            <div className="md:hidden ">
              <button
                className="p-2  rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className=" items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-center">
              <Link to="/">
                <li className=" hover:cursor-pointer md:my-auto mb-3 text-white  hover:text-blue-600 text-lg">
                  Home
                </li>
              </Link>
              <Link to="/blogs">
                <li className=" hover:cursor-pointer md:my-auto mb-3 text-white hover:text-blue-600 text-lg">
                  Blogs
                </li>
              </Link>
              <Link to="/resources">
              <li className=" hover:cursor-pointer md:my-auto mb-3 text-white hover:text-blue-600 text-lg">
                  Resources
                </li>
              </Link>
              <Link to="/team">
                <li className=" hover:cursor-pointer md:my-auto mb-3 text-white hover:text-blue-600 text-lg">
                  Team
                </li>
              </Link>
              {/* <Link to="/contact">
                <li className=" hover:cursor-pointer md:my-auto mb-3 text-white hover:text-blue-600 text-lg">
                  Contact Us
                </li>
              </Link> */}
              {props.user.isAdmin === true ? (
                <Link to="/dashboard">
                  <li className=" hover:cursor-pointer md:my-auto mb-3 text-white hover:text-blue-600 text-lg">
                    Approvals
                  </li>
                </Link>
              ) : (
                ""
              )}
              {props.isLogin ? (
                <>
                  <Link to="/myblogs">
                    <li className=" hover:cursor-pointer md:my-auto mb-3  text-white hover:text-blue-600 text-lg">
                      My Blogs
                    </li>
                  </Link>
                  <Link to="/addblog">
                    <li className=" hover:cursor-pointer md:my-auto mb-3  text-white hover:text-blue-600 text-lg">
                      Add Blog
                    </li>
                  </Link>
                  <Link to="">
                    <li
                      onClick={logout}
                      className=" hover:cursor-pointer md:my-auto mb-3  text-white hover:text-blue-600 text-lg"
                    >
                      Log Out
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <li className=" hover:cursor-pointer md:my-auto mb-3  text-white hover:text-blue-600 text-lg flex justify-center">
                      Sign Up
                    </li>
                  </Link>
                  <Link to="/login">
                    <li className=" hover:cursor-pointer md:my-auto mb-3  text-white hover:text-blue-600 text-lg flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-lock my-auto me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                      </svg>
                      Login
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {message === 1
        ? toast({
            title: "Logged Out Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : ""}
    </nav>
  );
}

export default Navbar;
