const fs = require("fs");
const path = require("path");

const formatTimestamp = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());

  return `${yyyy}${mm}${dd}${hh}${min}`; // e.g., 202506042032
};

const version = formatTimestamp();

// Resolve to projectRoot/public/version.json
const outputDir = path.resolve(__dirname, "../public");
const outputFile = path.resolve(outputDir, "version.json");

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write version
fs.writeFileSync(outputFile, JSON.stringify({ version }, null, 2));
console.log(`✅ Generated version.json: ${version}`);
