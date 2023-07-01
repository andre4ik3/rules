import Applications from "./rules/applications.ts";

await Deno.mkdir("./_site", { recursive: true });

[Applications].forEach((file) => {
  const filename = file.name.toLowerCase();
  Deno.writeTextFileSync(`./_site/${filename}.lsrules`, JSON.stringify(file));
});
