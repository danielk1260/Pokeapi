import React, { useEffect, useState } from "react";
import { Container, Dimmer, Grid, Header, Image, Pagination, Segment } from "semantic-ui-react";
import axios from "axios";

import "./index.css";
import Thumbnail from "./components/thumbnail/Thumbnail";
import Logo from "./resources/images/logo.gif";
import loader from "./resources/images/loader_full.gif";
import { Link } from "react-router-dom";


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
      setTimeout(() => {
        setLoading(false);
      }, 1000 * 1);
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
        <Image src={loader} alt='Loading data...' />
        <Header as="h1" content='Loading Data...' inverted />
      </Dimmer>
    );
  } else {
    return (
      <Container>
        <Link to="/">
        <Image src={Logo} alt="logo" size="large" centered />
        </Link>
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
            siblingRange={0}
            totalPages={1118/20}
            onPageChange={pageChange}
          />
        </Segment>
      </Container>
    );
  }
};

export default Main;
