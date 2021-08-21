import React from "react";
import { Label } from "semantic-ui-react";
import { upperCase } from "../helpers/Functions";
import "./styles.css";

const Icon = ({ data }) => {
  return (
    <>
      {data.map((x) => (
        <Label image spaced="right" key={x.type.name}>
          <img
            src={
              require("../../resources/icons/" + x.type.name + ".svg").default
            }
            className={"icon " + String(x.type.name)}
            alt={x.type.name}
          />
          {upperCase(x.type.name)}
        </Label>
      ))}
    </>
  );
};

export default Icon;
