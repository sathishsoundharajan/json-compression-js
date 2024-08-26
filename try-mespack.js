const msgpack = require("@msgpack/msgpack");

// Compress
function compressJSON(jsonData, log = true) {
  const jsonString = JSON.stringify(jsonData);
  const compressed = msgpack.encode(jsonData);
  const compressedBase64 = compressed.toString("base64");

  if (log) {
    console.log("--- Message Pack ---");
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
// This didn't work, work on the fix
// RangeError: Extra 16383980 of 16383990 byte(s) found at buffer[10]
function decompressJSON(compressedString) {
  const buffer = Buffer.from(compressedString, "base64");
  return msgpack.decode(buffer);
}

module.exports = {
  compressJSON,
  decompressJSON,
};

if (!module.parent) {
  const mb10 = require("./10mb-sample.json");
  const result = compressJSON(mb10);
  decompressJSON(result);
}
