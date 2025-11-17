import React, { useState, Suspense, lazy } from "react";
import { Terminal, User, Menu, X, Layout } from "lucide-react";
import { POSTS_DATA } from "./data/posts";
import PROFILE_DATA from "./data/profile.json";
import { useDebounce } from "./hooks/useDebounce";
import { useReadPosts } from "./hooks/useReadPosts";

// Importa os estilos CSS
import "./App.css";
import "./index.css";

// Views
const PostsList = lazy(() => import("./views/PostsList"));
const PostReader = lazy(() => import("./views/PostReader"));
const AboutProfile = lazy(() => import("./views/AboutProfile"));
const TagResultsList = lazy(() => import("./views/TagResultsList"));
// ADICIONE A NOVA VIEW
const CategoryResultsList = lazy(() => import("./views/CategoryResultsList"));

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "16rem",
      color: "#64748b",
      fontFamily: "monospace",
    }}
  >
    <Terminal
      size={24}
      style={{
        animation: "spin 1s linear infinite",
        color: "#a855f7",
        marginRight: "0.75rem",
      }}
    />
    Carregando...
  </div>
);

export default function App() {
  const [view, setView] = useState("list");
  const [activePost, setActivePost] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [readPosts, markAsRead] = useReadPosts();

  const navigateToPost = (post) => {
    setActivePost(post);
    setView("detail");
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToPage = (page) => {
    setView(page);
    setActivePost(null);
    setActiveTag(null);
    setActiveCategory(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToTag = (tag) => {
    setActiveTag(tag);
    setView("tagList");
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (category) => {
    setActiveCategory(category);
    setView("categoryList");
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="appContainer">
      {/* --- MOBILE HEADER --- */}
      <div className="mobileHeader">
        <span>
          <Terminal size={20} /> NC
        </span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`sidebar ${isMobileMenuOpen ? "sidebarOpen" : ""}`}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="sidebarBrand" onClick={() => navigateToPage("list")}>
            <h1>
              <Terminal size={24} /> NAO_COMPATIVEL
            </h1>
            <p>System.init(secure_mode)</p>
          </div>

          <nav className="sidebarNav">
            <button
              onClick={() => navigateToPage("list")}
              // ADICIONE 'categoryList' À CLASSE 'active'
              className={`sidebarButton ${
                ["list", "detail", "tagList", "categoryList"].includes(view)
                  ? "active"
                  : ""
              }`}
            >
              <Layout size={18} /> Blog & Projetos
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className={`sidebarButton ${view === "about" ? "active" : ""}`}
            >
              <User size={18} /> Sobre Mim
            </button>
          </nav>

          <div className="sidebarFooter">
            <div className="footerAvatar">
              <span>GR</span>
            </div>
            <div className="footerInfo">
              <p>{PROFILE_DATA.personal.name}</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div
          className="mobileOverlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="mainContent">
        <div className="contentWrapper">
          <Suspense fallback={<LoadingFallback />}>
            {view === "list" && (
              <PostsList
                posts={POSTS_DATA}
                onSelectPost={navigateToPost}
                onSelectTag={navigateToTag}
                onSelectCategory={navigateToCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterQuery={debouncedSearchQuery}
                readPosts={readPosts}
              />
            )}
            {view === "detail" && activePost && (
              <PostReader
                post={activePost}
                authorName={PROFILE_DATA.personal.name}
                onBack={() => navigateToPage("list")}
                onSelectTag={navigateToTag}
                onSelectCategory={navigateToCategory}
                onMarkAsRead={() => markAsRead(activePost.slug)}
              />
            )}
            {view === "about" && <AboutProfile profile={PROFILE_DATA} />}
            {view === "tagList" && activeTag && (
              <TagResultsList
                posts={POSTS_DATA}
                activeTag={activeTag}
                onBack={() => navigateToPage("list")}
                onSelectPost={navigateToPost}
                onSelectTag={navigateToTag}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterQuery={debouncedSearchQuery}
                readPosts={readPosts}
              />
            )}
            {view === "categoryList" && activeCategory && (
              <CategoryResultsList
                posts={POSTS_DATA}
                activeCategory={activeCategory}
                onBack={() => navigateToPage("list")}
                onSelectPost={navigateToPost}
                onSelectTag={navigateToTag}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterQuery={debouncedSearchQuery}
                readPosts={readPosts}
              />
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
