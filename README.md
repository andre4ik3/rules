# Little Snitch Rules

Rules for [Little Snitch] that allow various programs to operate. The rules are generated on-demand,
and each person can have their own combination of applications.

- Each rule corresponds to a specific program function.
- Each rule has a description that describes why it's needed.
- All rules are disabled by default.
- Rules for allowing app self-updates are not included, unless it would be more secure for the app
  to update itself (e.g. Little Snitch). It is expected you will update apps using Homebrew or an
  app like Latest.

## Contributing

The rules are generated on demand using [Deno]. Paths to applications are stored in `paths.json`,
whilst the rules themselves are in the `rulegen/rules` folder, with each file corresponding to a
single application. To serve the rules on `http://localhost:8000`, run `deno task start`.

[Little Snitch]: https://obdev.at/products/littlesnitch/index.html
[Deno]: https://deno.land
