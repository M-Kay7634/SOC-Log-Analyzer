import {
  Box,
  Heading,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function ThreatWorldMap({
    origins = [],
}) {

  const bg = useColorModeValue(
    "white",
    "gray.800"
  );

  const threatMap = {};

  origins.forEach((item) => {threatMap[item.country] = item.attacks;});

  const countryCodeMap = {
        "United States of America": "US",
        Australia: "AU",
        India: "IN",
        Germany: "DE",
        France: "FR",
        Canada: "CA",
        China: "CN",
        Japan: "JP",
        Russia: "RU",
        Brazil: "BR",
        "United Kingdom": "GB",
    };


  return (
    <Box
      bg={bg}
      p={5}
      rounded="lg"
      shadow="md"
    >

      <Heading
        size="md"
        mb={4}
      >
        🌍 World Threat Map
      </Heading>

      <ComposableMap
        projectionConfig={{
          scale: 135,
        }}
      >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
            geographies.map((geo) => {
            const code = countryCodeMap[geo.properties.NAME];
            const attacks = threatMap[code] || 0;

            return (
                <Tooltip
                    label={`${geo.properties.NAME}
                  Threats:
                  ${
                  threatMap[
                  countryCodeMap[
                  geo.properties.NAME
                  ]
                  ] || 0
                  }`}
                >
                <Geography
                    geography={geo}
                    style={{
                        default: {
                          fill: (() => {

                            const code =
                              countryCodeMap[
                                geo.properties.NAME
                              ];

                            const attacks =
                              threatMap[code] || 0;

                            if (attacks >= 15)
                              return "#E53E3E";

                            if (attacks >= 6)
                              return "#DD6B20";

                            if (attacks >= 1)
                              return "#D69E2E";

                            return "#E2E8F0";

                        })(),

                        outline: "none",
                      },

                      hover: {
                        fill: "#3182CE",
                        outline: "none",
                      },

                      pressed: {
                        fill: "#2B6CB0",
                        outline: "none",
                      },
                  }}
                />
                </Tooltip>
            );
            })
        }</Geographies> 
      </ComposableMap>

    </Box>
  );
}

export default ThreatWorldMap;