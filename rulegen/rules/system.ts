import { makeRule, Protocol, Remote, RemoteType } from "../types.ts";
import Paths from "../paths.json" assert { type: "json" };

const rules = [
  makeRule({
    process: [Paths.system.geoDaemon],
    remote: [RemoteType.Domain, ["ls.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows loading and displaying native maps.",
  }),

  makeRule({
    process: [Paths.system.networkServiceProxy],
    remote: [RemoteType.Host, ["mask-api.icloud.com"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows various system services to connect to Apple without revealing the client's IP address (similar to iCloud Private Relay).",
  }),

  /* ======================================================================== */
  /* Safari                                                                   */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.safari.app],
    remote: Remote.Any,
    using: [[Protocol.TCP, "any"], [Protocol.UDP, "any"]],
    notes: "Allows Safari to be used for web browsing.",
  }),

  makeRule({
    process: [Paths.system.safari.safeBrowsingService],
    remote: [RemoteType.Domain, ["safebrowsing.apple"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Safari's Safe Browsing integration to work.",
  }),

  /* ======================================================================== */
  /* Weather                                                                  */
  /* ======================================================================== */

  makeRule({
    process: [
      Paths.system.weather.app,
      Paths.system.weather.widget,
      Paths.system.weather.widgetIntents,
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

  /* ======================================================================== */
  /* Software Update                                                          */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.update.daemon],
    remote: [RemoteType.Host, ["swscan.apple.com", "swdist.apple.com", "xp.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the system to check for and download software updates.",
  }),

  makeRule({
    process: [Paths.system.update.assetDaemon],
    remote: [RemoteType.Host, ["gdmf.apple.com", "xp.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the system to download software updates.",
  }),
].flat();

export default {
  name: "System Services",
  description:
    "Contains rules for operating system functions that are more finely-scoped than those included with Little Snitch. Note: All rules are disabled by default!",
  rules,
};
