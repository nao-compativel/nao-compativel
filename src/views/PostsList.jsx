import React, { useMemo, useState } from "react";
import { Search, ChevronRight, Database } from "lucide-react";
import Badge from "../components/Badge";
import "./css/PostsList.css";

const POSTS_PER_PAGE = 5;

// Helper para formatar a data
function formatReadDate(dateString) {
  // "YYYY-MM-DD"
  if (!dateString) return "";
  try {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`; // "DD/MM/YYYY"
  } catch (e) {
    return ""; // Retorna vazio se a data for inválida
  }
}

// Recebe 'onSelectCategory'
const PostsList = ({
  posts,
  onSelectPost,
  onSelectTag,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  filterQuery,
  readPosts,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica de filtragem
  const filtered = useMemo(() => {
    setCurrentPage(1);

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(filterQuery.toLowerCase())
        )
    );
  }, [posts, filterQuery]);

  // Lógica de Paginação
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
            // 1. "index" é adicionado ao map
            postsForThisPage.map((post, index) => {
              const readDate = readPosts[post.slug];

              return (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  // 2. Classe "animate-in" é adicionada
                  className={`postCard ${readDate ? "isRead" : ""} animate-in`}
                  // 3. O "delay" da animação é aplicado via style
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="postCardGlow" />
                  <div className="postCardHeader">
                    {/* ENVOLVA O BADGE COM O BOTÃO */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Impede o clique no card
                        onSelectCategory(post.category);
                      }}
                      className="categoryBadgeButton"
                    >
                      <Badge>{post.category.toUpperCase()}</Badge>
                    </button>
                    {/* FIM DA MUDANÇA */}

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

        {/* Renderiza os botões de Paginação */}
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
