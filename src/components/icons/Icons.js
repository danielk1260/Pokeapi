import React from "react";
import { Grid, Label } from "semantic-ui-react";
import { upperCase } from '../helpers/Functions';
import "./styles.css";

const Icons = ( {data} ) => {

  return (
    <>
      <Grid columns="equal">
        {data.map((x) => (
          <Grid.Column textAlign="center" key={x.type.name}>
            <Label image>
            <img
              src={require("../../resources/icons/" + x.type.name + ".svg").default}
              className={"icon " + String(x.type.name)}
              alt={x.type.name}
            /> {upperCase(x.type.name)}
            </Label>
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
};

export default Icons;
