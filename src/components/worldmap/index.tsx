import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import geo from '../../services/database/world-110m.json'

//Verificar Tipo correto
type SetValueProps = {
  setTooltipContent: any,
  setLocation: any,
}

const rounded = (num: number) => {
  if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent, setLocation }: SetValueProps) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
          <Geographies geography={geo}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} - ${rounded(POP_EST)}`);
                    setLocation(NAME)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#c1c1c1",
                      outline: "none",
                      stroke: "#909090",
                      strokeWidth:'0.5',
                    },
                    hover: {
                      fill: "#505050",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#999999",
                      outline: "none",
                    }
                  }}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
