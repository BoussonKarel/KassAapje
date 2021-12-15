<script lang="ts">

    let email;
    let password;

    

    const submitRegister = () => {
        const submission = {
            email, password
        }
        console.log(submission)
    }

</script>

<form action="register">
    <label for="email">Email:</label>
    <input bind:value={email} type="text" name="email" id="email">
    <label for="password">Wachtwoord:</label>
    <input bind:value={password} type="password" name="password" id="password">

    <!-- <label for="confirm">Wachtwoord bevestigen</label>
    <input type="password" name="confirm" id="confirm"> -->

    <button on:click|preventDefault={submitRegister}>
        registreren
    </button>
</form>