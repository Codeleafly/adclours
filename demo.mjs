/**
 * @fileoverview A massively expanded, interactive CLI tool that demonstrates the adclours.mjs module.
 * This version features over 50 styling examples, complex gradients, and custom progress bars.
 * @author Smart Tell Line
 */

import readline from 'readline';
import {
  color,
  strip,
  rainbow,
  gradient,
  progressBar,
  box,
  center,
  line,
  title,
  list,
  blend,
  asciiArt,
  findNearestColor,
  Spinner,
  log,
  table,
} from './adclours.mjs';

const termWidth = process.stdout.columns || 80;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Renders the main title and introduction.
 */
function renderHeader() {
  console.clear();
  console.log();
  const mainTitle = title(
    color.bold.rgb(10, 200, 255).bgBlack('adclours'),
    color.dim('The Ultimate CLI Styling Demo'),
    termWidth
  );
  console.log(mainTitle);
  console.log(line(termWidth, color.rgb(10, 200, 255)('---')));
  console.log();
}

/**
 * Renders the main menu.
 */
function renderMenu() {
  renderHeader();
  const menuItems = [
    color.bold('1.') + color.cyan(' Chainable API & Basic Styles'),
    color.bold('2.') + color.cyan(' RGB, HEX & Named Colors (50+ Examples)'),
    color.bold('3.') + color.cyan(' Advanced Effects (Rainbow & Gradients)'),
    color.bold('4.') + color.cyan(' Layout Utilities (Box, Table, ASCII)'),
    color.bold('5.') + color.cyan(' Dynamic Elements (Progress & Spinner)'),
    color.bold('6.') + color.red(' Exit'),
  ];
  console.log(
    center(
      box(
        color.bold.rgb(255, 180, 0)('  Choose a demo to explore:  '),
        {
          borderColor: 'dimGray',
          style: 'single',
          padding: 1,
        }
      ) +
        '\n\n' +
        list(menuItems, { symbol: '👉' }),
      termWidth
    )
  );
  console.log();
  rl.question(color.bold('Enter your choice (1-6): '), handleInput);
}

/**
 * Handles user input from the main menu.
 * @param {string} choice - The user's menu choice.
 */
async function handleInput(choice) {
  const choiceNum = parseInt(choice, 10);
  switch (choiceNum) {
    case 1:
      showBasicStyles();
      break;
    case 2:
      showCustomColors();
      break;
    case 3:
      showAdvancedEffects();
      break;
    case 4:
      showUtilities();
      break;
    case 5:
      await showDynamicElements();
      break;
    case 6:
      exitDemo();
      break;
    default:
      log.warn('Invalid choice. Please enter a number from 1 to 6.');
      setTimeout(renderMenu, 1000);
  }
}

// --- Demo Functions for each menu item ---

function showBasicStyles() {
  renderHeader();
  const header = center(
    color.bold.underline('1. Chainable API & Basic Styles'),
    termWidth
  );
  const content = `
    The ${color.bold.green('chainable API')} allows you to combine multiple styles effortlessly.
    It's an elegant way to style your terminal output.

    ${color.italic.cyan('Italic cyan text')}.
    ${color.strikethrough.red('Strikethrough red text')}.
    ${color.bold.bgMagenta.underline('Bold, underlined, magenta background')}.
    ${color.inverse.blue('Inverse blue color')}.
    ${color.dim.white('Dim white text for less emphasis')}.
    ${color.underline.yellow('Underlined yellow')}, ${color.bold.brightGreen('bold bright green')}, and ${color.italic.gray('italic gray')}.
    `;
  console.log(header);
  console.log(center(content, termWidth));
  waitForUser();
}

function showCustomColors() {
  renderHeader();
  const header = center(
    color.bold.underline('2. RGB, HEX & Named Colors (50+ Examples)'),
    termWidth
  );
  console.log(header);
  console.log();

  const colors1 = [
    { name: 'Red', style: color.red },
    { name: 'Orange', style: color.rgb(255, 165, 0) },
    { name: 'Gold', style: color.gold },
    { name: 'Yellow', style: color.yellow },
    { name: 'Olive', style: color.olive },
  ];
  const colors2 = [
    { name: 'Green', style: color.green },
    { name: 'Lime', style: color.rgb(0, 255, 0) },
    { name: 'Teal', style: color.teal },
    { name: 'Cyan', style: color.cyan },
    { name: 'Turquoise', style: color.turquoise },
  ];
  const colors3 = [
    { name: 'Blue', style: color.blue },
    { name: 'Indigo', style: color.indigo },
    { name: 'Navy', style: color.navy },
    { name: 'SteelBlue', style: color.steelblue },
    { name: 'CornflowerBlue', style: color.cornflowerblue },
  ];
  const colors4 = [
    { name: 'Magenta', style: color.magenta },
    { name: 'Purple', style: color.purple },
    { name: 'Orchid', style: color.orchid },
    { name: 'Violet', style: color.violet },
    { name: 'Fuchsia', style: color.fuchsia },
  ];
  const colors5 = [
    { name: 'Gray', style: color.gray },
    { name: 'Silver', style: color.silver },
    { name: 'DarkGray', style: color.darkgray },
    { name: 'DimGray', style: color.dimgray },
    { name: 'Black', style: color.black },
  ];

  const colorBlocks = [...colors1, ...colors2, ...colors3, ...colors4, ...colors5]
    .map(c => c.style.bgBlack.bold(` ${c.name} `))
    .join(' ');
  console.log(center(colorBlocks, termWidth));

  const content = `
    ${color.bold.rgb(255, 105, 180)('RGB text')}: ${color.rgb(255, 105, 180)('Hot Pink')}
    ${color.white.bgRgb(128, 0, 128)('RGB background')}: ${color.white.bgRgb(128, 0, 128)('Purple Background')}

    ${color.bold.hex('#00CDCD')('HEX text')}: ${color.hex('#00CDCD')('Turquoise')}
    ${color.black.bgHex('#A9A9A9')('HEX background')}: ${color.black.bgHex('#A9A9A9')('Dark Gray Background')}
    
    ${blend('Color blend:', 'yellow', 'blue', 0.5)}
    The nearest color to ${color.hex('#CD5C5C')('#CD5C5C')} is ${color.indianred('indianred')}.
  `;
  console.log(center(content, termWidth));
  waitForUser();
}

