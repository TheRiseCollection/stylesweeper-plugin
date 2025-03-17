#!/usr/bin/env node
const { program } = require('commander');
const glob = require('glob');
const fs = require('fs').promises;
const chalk = require('chalk');


// Regular expression to detect inline styles
const inlineStyleRegex = /style=["'{][^"'}]+["'}]|style={{[^}}]+}}/g;
async function sweepDirectory() {
  try {
    console.log(chalk.blue('Sweeping for inline styles...'));
    // Find all relevant files (HTML, JSX, TSX, etc.)
    const files = glob.sync('**/*.{html,jsx,tsx}', {
      ignore: ['node_modules/**', 'dist/**'],
    });
    if (files.length === 0) {
      console.log(chalk.yellow('No files found to sweep.'));
      return;
    }
    let hasInlineStyles = false;
    // Process each file
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        const matches = line.match(inlineStyleRegex);
        if (matches) {
          hasInlineStyles = true;
          console.log(chalk.red(`\nInline styles found in ${file}:${index + 1}`));
          console.log(chalk.gray(line.trim()));
          console.log(chalk.yellow(`Matches: ${matches.join(', ')}`));
        }
      });
    }
    if (!hasInlineStyles) {
      console.log(chalk.green('No inline styles detected!'));
    }
  } catch (error) {
    console.error(chalk.red('Error sweeping directory:'), error.message);
  }
}


// Set up CLI command
program
  .command('start')
  .description('Sweep the current directory for inline styles')
  .action(sweepDirectory);
program.parse(process.argv);
// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}