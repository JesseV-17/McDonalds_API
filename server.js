import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/mcds', (req, res) => {

  try {
    const driversPath = join(__dirname, 'mcds.json');
    const driversData = readFileSync(driversPath, 'utf-8');
    let drivers = JSON.parse(driversData);

    const filters = req.query; 

    drivers = drivers.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return String(item[key]) === String(value);
      });
    });

    res.json(drivers);
  } catch (error) {
        res.status(500).json({'Failed to load ITEM data': error.message});
    }

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
