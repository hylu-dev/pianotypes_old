<template>
  <div>
    <p>
      Thanks for trying out this project.
    </p>
    <p>Hold space to initate the sustain pedal. Hold shift and tap space to keep it on.</p>
    <p>Use the left and right arrow keys to move the key bindings. Hold shift to move by an octave.</p>
    <p>Use the up and down arrow keys to add and remove keys. Hold shift adjust by an octave.</p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>

div {
  background: var(--secondary-bg-colour);
  width: 60ch;
  padding: 2rem;
  margin: auto;
  margin-top: 6rem;
  box-shadow: 0 0 10px 2px #111;
}

</style>