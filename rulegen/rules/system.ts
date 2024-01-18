import { Direction, makeRule, Protocol, Remote, RemoteType } from "../types.ts";
import Paths from "../paths.json" assert { type: "json" };

const rules = [
  makeRule({
    process: [Paths.system.appSiteAssociationDaemon],
    remote: [RemoteType.Host, ["app-site-association.cdn-apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows macOS to verify the validity of associated websites for apps.",
  }),

  makeRule({
    process: [Paths.system.chronoDaemon],
    direction: [Direction.Incoming, Direction.Outgoing],
    remote: Remote.LocalNet,
    using: [[Protocol.UDP, "any"]],
    notes: "Allows time synchronization with devices on the local network.",
  }),

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
    process: [Paths.system.idleAssetsDaemon],
    remote: [RemoteType.Host, ["configuration.apple.com", "sylvan.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows downloading aerial screensavers and wallpapers.",
  }),

  makeRule({
    process: [Paths.system.networkServiceProxy],
    remote: [RemoteType.Host, ["mask-api.icloud.com"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows various system services to connect to Apple without revealing the client's IP address (similar to iCloud Private Relay).",
  }),

  makeRule({
    process: [Paths.system.pushDaemon],
    remote: [RemoteType.Domain, ["push.apple.com"]],
    using: [
      [Protocol.TCP, 443],
      [Protocol.TCP, 5223],
    ],
    notes: "Allows push notifications to work.",
  }),

  makeRule({
    process: [Paths.system.systemPolicyDaemon],
    remote: [RemoteType.Host, ["api.apple-cloudkit.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the system to verify the digital signature of apps.",
  }),

  makeRule({
    process: [Paths.system.timeDaemon],
    remote: [Remote.Host, ["time-osx.g.aaplimg.com"]],
    using: [[Protocol.UDP, 123]],
    notes: "Allows time synchronization with Apple's NTP servers.",
  }),

  makeRule({
    process: [Paths.system.timeDaemon],
    remote: Remote.Any,
    using: [[Protocol.UDP, 123]],
    notes: "Allows time synchronization with custom NTP servers.",
  }),

  /* ======================================================================== */
  /* iCloud & Apple ID                                                        */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.cloud.syncDaemon],
    remote: [
      RemoteType.Domain,
      [
        "amazonaws.com",
        "cdn-apple.com",
        "icloud.com",
        "icloud-content.com",
        "storage-download.googleapis.com",
        "storageupload.googleapis.com",
      ],
    ],
    using: [[Protocol.TCP, 443]],
    notes: "Allows file and data syncing over iCloud.",
  }),

  makeRule({
    process: [Paths.system.cloud.helper],
    remote: [RemoteType.Host, [""]],
  }),

  makeRule({
    process: [Paths.system.cloud.notificationAgent],
    remote: [
      RemoteType.Host,
      [
        "setup.icloud.com",
        "p123-quota.icloud.com",
        "p123-acsegateway.icloud.com",
      ],
    ],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows iCloud service notifications (e.g. running low on storage) to work.",
  }),

  /* ======================================================================== */
  /* Continuity                                                               */
  /* ======================================================================== */

  makeRule({
    process: [
      Paths.system.continuity.rapportDaemon,
      Paths.system.continuity.remotePairingDaemon,
    ],
    direction: [Direction.Incoming, Direction.Outgoing],
    remote: Remote.LocalNet,
    using: [
      [Protocol.TCP, "any"],
      [Protocol.UDP, 3722],
    ],
    notes: "Allows Continuity and Handoff features to work.",
  }),

  makeRule({
    process: [Paths.system.controlCenter],
    direction: [Direction.Incoming],
    remote: Remote.LocalNet,
    using: [[Protocol.TCP, 7000]],
    notes: "Allows AirPlay Receiver to work.",
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
    using: [
      [Protocol.UDP, 5900],
      [Protocol.UDP, 5901],
      [Protocol.UDP, 5902],
    ],
    notes: "Allows Screen Sharing to work.",
  }),

  /* ======================================================================== */
  /* System Settings                                                          */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.settings.appleId],
    remote: [
      RemoteType.Host,
      ["gsa.apple.com", "setup.icloud.com", "appleid.cdn-apple.com"],
    ],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the Apple ID preference pane to work.",
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
    remote: [
      RemoteType.Host,
      [
        "bag.itunes.apple.com",
        "play.itunes.apple.com",
        "s.mzstatic.com",
        "weather-edge.apple.com",
        "weather-data.apple.com",
        "weather-map2.apple.com",
      ],
    ],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Weather and its widgets to operate.",
  }),

  /* ======================================================================== */
  /* Software Update                                                          */
  /* ======================================================================== */

  makeRule({
    process: [Paths.system.update.daemon],
    remote: [
      RemoteType.Host,
      ["swscan.apple.com", "swdist.apple.com", "swcdn.apple.com"],
    ],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the system to check for and download software updates.",
  }),

  makeRule({
    process: [Paths.system.update.assetDaemon],
    remote: [RemoteType.Host, ["gdmf.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows the system to download software updates.",
  }),

  makeRule({
    process: ["any"], // Process path changes every time, e.g. /private/var/db/*/16777233.16650742.xpc/Contents/MacOS/com.apple.MobileSoftwareUpdate.UpdateBrainService
    remote: [RemoteType.Host, ["gs.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows the system to apply software updates. Only required on Macs with Apple Silicon or a T2 chip.",
  }),
].flat();

export default {
  name: "System Services",
  description:
    "Contains rules for operating system functions that are more finely-scoped than those included with Little Snitch. Note: All rules are disabled by default!",
  rules,
};
