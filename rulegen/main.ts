import Applications from "./rules/applications.ts";
import System from "./rules/system.ts";

await Deno.mkdir("./_site", { recursive: true });

[Applications, System].forEach((file) => {
  const filename = file.name.toLowerCase();
  Deno.writeTextFileSync(`./_site/${filename}.lsrules`, JSON.stringify(file));
});
