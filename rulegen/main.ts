import { LSRules } from "./utils.ts";
import Rules from "./rules.ts";

const rules: LSRules = {
  name: "Application Rules",
  description:
    "Allows various applications to function. Each rule corresponds to specific functionality of the application, detailed in the description. Note: All rules are disabled by default!",
  rules: Rules,
};

await Deno.mkdir("./_site", { recursive: true });
await Deno.writeTextFile("./_site/rules.lsrules", JSON.stringify(rules));