function showAdvancedEffects() {
  renderHeader();
  const header = center(
    color.bold.underline('3. Advanced Effects (Rainbow & Gradients)'),
    termWidth
  );
  console.log(header);
  console.log();

  console.log(center(rainbow('This is the rainbow effect!'), termWidth));
  console.log();

  const gradient1 = gradient('Gradient from gold to royalblue.', '#FFD700', '#4169E1');
  const gradient2 = gradient('Another one, from deeppink to violet.', '#FF1493', '#EE82EE');
  const gradient3 = gradient('A warm sunset gradient from firebrick to darkorange.', '#B22222', '#FF8C00');

  console.log(center(gradient1, termWidth));
  console.log(center(gradient2, termWidth));
  console.log(center(gradient3, termWidth));
  console.log();

  const multiLineGradient = gradient(
    `
This is a multi-line gradient.
It applies the effect to each character individually,
creating a smooth transition across the entire text block.
  `,
    '#008080',
    '#F0FFFF'
  );
  console.log(center(multiLineGradient, termWidth));
  
  waitForUser();
}

function showUtilities() {
  renderHeader();
  const header = center(
    color.bold.underline('4. Layout Utilities (Box, Table, ASCII)'),
    termWidth
  );
  console.log(header);
  console.log();

  const boxedText1 = box(
    color.white.bold('  Beautiful Single Box  \n') +
      color.dim('This text is inside a single-bordered box.'),
    { borderColor: 'dimGray', style: 'single' }
  );
  console.log(center(boxedText1, termWidth));
  console.log();

  const boxedText2 = box(
    color.bold.rgb(255, 200, 0)('  Double-Bordered Box  \n') +
      color.white('Great for highlighting important sections.'),
    { borderColor: 'brightBlue', style: 'double' }
  );
  console.log(center(boxedText2, termWidth));
  console.log();

  const tableData = [
    [color.bold('Module'), color.bold('Status'), color.bold('Demo')],
    ['Chainable', color.green('Working'), color.dim('v1.0')],
    ['Colors', color.green('Working'), color.dim('v1.0')],
    ['Layout', color.yellow('Stable'), color.dim('v1.1')],
    ['Dynamic', color.green('Working'), color.dim('v1.2')],
  ];
  console.log(center(table(tableData, { align: ['left', 'center', 'right'] }), termWidth));
  console.log();

  const asciiArtText = asciiArt('POWERFUL');
  console.log(center(color.rgb(255, 100, 0)(asciiArtText), termWidth));

  waitForUser();
}

async function showDynamicElements() {
  return new Promise(async (resolve) => {
    renderHeader();
    const header = center(
      color.bold.underline('5. Dynamic Elements (Progress & Spinner)'),
      termWidth
    );
    console.log(header);
    console.log();
    log.info('Starting dynamic demo...');
    await new Promise(r => setTimeout(r, 1000));

    // Progress Bar 1
    console.log();
    log.info('Showing a classic progress bar...');
    let progressValue1 = 0;
    const progressPromise1 = new Promise(res => {
      const progressInterval1 = setInterval(() => {
        const bar = progressBar(progressValue1, 100);
        process.stdout.write(`\r${color.cyan('Task 1:')} [${bar}]`);
        progressValue1 += 2;
        if (progressValue1 > 100) {
          clearInterval(progressInterval1);
          process.stdout.write('\n');
          log.success('Task 1 completed!');
          res();
        }
      }, 100);
    });
    await progressPromise1;

    // Progress Bar 2 (with different chars)
    console.log();
    log.info('Showing a creative progress bar...');
    let progressValue2 = 0;
    const progressPromise2 = new Promise(res => {
      const progressInterval2 = setInterval(() => {
        const bar = progressBar(progressValue2, 100, {
          filledChar: color.green('▓'),
          emptyChar: color.dim('░'),
        });
        process.stdout.write(`\r${color.magenta('Task 2:')} [${bar}]`);
        progressValue2 += 3;
        if (progressValue2 > 100) {
          clearInterval(progressInterval2);
          process.stdout.write('\n');
          log.success('Task 2 completed!');
          res();
        }
      }, 80);
    });
    await progressPromise2;

    // Spinner
    console.log();
    const spinner = new Spinner(
      ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
      'Loading data...',
      80,
      color.brightMagenta
    );
    spinner.start();
    await new Promise(r => setTimeout(r, 3000));
    spinner.stop('✔', 'Data loaded successfully.', 'green');

    console.log();
    resolve(); // Resolve the main promise
  }).then(() => {
    waitForUser();
  });
}

function waitForUser() {
  rl.question(color.dim('Press Enter to go back to the menu...'), () => {
    renderMenu();
  });
}

function exitDemo() {
  console.clear();
  console.log();
  console.log(
    center(
      color.green(
        `Thank you for using the ${color.bold('adclours')} demo!`
      ),
      termWidth
    )
  );
  console.log(center(color.dim('Developed by Smart Tell Line'), termWidth));
  console.log();
  rl.close();
  process.exit(0);
}

// Initial call to start the demo
renderMenu();
