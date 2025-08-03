import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

export default function(yargs) {
yargs.command(
    'add <text>',
    'Add new task',
    () => {},
    argv => {
      const filePath = path.resolve('data', 'tasks.json');
      const content  = fs.readFileSync(filePath, 'utf-8');
      const tasks    = JSON.parse(content);

      const newTask = {
        id:   nanoid(6),
        text: argv.text,
        done: false
      };

      tasks.push(newTask);
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

      console.log(`✅ Task added: "${argv.text}" (id: ${newTask.id})`);
    }
  );
}
