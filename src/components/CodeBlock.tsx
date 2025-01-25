import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { dockerService } from '../services/DockerService';

interface CodeBlockProps {
  code: string;
  language: string;
}

interface ExecutionResult {
  output: string;
  error?: string;
  status: 'idle' | 'running' | 'completed' | 'error';
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [result, setResult] = useState<ExecutionResult>({
    output: '',
    status: 'idle'
  });

  const executeCode = async () => {
    setResult({ ...result, status: 'running' });
    try {
      const response = await dockerService.executeCode({ code, language });
      setResult({
        output: response.output,
        error: response.error,
        status: response.error ? 'error' : 'completed'
      });
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error'
      });
    }
  };

  return (
    <Box sx={{ my: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Box sx={{ p: 2, backgroundColor: 'grey.100' }}>
        <pre style={{ margin: 0 }}>
          <code>{code}</code>
        </pre>
      </Box>
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={result.status === 'running' ? <CircularProgress size={20} /> : <PlayArrow />}
          onClick={executeCode}
          disabled={result.status === 'running'}
        >
          Run
        </Button>
        <Typography variant="caption" color="text.secondary">
          Language: {language}
        </Typography>
      </Box>
      {(result.output || result.error) && (
        <Box sx={{ p: 2, backgroundColor: result.error ? 'error.light' : 'success.light' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {result.error || result.output}
          </pre>
        </Box>
      )}
    </Box>
  );
}