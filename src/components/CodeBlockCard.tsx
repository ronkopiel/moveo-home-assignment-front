import React, { useEffect, useState } from 'react';
import { CodeBlock } from '../pages/Lobby';
import "./CodeBlockCard.css"


const CodeBlockCard: React.FC<CodeBlock> = (code) => {
  const [codeBlock, setCodeBlock] = useState<CodeBlock>(code);

  return (
    <div className='card'>
        <div className="title">{code.title}</div>
        <div className="wrapper">{code.code}</div>
    </div>
  );
};

export default CodeBlockCard;
