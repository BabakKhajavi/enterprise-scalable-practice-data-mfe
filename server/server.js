import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 6600;

function getJsonData(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
app.use(cors());
app.get('/brands/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const brands = getJsonData('brand.json');
  const validSlugs = brands.map((b) => b.data && b.data.slug);
  console.log('Received slug:', slug);
  let selectedBrand = brands.find((b) => b.data && b.data.slug === 'default');
  if (validSlugs.includes(slug)) {
    selectedBrand = brands.find((b) => b.data && b.data.slug === slug);
  }

  res.json(selectedBrand);
});

app.post('/auth/verify-otp', (req, res) => {
  const user = getJsonData('user.json');
  res.json({
    success: true,
    user,
    token: 'jwt_token_placeholder',
  });
});

app.get('/dashboard', (req, res) => {
  res.json(getJsonData('dashboard.json'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
