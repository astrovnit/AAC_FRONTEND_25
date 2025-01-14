import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Errorpage from "./pages/Errorpage";
import Dashboard from "./pages/Dashboard";
import Addblog from "./pages/Addblog";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import axios from "axios";
import Showblog from "./pages/Showblog";
import Blogs from "./pages/Blogs";
import Myblogs from "./pages/Myblogs";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Editblog from "./pages/Editblog";
import Cookies from "universal-cookie";

import Resources from "./pages/Resources";
function App() {
  const cookies = new Cookies();
  const [isLogin, setLogin] = useState(false);
  const [callCount, setCallCount] = useState(0);
  const [token, setToken] = useState(cookies.get("authToken"));
  const [user, setUser] = useState({
    isAdmin: false,
  });

  useEffect(() => {
    if (callCount === 0) {
      isLoggedin();
    }
  });
  function isLoggedin() {
    if (cookies.get("authToken") === undefined) {
      setCallCount(callCount + 1);
      return;
    } else {
      axios
        .get("https://aac-backend-25.onrender.com/user/getUserInfo", {
          params: {
            token: cookies.get("authToken"),
          },
        })
        .then((res) => {
          setLogin(res.data.isLoggedin);
          setUser(res.data.user);
          setCallCount(callCount + 1);
        });
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Homepage
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <Login
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/addblog",
      element: (
        <Addblog
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/blogs",
      element: (
        <Blogs
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/resources",
      element: (
        <Resources
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/showblog/:id",
      element: (
        <Showblog
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/editblog/:id",
      element: (
        <Editblog
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/team",
      element: (
        <About
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Dashboard
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "/myblogs",
      element: (
        <Myblogs
          isLogin={isLogin}
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          token={token}
          setToken={setToken}
        />
      ),
    },
    {
      path: "*",
      element: <Errorpage />,
    },
  ]);

  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />

      <Footer />
    </div>
  );
}

export default App;
