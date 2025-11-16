import React, { useEffect } from "react";
import { ChevronRight, User } from "lucide-react";
import Badge from "../components/Badge";
import MarkdownRenderer from "../components/MarkdownRenderer";

import "./css/PostReader.css";

// 1. Recebe 'onSelectCategory'
const PostReader = ({
  post,
  authorName,
  onBack,
  onSelectTag,
  onMarkAsRead,
  onSelectCategory,
}) => {
  // Marcar como lido
  useEffect(() => {
    if (onMarkAsRead) {
      onMarkAsRead();
    }
  }, [onMarkAsRead, post]);

  return (
    <div className="postReaderContainer animate-fadeIn">
      <button onClick={onBack} className="backButton">
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />{" "}
        voltar
      </button>

      <header className="postHeader">
        <div className="postHeaderMeta">
          {/* 2. Envolve o Badge com o botão clicável */}
          <button
            onClick={() => onSelectCategory(post.category)}
            className="categoryBadgeButton"
          >
            <Badge>{post.category}</Badge>
          </button>

          <span>{post.date}</span>
        </div>
        <h1 className="postHeaderTitle">{post.title}</h1>
        <div className="postHeaderAuthor">
          <User size={14} /> Por {authorName}
        </div>
      </header>

      <div className="postTags">
        {post.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className="postTagButton"
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="postContent">
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
};

export default PostReader;
