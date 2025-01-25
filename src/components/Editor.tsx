import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Box } from '@mui/material';

export default function Editor() {
  const [content, setContent] = useState<string | undefined>('# Welcome to NoteIDE\n\nStart writing your notes here...\n\n```python\nprint("Hello, World!")\n```');

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      flex: 1,
      '.w-md-editor': {
        backgroundColor: '#1E1E1E !important',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      '.w-md-editor-content': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      '.w-md-editor-text-pre > code': {
        color: '#D4D4D4 !important',
      },
      '.w-md-editor-text-input': {
        color: '#D4D4D4 !important',
      },
      '.wmde-markdown': {
        backgroundColor: '#1E1E1E !important',
        color: '#D4D4D4 !important',
        flex: 1,
      },
    }}>
      <MDEditor
        value={content}
        onChange={setContent}
        height="100%"
        preview="live"
        hideToolbar={false}
        enableScroll={true}
      />
    </Box>
  );
}