
import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Homepage(props) {
  return (
    <div className="bg-black text-white">
      <Navbar {...props} />

      {/* Video Section */}
      <div className="text flex flex-row">
        <div className="video-container relative w-full h-[90vh]">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-contain"
          >
            <source src="/aac.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Scroll Down Button */}
          <div className="absolute bottom-4 w-full flex justify-center">
            {/* <button
              onClick={() => {
                document.getElementById("about-us").scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white text-lg border-2 border-white rounded-full px-4 py-2 hover:bg-white hover:text-black transition"
            >
              Scroll Down ⬇️
            </button> */}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div
        id="about-us"
        className="flex flex-col lg:flex-row border border-gray-700 mx-4 mt-3 mb-3"
      >
        <div className="lg:w-1/2 w-6/7 m-auto">
          <div className="container lg:px-10 p-6 shadow-lg rounded-lg shadow-gray-800">
            <p className="font-bold text-2xl text-center">About Us</p>

            <p className="mt-4">
              We are a group of individuals united by our love for astronomy and
              passion for exploring the universe. As a club, we organize a
              variety of events and activities that allow members to delve
              deeper into this fascinating field. From educational workshops and
              guest speaker sessions to stargazing sessions and telescope
              viewings, we offer opportunities for hands-on learning and personal
              growth.
              <br />
              <br /> Whether you're a seasoned astronomer or just starting to
              develop an interest in the stars, our club provides a welcoming and
              inclusive environment for all. Come join us and be a part of a
              community that is dedicated to advancing our understanding of the
              cosmos.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-6/7 m-auto">
          <img
            src="https://1.bp.blogspot.com/-MLX81cymNNs/X7QNIFT-RII/AAAAAAAAELc/2XG-Cxd0XRU0GJEO-3E0F6_MMutFkxdVQCLcBGAsYHQ/s1536/1898-lec3-1536x865.jpg"
            alt="Astronomy event"
          />
        </div>
      </div>

      <div
        id="here"
        className="flex flex-col lg:flex-row-reverse border border-gray-700 mx-4 mt-3 mb-3"
      >
        <div className="lg:w-1/2 w-6/7 m-auto">
          <div className="container lg:px-10 p-6 shadow-lg rounded-lg shadow-gray-800">
            <p className="font-bold text-2xl text-center">
              Our Goal <span className="big">🎯</span>
            </p>
            <br />
            <p>
              Our goal at the Astronomy Club is to inspire and educate individuals
              about the wonders of the universe.
              <br /> We aim to:
              <ul className="list-disc list-inside">
                <li>
                  Promote a deeper understanding and appreciation of astronomy
                  through hands-on learning experiences.
                </li>
                <li>
                  Provide access to the latest technology and knowledge in the
                  field of astronomy and aerospace.
                </li>
                <li>
                  Create a community of like-minded individuals who share a
                  passion for the cosmos.
                </li>
                <li>
                  Encourage participation in astronomical research and
                  projects.
                </li>
                <li>
                  Raise awareness of the beauty and significance of the night
                  sky.
                </li>
              </ul>
              <br />
              Whether you're an amateur astronomer or a curious learner, we hope
              you find the information and resources on this site to be both
              informative and entertaining.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-6/7 m-auto">
          <img
            width="600px"
            className=""
            src="https://img.freepik.com/premium-photo/cute-rocket-space-illustrationcartoon-boy-flying-with-rocket-sky-background-vector_1016228-2723.jpg"
            alt="Astronomy club activities"
          />
        </div>
      </div>

      <div className="text-center">
        <Link to="/blogs">
          <Button className="m-3" variant="outline" colorScheme="linkedin">
            Blogs
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="m-3" variant="outline" colorScheme="linkedin">
            <span className="">Get Started</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
