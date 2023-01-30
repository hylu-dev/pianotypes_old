<template>
  <div>
    <p>
      Thanks for trying out this project. Keyboard controls are subject to change but are here for reference.
    </p>

    <h3><b><u>Keyboard Controls</u></b></h3>
    <ul >
      <li>
        <b>Keyboard keys</b> to press the corresponding keys on the piano.
      </li>
      <li>
        <b>Space</b> initiates the sutain pedal, hold to keep down.
      </li>
      <li>
        <b>&#8592;&#8594;</b> arrow keys move the keybindings across the piano one key at a time.
        <ul>
          <li>
            <b>Shift</b> held while using arrow keys will shift by an octave instead.
          </li>
        </ul>
      </li>
      <li>
        <b>&#8595;&#8593;</b> arrow keys adds and removes keys to the piano range.
        <ul>
          <li>
            <b>Shift</b> held while using arrow keys will adjust by an octave instead.
          </li>
        </ul>
      </li>
    </ul>
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

ul {
  text-align: left;
}

</style>