import { writable } from 'svelte/store'
import type { UserInfo } from 'firebase/auth'

export const authStore = writable<{
  isLoggedIn: boolean,
  user?: UserInfo
}>({
  isLoggedIn: false
})

