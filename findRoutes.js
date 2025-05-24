import fs from "fs";
import path from "path";

const rootDir = process.cwd(); 

function getJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsFiles(filePath));
    } else {
      if (file.endsWith(".js") || file.endsWith(".mjs")) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function findExpressRoutes(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, i) => {
    if (line.match(/\bapp\.(get|post|put|delete|use)\s*\(/)) {
      console.log(`${filePath}:${i+1}: ${line.trim()}`);
    }
  });
}

const files = getJsFiles(rootDir);
files.forEach(findExpressRoutes);
