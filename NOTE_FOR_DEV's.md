---

## Documentation and Contribution Guide

### Library Overview: `adcolors.mjs` – Powerful Cross-Runtime Terminal Styling

`adcolors.mjs` is a highly potent and comprehensive JavaScript library designed for advanced terminal text styling and formatting. The core of this library, `adcolors.mjs`, is built exclusively using native Node.js and Deno built-in modules, ensuring seamless cross-runtime compatibility across Node.js, Deno, and TypeScript environments without any code modifications. It provides a fluent, chainable API with over 50 features, enabling developers to create visually rich and professional command-line interfaces (CLIs).

### Core Capabilities and Features:

*   **Comprehensive Coloring**: Offers extensive coloring options including basic ANSI colors, bright/hi-intensity colors, full 256-color palette support, and 24-bit true color (RGB and HEX). It also includes over 50 extended named colors for convenience.
*   **Fluent Chainable API**: Features an intuitive and chainable syntax via the `color` object, simplifying complex styling combinations (e.g., `color.red.bold.underline('Hello World')`).
*   **Advanced Text Effects**:
    *   **Gradients and Rainbow**: Apply beautiful color gradients and rainbow effects to text.
    *   **Blending**: Blend two colors based on a specified ratio and various blending modes ('normal', 'multiply', 'screen').
    *   **Shade Generation**: Dynamically generate an array of lighter or darker shades from a base color.
*   **Terminal UI Components**:
    *   **Progress Bars**: Create dynamic and color-coded progress bars to visualize long-running operations.
    *   **Box Drawing**: Construct customizable boxes around text with single, double, or triple-line borders and specified colors.
    *   **ASCII Art**: Convert regular text into styled ASCII art.
    *   **Tables and Lists**: Easily format data into structured tables with alignment options and styled lists with custom symbols.
    *   **Horizontal Lines and Titles**: Generate horizontal lines and centered title/subtitle blocks to structure terminal output.
*   **Text Manipulation Utilities**:
    *   **Strip ANSI Codes**: Remove all ANSI escape codes from a string, useful for calculating actual text length or for logging.
    *   **Centering and Wrapping**: Center text within a given width or wrap long text to fit terminal dimensions.
    *   **Padding**: Pad text to the left or right with specified characters to achieve uniform alignment.
*   **Interactive Elements**:
    *   **Spinners**: Implement animated spinners for background processes, providing visual feedback to users.
    *   **Animations**: Create text animations like blinking or pulsing effects for emphasis, with start/stop control.
*   **Structured Logging System**: A dedicated `log` object provides timestamped and styled methods for informational (`info`), success (`success`), warning (`warn`), error (`error`), and debug messages, enhancing the clarity of CLI output.
*   **Cross-Runtime Abstraction**: Built with an abstraction layer for `stdout` writing and process exit listeners, ensuring consistent behavior and cleanup routines across Deno and Node.js environments.
*   **Color Utilities**: Includes functions like `toRgb` for robust color parsing (named, hex, RGB) and `findNearestColor` to identify the closest named color to any given RGB or HEX input.

### Usage and Documentation

Utilizing this library is straightforward. For comprehensive documentation and practical examples illustrating its capabilities, please refer to the detailed demonstrations located within the `/demo` folder. These examples are invaluable for understanding the library's power and flexibility in various use cases.

### Contribution and Licensing

This library is open-source and warmly welcomes contributions and enhancements from the developer community. Before making any modifications or integrating the library into your projects, we kindly request that you carefully review the license file (`LICENSE`) for terms of use and contribution guidelines. Analyzing the `adcolors.mjs` file directly will also provide deeper insights into its elegant architecture and powerful implementation.
