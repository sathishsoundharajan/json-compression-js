const { pack, unpack } = require("msgpackr");

function compressJSON(data, log = true) {
  const jsonString = JSON.stringify(data);
  const serializedAsBuffer = pack(data);
  const compressedBase64 = serializedAsBuffer.toString("base64");

  if (log) {
    console.log("--- MessagePackr ---");
    console.log(`Original size: ${jsonString.length} bytes`);
    console.log(`Compressed size: ${compressedBase64.length} bytes`);
    console.log(
      `Compression ratio: ${((compressedBase64.length / jsonString.length) * 100).toFixed(2)}%`,
    );
    console.log("--- ---");
  }

  return compressedBase64;
}

function decompressJSON(data) {
  return unpack(Buffer.from(data, "base64"));
}

module.exports = {
  compressJSON,
  decompressJSON,
};

if (!module.parent) {
  const mb10 = require("./10mb-sample.json");
  const data = compressJSON(mb10);
  decompressJSON(data);
}
