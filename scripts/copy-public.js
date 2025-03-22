import { copyFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = resolve(__dirname, '..', 'public');
const targetDir = resolve(__dirname, '..', 'dist', 'public');

try {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Copy all files from public to dist/public
  const files = readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);
    copyFileSync(sourcePath, targetPath);
  });

  console.log('Public files copied successfully');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}

