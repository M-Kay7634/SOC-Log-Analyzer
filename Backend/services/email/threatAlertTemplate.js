const threatAlertTemplate = (log) => {
  return `
<h2>🚨 SOC Threat Alert</h2>

<p><strong>Threat:</strong> ${log.threatType || "N/A"}</p>

<p><strong>Priority:</strong> ${log.priority || "N/A"}</p>

<p><strong>Severity:</strong> ${log.severity || "N/A"}</p>

<p><strong>IP Address:</strong> ${log.ip || "N/A"}</p>

<p><strong>Timestamp:</strong> ${log.timestamp || "N/A"}</p>

<p><strong>MITRE:</strong> ${log.mitreTechnique || "N/A"}</p>

<p><strong>Threat Score:</strong> ${log.threatScore ?? "N/A"}</p>

<hr>

<p>
This alert was generated automatically by the
SOC Log Analyzer.
</p>
`;
};

module.exports = threatAlertTemplate;