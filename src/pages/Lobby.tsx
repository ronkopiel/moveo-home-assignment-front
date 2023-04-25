import React, { useEffect, useState } from "react";
import { api } from "../App";
import CodeBlockCard from "../components/CodeBlockCard";
import { Link } from "react-router-dom";
import "./Lobby.css";
export interface CodeBlock {
  _id: string;
  title: string;
  code: string;
  solution: string;
}

const Lobby: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await api.get<CodeBlock[]>("/");
        console.log("response.data", response.data);
        setCodeBlocks(response.data);
      } catch (error) {
        console.error("Error fetching code blocks:", error);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div className="container">
      <div className="big-title">Choose code block</div>
      <div className="card-container">
        {codeBlocks.length > 1 ? (
          codeBlocks.map((codeBlock) => (
            <Link to={`/codeblock/${codeBlock.title}`}>
              <CodeBlockCard {...codeBlock} />
            </Link>
          ))
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};

export default Lobby;
