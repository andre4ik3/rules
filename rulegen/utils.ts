import { Rule, Snippet } from "./types.ts";

function setPrefix(rule: Rule, prefix: string): Rule {
  const process = rule.process.startsWith("/Applications")
    ? rule.process.replace("/Applications", prefix)
    : rule.process;

  const via = rule.via?.startsWith("/Applications")
    ? rule.via.replace("/Applications", prefix)
    : rule.via;

  return { ...rule, process, via };
}

export function prefix(snippet: Snippet, prefix: string, id: string): Snippet {
  if (snippet.metadata.properties?.canHavePrefix) {
    return {
      metadata: { ...snippet.metadata, id: `${snippet.metadata.id}-${id}` },
      rules: [...snippet.rules].map((v) => setPrefix(v, prefix)),
    };
  } else return snippet;
}
