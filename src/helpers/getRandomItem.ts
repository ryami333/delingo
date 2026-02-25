import { getRandomIndex } from "./getRandomIndex";

export function getRandomItem<T = unknown>(items: T[]) {
  const randomIndex = getRandomIndex(items);
  return items.at(randomIndex);
}
