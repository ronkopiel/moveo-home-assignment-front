import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../App";
import socket from "../socket";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "./CodeBlockPage.css";
import { CodeBlock } from "./Lobby";

const CodeBlockPage: React.FC = () => {
  // Declare states for the code block, editor status, and solution status
  const [codeBlock, setCodeBlock] = useState<CodeBlock | null>(null);
  const [isEditor, setIsEditor] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  
  // Get the code block title from the URL parameters
  const { title: codeBlockTitle } = useParams();

  // Fetch the code block data when the component mounts
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
    // Emit the join event to the server
    socket.emit("join", codeBlockTitle);
  }, [codeBlockTitle]);

// Set up socket listeners for code updates and editor assignment
useEffect(() => {
  socket.on("codeUpdate", (newCode: string) => {
    if (codeBlock) {
      setCodeBlock({ ...codeBlock, code: newCode });
    }
  });

  socket.on("setEditor", () => {
    setIsEditor(true);
  });

  // Clean up socket listeners on component unmount
  return () => {
    socket.off("codeUpdate");
    socket.off("setEditor");
  };
}, [codeBlock]);

// Handle changes to the code in the CodeMirror editor
const handleCodeChange = (value: string) => {
  // Emit the code update event
  socket.emit("codeUpdate", codeBlockTitle, value);

  // Check if the code matches the solution
  if (codeBlock && value === codeBlock.solution) {
    setIsSolved(true);
  } else {
    setIsSolved(false);
  }
};


  return (
    <div className="container">
                 <Link to={`/`} className="back">
                 &#8592;
            </Link>
      {/* Render the CodeMirror editor and other elements if the code block exists */}
      {codeBlock? (
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
          <button className="unstuck" disabled={!isEditor} onClick={() => {setCodeBlock({ ...codeBlock, code: codeBlock.solution } ); handleCodeChange(codeBlock.solution)}}>im stuck</button>
          {/* Display a smiley face if the code block is solved */}
          {isSolved && (
            <div style={{ fontSize: '5rem', textAlign: 'center', marginTop: '16px' }}>
              😃
            </div>
          )}
        </>
      ):<span>Loading...</span>}
    </div>
  );
};

export default CodeBlockPage;
