const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = path.resolve(__dirname);
const database = path.resolve(root, "..", "database");
const databaseSrc = path.resolve(database, "src");
const databaseDist = path.resolve(database, "dist");

const linksInputPath = path.resolve(databaseSrc, "links.json");
const linksOutputPath = path.resolve(databaseDist, "links.json");

const thoughtsInputPath = path.resolve(databaseSrc, "thoughts.json");
const thoughtsOutputPath = path.resolve(databaseDist, "thoughts.json");

async function jsonldToJson(inputPath, outputPath) {
  const values = [];
  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    values.push(JSON.parse(line.trim()));
  }

  fs.writeFileSync(outputPath, JSON.stringify(values));
}

(async () => {
  await Promise.all([
    jsonldToJson(linksInputPath, linksOutputPath),
    jsonldToJson(thoughtsInputPath, thoughtsOutputPath),
  ]);
})();
