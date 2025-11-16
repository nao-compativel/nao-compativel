import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database, ChevronsLeft } from "lucide-react";
import Badge from "../components/Badge";

// Importa os CSS
import "./css/PostsList.css";
import "./css/TagResultsList.css";

// Helper para formatar a data (opcional, pode ser movido para um utils.js)
function formatReadDate(dateString) {
  // "YYYY-MM-DD"
  if (!dateString) return "";
  try {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`; // "DD/MM/YYYY"
  } catch (e) {
    return "";
  }
}

const TagResultsList = ({
  posts,
  activeTag,
  onBack,
  onSelectPost,
  onSelectTag,
  searchQuery,
  setSearchQuery,
  filterQuery,
  readPosts, // Recebe o prop
}) => {
  // (Nota: esta view não tem paginação, mas seria fácil adicionar)
  const [currentPage, setCurrentPage] = useState(1);

  const tagFilteredPosts = useMemo(() => {
    setCurrentPage(1);
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return tagFilteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [tagFilteredPosts, filterQuery]);

  return (
    <div className="animate-fadeIn">
      <div className="tagHeader">
        <button onClick={onBack} className="tagHeaderButton">
          <ChevronsLeft size={16} />
          Voltar para todos os posts
        </button>

        <h2>
          <span>#</span>
          {activeTag}
        </h2>
        <p>
          Exibindo {filtered.length}{" "}
          {filtered.length === 1 ? "artigo" : "artigos"}
        </p>

        <div className="searchBox">
          <Search className="searchIcon" size={20} />
          <input
            type="text"
            placeholder="Filtrar dentro da tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchInput"
          />
        </div>
      </div>

      <div className="postsGrid">
        {filtered.length > 0 ? (
          filtered.map((post) => {
            const readDate = readPosts[post.slug]; // Verifica se foi lido

            return (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className={`postCard ${readDate ? "isRead" : ""}`} // Adiciona classe .isRead
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
                  {post.content.replace(/[#`*]/g, "").substring(0, 150)}...
                </p>
                <div className="postCardTags">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tagButton"
                      style={{
                        borderColor: tag === activeTag ? "#a855f7" : "#1e293b",
                        color: tag === activeTag ? "#ffffff" : "#64748b",
                        backgroundColor:
                          tag === activeTag ? "#1e293b" : "transparent",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="readMoreLink">
                  Ler artigo <ChevronRight size={16} />
                </div>
              </article>
            );
          })
        ) : (
          <div className="notFound">
            <Database size={32} />
            <p>Nenhum resultado encontrado para "{filterQuery}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagResultsList;
