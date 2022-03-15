import { NextPage } from "next";
import { ReactNode, useState } from "react";

import { Slider } from "@mui/material";

//Internal Styles
import styles from "./home.module.scss";

//Internal Services
import { api } from "../services/api";

type CountryCaseDataProps = {
  location: string;
  date: Date;
  variant: string;
  num_sequences: number;
  perc_sequences: number;
  num_sequences_total: number;
};

type SliderDataValue = {
  value: any[]
}

const Home: NextPage = () => {
  //Fetch Data (SupaBase)

  const [allCases, setAllCases] = useState<ReactNode>([]);
  const [searchValue, setSearchValue] = useState<number[]>()

  async function handleFetchAllCases() {
    const { data } = await api
      .from("cases")
      .select();

    setAllCases(data);
    console.log(data);
  }

  console.log(searchValue)

  return (
    <div className={styles.MainContainer}>
      <h1 className={styles.MainTitle}>Covid Daily Cases</h1>
      <div className={styles.MainContent}>
        <Slider
          defaultValue={[20, 1000]}
          color="secondary"
          min={1}
          max={1000}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
