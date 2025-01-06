import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { createClient } from "@1password/sdk";

const client = await createClient({
  auth: process.env.OP_SERVICE_ACCOUNT_TOKEN,
  integrationName: "1Password Speed Test",
  integrationVersion: "v1.0.0",
});

async function processEnvFile() {
    const envFilePath = path.resolve('./.env');

    try {
        const fileStream = fs.createReadStream(envFilePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const startTime = process.hrtime();
        const linesToProcess = [];

        for await (const line of rl) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('#') || trimmedLine === '') continue;

            linesToProcess.push(trimmedLine);
        }

        console.log(`⏱️ Timing Node JS SDK to parse ${linesToProcess.length} individual .env file references`)

        for (const line of linesToProcess) {
            const [key, value] = line.split('=');
            if (!key || !value) continue;

            try {
                await client.secrets.resolve(value);
            } catch (err) {
                console.error(`Failed to resolve secret for ${key}:`, err);
            }
        }

        const endTime = process.hrtime(startTime);
        const timeInSeconds = (endTime[0] + endTime[1] / 1e9).toFixed(3);

        console.log(`ℹ️ Took ${timeInSeconds}s`);
    } catch (err) {
        console.error('Error reading .env file:', err);
    }
}

processEnvFile();
