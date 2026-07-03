const buildReportQuery = (queryParams) => {
  const query = {};

  const {
    severity,
    threatType,
    startDate,
    endDate,
  } = queryParams;

  if (severity)
    query.severity = severity;

  if (threatType)
    query.threatType = threatType;

  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate)
      query.createdAt.$gte =
        new Date(startDate);

    if (endDate)
      query.createdAt.$lte =
        new Date(endDate);
  }

  return query;
};

module.exports = buildReportQuery;