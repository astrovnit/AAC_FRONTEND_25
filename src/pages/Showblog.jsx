import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Showblog(props) {
    const { id } = useParams();
    const [data, setData] = useState("");

    useEffect(() => {
        if (data === "") {
            axios
                .get("https://aac-backend-25.onrender.com/blog/getData", {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    setData(res.data[0]);
                });
        }
    }, [data, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="blog-bg bg-black text-gray-100 min-h-screen">
            <Navbar {...props} />
            {data === "" ? (
                <div className="w-3/4 m-auto">
                    <br />
                    <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                    <br />
                    <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                    <br />
                    <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                    <br />
                    <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                    <br />
                    <Skeleton height="90px" startColor="gray.700" endColor="gray.600" />
                </div>
            ) : (
                <div className="w-11/12 md:w-3/4 bg-black text-gray-100 shadow-2xl border border-gray-700 m-auto p-5 rounded-lg mt-5">
                    <div className="flex">
                        <p className="font-bold text-2xl md:text-4xl">{data.title}</p>
                    </div>
                    <div className="mt-1 text-lg text-gray-400">
                        <p>
                            By <span className="text-blue-400">{data.name}</span>
                        </p>
                        <p>
                            {data.date} at {data.time}
                        </p>
                    </div>
                    <hr className="bg-blue-500 h-1 mt-4" />
                    <div className="mt-5 text-lg whitespace-pre-line">{data.blog}</div>
                    <div className="text-center mt-6 bg-gray-700 p-4 text-2xl rounded">
                        THE END
                    </div>
                </div>
            )}
        </div>
    );
}

export default Showblog;
