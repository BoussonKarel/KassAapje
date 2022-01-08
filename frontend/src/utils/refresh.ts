import { writable } from "svelte/store";
import { authHelper } from "./auth";

export const refreshStore = writable(false);

export const refresh = () => {
  authHelper.refresh();
  refreshStore.update(r => !r)
}