// Simple test to check if Next.js can start
const { spawn } = require('child_process');

console.log('Starting Next.js server...');

const nextProcess = spawn('npx', ['next', 'dev', '--port', '3001'], {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
});

nextProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Kill after 30 seconds for testing
setTimeout(() => {
  console.log('Killing test server...');
  nextProcess.kill();
}, 30000);