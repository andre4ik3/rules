import { Direction, makeRule, Protocol, Remote, RemoteType } from "../ls.ts";
import Paths from "../paths.json" assert { type: "json" };

const rules = [
  /* ======================================================================== */
  /* Weather                                                                  */
  /* ======================================================================== */

  makeRule({
    process: [
      Paths.weather.app,
      Paths.weather.widget,
      Paths.weather.widgetIntents,
    ],
    remote: [RemoteType.Host, [
      "bag.itunes.apple.com",
      "play.itunes.apple.com",
      "s.mzstatic.com",
      "weather-edge.apple.com",
      "weather-data.apple.com",
      "weather-map2.apple.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Weather and its widgets to operate.",
  }),
].flat();

export default {
  name: "System Services",
  description:
    "Contains rules for operating system functions that are more finely-scoped than those included with Little Snitch. Note: All rules are disabled by default!",
  rules,
};
