import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
const Dashblogcard = (props) => {
  let width = window.innerWidth;
  let address = "/editblog/" + props.data._id;
  let address2 = "/showblog/" + props.data._id;
  return (
    <div class="bg-black flex justify-center  w-full">
      <div class="transition ease-in-out hover:scale-105 delay-250 w-11/12 md:w-3/4 rounded-md p-5 px-6 mb-5 bg-slate-200 shadow-lg hover:shadow-2xl hover:shadow-slate-300">
        <h5 class="mt-1 text-2xl mb-1 font-bold tracking-tight text-[#241e1e]">
          {props.data.title}{" "}{props.data.isApproved ? <Badge colorScheme='green' className="mx-3">Approved</Badge>:<Badge colorScheme='yellow'>Pending</Badge>}
        </h5>
        <p class="mb-2 text-sm  text-blue-600">
          {props.data.name}, {props.data.date} {props.data.time}
        </p>
        {props.data.message === undefined?"":<p className="mb-2"><span className="text-red-500 font-bold">Message By Admin : </span> {props.data.message}</p>}
        <p class="mt-4 font-normal text-[#241e1e]">
          {width > 800
            ? props.data.blog.slice(0, 700)
            : props.data.blog.slice(0, 200)}
          .........
        </p>
        
        <div className="flex flex-col md:flex-row justify-end ">
           
          {props.data.isApproved ? (
            <Link to={address2}>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="blue"
                className="mt-2 w-full"
                variant="solid"
              >
                Read More
              </Button>
            </Link>
          ) : (
            <Link to={address}>
              <Button
                colorScheme="blue"
                className="mt-2 w-full"
                variant="solid"
              >
                Edit 📝
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashblogcard;
