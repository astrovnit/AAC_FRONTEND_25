import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// Modular InputField Component for login and reset forms
const InputField = ({ id, label, type, onChange, isRequired, tooltip }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm text-gray-300">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      {tooltip ? (
          <Tooltip hasArrow label={tooltip} bg="gray.700">
            <input
                id={id}
                type={type}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-white focus:outline-none"
            />
          </Tooltip>
      ) : (
          <input
              id={id}
              type={type}
              onChange={onChange}
              className="block w-full px-4 py-2 mt-2 text-gray-100 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-white focus:outline-none"
          />
      )}
    </div>
);

const LoginCard = ({ children, onSubmit, isLoading }) => (
    <div className="w-5/6 max-w-lg mx-auto p-8 mt-20 bg-gray-950 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-3xl text-center font-bold text-gray-100">Log In</h1>
      <form className="mt-8" onSubmit={onSubmit}>
        {children}
        <div className="mt-8">
          <Button
              type="submit"
              isLoading={isLoading}
              className="w-full px-6 py-3 tracking-wide text-black transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Login
          </Button>
          {isLoading && (
              <p className="text-center text-md mt-3 text-gray-400">
                This may take time. Please wait...
              </p>
          )}
        </div>
      </form>
    </div>
);

function Login(props) {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [musername, setmUsername] = useState("");
  const [mpassword, setmPassword] = useState("");
  const [menrollment, setmEnrollment] = useState("");
  const [message, setMessage] = useState(-1);
  const [submit, setSubmit] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "menrollment":
        setmEnrollment(e.target.value);
        break;
      case "musername":
        setmUsername(e.target.value);
        break;
      case "mpassword":
        setmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const inputClear = () => {
    setUsername("");
    setPassword("");
    setmUsername("");
    setmPassword("");
    setmEnrollment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage(2);
      return;
    }
    setSubmit(true);
    axios
        .post("https://aac-backend-25.onrender.com/user/login", {
          username,
          password,
        })
        .then((res) => {
          setMessage(res.data.message);
          if (res.data.isLoggedin) {
            props.setLogin(true);
            props.setUser(res.data.user);
            cookies.set("authToken", res.data.token, {
              path: "/",
              maxAge: 5 * 60 * 60 * 1000,
              secure: true,
            });
            props.setToken(res.data.token);
          }
          setSubmit(false);
          if (res.data.message === 1) {
            inputClear();
          }
        });
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (musername === "" || mpassword === "" || menrollment === "") {
      setMessage(2);
      return;
    }
    setSubmit(true);
    axios
        .post("https://aac-backend-25.onrender.com/user/resetPassword", {
          username: musername,
          enrollment: menrollment,
          password: mpassword,
        })
        .then((res) => {
          setMessage(res.data.message);
          setSubmit(false);
          if (res.data.message === 4) {
            inputClear();
          }
        });
  };

  const showToast = useCallback(() => {
    const toastOptions = {
      0: { title: "Invalid Credentials", description: "Please Try Again", status: "error" },
      1: { title: "Log In Successful", description: "", status: "success" },
      2: { title: "Fields can't be empty", description: "Please fill all the fields", status: "warning" },
      3: { title: "Some Error Occurred", description: "Please Try Again", status: "error" },
      4: { title: "Password Updated", description: "", status: "success" },
    };

    if (toastOptions[message]) {
      toast({
        ...toastOptions[message],
        duration: 3000,
        isClosable: true,
      });
    }
  }, [message, toast]);

  useEffect(() => {
    if (props.isLogin) {
      navigate("/addblog");
    }
  }, [props.isLogin, navigate]);

  useEffect(() => {
    if (message !== -1) {
      showToast();
      setMessage(-1);
    }
  }, [message, showToast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="bg-black min-h-screen">
        <Navbar {...props} />
        <div className="flex justify-center items-center">
          <LoginCard onSubmit={handleSubmit} isLoading={submit}>
            <InputField
                id="username"
                label="Username"
                type="text"
                onChange={handleChange}
                isRequired
            />
            <InputField
                id="password"
                label="Password"
                type="password"
                onChange={handleChange}
                isRequired
            />
          </LoginCard>
        </div>

        {/* Forgot Password Modal */}
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-gray-900 text-white">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Reset Password
                </h1>
              </div>
              <div className="modal-body">
                <InputField
                    id="musername"
                    label="Username"
                    type="text"
                    onChange={handleChange}
                    isRequired
                />
                <InputField
                    id="menrollment"
                    label="Enrollment Number"
                    type="text"
                    onChange={handleChange}
                    isRequired
                />
                <InputField
                    id="mpassword"
                    label="New Password"
                    type="password"
                    onChange={handleChange}
                    isRequired
                />
              </div>
              <div className="modal-footer">
                <Button data-bs-dismiss="modal">Close</Button>
                <Button onClick={handleReset} isLoading={submit} colorScheme="red">
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
