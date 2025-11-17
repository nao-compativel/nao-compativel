/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database, ChevronsLeft } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Router Imports
import Badge from "../components/Badge";
import "./css/PostsList.css";
import "./css/TagResultsList.css";

function formatReadDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

const CategoryResultsList = ({ posts, readPosts }) => {
  const { category: activeCategory } = useParams(); // Pega a categoria da URL
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");

  const categoryFilteredPosts = useMemo(() => {
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const filtered = useMemo(() => {
    return categoryFilteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categoryFilteredPosts, searchQuery]);

  return (
    <div className="animate-fadeIn">
      <div className="tagHeader">
        <button onClick={() => navigate("/")} className="tagHeaderButton">
          <ChevronsLeft size={16} />
          Voltar para todos os posts
        </button>

        <h2>
          <span>./</span>
          {activeCategory}
        </h2>
        <p>
          Exibindo {filtered.length}{" "}
          {filtered.length === 1 ? "artigo" : "artigos"}
        </p>

        <div className="searchBox">
          <Search className="searchIcon" size={20} />
          <input
            type="text"
            placeholder="Filtrar dentro da categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchInput"
          />
        </div>
      </div>

      <div className="postsGrid">
        {filtered.length > 0 ? (
          filtered.map((post, index) => {
            const readDate = readPosts[post.slug];

            return (
              <Link
                to={`/post/${post.slug}`}
                key={post.id}
                className={`postCard ${readDate ? "isRead" : ""} animate-in`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div className="postCardGlow" />
                <div className="postCardHeader">
                  <Badge>{post.category.toUpperCase()}</Badge>
                  <div className="postCardMeta">
                    <span>
                      {post.date} • {post.readTime}
                    </span>
                    {readDate && (
                      <span className="readIndicator">
                        (Lido em {formatReadDate(readDate)})
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="postCardTitle">{post.title}</h3>
                <p className="postCardSnippet">
                  {post.content
                    .replace(/[#`*!\[\]\(\)]/g, "")
                    .substring(0, 150)}
                  ...
                </p>
                <div className="postCardTags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tagButton">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="readMoreLink">
                  Ler artigo <ChevronRight size={16} />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="notFound">
            <Database size={32} />
            <p>Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryResultsList;
