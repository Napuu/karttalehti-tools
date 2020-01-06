const { fork } = require('child_process');
const applicationProcess = fork('main.js', { silent: true });
setTimeout(() => {
  const applicationTestsProcess = fork('tests.js');
  applicationTestsProcess.on('exit', () => {
    applicationProcess.kill('SIGKILL');
  });
}, 1000);
