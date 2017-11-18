/**
 * A utility to generate `package.json` files (used in RN's module resolution system)
 * in the dist/ folder, based on settings from tsconfig.json.
 */

const Path = require('path');
const fs = require('fs');

process.cwd(Path.join(__dirname, '..'));

function assert(expression, message) {
  if (!expression) throw new Error(message);
}

function stripTrailingSlash(dir) {
  if (dir.lastIndexOf('/') === dir.length - 1) {
    return dir.substring(0, dir.length - 1);
  }
  return dir;
}

function getSubDirs(parentDir) {
  return fs.readdirSync(parentDir).reduce(function(dirs, dir){
    if (dir.indexOf('.') !== 0) {
      const dirPath = Path.join(parentDir, dir);
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory()) dirs.push(dirPath);
    }
    return dirs;
  }, []);
}

function ensureDir(parts) {
  let path = baseBuildPath;
  parts.forEach(function(part) {
    path = Path.join(path, part);
    try {
      fs.statSync(path);
    } catch (e) {
      fs.mkdirSync(path, 0o755);
    }
  });
}

const config = JSON.parse(
  fs.readFileSync('tsconfig.json', 'utf8')
    .replace(/\/\*.+\*\//g, '')
    .replace(/\/\/.+/g, '')
).compilerOptions;
const baseSource = stripTrailingSlash(config.baseUrl);
const baseBuildPath = stripTrailingSlash(config.outDir);

assert(
  Object.keys(config.paths).length === 1 && config.paths['*'],
  'This script will not work if tsconfig paths contains anything but the wildcard'
);

config.paths['*']
.map(function(path) {
  const stripStar = path.substring(0, path.lastIndexOf('*'));
  return Path.join(baseSource, stripStar);
})
.forEach(function(path) {
  getSubDirs(path)
  .map(function(path) {
    const parts = path.split(Path.sep);
    assert(parts[0] === baseSource, "Invalid directory");
    return Path.join.apply(Path, parts.slice(1));
  })
  .forEach(function(path) {
    const parts = path.split(Path.sep);
    const name = parts[parts.length - 1];
    const data = '{ "name": "'+name+'" }\n';
    const fullPath = Path.join(baseBuildPath, Path.join.apply(Path, parts));
    const fileName = Path.join(fullPath, 'package.json');
    ensureDir(parts);
    try {
      fs.statSync(fileName);
    } catch (e) {
      fs.writeFileSync(fileName, data);
    }
  });
})

process.exit(0);
