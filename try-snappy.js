const Snappy = require("snappy");

// Compress
async function compressJSON(jsonData, log = true) {
  const jsonString = JSON.stringify(jsonData);
  const compressed = await Snappy.compress(Buffer.from(jsonString));
  const compressedBase64 = compressed.toString("base64");

  if (log) {
    console.log("--- Snappy ---");
    console.log(`Original size: ${jsonString.length} bytes`);
    console.log(`Compressed size: ${compressedBase64.length} bytes`);
    console.log(
      `Compression ratio: ${((compressedBase64.length / jsonString.length) * 100).toFixed(2)}%`,
    );
    console.log("--- ---");
  }

  return compressedBase64;
}

// Decompress
async function decompressJSON(compressedString) {
  const compressed = Buffer.from(compressedString, "base64");
  const decompressed = await Snappy.uncompress(compressed);
  return JSON.parse(decompressed.toString());
}

module.exports = {
  compressJSON,
  decompressJSON,
};

if (!module.parent) {
  const mb10 = require("./10mb-sample.json");

  async function main() {
    const result = await compressJSON(mb10);
    await decompressJSON(result);
  }

  main().catch(console.error);
}
