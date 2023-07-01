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

// === Raw format definitions ===
// https://help.obdev.at/littlesnitch5/ref-lsrules-file-format

export interface LSRules {
  name: string;
  description: string;
  rules: Rule[];
}

export interface Rule {
  direction: Direction;
  priority: Priority;
  action: Action;

  process: string;
  via?: string;
  notes: string;

  ports: "any" | `${number}` | `${number}-${number}`;
  protocol: Protocol;
  disabled: boolean;
}

// === Actual rule-making ===

export interface MakeRuleOptions {
  direction?: Direction;
  priority?: Priority;
  action?: Action;

  process: string;
  via?: string;
  notes: string;

  using?: [number | "any", Protocol][];
}

const defaultOptions = {
  direction: Direction.Outgoing,
  priority: Priority.Regular,
  action: Action.Allow,
  using: [[443, Protocol.TCP]] as [number, Protocol][],
};

type CombinedOptions = MakeRuleOptions & typeof defaultOptions;

export function makeRule(input: MakeRuleOptions): Rule[] {
  const opts: CombinedOptions = { ...input, ...defaultOptions };
  const rules: Rule[] = [];

  // Unpack "using" key into ports and protocols
  for (let i = 0; i < opts.using.length; i++) {
    const using = opts.using[i];
    rules.push({
      direction: opts.direction,
      priority: opts.priority,
      action: opts.action,

      process: opts.process,
      via: opts.via,
      disabled: true,

      ports: `${using[0]}`,
      protocol: using[1],
      notes: opts.notes,
    });
  }

  return rules;
}
