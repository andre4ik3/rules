const folder = new URL(
  import.meta.url.substr(0, import.meta.url.lastIndexOf("/")) + "/rules",
);

await Deno.mkdir("./_site", { recursive: true });

for await (const entry of Deno.readDir(folder.pathname)) {
  if (entry.isFile && entry.name.endsWith(".ts")) {
    const data = await import(`${folder.toString()}/${entry.name}`);
    const path = `./_site/${entry.name.replace(".ts", ".lsrules")}`;
    await Deno.writeTextFile(path, JSON.stringify(data));
  }
}
