import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lobby from './pages/Lobby';
import CodeBlock from './pages/CodeBlockPage';
import axios from 'axios';

export const api = axios.create({
  baseURL: "https://move-codeblock-back.onrender.com/api/codeblocks",
});
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Lobby />}/>
          <Route path="/codeblock/:title" element={<CodeBlock />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

