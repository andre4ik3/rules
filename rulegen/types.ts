// === Helpers and things for writing rules in TypeScript ===

export interface Snippet {
  metadata: Metadata;
  rules: Rule[];
}

export interface Metadata {
  name: string;
  id: string;
  description: string;
  homepage: string;
  properties?: Partial<{ canHavePrefix: true; defaultPrefix: string }>;
}

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

  ports?: string;
  protocol?: Protocol;
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
  // Either a single process or a process via another process.
  process: (string | [string, string])[];

  direction?: Direction[];
  priority?: Priority;
  action?: Action;

  remote: Remote | [RemoteType, string[]];
  using?: [Protocol, number | number[] | `${number}-${number}` | "any"][];
  notes: string;
}

const defaultOptions = {
  direction: [Direction.Outgoing],
  priority: Priority.Regular,
  action: Action.Allow,
  using: [[Protocol.Any, "any"]] as [
    Protocol,
    number | number[] | `${number}-${number}` | "any",
  ][],
};

type CombinedOptions = typeof defaultOptions & MakeRuleOptions;
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
  const opts: CombinedOptions = { ...defaultOptions, ...input };
  const rules: Rule[] = [];

  opts.process.forEach((param) => {
    const process = typeof param !== "string" ? param[0] : param;
    const via = typeof param !== "string" ? param[1] : undefined;

    opts.direction.forEach((direction) => {
      for (let i = 0; i < opts.using.length; i++) {
        const using = opts.using[i];
        rules.push({
          direction,
          priority: opts.priority,
          action: opts.action,

          process,
          via,
          disabled: true,

          ports:
            using[1] === "any"
              ? undefined
              : Array.isArray(using[1])
                ? using[1].join(", ")
                : `${using[1]}`,
          protocol: using[0] === Protocol.Any ? undefined : using[0],
          notes: opts.notes,
          ...makeRemote(opts.remote),
        });
      }
    });
  });

  return rules;
}
