function prefix(value: string): string[] {
  const results = [value];

  if (value.startsWith("/Applications")) {
    results.push(value.replace("/Applications", "/Applications/Homebrew"));
    results.push(value.replace("/Applications", "~/Applications"));
  } else if (value.startsWith("/usr/local")) {
    results.push(value.replace("/usr/local", "/opt/homebrew"));
    results.push(value.replace("/usr/local", "/opt/local"));
  }

  return results;
}

export function maybePrefixed<T extends string | [string, string]>(
  ...paths: T[]
): T[] {
  return paths.map((path) => {
    return (typeof path === "string" ? prefix(path) : path.map(prefix)) as T;
  });
}
