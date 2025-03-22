const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '..', 'public');
const targetDir = path.resolve(__dirname, '..', 'dist', 'public');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy all files from public to dist/public
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
  });

  console.log('Public files copied successfully');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}