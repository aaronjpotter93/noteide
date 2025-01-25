import express from 'express';
import Docker from 'dockerode';
import cors from 'cors';
import { spawn } from 'child_process';
import { Readable } from 'stream';

const app = express();
const docker = new Docker();

app.use(cors());
app.use(express.json());

app.post('/execute', async (req, res) => {
  const { code, language } = req.body;
  
  try {
    const container = await docker.createContainer({
      Image: `${language}-runner`,
      Tty: false,
      OpenStdin: true,
      StdinOnce: true,
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Platform: 'linux/arm64',
      HostConfig: {
        AutoRemove: true,
        SecurityOpt: ['no-new-privileges'],
        Memory: 512 * 1024 * 1024, // 512MB memory limit
        MemorySwap: 512 * 1024 * 1024 // Disable swap
      }
    });

    await container.start();
    const stream = await container.attach({
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true
    });

    // Create a readable stream from the code string
    const codeStream = new Readable();
    codeStream.push(code);
    codeStream.push(null);

    // Pipe the code to the container's stdin
    codeStream.pipe(stream);

    // Collect output
    let output = '';
    stream.on('data', (chunk) => {
      output += chunk.toString();
    });

    // Wait for container to finish
    await new Promise((resolve) => {
      stream.on('end', resolve);
    });

    res.json({
      output: output,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      output: '',
      error: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('Code execution server running on port 3001');
});