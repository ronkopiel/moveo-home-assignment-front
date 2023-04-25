import React, { useEffect, useState } from "react";
import { api } from "../App";
import CodeBlockCard from "../components/CodeBlockCard";
import { Link } from "react-router-dom";
import "./Lobby.css";

// Define the CodeBlock interface
export interface CodeBlock {
  _id: string;
  title: string;
  code: string;
  solution: string;
}

// Define the Lobby functional component
const Lobby: React.FC = () => {
  // Declare state for code blocks with an empty array as initial value
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  
  // Use effect hook to fetch code blocks when the component mounts
  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        // Make an API call to fetch code blocks
        const response = await api.get<CodeBlock[]>("/");

        // Update the state with the fetched code blocks
        setCodeBlocks(response.data);
      } catch (error) {
        console.error("Error fetching code blocks:", error);
      }
    };

    // Invoke the fetchCodeBlocks function
    fetchCodeBlocks();
  }, []);

  return (
    <div className="container">
      <div className="big-title">Choose code block</div>
      <div className="card-container">
        {/* Check if there is at least one code blocks */}
        {codeBlocks.length >= 1 ? (
          // Render code block cards using the CodeBlockCard component
          codeBlocks.map((codeBlock) => (
            <Link to={`/codeblock/${codeBlock.title}`}>
              <CodeBlockCard {...codeBlock} />
            </Link>
          ))
        ) : (
          // Display "Loading" if there is only one or no code blocks
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};

export default Lobby;
