export function updateObject<O extends Record<string, any>>(
  objectA: O,
  objectB: Partial<O>
): O {
  return { ...objectA, ...objectB }
}

export function removeObjectItemByKey<T, O extends Record<string, T>>(
  object: O,
  key: string
) {
  const { [key]: _, ...newKeys } = object
  return newKeys
}
