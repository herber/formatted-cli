const untag = require('untag');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

exports.help = () => {
  console.log(untag`
	formatted-cli [path] [options]

	Options:
	  -h --help          Print help
	  -v --version       Print version

	Examples:
	  Add formatted to the current working directory:
	    formatted-cli
	  Add formatted to other directory:
	    formatted-cli ./my-project
	`);
};

exports.package = p => {
  console.log(`- Setting up package.json`);
  const pkg = require(path.join(p, 'package.json'));

  pkg.formatted = pkg.formatted || {};
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.test =
    pkg.scripts.test !== undefined ? 'formatted && ' + pkg.scripts.test : 'formatted';

  fs.writeFileSync(path.join(p, 'package.json'), JSON.stringify(pkg, null, 2));
};

exports.install = path => {
  console.log(`- Installing formatted`);

  const install = spawn('npm', ['install', 'formatted', '-D']);
};

exports.fullPath = p => {
  if (!path.isAbsolute(p)) {
    return path.join(process.cwd(), p);
  }

  return p;
};
