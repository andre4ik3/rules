import { Direction, makeRule, Protocol, Remote, RemoteType } from "../ls.ts";

const Paths = {} as const;

const rules = [].flat();

export default {
  name: "System Services",
  description:
    "Contains rules for operating system functions that are more finely-scoped than those included with Little Snitch. Note: All rules are disabled by default!",
  rules,
};
