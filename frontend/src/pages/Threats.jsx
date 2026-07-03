import { useEffect, useState } from "react";
import { Heading, Spinner, Center, useToast, Button } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import ThreatTable from "../components/threats/ThreatTable";
import { getAllThreats } from "../services/threatService";
import ThreatFilters from "../components/threats/ThreatFilters";
import ThreatStats from "../components/threats/ThreatStats";
import { deleteLog, bulkDeleteLogs, deleteMyLogs, deleteAllLogs } from "../services/logService";
import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";

function Threats() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogs, setSelectedLogs] = useState([]);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const toast = useToast();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchThreats();

    socket.on("dashboardUpdated", () => {
      console.log("📡 Threat List Updated");
      fetchThreats();
    });

    return () => {
      socket.off("dashboardUpdated");
    };
  }, [page]);

    const fetchThreats = async () => {
      try {
        const data = await getAllThreats(page, 10);
        setThreats(data.threats);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (id) => {
      try {
        await deleteLog(id);

        toast({
          title: "Log deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        fetchThreats();

      } catch (error) {
        toast({
          title:
            error.response?.data?.message ||
            "Failed to delete log",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    const handleBulkDelete = async () => {
    try {
      await bulkDeleteLogs(selectedLogs);

      toast({
        title: "Selected logs deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedLogs([]);

      fetchThreats();

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Failed to delete logs",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMyLogs = async () => {
    try {
      const data = await deleteMyLogs();

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedLogs([]);

      fetchThreats();

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Failed to delete logs",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAllLogs = async () => {
    try {
      const data = await deleteAllLogs();

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedLogs([]);
      fetchThreats();

    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Failed to delete logs",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
    (threat.ip || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    (threat.threatType || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    (threat.country || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    (threat.region || "")
      .toLowerCase()
    .includes(search.toLowerCase());

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
      <Button
        colorScheme="orange"
        mb={4}
        onClick={handleDeleteMyLogs}
      >
        Delete My Uploaded Logs
      </Button>
      {user.role === "Admin" && (
        <Button
          colorScheme="red"
          mb={4}
          ml={3}
          onClick={handleDeleteAllLogs}
        >
          Delete All Logs
        </Button>
      )}

      <ThreatTable 
        threats={filteredThreats}
        onDelete={handleDelete}
        selectedLogs={selectedLogs}
        setSelectedLogs={setSelectedLogs}
        onBulkDelete={handleBulkDelete}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </DashboardLayout>
  );
}

export default Threats;