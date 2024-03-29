// Stupid workaround of Deno Deploy not supporting dynamic imports.
import { pascalCase } from "case";

const path = new URL(
  import.meta.url.slice(0, import.meta.url.lastIndexOf("/")) + "/rules.ts",
);
const dir = new URL(
  import.meta.url.slice(0, import.meta.url.lastIndexOf("/")) + "/rules/apps/",
);
const file = ["// This file is generated by the `build.ts` file. Do not edit."];

export async function makeImports() {
  for await (const entry of Deno.readDir(dir.pathname)) {
    if (entry.isFile && entry.name.endsWith(".ts")) {
      const name = pascalCase(entry.name.replace(".ts", ""));
      file.push(`export * as ${name} from "./rules/apps/${entry.name}";`);
    }
  }

  file.push(""); // newline at the end :^)
  await Deno.writeTextFile(path, file.join("\n"));
}

if (import.meta.main) {
  await makeImports();
}
