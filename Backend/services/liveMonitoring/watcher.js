const fs = require("fs");

let watcher = null;

const startWatcher = (filePath, onNewLine) => {
  if (watcher) {
    watcher.close();
  }

  if (!fs.existsSync(filePath)) {
    throw new Error("Log file not found.");
  }

  let lastSize = fs.statSync(filePath).size;

  watcher = fs.watch(filePath, (eventType) => {
    if (eventType !== "change") return;

    let currentSize;
    try {
      currentSize = fs.statSync(filePath).size;
    } catch (err) {
      console.error("Watcher file access error:", err.message);
      return;
    }

    if (currentSize < lastSize) {
      console.log("📄 Log file rotated. Resetting watcher...");
      lastSize = 0;
    }

    if (currentSize === lastSize) {
      return;
    }

    const stream = fs.createReadStream(filePath, {
      start: lastSize,
      end: currentSize,
      encoding: "utf8",
    });

    let newContent = "";

    stream.on("data", (chunk) => {
      newContent += chunk;
    });

    stream.on("error", (err) => {
      console.error("Read stream error:", err);
    });

    stream.on("end", () => {
      lastSize = currentSize;

      const lines = newContent
        .split("\n")
        .filter((line) => line.trim());

      for (const line of lines) {
        try {
          onNewLine(line);
        } catch (err) {
          console.error(
            "Live line processing failed:",
            err.message
          );
        }
      }
    });
  });

  watcher.on("error", (err) => {
    console.error(
      "Watcher error:",
      err.message
    );
  });

  console.log("👀 Watching:", filePath);
};

const stopWatcher = () => {
  if (watcher) {
    watcher.close();
    watcher = null;

    console.log("🛑 Monitoring stopped.");
  }
};

const isWatching = () => watcher !== null;

module.exports = {
  startWatcher,
  stopWatcher,
  isWatching,
};