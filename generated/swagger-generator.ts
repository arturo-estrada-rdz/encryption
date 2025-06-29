import fs from 'fs';
import path from 'path';
import { swaggerDocs } from './../src/config/swagger-options';

const outputPath = path.join(__dirname, 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2), 'utf8');
console.log(`Swagger documentation generated at ${outputPath}`);
