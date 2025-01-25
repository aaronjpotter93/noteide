import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Box } from '@mui/material';
import CodeBlock from './CodeBlock';
import rehypeParse from 'rehype-parse';
import { visit } from 'unist-util-visit';

export default function Editor() {
  const [content, setContent] = useState<string | undefined>('# Welcome to NoteIDE\n\nStart writing your notes here...\n\n```python\nprint("Hello, World!")\n```');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MDEditor
        value={content}
        onChange={setContent}
        height="100%"
        preview="live"
        hideToolbar={false}
        enableScroll={true}
        previewOptions={{
          components: {
            code: ({ inline, children, className }) => {
              if (inline) return <code>{children}</code>;
              const language = (className || '').replace('language-', '');
              return <CodeBlock code={String(children)} language={language || 'text'} />;
            }
          }
        }}
      />
    </Box>
  );
}