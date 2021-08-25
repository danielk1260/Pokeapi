import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimmer, Image, Label, Loader, Segment } from "semantic-ui-react";
import { upperCase } from "../helpers/Functions";
import Icon from "../icons/Icon";
import loaderImg from '../../resources/images/loader_img.gif';
import "./styles.css";

const Thumbnail = ({ data }) => {
  const [state, setState] = useState({ type: [] });
  const [loading, setLoading] = useState(true);
  const [loadImg, setLoadImg] = useState(loaderImg);

  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data}`);
      setState({
        id: res.data.id,
        type: res.data.types,
        typeone: res.data.types[0].type.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.data.id}.png`,
        svg: res.data.sprites.other.dream_world.front_default
      });
      setLoading(false);
    };
    apiCall();
  }, [data]);

  if (loading === true) {
    return (
      <Dimmer active={loading}>
        <Loader content="Loading..." />
      </Dimmer>
    );
  }else{
    return (
      <Segment raised>
        <h1 className={"text-" + state.typeone}>{upperCase(data)}</h1>
        <Icon data={state.type} />
        <Image
          src={loadImg}
          alt={state.id}
          size="small"
          floated="right"
          spaced="right"
          className="img"
          as="a"
          href={"pokemon/" + state.id}
          onLoad={() => { setLoadImg(state.img) }}
        />
        
        <Label content={"#" + state.id} color="teal" floating />
      </Segment>
  );}
};

export default Thumbnail;
