export type Handler = () => void;
export type HandlerOf<T> = (value: T) => void;

export function seconds(ms: number) {
  return ms / 1000;
}

export function milliseconds(s: number) {
  return s * 1000;
}

export type WithIndex = {index: number};

export function replaceInArray<T extends WithIndex>(array: readonly T[], item: T) {
  return [
    ...array.slice(0, item.index),
    item,
    ...array.slice(item.index + 1)
  ];
}

export function removeInArray<T extends WithIndex>(array: readonly T[], item: T) {
  return [
    ...array.slice(0, item.index),
    ...array.slice(item.index + 1)
  ];
}
