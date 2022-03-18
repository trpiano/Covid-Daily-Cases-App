import { NextPage } from "next";
import { ReactNode, useState } from "react";
import { Slider } from "@mui/material";
import Head from "next/head";
import ReactTooltip from "react-tooltip";

import MapChart from '../components/worldmap/index'

//Internal Styles
import styles from "./home.module.scss";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { timeDay } from "d3-time";
import moment from "moment";

const Home: NextPage = () => {
  const marks = [
    {
      value: 0,
      label: 'Jan/2020',
    },
    {
      value: 273,
      label: 'Jul/2020',
    },
    {
      value: 546,
      label: 'Jan/2021',
    },
    {
      value: 818,
      label: 'Jul/2021',
    },
    {
      value: 1091,
      label: 'Jan/2022',
    },
  ]

  const startDate = new Date("2019-01-02")
  const endDate = new Date("2021-12-28")

  const startDateFormated = moment.utc(startDate).format('YYYY-MM-DD')
  const endDateFormated = moment.utc(endDate).format('YYYY-MM-DD')

  const TotalDays = timeDay.count(startDate, endDate)
  const DateRange = timeDay.range(startDate, startDate)

  const [tooltipContent, setTooltipContent] = useState('')
  const [inputValue, setInputValue] = useState('')

  const [location, setLocation] = useState('')
  const [covidCasesData, setCovidCasesData] = useState<ReactNode>([])

  async function handleLocationSelect() {
    const { data } = await api
      .from("cases")
      .select()
      .match({ location: `${location}` })
      .match({ date: "2020-05-11" });

      setCovidCasesData(data)
  }
  
  //Verificar tipo correto
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Covid Daily Cases</title>
      </Head>

      <div className={styles.MainContainer}>
        <h1 className={styles.MainTitle}>Covid Daily Cases</h1>
        <div className={styles.MainContent}>
          <Slider
            defaultValue={[0, TotalDays]}
            marks={marks}
            valueLabelDisplay="auto"
            color="primary"
            min={0}
            max={TotalDays}
            onChange={handleInputChange}
          />
          <MapChart handleLocationSelect={handleLocationSelect} setTooltipContent={setTooltipContent} setLocation={setLocation} setCovidCasesData={setCovidCasesData} />
          <ReactTooltip>{tooltipContent}</ReactTooltip>
        </div>
      </div>
    </>
  );
};

export default Home;
