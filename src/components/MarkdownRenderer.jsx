/* eslint-disable no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import { ChevronRight } from "lucide-react";
import "./css/MarkdownRenderer.css";

const markdownComponents = {
  h1: ({ node, ...props }) => <h1 className="markdownH1" {...props} />,
  h2: ({ node, ...props }) => (
    <h2 className="markdownH2">
      <ChevronRight size={16} />
      {props.children}
    </h2>
  ),
  p: ({ node, ...props }) => <p className="markdownP" {...props} />,
  ul: ({ node, ...props }) => <ul className="markdownUl" {...props} />,
  li: ({ node, ...props }) => <li className="markdownLi" {...props} />,

  code: ({ node, inline, className, children, ...props }) => {
    if (!inline) {
      return (
        <div className="codeBlock">
          <pre {...props}>{String(children).replace(/\n$/, "")}</pre>
        </div>
      );
    }
    return (
      <code className="codeInline" {...props}>
        {children}
      </code>
    );
  },

  // --- ADICIONE ISTO ---
  // Mapeia a tag 'img' do markdown para um <img> com nossa classe CSS
  img: ({ node, ...props }) => <img className="markdownImg" {...props} />,
  // --- FIM DA ADIÇÃO ---
};

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
};

export default MarkdownRenderer;
