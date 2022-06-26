import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const files = fs.readdirSync(path.join(process.cwd(), 'pages', 'articles')).filter(file => file.endsWith('.mdx')).map(file => file.replace(/\.mdx$/, ''));
  res.json(files);
}
