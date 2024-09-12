import path from 'path';
import { promises as fs } from 'fs';

export async function GET(req, res) {
  // Find the absolute path of the "json" directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  // Read the "data.json" file
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  // Return the content of the data file in JSON format
  const data = JSON.parse(fileContents);
  return Response.json({ data });
}