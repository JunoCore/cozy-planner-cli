import fs from 'fs';
import path from 'path';

export default function (yargs) {
  yargs.command(
    'list',
    'Show all tasks',
    () => {},
    () => {
      const filePath = path.resolve('data', 'tasks.json');
      let tasks = [];

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        tasks = JSON.parse(content);
      } catch (err) {
        console.error('⚠️ Failed to read tasks file:', err.message);
        process.exit(1);
      }

      if (tasks.length === 0) {
        console.log('📭 No tasks found.');
        return;
      }

      const tableData = tasks.map(task => ({
        id:   task.id,
        text: task.text,
        done: task.done ? '✅' : '❌'
      }));

      console.table(tableData);
    }
  );
}
