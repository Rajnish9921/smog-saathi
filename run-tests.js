// Zero-dependency test runner: node run-tests.js [index.html]
const fs = require("fs");
const file = process.argv[2] || (fs.existsSync("index.html") ? "index.html" : "smog-saathi.html");
const html = fs.readFileSync(file, "utf8");
const code = html.match(/<script>([\s\S]*)<\/script>/)[1];
// Minimal DOM stub so the browser script can load in Node
const stub = () => new Proxy(function () {}, {
  get: (t, k) => (k === Symbol.toPrimitive ? () => "" : stub()),
  set: () => true, apply: () => stub(), construct: () => stub(),
});
global.document = { getElementById: stub, querySelectorAll: () => [], createElement: stub };
global.window = global; global.location = { hash: "" }; global.Option = function () {};
eval(code);
const results = window.SmogSaathi.runTests();
results.forEach(([name, pass]) => console.log(pass ? "PASS" : "FAIL", name));
const passed = results.filter((r) => r[1]).length;
console.log(`\n${passed}/${results.length} tests passed`);
process.exit(passed === results.length ? 0 : 1);
