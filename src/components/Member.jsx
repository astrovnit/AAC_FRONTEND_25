import React from "react";

const Member = (props) => {
  return (
    <div className="relative bg-black text-white rounded-lg overflow-hidden w-[350px] h-[400px] mx-auto">
      {/* Image */}
      <img
        className="w-full h-full object-cover"
        src={`../../${props.member.imgurl}`}
        alt={props.member.name}
      />

      {/* Text Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
        <h4 className="text-xl font-bold">{props.member.name}</h4>
        <p className="text-sm">{props.member.position}</p>
        <div className="flex space-x-3 mt-2">
          <a href={props.member.linkedin} target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a href={props.member.instagram} target="_blank" rel="noreferrer">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Member;

