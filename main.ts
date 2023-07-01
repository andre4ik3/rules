import { Handlebars } from "handlebars";
import { LSRules, Metadata, Rule } from "./rulegen/types.ts";
import { serve } from "std/http/server.ts";
import SystemRules from "./rulegen/rules/system.ts";

type Snippet = { metadata: Metadata; rules: Rule[] };

const self = import.meta.url;
const snippets = new Map<string, Snippet>();
const snippetsDir = new URL(self.slice(0, self.lastIndexOf("/")) + "/rulegen/rules/apps/");

// Import all rule snippets dynamically.
for await (const entry of Deno.readDir(snippetsDir.pathname)) {
  if (entry.isFile && entry.name.endsWith(".ts")) {
    const id = entry.name.replace(".ts", "");
    const data: Omit<Snippet, "id"> = await import(snippetsDir.toString() + entry.name);
    snippets.set(id, data);
  }
}

// Create prefixed variants.
const prefixedSnippets = new Map<string, Snippet>();

// Main HTTP server.
serve((req) => {
  const url = new URL(req.url);

  // System rules are handled as a separate endpoint.
  if (url.pathname === "/rules/system") {
    return Response.json(SystemRules);
  }

  // Aggregate endpoint for all apps.
  if (url.pathname === "/rules/all") {
    const data: LSRules = {
      name: "Applications",
      description: "Includes rules for various 3rd-party apps.",
      rules: Array.from(snippets.values()).map((s) => s.rules).flat(),
    };

    return Response.json(data);
  }

  // Endpoint for prefixed apps (as installed on my machine).
  if (url.pathname === "/rules/all-prefixed") {
    const data: LSRules = {
      name: "Applications",
      description: "Includes rules for various 3rd-party apps (prefixed).",
      rules: Array.from(prefixedSnippets.values()).map((s) => s.rules).flat(),
    };

    return Response.json(data);
  }

  // Pick-and-choose endpoint.
  if (url.pathname.startsWith("/rules")) {
    const ids = url.pathname.replace("/rules/", "").split("+");
    const selected = ids.map((id) => snippets.get(id));

    if (selected.some((s) => !s)) {
      return new Response("one of the apps was not found", { status: 404 });
    }

    const rules = selected.map((s) => s!.rules).flat();
    const names = selected.map((s) => s!.metadata.name).join(", ");

    const data: LSRules = {
      name: "Applications",
      description: `Includes rules for the following 3rd-party apps: ${names}.`,
      rules,
    };

    return Response.json(data);
  }

  // By default, redirect to all rules endpoint. TODO: user interface
  return Response.redirect(`${url.origin}/rules/all`);
});
