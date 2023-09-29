import { Direction, makeRule, Protocol, Remote, RemoteType } from "../types.ts";
import Paths from "../paths.json" assert { type: "json" };

const rules = [
  makeRule({
    process: [Paths.system.configDaemon],
    remote: Remote.LocalNet,
    using: [[Protocol.UDP, 67]],
    notes: "Allows the computer to acquire a DHCP lease.",
  }),

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

  makeRule({
    process: [Paths.system.idleAssetsDaemon],
    remote: [RemoteType.Host, ["configuration.apple.com", "sylvan.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows downloading aerial screensavers and wallpapers.",
  }),

  /* ======================================================================== */
  /* Internet Accounts                                                        */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.internetAccounts.daemon],
    remote: [RemoteType.Host, ["mac-services.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows server autodiscovery in Mail, Contacts, and Calendar.",
  }),

  makeRule({
    process: [Paths.system.internetAccounts.daemon],
    remote: Remote.Any,
    using: [
      [Protocol.TCP, 25], // SMTP
      [Protocol.TCP, 143], // IMAP
      [Protocol.TCP, 465], // SMTP-TLS
      [Protocol.TCP, 585], // IMAP4-TLS
      [Protocol.TCP, 587], // Submission
      [Protocol.TCP, 993], // IMAPS
    ],
    notes: "Allows background data synchronization in Mail.",
  }),

  makeRule({
    process: [Paths.system.internetAccounts.daemon],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows background data synchronization in Contacts and Calendar.",
  }),

  makeRule({
    process: [Paths.system.internetAccounts.calendar],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Calendar to synchronize data with CalDAV servers.",
  }),

  makeRule({
    process: [Paths.system.internetAccounts.contacts],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Contacts to synchronize data with CardDAV servers.",
  }),

  makeRule({
    process: [Paths.system.internetAccounts.mail],
    remote: Remote.Any,
    using: [
      [Protocol.TCP, 25], // SMTP
      [Protocol.TCP, 143], // IMAP
      [Protocol.TCP, 465], // SMTP-TLS
      [Protocol.TCP, 585], // IMAP4-TLS
      [Protocol.TCP, 587], // Submission
      [Protocol.TCP, 993], // IMAPS
    ],
    notes: "Allows Mail to synchronize data with mail servers.",
  }),

  /* ======================================================================== */
  /* Safari                                                                   */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.safari.app],
    remote: Remote.Any,
    notes: "Allows Safari to be used for web browsing.",
  }),

  makeRule({
    process: [Paths.system.safari.safeBrowsingService],
    remote: [RemoteType.Domain, ["safebrowsing.apple"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Safari's Safe Browsing integration to work.",
  }),

  makeRule({
    process: [Paths.system.safari.webApp],
    remote: Remote.Any,
    notes: "Allows Web Apps added from Safari to work.",
  }),

  /* ======================================================================== */
  /* Screen Sharing                                                           */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.screenSharing],
    remote: Remote.Any,
    using: [[Protocol.TCP, 5900]],
    notes: "Allows Screen Sharing to work.",
  }),

  makeRule({
    process: [Paths.system.screenSharing],
    direction: [Direction.Incoming],
    remote: Remote.Any,
    using: [[Protocol.UDP, 5900], [Protocol.UDP, 5901], [Protocol.UDP, 5902]],
    notes: "Allows Screen Sharing to work.",
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
    remote: [RemoteType.Host, [
      "swscan.apple.com",
      "swdist.apple.com",
      "swcdn.apple.com",
      "xp.apple.com",
    ]],
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
