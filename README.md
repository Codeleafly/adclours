# adclours.mjs - A Comprehensive Terminal Styling Module

`adclours.mjs` is a powerful, comprehensive, and chainable JavaScript module designed for styling terminal text with an extensive range of colors and formatting options. Leveraging a Proxy-based fluent API, it offers over 50 features, including basic and bright colors, 24-bit true color (RGB/HEX), 256-color palette support, text effects, utility functions for layout, and advanced features like spinners and logging.

## Features

This section provides a detailed overview of all the features available in `adclours.mjs`, categorized for easy navigation.

### Table of Contents

*   [1. Chainable Styling API (`color` object)](#1-chainable-styling-api-color-object)
    *   [Basic Usage](#basic-usage)
    *   [Available Styles](#available-styles)
    *   [Basic Foreground Colors](#basic-foreground-colors)
    *   [Bright/Hi-intensity Foreground Colors](#brighthi-intensity-foreground-colors)
    *   [Basic Background Colors](#basic-background-colors)
    *   [Bright/Hi-intensity Background Colors](#brighthi-intensity-background-colors)
*   [2. Advanced Color Support](#2-advanced-color-support)
    *   [RGB Colors (24-bit True Color)](#rgb-colors-24-bit-true-color)
    *   [HEX Colors](#hex-colors)
    *   [256-Color Palette](#256-color-palette)
    *   [Extended Named Colors (Over 50!)](#extended-named-colors-over-50)
*   [3. Text Effects and Utilities](#3-text-effects-and-utilities)
    *   [`strip(text)`](#striptext)
    *   [`rainbow(text)`](#rainbowtext)
    *   [`gradient(text, startHex, endHex)`](#gradienttext-starthex-endhex)
    *   [`progressBar(value, total, options)`](#progressbarvalue-total-options)
    *   [`box(text, options)`](#boxtext-options)
    *   [`center(text, width)`](#centertext-width)
    *   [`wrap(text, width)`](#wraptext-width)
    *   [`asciiArt(text)`](#asciiarttext)
    *   [`pad(text, width, side, char)`](#padtext-width-side-char)
    *   [`table(rows, options)`](#tablerows-options)
    *   [`line(width, text)`](#linewidth-text)
    *   [`title(title, subtitle, width)`](#titletitle-subtitle-width)
    *   [`list(items, options)`](#listitems-options)
    *   [`blend(text, color1, color2, ratio, mode)`](#blendtext-color1-color2-ratio-mode)
    *   [`generateShades(baseColor, count, direction)`](#generateshadesbasecolor-count-direction)
    *   [`findNearestColor(inputColor)`](#findnearestcolorinputcolor)
*   [4. Advanced Components](#4-advanced-components)
    *   [`Spinner` Class](#spinner-class)
    *   [`animate(text, options)`](#animatetext-options)
*   [5. Structured Logging System (`log` object)](#5-structured-logging-system-log-object)

### 1. Chainable Styling API (`color` object)

The core of `adclours.mjs` is the `color` object, which provides a highly intuitive and chainable API for applying styles and colors. You can combine multiple styles and colors seamlessly.

**Basic Usage:**

```javascript
import { color } from 'adclours';

console.log(color.red('This is red text.'));
console.log(color.bold.green('This is bold green text.'));
console.log(color.underline.blue.bgYellow('Underlined blue text with yellow background.'));
```

**Available Styles:**

*   `color.reset`: Resets all applied styles.
*   `color.bold`: Makes text bold.
*   `color.dim`: Dims the text.
*   `color.italic`: Makes text italic.
*   `color.underline`: Underlines the text.
*   `color.inverse`: Inverts foreground and background colors.
*   `color.hidden`: Hides the text.
*   `color.strikethrough`: Adds a strikethrough to the text.
*   `color.overline`: Adds an overline to the text.

**Basic Foreground Colors:**

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`

```javascript
console.log(color.red('Hello'));
console.log(color.cyan('World'));
```

**Bright/Hi-intensity Foreground Colors:**

`gray`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

```javascript
console.log(color.brightGreen('Success!'));
console.log(color.gray('Dimmed text.'));
```

**Basic Background Colors:**

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

```javascript
console.log(color.bgBlue('Blue Background'));
console.log(color.black.bgGreen('Black text on Green background'));
```

**Bright/Hi-intensity Background Colors:**

`bgGray`, `bgBrightRed`, `bgBrightGreen`, `bgBrightYellow`, `bgBrightBlue`, `bgBrightMagenta`, `bgBrightCyan`, `bgBrightWhite`

```javascript
console.log(color.bgBrightYellow('Bright Yellow Background'));
```

### 2. Advanced Color Support

`adclours.mjs` goes beyond basic ANSI colors, offering true color and 256-color palette support.

#### RGB Colors (24-bit True Color)

Specify colors using Red, Green, and Blue values (0-255).

*   `color.rgb(r, g, b)(text)`: Sets foreground color.
*   `color.bgRgb(r, g, b)(text)`: Sets background color.

```javascript
import { color } from 'adclours';

console.log(color.rgb(255, 100, 0)('Orange text.'));
console.log(color.bgRgb(50, 200, 150)('Text with custom background.'));
```

#### HEX Colors

Use 6-digit hexadecimal color codes.

*   `color.hex('#RRGGBB')(text)`: Sets foreground color.
*   `color.bgHex('#RRGGBB')(text)`: Sets background color.

```javascript
import { color } from 'adclours';

console.log(color.hex('#FF4500')('OrangeRed text.'));
console.log(color.bgHex('#8A2BE2')('Text with BlueViolet background.'));
```

#### 256-Color Palette

Access the 256-color terminal palette by index (0-255).

*   `color.color256(code)(text)`: Sets foreground color.
*   `color.bg256(code)(text)`: Sets background color.

```javascript
import { color } from 'adclours';

console.log(color.color256(208)('Orange from 256 palette.'));
console.log(color.bg256(18)('Dark blue background from 256 palette.'));
```

#### Extended Named Colors (Over 50!)

In addition to basic and bright colors, `adclours.mjs` includes a vast array of named colors for convenience, which are internally converted to HEX/RGB.

**Supported Named Colors:**
`maroon`, `darkred`, `firebrick`, `crimson`, `tomato`, `coral`, `indianred`, `lightcoral`, `salmon`, `darksalmon`, `lightsalmon`, `orangered`, `darkorange`, `orange`, `gold`, `yellowgreen`, `olivedrab`, `olive`, `darkolivegreen`, `forestgreen`, `seagreen`, `mediumseagreen`, `darkcyan`, `teal`, `darkturquoise`, `turquoise`, `lightseagreen`, `cadetblue`, `steelblue`, `cornflowerblue`, `royalblue`, `mediumblue`, `darkblue`, `navy`, `midnightblue`, `indigo`, `darkmagenta`, `purple`, `mediumorchid`, `orchid`, `violet`, `plum`, `thistle`, `silver`, `lightgray`, `darkgray`, `dimgray`, `slategray`, `lightslategray`, `rosybrown`, `palevioletred`, `hotpink`, `deeppink`, `fuchsia`, `paleturquoise`, `lightblue`, `skyblue`, `deepskyblue`, `dodgerblue`, `azure`, `aliceblue`, `ghostwhite`, `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

```javascript
import { color } from 'adclours';

console.log(color.gold('Golden text.'));
console.log(color.teal('Teal colored message.'));
console.log(color.hotpink.bold('Hot Pink and Bold!'));
```

### 3. Text Effects and Utilities

Beyond simple coloring, `adclours.mjs` provides functions for various text manipulations and effects.

#### `strip(text)`

Removes all ANSI escape codes from a string, returning plain text. Useful for calculating actual string length or logging.

```javascript
import { color, strip } from 'adclours';

const coloredText = color.red('Hello ') + color.bold('World!');
console.log(coloredText); // Outputs colored text
console.log(strip(coloredText)); // Outputs "Hello World!"
console.log(strip(coloredText).length); // Outputs 12
```

#### `rainbow(text)`

Applies a vibrant rainbow effect to the input text, coloring each character sequentially through a spectrum.

```javascript
import { rainbow } from 'adclours';

console.log(rainbow('Welcome to the Rainbow!'));
```

#### `gradient(text, startHex, endHex)`

Applies a smooth color gradient across the characters of the text, transitioning from a starting HEX color to an ending HEX color.

```javascript
import { gradient } from 'adclours';

console.log(gradient('Beautiful Gradient Text', '#FF0000', '#0000FF')); // Red to Blue gradient
```

#### `progressBar(value, total, options)`

Generates a customizable terminal-based progress bar.

*   `value`: Current progress value.
*   `total`: Total value for completion.
*   `options`:
    *   `width` (default: `50`): Total width of the bar.
    *   `filledChar` (default: `'█'`): Character for the filled portion.
    *   `emptyChar` (default: `'░'`): Character for the empty portion.

The bar automatically changes color based on progress (red < 30%, yellow < 70%, green >= 70%).

```javascript
import { progressBar } from 'adclours';

console.log(progressBar(10, 100));
console.log(progressBar(50, 100, { width: 30, filledChar: '=', emptyChar: '-' }));
console.log(progressBar(90, 100));
```

#### `box(text, options)`

Draws a decorative box around the given text. Supports multi-line text.

*   `text`: The content to be boxed.
*   `options`:
    *   `borderColor` (default: `'white'`): Color of the box border (uses named colors).
    *   `style` (default: `'single'`): Border style (`'single'`, `'double'`, or `'triple'`).
    *   `padding` (default: `1`): Space between the text and the border.

```javascript
import { box, color } from 'adclours';

const message = `
  ${color.bold('Important Message:')}
  ${color.yellow('Please review the updated documentation.')}
  ${color.dim('Version 2.0.0 is now available.')}
  `;
console.log(box(message, { borderColor: 'blue', style: 'double', padding: 2 }));
console.log(box(color.bold.cyan('Important Notice'), { borderColor: 'red', padding: 2 }));
```

#### `center(text, width)`

Centers the given text within a specified terminal width. ANSI escape codes are ignored for width calculation.

```javascript
import { center, color } from 'adclours';

const terminalWidth = 80;
console.log(center(color.yellow('Centered Text'), terminalWidth));
console.log(center('Another centered line', terminalWidth));
```

#### `wrap(text, width)`

Wraps long text to fit within a specified terminal width, breaking lines at word boundaries.

```javascript
import { wrap } from 'adclours';

const longText = "This is a very long sentence that needs to be wrapped to fit into a smaller terminal width for better readability and presentation.";
console.log(wrap(longText, 30));
```

#### `asciiArt(text)`

Converts input text into large ASCII art characters. Currently supports uppercase letters A, B, C, D, E, L, O, R, S, P, I, T, M.

```javascript
import { asciiArt, color } from 'adclours';

console.log(color.magenta(asciiArt('CODE')));
console.log(color.cyan(asciiArt('ADCLOURS')));
```

#### `pad(text, width, side, char)`

Pads text with a specified character to reach a target width.

*   `text`: The text to pad.
*   `width`: The total desired width.
*   `side` (default: `'right'`): Side to pad on (`'left'` or `'right'`).
*   `char` (default: `' '`): The padding character.

```javascript
import { pad, color } from 'adclours';

console.log(pad(color.green('Success'), 20, 'right', '.')); // "Success............."
console.log(pad(color.red('Error'), 20, 'left', '-'));    // "-------------Error"
```

#### `table(rows, options)`

Creates a simple, formatted table in the terminal.

*   `rows`: An array of arrays, where the first inner array is the header row.
*   `options`:
    *   `align` (default: `['left']`): An array of alignment strings (`'left'`, `'right'`, `'center'`) for each column.

```javascript
import { table, color } from 'adclours';

const data = [
  [color.bold('Name'), color.bold('Age'), color.bold('City')],
  ['Alice', '30', 'New York'],
  ['Bob', '24', 'London'],
  ['Charlie', '35', 'Paris']
];

console.log(table(data, { align: ['left', 'center', 'right'] }));
```

#### `line(width, text)`

Generates a horizontal line, optionally with text centered within it.

*   `width`: The total width of the line.
*   `text` (default: `''`): Optional text to embed in the center.

```javascript
import { line, color } from 'adclours';

console.log(color.dim(line(50)));
console.log(color.blue(line(50, 'SECTION START')));
console.log(color.dim(line(50)));
```

#### `title(title, subtitle, width)`

Creates a formatted title block, optionally with a subtitle, centered within a given width.

*   `title`: The main title string.
*   `subtitle` (default: `''`): An optional subtitle string.
*   `width`: The total width for centering.

```javascript
import { title, color } from 'adclours';

console.log(title(color.bold.green('APPLICATION STATUS'), 'Version 1.0.0', 60));
```

#### `list(items, options)`

Formats an array of strings into a bulleted list.

*   `items`: An array of strings, each representing a list item.
*   `options`:
    *   `symbol` (default: `'•'`): The bullet symbol to use.

```javascript
import { list } from 'adclours';

const tasks = [
  'Complete documentation',
  'Implement new feature',
  'Fix reported bugs'
];

console.log(list(tasks));
console.log(list(['Item A', 'Item B'], { symbol: '➤' }));
```

#### `blend(text, color1, color2, ratio, mode)`

Blends two colors and applies the resulting color to the text.

*   `text`: The text to color.
*   `color1`, `color2`: The two colors to blend (can be named color strings, hex codes, or `[r, g, b]` arrays).
*   `ratio` (default: `0.5`): Blending ratio (0.0 for pure `color1`, 1.0 for pure `color2`).
*   `mode` (default: `'normal'`): Blending mode (`'normal'`, `'multiply'`, `'screen'`).

```javascript
import { blend } from 'adclours';

console.log(blend('Blended Color', 'red', 'blue', 0.5)); // 50% red, 50% blue
console.log(blend('Multiply Blend', '#FF0000', '#00FF00', 0.5, 'multiply')); // Red and Green multiplied
```

#### `generateShades(baseColor, count, direction)`

Generates an array of color-formatted strings representing shades of a base color.

*   `baseColor`: The starting color (named color string, hex code, or `[r, g, b]` array).
*   `count` (default: `5`): Number of shades to generate.
*   `direction` (default: `'darken'`): `'darken'` or `'lighten'`.

```javascript
import { generateShades } from 'adclours';

const redShades = generateShades('red', 5, 'darken');
redShades.forEach((shade, i) => console.log(shade(`Shade ${i + 1}`)));

const blueTints = generateShades('#0000FF', 3, 'lighten');
blueTints.forEach((tint, i) => console.log(tint(`Tint ${i + 1}`)));
```

#### `findNearestColor(inputColor)`

Finds the closest named color from the extended color list to a given input color (RGB or HEX).

*   `inputColor`: The color to find the nearest match for (named color string, hex code, or `[r, g, b]` array).

```javascript
import { findNearestColor } from 'adclours';

console.log(`Nearest color to #FF6347 (Tomato): ${findNearestColor('#FF6347')}`);
console.log(`Nearest color to [0, 128, 0] (Dark Green): ${findNearestColor([0, 128, 0])}`);
```

### 4. Advanced Components

#### `Spinner` Class

Provides an animated terminal spinner for indicating ongoing processes.

*   `constructor(frames, text, interval, styleFn = color.white)`:
    *   `frames`: An array of characters for the animation frames (e.g., `['-', '\', '|', '/']`).
    *   `text`: The text to display next to the spinner.
    *   `interval`: The animation speed in milliseconds.
    *   `styleFn`: A `color` function to style the spinner (e.g., `color.cyan`).

*   `spinner.start()`: Starts the spinner animation.
*   `spinner.stop(finalChar = '✔', finalText = 'Done!', finalColor = 'green')`: Stops the spinner, replaces it with a final character, and displays a final message.

```javascript
import { Spinner, color } from 'adclours';

const spinner = new Spinner(['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], 'Loading data...', 100, color.cyan);

spinner.start();

setTimeout(() => {
  spinner.stop('✔', 'Data Loaded Successfully!', 'green');
}, 3000);
```

#### `animate(text, options)`

Applies simple text animations like blinking or pulsing.

*   `text`: The text to animate.
*   `options`:
    *   `effect` (default: `'blink'`): The animation effect (`'blink'` or `'pulse'`).
    *   `interval` (default: `500`): Interval between animation frames in milliseconds.
    *   `duration` (default: `3000`): Total duration of the animation in milliseconds.

```javascript
import { animate, color } from 'adclours';

console.log('Starting animation...');
animate(color.red.bold('ALERT: System Overload!'), { effect: 'blink', duration: 4000 });

setTimeout(() => {
  console.log('\nStarting pulse animation...');
  animate(color.blue('Pulsing Message'), { effect: 'pulse', interval: 200, duration: 4000 });
}, 6000);
```

### 5. Structured Logging System (`log` object)

A convenient utility for structured console logging with timestamps and colored prefixes.

*   `log.info(msg)`: Prints an informational message (blue `ⓘ`).
*   `log.success(msg)`: Prints a success message (green `✔`).
*   `log.warn(msg)`: Prints a warning message (yellow `▲`).
*   `log.error(msg)`: Prints an error message (red `✖`).
*   `log.debug(msg)`: Prints a debug message (dim `🐛 [DEBUG]`) only if `process.env.DEBUG` is set to `'true'`.

```javascript
import { log } from 'adclours';

log.info('Application started.');
log.success('Operation completed successfully.');
log.warn('Configuration file not found, using defaults.');
log.error('Failed to connect to the database!');

// To see debug messages, run your Node.js script with: DEBUG=true node your_script.mjs
process.env.DEBUG = 'true'; // For demonstration
log.debug('This is a debug message.');
delete process.env.DEBUG; // Clean up
```

## License and Terms

`adclours` is an open-source project developed by **Smart Tell Line**. It is licensed under the **MIT License**.

*   The full text of the MIT License can be found in the [`LICENSE`](./LICENSE) file.
*   Additional terms and conditions are detailed in the [`TERMS_AND_CONDITIONS.md`](./TERMS_AND_CONDITIONS.md) file.

We encourage contributions and feedback from the community to make `adclours` even better!

## Installation

`adclours` is available as a package on npm. You can install it using your preferred package manager:

```bash
npm install adclours
# or
yarn add adclours
# or
pnpm add adclours
```

### Usage

Once installed, you can import and use `adclours` in your JavaScript files:

```javascript
// your_script.mjs
import { color, log, Spinner } from 'adclours'; // Note: import from 'adclours' not './adclours.mjs'

console.log(color.green('adclours is ready!'));
log.info('Starting application...');
```

Make sure your `package.json` has `"type": "module"` if you are using ES modules in a Node.js environment.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module", // <--- Add this line
  "main": "index.js",
  "scripts": {
    "start": "node index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

### Direct Import (Alternative)

If you prefer not to use a package manager, you can still directly import the `adclours.mjs` module file into your project:

1.  **Save the file:** Save the `adclours.mjs` content into your project directory.
2.  **Import:** Use ES module imports in your JavaScript files, referencing the local file path:

    ```javascript
    // your_script.mjs
    import { color, log, Spinner } from './adclours.mjs'; // Note: import from './adclours.mjs'

    console.log(color.green('adclours.mjs is ready!'));
    log.info('Starting application...');
    ```

## Usage Examples

Here are some combined examples demonstrating the power and flexibility of `adclours.mjs`.

```javascript
// example.mjs
import { color, log, progressBar, box, asciiArt, line, title, Spinner, animate } from 'adclours'; // Or './adclours.mjs' if direct import

async function runDemo() {
  console.clear(); // Clear console for a clean demo

  // --- Welcome Title ---
  console.log(title(color.bold.cyan('ADCLOURS DEMO'), 'Terminal Styling Powerhouse', 80));
  console.log(line(80, color.dim('START')));
  console.log('\n');

  // --- Basic Styling ---
  log.info('Demonstrating basic text styling:');
  console.log(color.red('This is red.'));
  console.log(color.bold.green('This is bold green.'));
  console.log(color.underline.magenta.bgCyan('Underlined magenta on cyan background.'));
  console.log('\n');

  // --- Advanced Colors ---
  log.info('Showcasing advanced color capabilities:');
  console.log(color.rgb(255, 165, 0)('Orange RGB text.'));
  console.log(color.bgHex('#4CAF50')('Text with a Material Green background.'));
  console.log(color.color256(160)('Deep red from 256-color palette.'));
  console.log(color.gold('This text is golden!'));
  console.log('\n');

  // --- Progress Bar ---
  log.info('Progress Bar in action:');
  let progress = 0;
  const total = 100;
  const interval = setInterval(() => {
    process.stdout.write(`\r${progressBar(progress, total)}`);
    progress += 5;
    if (progress > total) {
      clearInterval(interval);
      console.log('\n');
      log.success('Progress complete!');
      console.log('\n');
    }
  }, 100);

  await new Promise(resolve => setTimeout(resolve, 2500)); // Wait for progress bar

  // --- Box Example ---
  log.info('Text inside a custom box:');
  const boxedContent = `
  ${color.bold('Important Message:')}
  ${color.yellow('Please review the updated documentation.')}
  ${color.dim('Version 2.0.0 is now available.')}
  `;
  console.log(box(boxedContent, { borderColor: 'blue', style: 'double', padding: 2 }));
  console.log('\n');

  // --- ASCII Art ---
  log.info('Generating ASCII Art:');
  console.log(color.brightGreen(asciiArt('CODE')));
  console.log('\n');

  // --- Spinner ---
  log.info('Starting a spinner for a simulated task:');
  const spinner = new Spinner(['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], 'Processing files...', 80, color.cyan);
  spinner.start();
  await new Promise(resolve => setTimeout(resolve, 3000));
  spinner.stop('✔', 'Files Processed!', 'green');
  console.log('\n');

  // --- Animation ---
  log.info('Demonstrating text animation (blinking):');
  animate(color.red.bold('ALERT: System Overload!'), { effect: 'blink', duration: 4000 });
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for animation to finish

  console.log('\n');
  console.log(line(80, color.dim('END')));
  log.info('Demo finished. Explore adclours.mjs for more!');
}

runDemo();