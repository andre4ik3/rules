import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "GPG Suite",
  description: "Graphical user interface for GNU Privacy Guard",
  homepage: "https://gpgtools.org/",
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.gpgSuite.updater],
    remote: [RemoteType.Host, ["gpgtools.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows GPG Suite to check for updates.",
  }),
].flat();
