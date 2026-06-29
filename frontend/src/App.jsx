import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import socket from "./services/socket";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UploadLogs from "./pages/UploadLogs";
import Threats from "./pages/Threats";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Reports from "./pages/Reports";


function App() {
  const toast = useToast();
  useEffect(() => {
    socket.on("connected", (data) => {
      console.log(data.message);
    });

    socket.on("newLog", (data) => {
      console.log("New Upload:", data);

      toast({
        title: "New Log Uploaded",
        description: `${data.sourceFile} (${data.totalLogs} logs)`,
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    });

    return () => {
      socket.off("connected");
      socket.off("newLog");
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/verify-otp" element={<VerifyOTP />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      
      <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

      <Route path="/upload" element={<ProtectedRoute><UploadLogs /></ProtectedRoute>}/>

      <Route path="/threats"element={<ProtectedRoute><Threats /></ProtectedRoute>}/>

      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>}/>

      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>}/>

      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
      
    </Routes>
  );
}

export default App;