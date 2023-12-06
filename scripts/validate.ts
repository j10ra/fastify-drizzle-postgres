// readJournal.js
import fs from 'fs';
import path from 'path';

const journalPath = path.join(__dirname, '../migrations/meta/_journal.json'); // Adjust the path as necessary
const journalContent = fs.readFileSync(journalPath, 'utf8');

try {
  const journalData = JSON.parse(journalContent);
  console.log('Journal content:', journalData);
} catch (error) {
  console.error('Failed to parse JSON:', error);
}
