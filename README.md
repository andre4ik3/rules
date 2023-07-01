# Little Snitch Rules

Rules for [Little Snitch] that allow various programs to operate.

- Each rule corresponds to a specific program function.
- Each rule has a description that describes why it's needed.
- All rules are disabled by default.

[Subscribe](https://andre4ik3.github.io/rules/)

## Contributing

The rules are generated using [Deno]. The rules are in the `rulegen/rules`
folder, with each file corresponding to a ruleset. To generate the rules:

```
deno run --allow-write=_site rulegen/main.ts
```

The rules will be in the `_site` folder.

[Little Snitch]: https://obdev.at/products/littlesnitch/index.html
[Deno]: https://deno.land
