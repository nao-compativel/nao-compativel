import React, { useEffect } from "react";
import { ChevronRight, User } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Novos imports
import Badge from "../components/Badge";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { POSTS_DATA } from "../data/posts"; // Precisa importar os dados aqui agora

import "./css/PostReader.css";

const PostReader = ({ onMarkAsRead }) => {
  const { slug } = useParams(); // Pega o slug da URL
  const navigate = useNavigate();

  // Encontra o post correto
  const post = POSTS_DATA.find((p) => p.slug === slug);

  useEffect(() => {
    if (post && onMarkAsRead) {
      onMarkAsRead(post.slug);
    }
  }, [post, onMarkAsRead]);

  if (!post) return <div className="text-white p-10">Post não encontrado.</div>;

  function formatReadDate(dateString) {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString.split("-");

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const m = parseInt(month, 10) - 1;
      return `${day} ${monthNames[m]} ${year}`;
    } catch {
      return "";
    }
  }

  return (
    <div className="postReaderContainer animate-fadeIn">
      <button onClick={() => navigate(-1)} className="backButton">
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />{" "}
        voltar
      </button>

      <header className="postHeader">
        <div className="postHeaderMeta">
          <Link
            to={`/category/${post.category}`}
            className="categoryBadgeButton"
          >
            <Badge>{post.category}</Badge>
          </Link>
          <span>{formatReadDate(post.date)}</span>
        </div>
        <h1 className="postHeaderTitle">{post.title}</h1>
        <div className="postHeaderAuthor">
          <User size={14} /> Por Gabriel Reis
        </div>
      </header>

      <div className="postTags">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            to={`/tag/${tag}`}
            className="postTagButton"
            style={{ textDecoration: "none" }}
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="postContent">
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
};

export default PostReader;
