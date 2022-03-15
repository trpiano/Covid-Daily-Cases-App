import { NextPage } from "next";
import { ReactNode, useState } from "react";
import { Slider } from "@mui/material";
import ReactTooltip from "react-tooltip";

import MapChart from '../components/worldmap/index'

//Internal Styles
import styles from "./home.module.scss";

//Internal Services
import { api } from "../services/api";

const Home: NextPage = () => {
  //Fetch Data (SupaBase)

  const [allCases, setAllCases] = useState<ReactNode>([]);
  const [searchValue, setSearchValue] = useState<number[]>()

  async function handleFetchAllCases() {
    const { data } = await api
      .from("cases")
      .select()

    setAllCases(data);
  }

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

  const [content, setContent] = useState("E ae seus batata")

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
          onChange={event => setSearchValue(event.target.value)}
        />
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
};

export default Home;
