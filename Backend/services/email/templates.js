const threatAlertTemplate = (log) => {
  return `
    <h2>🚨 SOC Threat Alert</h2>

    <p><strong>Threat:</strong> ${log.threatType}</p>

    <p><strong>Priority:</strong> ${log.priority}</p>

    <p><strong>Severity:</strong> ${log.severity}</p>

    <p><strong>IP Address:</strong> ${log.ip}</p>

    <p><strong>Timestamp:</strong> ${log.timestamp}</p>

    <p><strong>MITRE:</strong> ${log.mitreTechnique}</p>

    <p><strong>Threat Score:</strong> ${log.threatScore}</p>

    <hr>

    <p>This alert was generated automatically by the SOC Log Analyzer.</p>
  `;
};

module.exports = {
  threatAlertTemplate,
};