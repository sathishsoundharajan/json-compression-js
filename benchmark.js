const { Bench } = require("tinybench");
const mb10 = require("./10mb-sample.json");
const zLibFunc = require("./try-zlib");
const brotliFunc = require("./try-brotli");
const msgPackrFunc = require("./try-msgpackr");
const lz4Func = require("./try-lz4");
const snappyFunc = require("./try-snappy");

async function runBenchMark(name, instanceOf) {
  const bench = new Bench({ time: 60000 }); // Running bench for 60 seconds

  let compressed = "";
  let logOnce = true;
  bench.add(`${name} compress`, async () => {
    compressed = await instanceOf.compressJSON(mb10, logOnce);
    logOnce = false;
  });

  bench.add(`${name} decompress`, async () => {
    if (compressed) {
      await instanceOf.decompressJSON(compressed);
    }
  });

  await bench.warmup();
  await bench.run();

  console.table(bench.table());
}

async function main() {
  await runBenchMark("snappy", snappyFunc);
  await runBenchMark("lz4", lz4Func);
  await runBenchMark("zlib", zLibFunc);
  await runBenchMark("Brotli", brotliFunc);
  await runBenchMark("MsgPackr", msgPackrFunc);
}

main().catch(console.error);
