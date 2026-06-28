import { useEffect, useState } from "react";
import { Heading, Spinner, Center } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import ThreatTable from "../components/threats/ThreatTable";
import { getAllThreats } from "../services/threatService";
import ThreatFilters from "../components/threats/ThreatFilters";
import ThreatStats from "../components/threats/ThreatStats";

function Threats() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const data = await getAllThreats();
      setThreats(data.threats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Center h="300px">
          <Spinner size="xl" />
        </Center>
      </DashboardLayout>
    );
  }
  const filteredThreats = threats.filter((threat) => {
  const matchesSearch =
    threat.ip.toLowerCase().includes(search.toLowerCase()) ||
    threat.threatType.toLowerCase().includes(search.toLowerCase());

  const matchesPriority =
    priority === "" || threat.priority === priority;

    return matchesSearch && matchesPriority;
  });

  return (
    <DashboardLayout>
      <Heading mb={6}>Threat Management</Heading>
      
      <ThreatStats threats={filteredThreats} />

      <ThreatFilters
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />

      <ThreatTable threats={filteredThreats} />
    </DashboardLayout>
  );
}

export default Threats;