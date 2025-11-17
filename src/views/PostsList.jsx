/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import "./css/PostsList.css";

const POSTS_PER_PAGE = 5;

// -------------------------------
// Função para limpar Markdown
// -------------------------------
function stripMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/#+\s/g, "") // Títulos (#)
    .replace(/\*\*/g, "") // Negrito (**)
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links [text](url)
    .replace(/`{3}[\s\S]*?`{3}/g, "") // Blocos de código ```
    .replace(/`/g, ""); // Código inline `
}

// -------------------------------
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
    const monthName = monthNames[m] || "";

    return `${day} ${monthName} ${year}`;
  } catch {
    return "";
  }
}

const PostsList = ({ posts, readPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const navigate = useNavigate();

  // -------------------------------
  // FILTRAGEM BLINDADA
  // -------------------------------
  const filtered = useMemo(() => {
    setCurrentPage(1);
    const searchLower = filterQuery.toLowerCase();

    return posts.filter((post) => {
      const title = post.title || "";
      const content = post.content || "";
      const category = post.category || "";
      const tags = Array.isArray(post.tags) ? post.tags : [];

      return (
        title.toLowerCase().includes(searchLower) ||
        content.toLowerCase().includes(searchLower) ||
        category.toLowerCase().includes(searchLower) ||
        tags.some((tag) => (tag || "").toLowerCase().includes(searchLower))
      );
    });
  }, [posts, filterQuery]);

  // -------------------------------
  // PAGINAÇÃO
  // -------------------------------
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const postsForThisPage = filtered.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // -------------------------------
  // HANDLERS
  // -------------------------------
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/category/${category}`);
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/tag/${tag}`);
  };

  // -------------------------------
  // RENDER
  // -------------------------------
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
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="searchInput"
            />
          </div>
        </div>

        <div className="postsGrid">
          {postsForThisPage.length > 0 ? (
            postsForThisPage.map((post, index) => {
              const readDate = readPosts[post.slug];

              return (
                <Link
                  to={`/post/${post.slug}`}
                  key={post.id}
                  className={`postCard ${readDate ? "isRead" : ""} animate-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="postCardGlow" />

                  <div className="postCardHeader">
                    <button
                      onClick={(e) => handleCategoryClick(e, post.category)}
                      className="categoryBadgeButton"
                    >
                      <Badge>{(post.category || "").toUpperCase()}</Badge>
                    </button>

                    <div className="postCardMeta">
                      <span>
                        {formatReadDate(post.date)} • {post.readTime}
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
                    {stripMarkdown(post.content).substring(0, 150)}...
                  </p>

                  <div className="postCardTags">
                    {Array.isArray(post.tags) &&
                      post.tags.map((tag) => (
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
              <p>Nenhum resultado encontrado para "{filterQuery}".</p>
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
