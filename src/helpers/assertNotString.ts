export function assertNotString<T = unknown>(
  val: T,
  errorMessage?: string,
): asserts val is Exclude<T, string> {
  if (typeof val === "string") {
    throw new Error(errorMessage ?? "not a string");
  }
}
