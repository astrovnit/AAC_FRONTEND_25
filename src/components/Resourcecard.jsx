import React from "react";
import { Button, Badge } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const ResourceCard = (props) => {
  const newBadge = (() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(props.data.date).getTime();
    return Math.floor((currentTime - postTime) / 86400000) <= 15;
  })();

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
          <p className="mb-2 text-sm text-gray-400">
            {props.data.name}, {props.data.date}
          </p>
          <p className="text-base leading-relaxed">
            Follow the link below to explore the solutions.
          </p>
          <div className="flex justify-end mt-4">
            <a
                href={props.data.solutions}
                target="_blank"
                rel="noopener noreferrer"
            >
              <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="blue"
                  variant="solid"
                  className="w-full"
              >
                Open Link
              </Button>
            </a>
          </div>
        </div>
      </div>
  );
};

export default ResourceCard;
