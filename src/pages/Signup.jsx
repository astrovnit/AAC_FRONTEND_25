import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Modular InputField Component
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
                className="block w-full px-4 py-2 mt-2 text-gray-100 bg-gray-900 border border-gray-700 rounded-md focus:ring focus:ring-white focus:outline-none"
            />
          </Tooltip>
      ) : (
          <input
              id={id}
              type={type}
              onChange={onChange}
              className="block w-full px-4 py-2 mt-2 text-gray-100 bg-gray-900 border border-gray-700 rounded-md focus:ring focus:ring-white focus:outline-none"
          />
      )}
    </div>
);

// Modular SignupCard Component
const SignupCard = ({ children, onSubmit, isLoading }) => (
    <div className="w-5/6 max-w-lg mx-auto p-8 mt-12 bg-gray-950 text-white rounded-lg shadow-lg border border-gray-800">
      <h1 className="text-3xl text-center font-bold text-gray-100">
        Sign Up
      </h1>
      <form className="mt-8" onSubmit={onSubmit}>
        {children}
        <div className="mt-8">
          <Button
              type="submit"
              isLoading={isLoading}
              className="w-full px-6 py-3 tracking-wide text-black transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Sign Up
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

function Signup(props) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    cpassword: "",
    enrollment: "",
  });
  const [message, setMessage] = useState(-1);
  const [submit, setSubmit] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password, cpassword, enrollment } = formData;

    if (!name || !username || !password || !cpassword || !enrollment) {
      setMessage(2);
      return;
    }
    if (password !== cpassword) {
      setMessage(3);
      return;
    }

    setSubmit(true);

    axios
        .post("https://aac-backend-25.onrender.com/user/register", {
          name,
          username,
          enrollment,
          password,
        })
        .then((res) => {
          setMessage(res.data.message);
          setSubmit(false);
          if (res.data.message === 1) {
            clearInputs();
          }
        });
  };

  const clearInputs = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      cpassword: "",
      enrollment: "",
    });
  };

  const showToast = useCallback(() => {
    const toastOptions = {
      0: {
        title: "Some Error Occurred",
        description: "Please try again later.",
        status: "error",
      },
      1: {
        title: "Account Created Successfully",
        description: "",
        status: "success",
      },
      2: {
        title: "Fields Can't Be Empty",
        description: "Please fill all the fields.",
        status: "warning",
      },
      3: {
        title: "Passwords Don't Match",
        description: "",
        status: "warning",
      },
      4: {
        title: "Username Already Exists",
        description: "",
        status: "error",
      },
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
      <div className="bg-black min-h-screen flex flex-col justify-center">
        <Navbar {...props} />
        <SignupCard onSubmit={handleSubmit} isLoading={submit}>
          <InputField
              id="name"
              label="Name"
              type="text"
              onChange={handleChange}
              isRequired
          />
          <InputField
              id="enrollment"
              label="Enrollment Number"
              type="text"
              onChange={handleChange}
              isRequired
          />
          <InputField
              id="username"
              label="Username"
              type="text"
              onChange={handleChange}
              isRequired
              tooltip="Keep It Complex. IMPORTANT !!"
          />
          <InputField
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
              isRequired
          />
          <InputField
              id="cpassword"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              isRequired
          />
        </SignupCard>
      </div>
  );
}

export default Signup;
