import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../App";
import socket from "../socket";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "./CodeBlockPage.css";
import { CodeBlock } from "./Lobby";


const CodeBlockPage: React.FC = () => {
  const [codeBlock, setCodeBlock] = useState<CodeBlock | null>(null);
  const [isEditor, setIsEditor] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const { title: codeBlockTitle } = useParams();

  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        const response = await api.get<CodeBlock>(`/${codeBlockTitle}`);
        setCodeBlock(response.data);
      } catch (error) {
        console.error("Error fetching code block data:", error);
      }
    };

    fetchCodeBlock();
    socket.emit("join", codeBlockTitle);
  }, [codeBlockTitle]);

  useEffect(() => {
    socket.on("codeUpdate", (newCode: string) => {
      if (codeBlock) {
        setCodeBlock({ ...codeBlock, code: newCode });
      }
    });

    socket.on("setEditor", () => {
      setIsEditor(true);
    });

    return () => {
      socket.off("codeUpdate");
      socket.off("setEditor");
    };
  }, [codeBlock]);

  const handleCodeChange = (value: string) => {
      // Update the code block state

    if (codeBlock) setCodeBlock({ ...codeBlock, code: value });
      // Emit the code update event

    socket.emit("codeUpdate", codeBlockTitle, value);
      // Check if the code matches the solution
      console.log('value === codeBlock.solution', value === codeBlock!.solution)
  if (codeBlock && value === codeBlock.solution) {
    setIsSolved(true);
  } else {
    setIsSolved(false);
  }
  };

  return (
    <div className="container">
      {codeBlock && (
        <>
          <div className="big-title">{codeBlock.title}</div>
          <CodeMirror
            value={codeBlock?.code || ""}
            className="editor"
            extensions={[javascript({ jsx: true })]}
            onChange={handleCodeChange}
            editable={isEditor}
            theme="dark"
            basicSetup={{
              lineNumbers: true,
            }}
          />
              {isSolved && (
      <div style={{ fontSize: '48px', textAlign: 'center', marginTop: '16px' }}>
        😃
      </div>
    )}
        </>
      )}
    </div>
  );
};

export default CodeBlockPage;
