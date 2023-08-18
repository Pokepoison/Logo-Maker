// const fs = require('fs');
// const inquirer = require('inquirer');
// const chalk = require('chalk');
// const svg2img = require('svg2img');

import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import svg2img from 'svg2img';

const generateLogo = async () => {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: input => (input.length > 0 && input.length <= 3) || 'Please enter 1 to 3 characters.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape for the logo:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal):',
    },
  ]);

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${userInput.shapeColor}" />
      <text x="50%" y="50%" font-size="48" fill="${userInput.textColor}" text-anchor="middle">${userInput.text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgContent);

  svg2img('logo.svg', { width: 300, height: 200 }, (error, buffer) => {
    if (error) {
      console.error(chalk.red('Error converting SVG to PNG:'), error);
    } else {
      fs.writeFileSync('logo.png', buffer);
      console.log(chalk.green('Generated logo.svg and logo.png'));
    }
  });
};

generateLogo();
