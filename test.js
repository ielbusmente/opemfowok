const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

async function copyMarkdownContent() {
    const filePath = path.join(__dirname, "test.md");
    const markdown = await readFile(filePath, "utf8");
    const escapeSequences = {
      '"': '"',
      "\\": "\\",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t",
    };
    const content = markdown.replace(
      /\\(["\\bfnrt]|u[0-9a-fA-F]{4})/g,
      (_match, escape) => {
        if (escape.startsWith("u")) {
          return String.fromCharCode(Number.parseInt(escape.slice(1), 16));
        }

        return escapeSequences[escape];
      },
    );

    await writeFile(filePath, content, "utf8");
}

copyMarkdownContent().catch((error) => {
    console.error("Failed to process test.md:", error);
    process.exitCode = 1;
});
