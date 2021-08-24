import React, { useEffect, useState } from "react";
import { Container, Dimmer, Grid, Image, Loader, Pagination, Segment } from "semantic-ui-react";
import axios from "axios";

import "./index.css";
import Thumbnail from "./components/thumbnail/Thumbnail";
import Logo from "./resources/images/logo.gif";

const Main = () => {
  document.body.classList.add("background-body-dark");

  const [pokemon, setPokemon] = useState({
    data: [],
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  useEffect(() => {
    const apiCall = async () => {
      const getPokemon = await axios.get(url);
      setPokemon({
        next: getPokemon.data.next,
        previous: getPokemon.data.previous,
        data: getPokemon.data.results,
      });
      setLoading(false);
    };
    apiCall();
  }, [url]);

  const pageChange = (e, data) => {
    if (pokemon.previous === null) {
      setUrl(String(pokemon.next));
    } else if (data.activePage > actualPage) {
      setUrl(String(pokemon.next));
    } else {
      setUrl(pokemon.previous);
    }
    
    setActualPage(data.activePage);
    setLoading(true);
  };

  if (loading === true) {
    return (
      <Dimmer active={loading}>
        <Loader content="Loading data..." />
      </Dimmer>
    );
  } else {
    return (
      <Container>
        <Image src={Logo} alt="logo" size="large" centered />
        <Grid columns={3} centered stackable>
          {pokemon.data.map((res) => {
            return (
              <Grid.Column key={res.name}>
                <Thumbnail data={res.name} />
              </Grid.Column>
            );
          })}
        </Grid>

        <Segment basic textAlign="center">
          <Pagination
            boundaryRange={0}
            defaultActivePage={actualPage}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={pokemon.data.length}
            onPageChange={pageChange}
          />
        </Segment>
      </Container>
    );
  }
};

export default Main;
