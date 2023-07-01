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

const subscribeLink =
  "x-littlesnitch:subscribe-rules?url=https%3A%2F%2Fandre4ik3.github.io%2Frules%2Frules.lsrules";

const intro = `<html lang="en">
<head><title>Little Snitch Application Rules</title></head>
<body><a href="${subscribeLink}">Subscribe</a></body>
</html>`;

await Deno.writeTextFile("./_site/index.html", intro);
