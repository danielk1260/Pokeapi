import React from "react";
import { Image } from "semantic-ui-react";

const Img = ({ data }) => {
  const url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";

  const correctionData = String(0) + String(data);

  if (data < 100) data = correctionData;

  if (data < 10) data = String(0) + correctionData;

  const fullData = data + ".png";

  return (
    <>
      <Image
        src={url + fullData}
        size="large"
        alt={data}
        centered
      />
    </>
  );
};

export default Img;
