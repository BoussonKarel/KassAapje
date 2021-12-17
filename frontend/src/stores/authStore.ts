import { writable } from 'svelte/store'
import type firebase from 'firebase/auth'

export const authStore = writable<{
  isLoggedIn: boolean,
  user?: firebase.UserInfo
}>({
  isLoggedIn: false
})

