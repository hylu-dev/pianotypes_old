<template>
    <div class="error">
        <h3 style="font-size: 3rem">404</h3>
        <h3>Not Found</h3>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style>
    .error {
        background: var(--secondary-bg-colour);
        margin: 10%;
        padding: 2rem;
        line-height: 0;
        box-shadow: 0 0 10px 2px #111;
    }
</style>