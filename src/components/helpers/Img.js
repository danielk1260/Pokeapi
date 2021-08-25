import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import loaderImg from '../../resources/images/loader_img.gif';

const Img = ({ data }) => {

  const [img, setImg] = useState(loaderImg);

  const url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";

  const correctionData = String(0) + String(data);

  if (data < 100) data = correctionData;

  if (data < 10) data = String(0) + correctionData;

  const fullData = data + ".png";

  return (
    <>
      <Image src={img} size="large" alt={data} centered onLoad={() => {
        setImg(url + fullData);
      }} />
    </>
  );
};

export default Img;