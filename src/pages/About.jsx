import React from "react";
import Member from "../components/Member";
import Navbar from "../components/Navbar";
import team from "../team.js";

function About(props) {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar {...props} />

            <div className="p-3 flex flex-row items-center justify-center mt-5 mb-4 rounded-lg w-5/6 md:w-3/4 m-auto">
                <h1 className="bg-black text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center p-2 rounded">
                    Our Team
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-4 md:px-12 lg:px-20">
                {team.map((member, index) => (
                    <Member key={index} member={member} />
                ))}
            </div>
        </div>
    );
}

export default About;
