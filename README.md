
# Piano Types

_Minimalist Online Piano_

A virtual piano that provides a full-range, customizable piano. The piano can be played either using your mouse or with your keyboard.

The project is currently hosted on <https://pianotypes.netlify.app/>.
A demo can be viewed on https://www.hylu.dev/projects.html#section2.


## Features

- Visual display of piano key presses
- Multiple instrument sounds
- Adjustable key bind positioning and piano size


## Roadmap

- More visualizers
- Further customizable key bindings
- Full piano pedaling (currently only sustain pedal)

---

## Sheridan PGDAP Reviewer Considerations

### Involvement

This is a solo project designed and programmed by Roy Lu (me). Notable dependencies include [tonal.js](https://www.npmjs.com/package/tonal) for music theory calculations and [soundfont-player](https://www.npmjs.com/package/soundfont-player) to supply instrumental sounds.

### Code Highlights

Folder structure follows the standard VueJS CLI project creation. The primary code resides within the src/ folder from the main directory. All the code here is written by me and is relevant for review. Below I've highlighted core sections of the code along with some context.

- **src/views/**
  - These are the basis for the main web pages, further made up of components
- **src/components**
  - These components make up independent portions of the web page such as the piano itself, the pedalling panel, the ribbon display, etc.
- **src/stores**
  - These stores manage the entire state of the piano from what keys are available to every interaction (e.g. pressed, released, instrument, pedaling, etc.)
  -  **src/classes**
     - The state managed in the aforementioned stores above are modeled using the classes in this directory. In particular, most of the state code is really here
- **src/assets/style.css**
  - Global stylings are stored here. Any further stylings are done within the component themselves between <style></style> tags. Generally, any files ending in .vue have local styling
