# scrollbase

Smooth scrolling wrapper for gsap tweens

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/SteveKanger/scrollbase.git
   ```

2. Requires gsap

   ```sh
   npm install gsap
   ```

   or

   ```sh
   yarn add gsap
   ```

## Usage

### Simple scrolling container

#### JS

```js
import scrollbase from './scrollbase';

const container = document.querySelector('.container');
const ctl = scrollbase({
  container,
});
```

##### Css

Good practice to add a clearfix or and overflow property to the container to ensure margins are calculated.

```css
.container:before,
.container:after {
  display: block;
  clear: both;
  content: '\a0 ';
  visibility: hidden;
  height: 0;
}
```

### Scroll container with custom viewport and scrollbar

#### JS

```js
import scrollbase from './scrollbase';

const scrollbar = document.querySelector('.scrollbar');
const viewport = document.querySelector('.viewport');
const container = document.querySelector('.container');
const ctl = scrollbase({
  scrollbar,
  viewport,
  container,
});
```

##### HTML

```html
<div class="scrollbar"></div>
<div class="viewport">
  <div class="scroll-container"></div>
</div>
```

##### Css

this can be customized to your liking

```css
.viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 15px;
  height: 100%;
  z-index: 9999;
  background: #f0f0f0;
}

.scrollbar .bar {
  background: #c8c8c8;
}
```

### Adding tweens on scroll

Uses gsap's timeline and the `to` object. Check the link below for documentation.

[`GSAP Timeline to()`](<https://greensock.com/docs/v3/GSAP/Timeline/to()>)

#### JS

```js
const ctl = scrollbase({
  container,
});

// translateY tween div 200px
const div = document.querySelector('.tween');
ctl.addTween({
  el: div,
  to: {
    y: '200px',
  },
});
```

### Adding Sticky on scroll

#### JS

```js
const ctl = scrollbase({
  container,
});

// Acts like position sticky css
const div = document.querySelector('.sticky');
ctl.addSticky({
  el: div,
});
```

## Controller options

| Option           | Type     | Default          | Description                                                                           |
| ---------------- | -------- | ---------------- | ------------------------------------------------------------------------------------- |
| container        | Dom node | null \*reqiuired | Reserved for the div you want to use as the scroll container.                         |
| viewport         | Dom node | null             | Reserved for the element you want to use as the viewport of your scrolling container. |
| scrollbar        | Dom node | null             | Reserved for the element you want the scrollbar track and bar to be placed into.      |
| layoutHorizontal | boolean  | false            | If you want the layout to scroll horizontally.                                        |
| keystep          | number   | 120              | The amount in px you want to scroll when the up and down keys are pressed             |
| firefoxMult      | number   | 25               | The speed multiplier used for firefox browser                                         |
| touchMult        | number   | 2                | The speed multiplier used for touch screens                                           |
| mouseMult        | number   | 1                | The speed multiplier used for the mouse wheel                                         |
| ease             | number   | 0.06             | The ease value of the scroll container. The speed that the container comes to a stop. |

## Controller Methods

| Method                                                                    | Description                                                                           | Returns                  | Arguments                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialize()                                                              | Starts the controller. Will be called automatically when controller is intialiated.   | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| update()                                                                  | Updates the items, scrollbar, container to the current scroll position.               | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| kill()                                                                    | Kills the controller and all items in the controller.                                 | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| recalibrate()                                                             | Reworks where in the scroll items will be triggered.                                  | nothing                  | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| getScroll()                                                               | Retrieves the current scroll position.                                                | `number` scroll position | none                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| on(e, fn)                                                                 | Triggered when an event happens.                                                      | `number` scroll position | <ol><li>`e` the event you want to envoke. Accepts `'scroll'` and `'resize'`</li><li>`fn` is the function you want to run on each event. Returns the scroll position. eg. `fn((scrollPos) => {})`</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| off(e, fn)                                                                | Remove triggered events.                                                              | nothing                  | <ol><li>`e` the event you want to remove from. Accepts `'scroll'` and `'resize'`</li><li>`fn` is the function you want to remove from that event.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| addTween({ el, to, trigger, offsets, ignoreInitialView, peak, callback }) | Creates a tween and adds it to the item list.                                         | `string` item id         | <div>This takes in a single object of the following params.</div><ol><li>`el` - `dom node` REQUIRED the element that you want to tween</li><li>`to` - `object` REQUIRED this is the gsap to object. This will be the elements final position after its progress through the viewing area.</li><li>`trigger` - `dom node` if you want the tween to be triggered by an element in the scrolling view other than the one you are tweening.</li><li>`offsets` - `object` accepts `start` and `end`. These offsets will be added to the tween either on the start or end of the viewing area.</li><li>`ignoreIntialView` - `boolean` If the tween is in the initial view this will ignore the starting view offset. Handy for making items move the same speed even if they are in the intial view or not.</li><li>`peak` - `number` from 0 to 1 if you want the peak of the tween to happen at a percentage of viewing area.</li><li>`callback` - `function` will be envoked each time the progress of the tween is updated. Returns the progress and scroll position. eg. `callback((progress, scrollPos) => {})`</li></ol> |
| addSticky({ el, offsets, ignoreBounds, callback })                        | Creates and adds a sticky element to the item list. Behaves like css position sticky. | `string` item id         | <div>This will take in a single object of the following params.</div><ol><li>`el` - `dom node` REQUIRED the element that you want to become sticky.</li><li>`offsets` - `object` takes in `start` and `end` which is how far from the top and bottom you want your element to stick.</li><li>`ignoreBounds` - `boolean` Normally a sticky element stops when it reaches the end of the space in the parent element. This allows your element to continue being sticky outside of the parent.</li><li>`callback` - `function` will be envoked each time the progress of the sticky element is updated. Returns the progress and scroll position. eg. `callback((progress, scrollPos) => {})`</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                    |
| removeItem(id)                                                            | Removes an item from the item list                                                    | nothing                  | <ol><li>`id` REQUIRED the items id that was returned after creating it.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| scrollTo(position, useAnimation)                                          | Scrolls to a certian position                                                         | nothing                  | <ol><li>`position` - `number` The position that you want to scroll to.</li><li>`useAnimation` - `boolean` Whether or not you want to animate to that position. Default is true.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| scrollToElement(el, offset, useAnimation)                                 | Scrolls to the top of a certain element                                               | nothing                  | <ol><li>`el` - `dom node` The element you want to scroll to.</li><li>`offset` - `number` How far from the top you would like to scroll.</li><li>`useAnimation` - `boolean` If you want to animate to that position. Default is true.</li></ol>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## License

Distributed under the MIT License. See `LICENSE` for more information.
