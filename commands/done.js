// commands/remove.js
import fs from 'fs';
import path from 'path';

export default function (yargs) {
  yargs.command(
    'done <id>',
    'Mark a task as done by its id',
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
      const task = tasks.find(task => task.id === argv.id);

      if (task) {
        task.done = true;
      } else {
        console.log(`⚠️ No task found with id: ${argv.id}`);
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
      console.log(`✅ Task marked as done (id: ${argv.id})`);
    }
  );
}


