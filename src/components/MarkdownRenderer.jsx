/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronRight, Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./css/MarkdownRenderer.css";

// Componente auxiliar para o bloco de código com botão
const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="codeBlockWrapper">
      <button onClick={handleCopy} className="copyButton">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copiado!" : "Copiar"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{ margin: 0, background: "#020617" }}
        wrapLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

const markdownComponents = {
  h1: ({ node, ...props }) => <h1 className="markdownH1" {...props} />,
  h2: ({ node, ...props }) => (
    <h2 className="markdownH2">
      <ChevronRight size={16} />
      {props.children}
    </h2>
  ),
  h3: (props) => <h3 className="markdownH3">{props.children}</h3>,
  h4: (props) => <h4 className="markdownH4">{props.children}</h4>,
  h5: (props) => <h5 className="markdownH5">{props.children}</h5>,
  h6: (props) => <h6 className="markdownH6">{props.children}</h6>,

  ol: (props) => <ol className="markdownOl">{props.children}</ol>,

  blockquote: (props) => (
    <blockquote className="markdownBlockquote">{props.children}</blockquote>
  ),

  hr: () => <hr className="markdownHr" />,

  strong: (props) => (
    <strong className="markdownStrong">{props.children}</strong>
  ),
  em: (props) => <em className="markdownEm">{props.children}</em>,
  a: (props) => <a className="markdownA" {...props} />,

  table: (props) => <table className="markdownTable">{props.children}</table>,
  thead: (props) => <thead>{props.children}</thead>,
  tbody: (props) => <tbody>{props.children}</tbody>,
  tr: (props) => <tr className="markdownTr">{props.children}</tr>,
  th: (props) => <th className="markdownTh">{props.children}</th>,
  td: (props) => <td className="markdownTd">{props.children}</td>,

  p: ({ node, ...props }) => <p className="markdownP" {...props} />,
  ul: ({ node, ...props }) => <ul className="markdownUl" {...props} />,
  li: ({ node, ...props }) => <li className="markdownLi" {...props} />,
  img: ({ node, ...props }) => <img className="markdownImg" {...props} />,

  // Aqui está a mágica do Syntax Highlighting
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    if (!inline) {
      return (
        // Se tiver match (ex: 'javascript'), usa ele. Se não, usa 'text' (sem cores, mas formatado).
        <CodeBlock language={match ? match[1] : "text"}>{codeString}</CodeBlock>
      );
    }

    return (
      <code className="codeInline" {...props}>
        {children}
      </code>
    );
  },
};

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
};

export default MarkdownRenderer;
