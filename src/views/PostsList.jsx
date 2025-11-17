/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Router Imports
import Badge from "../components/Badge";
import "./css/PostsList.css";

const POSTS_PER_PAGE = 5;

function formatReadDate(dateString) {
  if (!dateString) return "";
  try {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  } catch (e) {
    return "";
  }
}

const PostsList = ({ posts, readPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsForThisPage = filtered.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // Handlers para navegação de botões internos
  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Evita abrir o Link do post
    e.stopPropagation();
    navigate(`/category/${category}`);
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/tag/${tag}`);
  };

  return (
    <div className="animate-fadeIn">
      <div>
        <div className="postsHeader">
          <h2>
            <span>./</span>Artigos & Pesquisa
          </h2>
          <div className="searchBox">
            <Search className="searchIcon" size={20} />
            <input
              type="text"
              placeholder="Pesquisar por tecnologia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchInput"
            />
          </div>
        </div>

        <div className="postsGrid">
          {postsForThisPage.length > 0 ? (
            postsForThisPage.map((post, index) => {
              const readDate = readPosts[post.slug];

              return (
                // Card inteiro agora é um Link
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
                    <button
                      onClick={(e) => handleCategoryClick(e, post.category)}
                      className="categoryBadgeButton"
                    >
                      <Badge>{post.category.toUpperCase()}</Badge>
                    </button>

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
                      <button
                        key={tag}
                        onClick={(e) => handleTagClick(e, tag)}
                        className="tagButton"
                      >
                        #{tag}
                      </button>
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
              <p>Nenhum resultado encontrado para "{searchQuery}".</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próximo &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
