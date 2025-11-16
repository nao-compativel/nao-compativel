import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database, ChevronsLeft } from "lucide-react";
import Badge from "../components/Badge";

// Importa os CSS
import "./css/PostsList.css";
import "./css/TagResultsList.css"; // Reutiliza o CSS da Tag list

const CategoryResultsList = ({
  posts,
  activeCategory,
  onBack,
  onSelectPost,
  onSelectTag,
  searchQuery,
  setSearchQuery,
  filterQuery,
  readPosts,
}) => {
  // Helper para formatar a data
  function formatReadDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  // Lógica de filtragem principal
  const categoryFilteredPosts = useMemo(() => {
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  // Lógica de filtro de pesquisa
  const filtered = useMemo(() => {
    return categoryFilteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [categoryFilteredPosts, filterQuery]);

  return (
    <div className="animate-fadeIn">
      <div className="tagHeader">
        <button onClick={onBack} className="tagHeaderButton">
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
          filtered.map((post) => {
            const readDate = readPosts[post.slug];

            return (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className={`postCard ${readDate ? "isRead" : ""}`}
              >
                <div className="postCardGlow" />
                <div className="postCardHeader">
                  {/* O Badge aqui é a própria categoria, então não é clicável */}
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
                  {/* As tags dentro da lista de categorias ainda são clicáveis */}
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTag(tag);
                      }}
                      className="tagButton"
                    >
                      #{tag}
                    </button>
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

export default CategoryResultsList;
