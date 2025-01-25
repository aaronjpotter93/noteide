import sys
import signal
import os
import time

def timeout_handler(signum, frame):
    print("Execution timed out", file=sys.stderr)
    sys.exit(1)

def main():
    # Set timeout from environment variable (default 5 seconds)
    timeout = int(os.environ.get('PYTHON_TIMEOUT', 5))
    
    # Set up timeout handler
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout)
    
    try:
        # Read and execute the code from stdin
        code = sys.stdin.read()
        exec(code)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)
    finally:
        signal.alarm(0)

if __name__ == '__main__':
    main()