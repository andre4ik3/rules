import { Rule, Snippet } from "./types.ts";

function setPrefix(rule: Rule, prefix: string): Rule {
  if (rule.process.startsWith("/Applications")) {
    return {
      ...rule,
      process: rule.process.replace("/Applications", prefix),
      via: rule.via?.replace("/Applications", prefix),
    };
  } else return rule;
}

export function prefix(snippet: Snippet, prefix: string, id: string): Snippet {
  if (snippet.metadata.properties?.canHavePrefix) {
    return {
      metadata: { ...snippet.metadata, id: `${snippet.metadata.id}-${id}` },
      rules: [...snippet.rules].map((v) => setPrefix(v, prefix)),
    };
  } else return snippet;
}
