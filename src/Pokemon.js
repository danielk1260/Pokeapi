import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Header, Image, Label, Progress, Segment } from "semantic-ui-react";
import axios from "axios";

import Waves from "./components/waves/Waves";
import Img from "./components/helpers/Img";

import { hexToKg, hexToMt, upperCase } from "./components/helpers/Functions";
import Icons from "./components/icons/Icons";
import { Stats } from "./components/helpers/Stats";
import { useParams } from "react-router-dom";

import Logo from "./resources/images/logo.gif";
import "./index.css";

const Pokemon = () => {
  document.body.classList.add("background-body");

  const { id } = useParams();

  const [pokemon, setPokemon] = useState({ type: [], abilities: [] });
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getPokemon = axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const getDetails = axios(`http://pokeapi.co/api/v2/characteristic/${id}`);

    getPokemon.then((res) => {
      setPokemon({
        id: res.data.id,
        name: res.data.name,
        type: res.data.types,
        height: res.data.height,
        weight: res.data.weight,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
        abilities: res.data.abilities,
      });
    });

    getDetails.then((res) => setDetails(res.data.descriptions[1].description));
  }, [id]);

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
                  <Header.Subheader>{details}</Header.Subheader>
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
                data={<Progress percent={pokemon.attack} progress indicating />}
              />
              <Stats
                name={"Defense"}
                data={
                  <Progress percent={pokemon.defense} progress indicating />
                }
              />
              <Stats
                name={"Speed"}
                data={<Progress percent={pokemon.speed} progress indicating />}
              />

              <Icons data={pokemon.type} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Waves />

      <div className="foot">
        <Container>
          <Segment textAlign="center" stacked raised>
            {upperCase(String(pokemon.name))}: El contenido de este componente
            aun esta en construcción.
          </Segment>
          <Segment basic padded="very" />
        </Container>
      </div>
    </>
  );
};

export default Pokemon;
