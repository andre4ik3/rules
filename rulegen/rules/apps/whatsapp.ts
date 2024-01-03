import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "WhatsApp",
  id: "whatsapp",
  description: "Messaging platform",
  homepage: "https://whatsapp.net/",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.whatsapp.app, Paths.whatsapp.extension],
    remote: [RemoteType.Domain, ["whatsapp.net"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows WhatsApp to be used for messaging.",
  }),
].flat();
