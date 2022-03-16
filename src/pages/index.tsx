import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import ReactTooltip from "react-tooltip";

import MapChart from '../components/worldmap/index'

//Internal Styles
import styles from "./home.module.scss";
import { api } from "../services/api";

const Home: NextPage = () => {
  const marks = [
    {
      value: 0,
      label: 'Jan/2020',
    },
    {
      value: 250,
      label: 'Jul/2020',
    },
    {
      value: 500,
      label: 'Jan/2021',
    },
    {
      value: 750,
      label: 'Jul/2021',
    },
    {
      value: 1000,
      label: 'Jan/2022',
    },
  ]

  // const { data, error } = useFetch(NAME)

  const [tooltipContent, setTooltipContent] = useState('')
  const [inputValue, setInputValue] = useState('')

  const [location, setLocation] = useState('')

  async function handleLocationSelect() {
    const { data } = await api
      .from("cases")
      .select("location, date, variant, num_sequences, perc_sequences, num_sequences_total")
      .match({ location: `${location}` })
      .match({ date: "2020-05-11" });

      console.log(data)
  }

  useEffect(() => {
    console.log(location)
  }, [location])
  
  //Verificar tipo correto
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  return (
    <div className={styles.MainContainer}>
      <h1 className={styles.MainTitle}>Covid Daily Cases</h1>
      <div className={styles.MainContent}>
        <Slider
          defaultValue={[0, 1000]}
          marks={marks}
          valueLabelDisplay="auto"
          color="primary"
          min={0}
          max={1000}
          onChange={handleInputChange}
        />
        <MapChart setTooltipContent={setTooltipContent} setLocation={setLocation} />
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <button onClick={handleLocationSelect}>Test</button>
      </div>
    </div>
  );
};

export default Home;
