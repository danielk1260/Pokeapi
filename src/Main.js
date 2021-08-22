import React, { useEffect, useState } from "react";
import { Container, Grid, Image, Pagination, Segment } from "semantic-ui-react";
import axios from "axios";

import "./index.css";
import Thumbnail from "./components/thumbnail/Thumbnail";
import Logo from "./resources/images/logo.gif";


const Main = () => {
  document.body.classList.add("background-body-dark");

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    getPokemon.then((res) => setPokemon(res.data.results));
  }, []);

  return (
    <>
      <Container>
        <Image src={Logo} alt="logo" size="large" centered />
        <Grid columns={3} centered stackable>
          {pokemon.map((res) => {
            return (
              <Grid.Column key={res.name}>
                <Thumbnail data={res.name} />
              </Grid.Column>
            );
          })}
        </Grid>

        <Segment basic textAlign="center">
          <Pagination
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            totalPages={3}
          />
        </Segment>
      </Container>
    </>
  );
};

export default Main;
