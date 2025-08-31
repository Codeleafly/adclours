# adclours

**A comprehensive, chainable, and advanced terminal styling module for Node.js, fully compatible with Deno and TypeScript.**  

> Transform CLI output with ANSI colors, gradients, rainbow text, tables, boxes, ASCII art, spinners, progress bars, and structured logging.

---

## Installation

```bash
npm install adclours
```

> **Deno/TypeScript:** Fully ES Module compatible. Import directly from npm package:

```ts
import { color, log, gradient } from "adclours";
```

---

## Usage Overview

`adclours` allows:

- Chainable colors and styles using `color`
- Extended named colors and 24-bit RGB/HEX
- 256-color palette
- ANSI escape sequences for bold, italic, underline, dim, hidden, strikethrough
- Gradient text, rainbow text, and color blending
- Terminal utilities: progress bars, boxes, tables, lines, titles, centered text, padding
- ASCII art generation
- Advanced spinners and text animation
- Structured CLI logging with timestamps
- Finding nearest named colors  

Works in **Node.js, Deno, and TypeScript**.  

---

## Public Exports & Examples

### 1. `color` – Chainable color and style object

```js
import { color } from "adclours";

// Node.js Example:
console.log(color.red.bold('Bold Red Text'));
console.log(color.blue.bgYellow.underline('Blue on Yellow with underline'));
console.log(color.rgb(128,0,128).bgRgb(200,200,50).italic('Custom RGB text'));
console.log(color.hex('#FF69B4').bgHex('#1E90FF')('HEX foreground + background'));
console.log(color.color256(208)('Orange 256-color'));
console.log(color.bg256(27).white('Teal background 256-color'));

// TypeScript / Deno
// Same usage as above
```

---

### 2. `styleCodes` – ANSI escape codes object

```js
import { styleCodes } from "adclours";

console.log(styleCodes.bold + "Bold using styleCodes" + styleCodes.reset);
console.log(styleCodes.underline + "Underline text" + styleCodes.reset);
```

---

### 3. `extendedColors` – Predefined named colors

```js
import { extendedColors, color } from "adclours";

console.log(color[extendedColors.tomato]('Tomato color text')); // RGB fallback
console.log(color.crimson('Crimson named color'));
```

---

### 4. `strip(text)` – Remove ANSI codes

```js
import { color, strip } from "adclours";

const fancy = color.red.bold('Important!');
console.log(fancy); // Styled
console.log(strip(fancy)); // "Important!" plain text
```

---

### 5. `rainbow(text)` – Rainbow-colored text

```js
import { rainbow } from "adclours";

console.log(rainbow('Rainbow Text!'));
```

---

### 6. `gradient(text, startHex, endHex)` – Gradient text

```js
import { gradient } from "adclours";

console.log(gradient("Gradient Text!", "#FF0000", "#0000FF"));
```

---

### 7. `progressBar(value, total, options)` – Terminal progress bar

```js
import { progressBar } from "adclours";

for(let i=0;i<=100;i+=10){
  process.stdout.write('\r'+progressBar(i, 100));
}
console.log();
```

---

### 8. `box(text, options)` – Boxed text

```js
import { box } from "adclours";

console.log(box('Hello World', {borderColor:'cyan', style:'double', padding:2}));
```

---

### 9. `center(text, width)` – Center text in terminal

```js
import { center } from "adclours";

console.log(center("Centered Text", 80));
```

---

### 10. `wrap(text, width)` – Wrap text to width

```js
import { wrap } from "adclours";

const longText = "This is a very long line that should wrap around to fit the terminal width properly.";
console.log(wrap(longText, 40));
```

---

### 11. `asciiArt(text)` – ASCII Art from text

```js
import { asciiArt } from "adclours";

console.log(asciiArt("CLI"));
```

---

### 12. `pad(text, width, side, char)` – Pad text

```js
import { pad } from "adclours";

console.log(pad("Padded", 20, 'left', '-'));
console.log(pad("Padded", 20, 'right', '.'));
```

---

### 13. `table(rows, options)` – Terminal table

```js
import { table } from "adclours";

const rows = [
  ['Name', 'Age', 'City'],
  ['Alice', '30', 'New York'],
  ['Bob', '25', 'London']
];

console.log(table(rows, {align:['left','center','right']}));
```

---

### 14. `line(width, text)` – Horizontal line with optional text

```js
import { line } from "adclours";

console.log(line(50, "SECTION"));
console.log(line(30));
```

---

### 15. `title(title, subtitle, width)` – Formatted title block

```js
import { title } from "adclours";

console.log(title("Main Title", "Subtitle Example", 60));
```

---

### 16. `list(items, options)` – Bullet list

```js
import { list } from "adclours";

console.log(list(['Item 1','Item 2','Item 3'], {symbol:'→'}));
```

---

### 17. `blend(text, color1, color2, ratio, mode)` – Blend two colors

```js
import { blend } from "adclours";

console.log(blend("Blended Text", "red", "#00FF00", 0.5));
console.log(blend("Multiply Mode", "red", "blue", 0.7, "multiply"));
```

---

### 18. `generateShades(baseColor, count, direction)` – Shades from base color

```js
import { generateShades } from "adclours";

const shades = generateShades("#FF0000", 5, 'lighten');
shades.forEach(fn => console.log(fn('Shade Example')));
```

---

### 19. `Spinner` – Advanced spinner

```js
import { Spinner, color } from "adclours";

const spinner = new Spinner(['-', '\\', '|', '/'], "Processing...", 100, color.cyan);
spinner.start();
setTimeout(()=>spinner.stop('✔','Done','green'), 3000);
```

---

### 20. `animate(text, options)` – Text animation

```js
import { animate } from "adclours";

animate("Blinking Text...", {effect:'blink', interval:500, duration:3000});
animate("Pulse Text...", {effect:'pulse', interval:400, duration:3000});
```

---

### 21. `log` – Structured CLI logging

```js
import { log } from "adclours";

log.info("Information message");
log.success("Success message");
log.warn("Warning message");
log.error("Error message");
process.env.DEBUG = "true";
log.debug("Debug message visible only in DEBUG mode");
```

---

### 22. `findNearestColor(inputColor)` – Find nearest named color

```js
import { findNearestColor } from "adclours";

console.log(findNearestColor("#FF4500")); // → "orangered"
console.log(findNearestColor([0,128,0])); // → "green"
```

---

## Advanced Examples

### Gradient Banner + ASCII + Table + Progress

```js
import { gradient, asciiArt, table, progressBar, color } from "adclours";

console.log(gradient(asciiArt("HELLO"), "#FF0000","#00FF00"));
console.log(table([['Task','Progress'],['Build',progressBar(40,100)],['Test',progressBar(70,100)]], {align:['left','center']}));
```

### Spinner with Logs

```js
import { Spinner, log, color } from "adclours";

const spinner = new Spinner(['⠋','⠙','⠹','⠸','⠼'], "Loading...", 80, color.magenta);
spinner.start();
setTimeout(()=>{
  spinner.stop('✔','Loaded','green');
  log.success("All tasks completed!");
}, 4000);
```

---

## Notes / Best Practices

- Chain multiple styles for rich text formatting.  
- Use `strip()` to get plain text without ANSI codes.  
- Check terminal compatibility for advanced colors and animations.  
- Deno & TypeScript compatible by default due to ES Modules.  

---

This README covers **all public exports** with **complex Node.js examples**, followed by basic **TS/Deno usage**, and shows **advanced terminal CLI combinations** for real-world scenarios.

