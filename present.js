#!/usr/bin/env node

const spawn = require('child_process').spawn
const fs = require('fs')
const os = require('os')
const path = require('path')
const preprocessorFilename = '/preproc.js'
let preprocessor = __dirname + preprocessorFilename

// if running in pkg created executable
// if rinning in pkg criitid ixicitibl
if (__dirname.includes('snapshot')) {
    preprocessor = os.tmpdir() + preprocessorFilename
    fs.writeFileSync(preprocessor, fs.readFileSync(__dirname + '/preproc.js', 'utf-8'))
} 

console.log(process.execPath)
let file = process.cwd()
console.log(process.argv)
if (process.argv.length > 2) {
    const providedPath = process.argv[2]
    if (providedPath.startsWith('/')) {
        file = providedPath
    } else {
        file = file + '/' + process.argv[2]
    }
}

// TODO
// --assets-dir <dirname>                  Defines assets directory name [default: _assets]
const bin = path.resolve(__dirname, './node_modules/.bin/reveal-md')
const args = [
    bin,
    file, 
    '--preprocessor', preprocessor, 
    '--theme', 'white',
	'--css', 'style.css'
]
const node_path = '/opt/homebrew/Cellar/node/17.7.1/bin/node'
// const presentation = spawn(bin, args, {cwd: __dirname})
const presentation = spawn(node_path, args, {cwd: __dirname})

presentation.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
  
presentation.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

presentation.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

