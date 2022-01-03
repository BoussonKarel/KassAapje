<script lang='ts'>
import { getAuth } from "firebase/auth";

import { onMount } from "svelte";
import { useNavigate } from "svelte-navigator";

const navigate = useNavigate()

const signOut = async () => {
  await getAuth().signOut().then(() => {
    navigate('/')
  })
}

onMount(() => {
  signOut()
})
</script>

Signout