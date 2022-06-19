export function hasKeys<T>(object: T, ...keys: (keyof T)[]): boolean {
  return keys
    .map((k) => {
      const qualifier = k in object;
      !qualifier && console.error(`Paper: Key ${k.toString()} does not exist in object`, object);
      return qualifier;
    })
    .every((v) => v);
}
