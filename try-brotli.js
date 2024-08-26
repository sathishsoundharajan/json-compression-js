const zlib = require("zlib");
const { promisify } = require("util");

const brotliCompressAsync = promisify(zlib.brotliCompress);
const brotliDecompressAsync = promisify(zlib.brotliDecompress);

async function compressJSON(jsonData, log = true) {
  const jsonString = JSON.stringify(jsonData);
  const compressed = await brotliCompressAsync(Buffer.from(jsonString));
  const compressedBase64 = compressed.toString("base64");

  if (log) {
    console.log("--- Brotli ---");
    console.log(`Original size: ${jsonString.length} bytes`);
    console.log(`Compressed size: ${compressedBase64.length} bytes`);
    console.log(
      `Compression ratio: ${((compressedBase64.length / jsonString.length) * 100).toFixed(2)}%`,
    );
    console.log("---  ---");
  }

  return compressedBase64;
}

async function decompressJSON(compressedBase64) {
  return await brotliDecompressAsync(Buffer.from(compressedBase64, "base64"));
}

module.exports = {
  compressJSON,
  decompressJSON,
};

if (!module.parent) {
  const mb10 = require("./10mb-sample.json");
  compressJSON(mb10);
}
