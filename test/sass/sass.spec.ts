import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runSass } from 'sass-true';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sassFile = path.join(__dirname, 'test.scss');

runSass({ describe, it, sass: 'sass-embedded' }, sassFile);
