import { Badge } from "@chakra-ui/react";

function StatusBadge({
  value,
  type = "priority",
}) {
  let color = "gray";

  switch (type) {
    case "priority":
      switch (value) {
        case "Critical":
          color = "red";
          break;

        case "High":
          color = "orange";
          break;

        case "Medium":
          color = "yellow";
          break;

        case "Low":
          color = "green";
          break;

        default:
          color = "gray";
      }
      break;

    case "format":
      switch (value) {
        case "PDF":
          color = "red";
          break;

        case "Excel":
          color = "green";
          break;

        case "CSV":
          color = "blue";
          break;

        default:
          color = "gray";
      }
      break;

    case "role":
      switch (value) {
        case "Admin":
          color = "purple";
          break;

        case "Analyst":
          color = "blue";
          break;

        default:
          color = "gray";
      }
      break;

    case "severity":
      switch (value) {
        case "Critical":
          color = "red";
          break;

        case "High":
          color = "orange";
          break;

        case "Medium":
          color = "yellow";
          break;

        case "Low":
          color = "green";
          break;

        default:
          color = "gray";
      }
      break;

    case "monitoring":
      switch (value) {
        case "Active":
          color = "green";
          break;

        case "Stopped":
          color = "red";
          break;

        default:
          color = "gray";
      }
      break;

    default:
      color = "gray";
  }

  return (
    <Badge colorScheme={color}>
      {value || "-"}
    </Badge>
  );
}

export default StatusBadge;