import type { FieldState } from "./types.js";

export function ok<T>(value: T): FieldState<T> {
  return { status: "ok", value };
}

export function missing<T = never>(...reasons: string[]): FieldState<T> {
  return { status: "missing", reasons };
}

export function stateOr<T, D>(state: FieldState<T>, fallback: D): T | D {
  return state.status === "ok" ? state.value : fallback;
}
