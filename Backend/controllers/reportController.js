const Log = require("../models/Log");
const Report = require("../models/Report");
const buildReportQuery = require("../utils/reportFilters");
const { saveReport } = require("../services/reportService");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

const exportCSV = async (req, res) => {
  // console.log("✅ exportCSV controller called");
  try {
    const query = buildReportQuery(req.query);

    const {
      startDate,
      endDate,
      severity,
      threatType,
    } = req.query;

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const logs = await Log.find(query).sort({
      createdAt: -1,
    });

    await saveReport({
      userId: req.user.id,
      format: "CSV",
      totalLogs: logs.length,
      severity,
      threatType,
    });

    let csv =
      "IP,Country,Threat Type,Severity,Priority,Threat Score,MITRE,Status,Method,URL,Timestamp\n";

    logs.forEach((log) => {
      csv += `"${log.ip}","${log.country}","${log.threatType || ""}","${log.severity || ""}","${log.priority}","${log.threatScore}","${log.mitreTechnique || ""}","${log.status}","${log.method}","${log.url}","${log.timestamp}"\n`;
    });

    res.setHeader(
      "Content-Type",
      "text/csv"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SOC_Report.csv"
    );

    res.send(csv);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const exportExcel = async (req, res) => {
  try {
    const query = buildReportQuery(req.query);

    const {
      startDate,
      endDate,
      severity,
      threatType,
    } = req.query;

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate)
        query.createdAt.$gte = new Date(startDate);

      if (endDate)
        query.createdAt.$lte = new Date(endDate);
    }

    const logs = await Log.find(query).sort({
      createdAt: -1,
    });

    await saveReport({
      userId: req.user.id,
      format: "Excel",
      totalLogs: logs.length,
      severity,
      threatType,
    });

    const workbook = new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet("SOC Report");

    worksheet.columns = [
      { header: "IP", key: "ip", width: 18 },
      { header: "Country", key: "country", width: 15 },
      { header: "Threat Type", key: "threatType", width: 20 },
      { header: "Severity", key: "severity", width: 15 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Threat Score", key: "threatScore", width: 15 },
      { header: "MITRE", key: "mitreTechnique", width: 15 },
      { header: "Status", key: "status", width: 12 },
      { header: "Method", key: "method", width: 12 },
      { header: "URL", key: "url", width: 35 },
      { header: "Timestamp", key: "timestamp", width: 28 },
    ];

    logs.forEach((log) => {
      worksheet.addRow({
        ip: log.ip,
        country: log.country,
        threatType: log.threatType,
        severity: log.severity,
        priority: log.priority,
        threatScore: log.threatScore,
        mitreTechnique: log.mitreTechnique,
        status: log.status,
        method: log.method,
        url: log.url,
        timestamp: log.timestamp,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="SOC_Report.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const exportPDF = async (req, res) => {
  try {
    const query = buildReportQuery(req.query);

    const {
      startDate,
      endDate,
      severity,
      threatType,
    } = req.query;

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate)
        query.createdAt.$gte = new Date(startDate);

      if (endDate)
        query.createdAt.$lte = new Date(endDate);
    }

    const logs = await Log.find(query).sort({
      createdAt: -1,
    });

    await saveReport({
      userId: req.user.id,
      format: "PDF",
      totalLogs: logs.length,
      severity,
      threatType,
    });

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="SOC_Report.pdf"'
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(22)
      .text("SOC LOG ANALYZER", {
        align: "center",
      });

    doc
      .fontSize(16)
      .text("Threat Analysis Report", {
        align: "center",
      });

    doc.moveDown();

    // Report Info
    doc.fontSize(12);

    doc.text(
      `Generated On: ${new Date().toLocaleString()}`
    );

    doc.text(
      `Severity: ${severity || "All"}`
    );

    doc.text(
      `Threat Type: ${threatType || "All"}`
    );

    doc.moveDown();

    // Summary
    doc.fontSize(16).text("Summary");

    doc.fontSize(12);

    const threats = logs.filter(log => log.threat).length;

    const critical = logs.filter(
      log => log.priority === "Critical"
    ).length;

    const high = logs.filter(
      log => log.priority === "High"
    ).length;

    const medium = logs.filter(
      log => log.priority === "Medium"
    ).length;

    const low = logs.filter(
      log => log.priority === "Low"
    ).length;

    doc.text(`Total Logs : ${logs.length}`);
    doc.text(`Threats : ${threats}`);
    doc.text(`Critical : ${critical}`);
    doc.text(`High : ${high}`);
    doc.text(`Medium : ${medium}`);
    doc.text(`Low : ${low}`);

    doc.moveDown();

    // Table Header
    doc.fontSize(14).text("Threat Details");

    doc.moveDown(0.5);

    logs.forEach((log) => {
      doc.text(
        `${log.ip} | ${log.threatType || "-"} | ${log.priority} | ${log.status}`
      );
    });

    doc.moveDown();

    doc.text(
      "Generated by SOC Log Analyzer",
      {
        align: "center",
      }
    );

    doc.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  exportCSV,
  exportExcel,
  exportPDF,
};