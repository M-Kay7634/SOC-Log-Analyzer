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
import { useMemo, memo, } from "react";
import EmptyState from "../common/EmptyState";
import {WORLD_MAP} from '../../constants/map';

const geoUrl = WORLD_MAP;


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

function ThreatWorldMap({
    origins = [],
}) {
      const bg = useColorModeValue("white", "gray.800");
      if (!origins.length) {
        return (
          <Box
            bg={bg}
            p={5}
            rounded="lg"
            shadow="md"
          >
            <Heading size="md" mb={4}>
              🌍 World Threat Map
            </Heading>

            <EmptyState
              title="No Threat Map"
              description="Upload logs to visualize attack locations."
            />
          </Box>
        );
      }


  const threatMap = useMemo(() => {
    const map = {};

    origins.forEach((item) => {
      map[item.country] = item.attacks;
    });

    return map;
  }, [origins]);


    const getCountryColor = (attacks) => {
      if (attacks >= 15) return "#E53E3E";
      if (attacks >= 6) return "#DD6B20";
      if (attacks >= 1) return "#D69E2E";
      return "#E2E8F0";
    };


  return (
    <Box
      bg={bg}
      p={5}
      rounded="lg"
      shadow="md"
      minH="420px"
    >

      <Heading
        size="md"
        mb={4}
      >
        🌍 World Threat Map
      </Heading>

      <ComposableMap
        projectionConfig={{
          scale: 145,
        }}
      >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
            geographies.map((geo) => {
            const code = countryCodeMap[geo.properties.NAME];
            const attacks = threatMap[code] || 0;

            return (
                <Tooltip
                  key={geo.rsmKey}
                  label={`${geo.properties.NAME} • ${attacks} attack(s)`}
                >
                <Geography
                    geography={geo}
                    style={{
                        default: {
                          fill: getCountryColor(attacks),

                        outline: "none",
                      },

                      hover: {
                        fill: "#3182CE",
                        outline: "none",
                        cursor:"pointer",
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

export default memo(ThreatWorldMap);