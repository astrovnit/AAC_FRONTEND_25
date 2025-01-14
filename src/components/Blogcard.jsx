import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "@chakra-ui/react";

const Blogcard = (props) => {
  const width = window.innerWidth;
  const address = "/showblog/" + props.data._id;
  const [submit, setSubmit] = useState(false);
  const [usermessage, setUserMessage] = useState("");

  const newBadge = (() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(props.data.date).getTime();
    return Math.floor((currentTime - postTime) / 86400000) <= 15;
  })();

  const handleApprove = () => {
    setSubmit(true);
    axios
        .post("https://aac-backend-25.onrender.com/admin/approve", {
          id: props.data._id,
          message: usermessage,
          token: props.token,
        })
        .then((res) => {
          props.setData(res.data.data);
          props.setMessage(res.data.message);
          setSubmit(false);
          inputClear();
        });
  };

  const handleReject = () => {
    setSubmit(true);
    axios
        .post("https://aac-backend-25.onrender.com/admin/reject", {
          id: props.data._id,
          message: usermessage,
          token: props.token,
        })
        .then((res) => {
          props.setData(res.data.data);
          props.setMessage(res.data.message);
          setSubmit(false);
          inputClear();
        });
  };

  const handleDelete = () => {
    setSubmit(true);
    axios
        .post("https://aac-backend-25.onrender.com/admin/delete", {
          id: props.data._id,
          token: props.token,
        })
        .then((res) => {
          props.setData(res.data.data);
          props.setMessage(res.data.message);
          setSubmit(false);
        });
  };

  const handleChange = (e) => {
    if (e.target.id === "usermessage") {
      setUserMessage(e.target.value);
    }
  };

  const inputClear = () => {
    document.getElementById("usermessage").value = "";
    setUserMessage("");
  };

  return (
      <div className="flex justify-center w-full">
        <div className="transition-all ease-in-out hover:scale-105 delay-150 w-11/12 md:w-3/4 rounded-lg p-6 bg-black text-white shadow-lg hover:shadow-xl">
          <h5 className="text-3xl font-extrabold mb-2 text-white">
            {props.data.title}
            {newBadge && (
                <Badge className="ml-2" colorScheme="green">
                  NEW
                </Badge>
            )}
          </h5>

          <p className="text-sm text-gray-400 mb-4">
            By {props.data.name} on {props.data.date} at {props.data.time}
          </p>

          <p className="text-base leading-relaxed">
            {width > 800
                ? props.data.blog.slice(0, 700)
                : props.data.blog.slice(0, 200)}
            &hellip;
          </p>

          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
            <Link to={address}>
              <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="blue"
                  variant="solid"
                  className="w-full"
              >
                Read More
              </Button>
            </Link>
            {!props.data.isApproved && (
                <>
                  <Button
                      colorScheme="green"
                      variant="solid"
                      isLoading={submit}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                  >
                    Approve
                  </Button>
                  <Button
                      colorScheme="yellow"
                      variant="solid"
                      isLoading={submit}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                  >
                    Reject
                  </Button>
                  <Button
                      colorScheme="red"
                      variant="solid"
                      isLoading={submit}
                      onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
            )}
          </div>

          <div
              className="modal fade text-black"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content bg-gray-800">
                <div className="modal-header">
                  <h1 className="modal-title text-white" id="exampleModalLabel">
                    Approve / Reject with a message
                  </h1>
                </div>
                <div className="modal-body">
                  <label
                      htmlFor="usermessage"
                      className="block text-sm text-gray-300"
                  >
                    Message for User <span className="text-red-500">*</span>
                  </label>
                  <input
                      id="usermessage"
                      onChange={handleChange}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
                      required
                  />
                </div>
                <div className="modal-footer">
                  <Button
                      onClick={handleApprove}
                      colorScheme="green"
                      className="text-white"
                  >
                    Approve
                  </Button>
                  <Button
                      onClick={handleReject}
                      colorScheme="red"
                      className="text-white"
                  >
                    Reject
                  </Button>
                  <Button colorScheme="gray" data-bs-dismiss="modal">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Blogcard;
