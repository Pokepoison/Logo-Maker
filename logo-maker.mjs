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
      message: 'Enter text color (color or hexadecimal number):',
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
      message: 'Enter shape color (color or hexadecimal number):',
    },
  ]);

  let shapeElement;
  switch (userInput.shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="75" fill="${userInput.shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `
        <polygon points="150,50 100,150 200,150" fill="${userInput.shapeColor}" />
      `;
      break;
    case 'square':
      shapeElement = `<rect x="75" y="25" width="150" height="150" fill="${userInput.shapeColor}" />`;
      break;
    default:
      shapeElement = ''; // No shape selected
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
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
