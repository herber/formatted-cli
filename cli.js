#!/usr/bin/env node

const mri = require('mri');
const fs = require('fs');
const { help, fullPath, package, install } = require('./');

let ok = true;

const parsed = mri(process.argv.slice(2), {
  boolean: ['version', 'help'],
  alias: { version: 'v', help: 'h' },
  unknown: () => {
    ok = false;
    help();
  }
});

const main = async () => {
  const path = fullPath(parsed['_'][0] || process.cwd());

  try {
    if (!fs.existsSync(path)) {
      throw new Error('Path does not exist');
    }

    package(path);
    install(path);
  } catch (err) {
    console.error(err);
  }
};

if (ok) {
  if (parsed.v) {
    const pkg = require('./package.json');
    console.log(pkg.version);
  } else if (parsed.h) {
    help();
  } else {
    main();
  }
}
