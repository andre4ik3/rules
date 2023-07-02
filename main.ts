import { serve } from "std/http/server.ts";
import * as Snippets from "./rulegen/rules.ts";
import SystemRules from "./rulegen/rules/system.ts";
import { LSRules, Metadata, Rule, Snippet } from "./rulegen/types.ts";
import { prefix } from "./rulegen/utils.ts";

const snippets = new Map<string, Snippet>();

// Import all rule snippets.
for (const [_key, value] of Object.entries(Snippets)) {
  snippets.set(value.metadata.id, value);
}

// Main HTTP server.
serve((req) => {
  const url = new URL(req.url);

  // System rules are handled as a separate endpoint.
  if (url.pathname === "/system") {
    return Response.json(SystemRules);
  }

  // Aggregate endpoint for all apps.
  if (url.pathname === "/all") {
    const data: LSRules = {
      name: "Applications",
      description: "Includes rules for various 3rd-party apps.",
      rules: Array.from(snippets.values()).map((s) => s.rules).flat(),
    };

    return Response.json(data);
  }

  // Endpoint for prefixed apps (as installed on my machine).
  if (url.pathname === "/all-prefixed") {
    return Response.json({ todo: true });
  }

  // Pick-and-choose endpoint.
  if (url.pathname !== "/") {
    const ids = url.pathname.substring(1).split("+");
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
  return Response.redirect(`${url.origin}/all`);
});
