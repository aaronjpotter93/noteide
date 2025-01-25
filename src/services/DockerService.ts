interface ExecuteCodeParams {
  code: string;
  language: string;
}

interface ExecuteCodeResult {
  output: string;
  error?: string;
}

export class DockerService {
  private static instance: DockerService;
  private constructor() {}

  static getInstance(): DockerService {
    if (!DockerService.instance) {
      DockerService.instance = new DockerService();
    }
    return DockerService.instance;
  }

  async executeCode({ code, language }: ExecuteCodeParams): Promise<ExecuteCodeResult> {
    try {
      // TODO: Replace with actual Docker API implementation
      const response = await fetch('http://localhost:3001/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Failed to execute code'
      };
    }
  }
}

export const dockerService = DockerService.getInstance();