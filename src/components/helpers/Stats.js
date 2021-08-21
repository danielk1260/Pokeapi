import React from "react";
import { Grid, Header } from "semantic-ui-react";

export const Stats = ({ name, data }) => {
  return (
    <>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={4} textAlign="right">
            <Header as="h4" inverted color="grey" content={name} />
          </Grid.Column>
          <Grid.Column textAlign="left">
          <Header as="h4" inverted color="grey" content={data} />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
