import {
  Direction,
  makeRule,
  Metadata,
  Protocol,
  Remote,
  Rule,
} from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Syncthing",
  id: "syncthing",
  description: "Cross-platform file synchronization",
  homepage: "https://syncthing.net",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    direction: [Direction.Incoming],
    remote: Remote.Any,
    using: [
      [Protocol.TCP, 22000],
      [Protocol.UDP, 22000],
    ],
    notes: "Allows Syncthing to accept incoming connections from devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    direction: [Direction.Incoming],
    remote: Remote.LocalNet,
    using: [[Protocol.UDP, 21027]],
    notes: "Allows Syncthing to be discovered by local devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    using: [
      [Protocol.TCP, 22067],
      [Protocol.UDP, 3478],
    ],
    notes: "Allows Syncthing to traverse NAT firewalls.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    using: [
      [Protocol.TCP, 22000],
      [Protocol.UDP, 22000],
    ],
    notes: "Allows Syncthing to connect to unfirewalled devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    notes: "Allows Syncthing to connect to any device or relay.",
  }),
].flat();
