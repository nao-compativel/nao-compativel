/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { ChevronRight, User } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Badge from "../components/Badge";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { POSTS_DATA } from "../data/posts";

import "./css/PostReader.css";

const PostReader = ({ onMarkAsRead }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = POSTS_DATA.find((p) => p.slug === slug);

  // -----------------------------
  // FORMATADOR DE DATA PT-BR
  // -----------------------------
  function formatReadDate(dateString) {
    if (!dateString) return "";

    try {
      const [year, month, day] = dateString.split("-");

      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      const m = parseInt(month, 10) - 1;
      return `${day} ${monthNames[m]} ${year}`;
    } catch {
      return "";
    }
  }

  // -----------------------------
  // MARCAR COMO LIDO + ATUALIZAR TÍTULO DA ABA
  // -----------------------------
  useEffect(() => {
    if (!post) return;

    // Marca como lido
    if (onMarkAsRead) {
      onMarkAsRead(post.slug);
    }

    // Atualiza título da aba
    const previousTitle = document.title;
    document.title = `${post.title} | Não Compatível`;

    return () => {
      document.title = "Gabriel Reis | Não Compatível"; // Ou previousTitle
    };
  }, [post, onMarkAsRead]);

  if (!post) return <div className="text-white p-10">Post não encontrado.</div>;

  return (
    <div className="postReaderContainer animate-fadeIn">
      <button onClick={() => navigate(-1)} className="backButton">
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
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
