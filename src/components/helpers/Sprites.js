import React from "react";
import { Image } from "semantic-ui-react";

const Sprites = ({data, size = 'small'}) => {
  return <Image src={String(data)} alt="a" size={size} centered/>;
};

export default Sprites;
