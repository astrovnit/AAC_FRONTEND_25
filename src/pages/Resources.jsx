import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ResourceCard from "../components/Resourcecard";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

function Resources(props) {
  const [data, setData] = useState(null);
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    if (callCount === 0) {
      axios.get("https://aac-backend-25.onrender.com/resource/getResources").then((res) => {
        setData(() => {
          let temp = res.data.data;
          temp.reverse();
          return temp;
        });
        setCallCount(1);
      });
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="blog-bg bg-black min-h-screen">
        <Navbar {...props} />
        <h1 className="w-3/4 mx-auto rounded-lg p-3 text-center text-2xl mt-5 mb-5 bg-gray-800 shadow-lg text-white">
          Shared Resources
        </h1>
        {data === null ? (
            <div className="text-center">
              <h1 className="text-center text-xl mt-32 mb-32">
                <Spinner className="m-4" size="xl"/>
                <br/>
                <span className="">This may take time, Please Wait...</span>
              </h1>
            </div>
        ) : data.length === 0 ? (
            <div className="text-center">
              <h1 className="text-center text-xl mt-32 mb-32">
                <span className="">NO RECORDS FOUND</span>
              </h1>
            </div>
        ) : (
            <div className="md:p-5 d-block flex-column justify-content-center flex-wrap">
              {data.map((resource, index) => {
                return (
                    <div key={index} className="m-1">
                      <ResourceCard data={resource}/>
                    </div>
                );
              })}
            </div>
        )}
      </div>
  );
}

export default Resources;
