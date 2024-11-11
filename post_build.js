const fs = require('fs');

fs.copyFile('build/index.html', 'build/valve.html', (err) => {
  if (err) {
    throw err;
  }
  console.log('Setup valve entrypoint');
});
