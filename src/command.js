const { program } = require('commander');
const main = require("./index");

program.version('1.1.1')
    .option('--url, --parent link <link>', 'parent link to start crawling')
    .option('-n, --limit <limit>' , 'number of workers')
    .parse(process.argv)

const options = program.opts();
if (options.parent) main.mainFunc({ workers: options.limit, url: options.parent } )