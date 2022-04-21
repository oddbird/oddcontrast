import path from 'path';
import { runSass } from 'sass-true';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sassFile = path.join(__dirname, 'test.scss');

runSass({ file: sassFile }, { describe, it });
