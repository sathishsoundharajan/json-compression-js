const zlib = require("zlib");
const { promisify } = require("util");

const inflateAsync = promisify(zlib.inflate);
const deflateAsync = promisify(zlib.deflate);

// Compress
async function compressJSON(jsonData, log = true) {
  const jsonString = JSON.stringify(jsonData);
  const compressed = await deflateAsync(jsonString);
  const compressedBase64 = compressed.toString("base64");

  if (log) {
    console.log("--- Zlib Inflate & Deflate ---");
    console.log(`Original size: ${jsonString.length} bytes`);
    console.log(`Compressed size: ${compressedBase64.length} bytes`);
    console.log(
      `Compression ratio: ${((compressedBase64.length / jsonString.length) * 100).toFixed(2)}%`,
    );
    console.log("------");
  }

  return compressedBase64;
}

// Decompress
async function decompressJSON(compressedString) {
  const compressed = Buffer.from(compressedString, "base64");
  const decompressed = await inflateAsync(compressed);
  return JSON.parse(decompressed.toString());
}

module.exports = {
  compressJSON,
  decompressJSON,
};

if (!module.parent) {
  const mb10 = require("./10mb-sample.json");
  compressJSON(mb10);
}
