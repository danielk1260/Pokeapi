import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, Image, Label, Segment } from "semantic-ui-react";
// import Descriptions from "../helpers/Descriptions";
import { upperCase } from "../helpers/Functions";
import Icon from "../icons/Icon";
import "./styles.css";

const Thumbnail = ({ data }) => {
  const [state, setState] = useState({ type: [] });

  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data}`);
      setState({
        id: res.data.id,
        type: res.data.types,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.data.id}.png`,
      });
    };
    apiCall();
  }, [data]);

  return (
    <>
      <Segment raised>
        <Header as="h2">
          {upperCase(data)}
          <Header.Subheader>
            {/* <Descriptions id={state.id} /> */}
          </Header.Subheader>
        </Header>

        <Icon data={state.type} />

        <Image
          src={state.img}
          alt={state.id}
          size="small"
          floated="right"
          spaced="right"
          className="img"
          as="a"
          href={"pokemon/" + state.id}
        />
        <Label content={"#" + state.id} color="pink" floating />
      </Segment>
    </>
  );
};

export default Thumbnail;
