// === Helpers and things for writing rules in TypeScript ===

export enum Direction {
  Incoming = "incoming",
  Outgoing = "outgoing",
}

export enum Action {
  Allow = "allow",
  Deny = "deny",
  Ask = "ask",
}

export enum Priority {
  Regular = "regular",
  High = "high",
}

export enum Protocol {
  Any = "any",
  TCP = "tcp",
  UDP = "udp",
  ICMP = "icmp",
}

export enum Remote {
  Any = "any",
  LocalNet = "local-net",
  Multicast = "multicast",
  Broadcast = "broadcast",
  Bonjour = "bonjour",
  DNS = "dns-servers",
  BPF = "bpf",
}

// === Raw format definitions ===
// https://help.obdev.at/littlesnitch5/ref-lsrules-file-format

export interface LSRules {
  name: string;
  description: string;
  rules: Rule[];
}

export interface Rule {
  process: string;
  via?: string;

  direction: Direction;
  priority: Priority;
  action: Action;

  "remote-addresses"?: string[];
  "remote-hosts"?: string[];
  "remote-domains"?: string[];
  remote?: Remote;

  ports: "any" | `${number}` | `${number}-${number}`;
  protocol: Protocol;
  disabled: boolean;
  notes: string;
}

// === Actual rule-making ===

export enum RemoteType {
  Address = "remote-addresses",
  Host = "remote-hosts",
  Domain = "remote-domains",
}

export interface MakeRuleOptions {
  process: string;
  via?: string;

  direction?: Direction[];
  priority?: Priority;
  action?: Action;

  remote: Remote | [RemoteType, string[]];
  using?: [number | "any", Protocol][];
  notes: string;
}

const defaultOptions = {
  direction: [Direction.Outgoing],
  priority: Priority.Regular,
  action: Action.Allow,
  using: [[443, Protocol.TCP]] as [number, Protocol][],
};

type CombinedOptions = MakeRuleOptions & typeof defaultOptions;
type RawRemote = Pick<
  Rule,
  "remote" | "remote-addresses" | "remote-hosts" | "remote-domains"
>;

function makeRemote(remote: MakeRuleOptions["remote"]): RawRemote {
  if (typeof remote === "string") {
    return { remote };
  } else {
    return { [remote[0]]: remote[1] };
  }
}

export function makeRule(input: MakeRuleOptions): Rule[] {
  const opts: CombinedOptions = { ...input, ...defaultOptions };
  const rules: Rule[] = [];

  // Unpack "using" key into ports and protocols
  for (let i = 0; i < opts.using.length; i++) {
    const using = opts.using[i];
    opts.direction.forEach((direction) => {
      rules.push({
        direction,
        priority: opts.priority,
        action: opts.action,

        process: opts.process,
        via: opts.via,
        disabled: true,

        ports: `${using[0]}`,
        protocol: using[1],
        notes: opts.notes,
        ...makeRemote(opts.remote),
      });
    });
  }

  return rules;
}
