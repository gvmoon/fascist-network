import { writable } from "svelte/store";

export const selection = writable();

export function getNewSelection(thought) {
  selection.set(thought);
}
