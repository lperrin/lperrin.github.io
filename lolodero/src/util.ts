export type Handler = () => void;
export type HandlerOf<T> = (value: T) => void;

export function seconds(ms: number) {
  return ms / 1000;
}

export function milliseconds(s: number) {
  return s * 1000;
}

