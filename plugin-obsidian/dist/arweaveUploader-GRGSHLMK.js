import "./chunk-G3PMV62Z.js";

// src/helper/arweaveUploader.ts
import * as fs from "fs";
import * as path from "path";
import Arweave from "arweave";
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html";
  if (ext === ".css") return "text/css";
  if (ext === ".js") return "application/javascript";
  if (ext === ".json") return "application/json";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".pdf") return "application/pdf";
  return "application/octet-stream";
}
function getAllFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}
async function uploadFile(arweave, wallet, file, publicDir) {
  const relativePath = path.relative(publicDir, file);
  const data = fs.readFileSync(file);
  try {
    const tx = await arweave.createTransaction({ data }, wallet);
    tx.addTag("Content-Type", getContentType(file));
    tx.addTag("App-Name", "Quartz-Site");
    tx.addTag("Path", relativePath);
    await arweave.transactions.sign(tx, wallet);
    const response = await arweave.transactions.post(tx);
    if (response.status === 200 || response.status === 202) {
      console.log(`Uploaded ${relativePath} as ${tx.id}`);
      return { path: relativePath, id: tx.id, success: true };
    } else {
      console.error(`Failed to upload ${relativePath}: ${response.status}`);
      return { path: relativePath, success: false, error: response.status };
    }
  } catch (error) {
    console.error(`Error uploading ${relativePath}:`, error);
    return { path: relativePath, success: false, error };
  }
}
async function createAndUploadManifest(arweave, wallet, txIds) {
  const indexTxId = txIds["index.html"];
  if (!indexTxId) {
    return { success: false, error: "index.html not found in uploaded files" };
  }
  try {
    const manifest = {
      manifest: "arweave/paths",
      version: "0.2.0",
      index: {
        path: "index.html"
      },
      paths: {}
    };
    for (const [filePath, id] of Object.entries(txIds)) {
      manifest.paths[filePath] = { id };
    }
    for (const [filePath, id] of Object.entries(txIds)) {
      if (filePath.endsWith(".html") && filePath !== "index.html" && filePath !== "404.html") {
        const pathWithoutExtension = filePath.replace(/\.html$/, "");
        if (!manifest.paths[pathWithoutExtension]) {
          manifest.paths[pathWithoutExtension] = { id };
        }
      }
    }
    manifest.fallback = { id: indexTxId };
    const manifestTx = await arweave.createTransaction({
      data: JSON.stringify(manifest)
    }, wallet);
    manifestTx.addTag("Content-Type", "application/x.arweave-manifest+json");
    manifestTx.addTag("App-Name", "Quartz-Site");
    await arweave.transactions.sign(manifestTx, wallet);
    const manifestResponse = await arweave.transactions.post(manifestTx);
    if (manifestResponse.status === 200 || manifestResponse.status === 202) {
      console.log(`Manifest uploaded as ${manifestTx.id}`);
      console.log(`Site URL: https://arweave.net/${manifestTx.id}`);
      return {
        id: manifestTx.id,
        url: `https://arweave.net/${manifestTx.id}`,
        success: true
      };
    } else {
      console.error(`Failed to upload manifest: ${manifestResponse.status}`);
      return { success: false, error: manifestResponse.status };
    }
  } catch (error) {
    console.error("Error creating and uploading manifest:", error);
    return { success: false, error };
  }
}
async function uploadSiteToArweave(walletPath, publicDir) {
  try {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https"
    });
    const wallet = JSON.parse(fs.readFileSync(walletPath, "utf8"));
    const files = getAllFiles(publicDir);
    console.log(`Found ${files.length} files to upload`);
    const txIds = {};
    for (const file of files) {
      const result = await uploadFile(arweave, wallet, file, publicDir);
      if (result.success && result.path && result.id) {
        txIds[result.path] = result.id;
      }
    }
    return await createAndUploadManifest(arweave, wallet, txIds);
  } catch (error) {
    console.error("Error uploading site:", error);
    return { success: false, error };
  }
}
export {
  uploadSiteToArweave
};
//# sourceMappingURL=arweaveUploader-GRGSHLMK.js.map