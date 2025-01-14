import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function Editblog(props) {
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState("");
  const [message, setMessage] = useState(-1);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.isLogin) {
      navigate("/login");
    }
  });
  useEffect(() => {
    setMessage(-1);
  }, [message]);
  useEffect(() => {
    if (data === "") {
      axios
        .get("https://aac-backend-25.onrender.com/blog/getBlogData", {
          params: {
            id: id,
            token: props.token,
          },
        })
        .then((res) => {
          setData(res.data.data[0]);
          document.getElementById("name").value = res.data.data[0].name;
          document.getElementById("title").value = res.data.data[0].title;
          document.getElementById("blog").value = res.data.data[0].blog;
          setName(res.data.data[0].name);
          setTitle(res.data.data[0].title);
          setBlog(res.data.data[0].blog);
        });
    }
  });
  useEffect(() => {
    if (data.isApproved === true) {
      navigate("/myblogs");
    }
  });

  function handleChange(e) {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "blog":
        setBlog(e.target.value);
        break;
      default:
        break;
    }
  }
  function inputClear() {
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("blog").value = "";
    setName("");
    setTitle("");
    setBlog("");
  }
  function handleSubmit() {
    if (name === "" || title === "" || blog === "") {
      setMessage(0);
      return;
    } else {
      setSubmit(true);
      var newBlog = {
        blogid: id,
        name: name,
        title: title,
        blog: blog,
        userId: props.user._id,
        token: props.token,
      };
      axios
        .post("https://aac-backend-25.onrender.com/blog/updateBlog",{
          params: newBlog,
        })
        .then((res) => {
          setMessage(res.data.message);
          setSubmit(false);
          if (res.data.message === 1) {
            inputClear();
          }
        });
    }
  }
  return (
    <div className="blog-bg">
      <Navbar {...props} />
      <center className="mont">
        <h1 className="w-3/4 m-auto rounded-3 p-3 text-center display-6 mt-3 mb-5  bg-slate-200 text-2xl">
          Edit Blog
        </h1>
        <form className="my-9 w-11/12 md:w-3/4 text-start border-2 rounded-xl p-6 shadow-xl">
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="text"
              id="name"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-lg"
            >
              Author
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="title"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                rows="8"
                type="text"
                id="blog"
                onChange={handleChange}
                className=" block py-2.5 px-0 w-full  text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Text
              </label>
            </div>
          </div>
          <div className="mx-auto text-center">
            <Button
              isLoading={submit}
              onClick={handleSubmit}
              className="mx-auto items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto p-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </Button>
            {message === 0
              ? toast({
                  title: "Please fill all the fields",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                })
              : message === 1
              ? toast({
                  title: "Changes Saved",
                  description: "",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              : message === 2
              ? toast({
                  title: "Some Error Occured",
                  description: "",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                })
              : ""}
          </div>
        </form>
      </center>
    </div>
  );
}

export default Editblog;
