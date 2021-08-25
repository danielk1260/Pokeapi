import React, { useEffect, useState } from "react";
import { Container, Dimmer, Divider, Grid, Header, Image, Label, Progress, Segment } from "semantic-ui-react";
import axios from "axios";

import Waves from "./components/waves/Waves";
import Img from "./components/helpers/Img";

import { hexToKg, hexToMt, upperCase } from "./components/helpers/Functions";
import Icons from "./components/icons/Icons";
import { Stats } from "./components/helpers/Stats";
import { useParams } from "react-router-dom";

import Logo from "./resources/images/logo.gif";
import loader from "./resources/images/loader_full.gif";
import "./index.css";
import Sprites from "./components/helpers/Sprites";

const Pokemon = () => {
  document.body.classList.add("background-body");

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({ type: [], abilities: [] });

  useEffect(() => {
    const apiCall = async () => {
      const poke = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);

      setPokemon({
        id: poke.data.id,
        name: poke.data.name,
        type: poke.data.types,
        height: poke.data.height,
        weight: poke.data.weight,
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[5].base_stat,
        abilities: poke.data.abilities,
        sprites: poke.data.sprites,
      });

      setLoading(false);
    };

    apiCall();
  }, [id]);
  console.log(pokemon.sprites);
  if (loading === true) {
    return (
      <Dimmer active={loading}>
        <Image src={loader} alt="Loading data..." />
        <Header as="h1" content="Loading Data..." inverted />
      </Dimmer>
    );
  } else {
    return (
      <>
        <Container>
          <Grid verticalAlign="middle" columns={4} centered>
            <Grid.Row>
              <Grid.Column>
                <Stats name={"ID"} data={"#" + id} />
                <Stats name={"Height"} data={hexToMt(pokemon.height)} />
                <Stats name={"Weight"} data={hexToKg(pokemon.weight)} />
                <Stats
                  name={"Skills"}
                  data={pokemon.abilities.map((x) => (
                    <Label color="teal" key={x.ability.name}>
                      {upperCase(x.ability.name)}
                    </Label>
                  ))}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={Logo} alt="logo" size="large" centered />
                <div className="pokebounce">
                  <Img data={id} />
                </div>
                <div className="shadow" />
                <Divider horizontal>
                  <Header as="h1" inverted>
                    {upperCase(String(pokemon.name))}
                  </Header>
                </Divider>
              </Grid.Column>
              <Grid.Column>
                <Stats
                  name={"Hp"}
                  data={<Progress percent={pokemon.hp} progress indicating />}
                />
                <Stats
                  name={"Attack"}
                  data={
                    <Progress percent={pokemon.attack} progress indicating />
                  }
                />
                <Stats
                  name={"Defense"}
                  data={
                    <Progress percent={pokemon.defense} progress indicating />
                  }
                />
                <Stats
                  name={"Speed"}
                  data={
                    <Progress percent={pokemon.speed} progress indicating />
                  }
                />

                <Icons data={pokemon.type} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Waves />

        <div className="foot">
          <Container>
            <Segment textAlign="center" basic>
              <Header as="h1" content="Sprites versions" textAlign="center" />
              <Grid verticalAlign="middle" columns={3} centered>
                <Grid.Row>
                  <Grid.Column>
                    <Sprites data={pokemon.sprites.front_default} />
                    <Header content="Front default" textAlign="center" />
                    <Sprites data={pokemon.sprites.back_default} />
                    <Header content="Back default" textAlign="center" />
                  </Grid.Column>

                  <Grid.Column>
                    <Sprites
                      data={pokemon.sprites.other.dream_world.front_default}
                      size="medium"
                    />
                    <Header content="SVG" textAlign="center" />
                  </Grid.Column>

                  <Grid.Column>
                    <Sprites data={pokemon.sprites.front_shiny} />
                    <Header
                      content="Front default (shiny)"
                      textAlign="center"
                    />
                    <Sprites data={pokemon.sprites.back_shiny} />
                    <Header content="Back default (shiny)" textAlign="center" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              Daniel Camacho
            </Segment>
            <Segment basic padded="very" />
          </Container>
        </div>
      </>
    );
  }
};

export default Pokemon;
