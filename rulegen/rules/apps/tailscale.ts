import { Direction, makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Tailscale",
  id: "tailscale",
  description: "Mesh VPN based on WireGuard",
  homepage: "https://tailscale.com/",
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.tailscale],
    remote: [RemoteType.Domain, ["tailscale.com", "tailscale.io"]],
    using: [[Protocol.TCP, 80], [Protocol.TCP, 443], [Protocol.UDP, 3478]],
    notes: "Allows Tailscale to sign in, discover peers, and send traffic via proxy servers.",
  }),
  
  makeRule({
    process: [Paths.tailscale],
    remote: Remote.Any,
    direction: [Direction.Incoming, Direction.Outgoing],
    using: [[Protocol.UDP, "any"]],
    notes: "Allows Tailscale to communicate with peers directly.",
  }),
].flat();
