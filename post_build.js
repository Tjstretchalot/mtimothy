const fs = require('fs');

const targets = ['valve', 'microsoft', 'dell'];

for (const target of targets) {
  fs.copyFile('build/index.html', `build/${target}.html`, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Setup ${target} entrypoint`);
  });
}
