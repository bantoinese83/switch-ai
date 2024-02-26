import chalk from 'chalk';

import os from 'os';

function showLoading(loadingTime = 5000) {
  const startTime = Date.now();

  const updateProgress = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const progress = Math.round((elapsedTime / loadingTime) * 100);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Loading: [${progress}%]`);

    if (elapsedTime < loadingTime) {
      setTimeout(updateProgress, 100);
    } else {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      console.log('Loading: [100%]');
      console.log(chalk.green('Initialization complete.'));
      console.log(`Node.js version: ${process.version}`);
      console.log(`OS: ${os.type()} ${os.release()} (${os.arch()})`);
      console.log(`CPU: ${os.cpus()[0].model}`);
      console.log(`Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
      console.log(`System Uptime: ${os.uptime()} seconds`);
    }
  };

  try {
    updateProgress();
  } catch (error) {
    console.error(chalk.red('An error occurred while showing the loading progress:', error));
  }
}

function displayAsciiArt(asciiArt) {
  console.log(chalk.blue(asciiArt));
}

const asciiArt = `
███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
╚════██║██╔══╝  ██╔══██╗██║   ██║██╔══╝  ██╔══██╗
███████║███████╗██║  ██║╚██████╔╝███████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
`;

displayAsciiArt(asciiArt);

export { displayAsciiArt, showLoading };
