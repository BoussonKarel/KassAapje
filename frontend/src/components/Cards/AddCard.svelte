<script lang="ts">
    import Plus from 'svelte-material-icons/Plus.svelte'

    export let page;

    const handleAddCard = () => {
        if(page == 'organisations'){
            console.log('clicked organisations')
        }else{
            console.log('clicked registers')
        }
        
    }
</script>

<div on:click={handleAddCard} class="c-card c-addcard">
    <div class="c-addcard__icon">
        <Plus />
    </div>
</div>
