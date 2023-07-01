import { Direction, makeRule, Protocol, Remote } from "./utils.ts";

const Apps = {
  wireguard:
    "/Applications/WireGuard.app/Contents/PlugIns/WireGuardNetworkExtension.appex/Contents/MacOS/WireGuardNetworkExtension",
} as const;

export default [
  makeRule({
    process: Apps.wireguard,
    remote: Remote.Any,
    direction: [Direction.Incoming, Direction.Outgoing],
    using: [["any", Protocol.UDP]],
    notes: `Allows WireGuard to communicate with VPN servers.
Note: Both this rule and the outgoing rule are required for proper operation.`,
  }),
].flat();
