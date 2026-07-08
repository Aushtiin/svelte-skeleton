const { basename } = require("path");
const svelte = require("svelte/compiler");

module.exports = {
  process(source, filename) {
    const result = svelte.compile(source, {
      filename: basename(filename),
      css: true,
      accessors: true,
      dev: true,
      format: "cjs",
    });
    return { code: result.js.code, map: JSON.stringify(result.js.map) };
  },
};
