import Applications from "./applications.ts";

const exceptions = ["Little Snitch", "Safari", "WireGuard", "Remote Desktop"]
  .map((app) => `/Applications/${app}.app`);

function prefix(path: string) {
  if (!exceptions.some((el) => path.startsWith(el))) {
    return path.replace("/Applications", "/Applications/Homebrew");
  } else {
    return path;
  }
}

const rules = [...Applications.rules].map((rule) => ({
  ...rule,
  process: prefix(rule.process),
}));

export default { ...Applications, rules };
