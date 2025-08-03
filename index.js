import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import addCommand from './commands/add.js';
import listCommand from './commands/list.js';

const cli = yargs(hideBin(process.argv))

addCommand(cli);
listCommand(cli);

cli
  .demandCommand(1, 'Specify a command: add, list or remove')
  .strict()
  .help()
  .parse()