import axios from "axios";
import { useEffect, useState } from "react";

const Descriptions = ({ id }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get("http://pokeapi.co/api/v2/characteristic/" + id);
      return setDetails(res.data.descriptions[1].description);
    };
    apiCall();
  }, [id]);

  if (details === null) {
    return "Cargando";
  } else {
    return String(details);
  }
};

export default Descriptions;
