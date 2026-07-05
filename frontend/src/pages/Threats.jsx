import { useEffect, useState, useCallback, memo, useMemo} from "react";
import { Heading, Center, useToast, Button, HStack, } from "@chakra-ui/react";

import DashboardLayout from "../layouts/DashboardLayout";
import ThreatTable from "../components/threats/ThreatTable";
import { getAllThreats } from "../services/threatService";
import ThreatFilters from "../components/threats/ThreatFilters";
import ThreatStats from "../components/threats/ThreatStats";
import { deleteLog, bulkDeleteLogs, deleteMyLogs, deleteAllLogs } from "../services/logService";
import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";
import LoadingSkeleton from '../components/common/LoadingSkeleton';

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

  const fetchThreats = useCallback(async () => {
      try {
        const data = await getAllThreats(page, 10);
        setThreats(data.threats);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast({
          title: "Failed to load threats",
          description:
            error.response?.data?.message ||
            "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    },[page]);

  useEffect(() => {
    fetchThreats();

    socket.on("dashboardUpdated", fetchThreats);

    return () => {
      socket.off("dashboardUpdated");
    };
  }, [fetchThreats]);


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

  const filteredThreats = useMemo(() => {
    return threats.filter((threat) => {
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
        priority === "" ||
        threat.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [threats, search, priority]);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Heading mb={6}>Threat Management Center</Heading>
      
      <ThreatStats threats={filteredThreats} />

      <ThreatFilters
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />
      <HStack mb={4} spacing={3}>
        <Button
          colorScheme="orange"
          onClick={handleDeleteMyLogs}
        >
          Delete My Uploaded Logs
        </Button>

        {user.role === "Admin" && (
          <Button
            colorScheme="red"
            onClick={handleDeleteAllLogs}
          >
            Delete All Logs
          </Button>
        )}
      </HStack>

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

export default memo(Threats);