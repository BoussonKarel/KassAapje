import type firebase from 'firebase/compat/app';
import { auth } from "../utils/auth";
import { writable } from "svelte/store";

const userInfo = writable<firebase.User>();

const setUser = user => {
  userInfo.set(user);
};

const removeUser = () => {
  userInfo.set(null);
};

const currentUser = {
  subscribe: userInfo.subscribe,
  set: setUser,
  remove: removeUser
};

export { currentUser };