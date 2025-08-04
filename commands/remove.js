// commands/remove.js
import fs from 'fs';
import path from 'path';

export default function (yargs) {
  yargs.command(
    'remove <id>',
    'Remove a task by id',
    () => {},
    argv => {
      const filePath = path.resolve('data', 'tasks.json');
      let tasks = [];
      
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        tasks = JSON.parse(content);
      } catch (err) {
        console.error('⚠️ Failed to read tasks file:', err.message);
        process.exit(1);
      }

      const initialLength = tasks.length;
      const filtered = tasks.filter(task => task.id !== argv.id);

      if (filtered.length === initialLength) {
        console.log(`⚠️ No task found with id: ${argv.id}`);
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
      console.log(`🗑️ Task removed (id: ${argv.id})`);
    }
  );
}

