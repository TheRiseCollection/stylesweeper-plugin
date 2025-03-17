# styleSweepr

A CLI tool designed to detect inline styles in your project files. It scans files like '.html', '.jsx', and '.tsx' for inline 'style' attributes or CSS-in-JS patterns, helping you maintain a clean and organized codebase by identifying styles that could be moved to external stylesheets.

https://github.com/TheRiseCollection/stylesweeper-plugin

## Features

**Sweep**: Detects all inline styles in your project directory with the `sweep start` command.

**Detailed Output**: Shows file names, line numbers, and matching inline style code.

**Simlpe**: Lightweight and easy to intergrate into any workflow.

## Installation
Install `styleSweeper` globally via npm:
```bash
npm install -g style-sweeper
```

## Run styleSweeper
```bash
sweep start
```