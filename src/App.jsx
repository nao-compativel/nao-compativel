import React, { Suspense, lazy } from "react";
import { Terminal, User, Menu, X, Layout } from "lucide-react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PROFILE_DATA from "./data/profile.json";
import { useReadPosts } from "./hooks/useReadPosts";
import { POSTS_DATA } from "./data/posts";

import "./App.css";
import "./index.css";

const PostsList = lazy(() => import("./views/PostsList"));
const PostReader = lazy(() => import("./views/PostReader"));
const AboutProfile = lazy(() => import("./views/AboutProfile"));
const TagResultsList = lazy(() => import("./views/TagResultsList"));
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [readPosts, markAsRead] = useReadPosts();

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="appContainer">
      {/* --- MOBILE HEADER --- */}
      <div className="mobileHeader">
        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Terminal size={20} /> NC
        </span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${isMobileMenuOpen ? "sidebarOpen" : ""}`}>
        {/* REMOVIDA A DIV WRAPPER AQUI - O aside já é flex column */}

        <div className="sidebarBrand" onClick={() => navigate("/")}>
          <h1>
            <Terminal size={24} /> NAO_COMPATIVEL
          </h1>
          <p>System.init(secure_mode)</p>
        </div>

        <nav className="sidebarNav">
          <Link
            to="/"
            className={`sidebarButton ${
              isActive("/") ||
              isActive("/post") ||
              isActive("/tag") ||
              isActive("/category")
                ? "active"
                : ""
            }`}
            style={{ textDecoration: "none" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Layout size={18} /> Blog & Projetos
          </Link>
          <Link
            to="/about"
            className={`sidebarButton ${isActive("/about") ? "active" : ""}`}
            style={{ textDecoration: "none" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={18} /> Sobre Mim
          </Link>
        </nav>

        <div className="sidebarFooter">
          <div className="footerAvatar">
            <span>GR</span>
          </div>
          <div className="footerInfo">
            <p>{PROFILE_DATA.personal.name}</p>
            <p>Full Stack Security</p>
          </div>
        </div>
      </aside>

      {/* Overlay */}
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
            <Routes>
              <Route
                path="/"
                element={<PostsList posts={POSTS_DATA} readPosts={readPosts} />}
              />

              <Route
                path="/post/:slug"
                element={<PostReader onMarkAsRead={markAsRead} />}
              />

              <Route
                path="/about"
                element={<AboutProfile profile={PROFILE_DATA} />}
              />

              <Route
                path="/tag/:tag"
                element={
                  <TagResultsList posts={POSTS_DATA} readPosts={readPosts} />
                }
              />

              <Route
                path="/category/:category"
                element={
                  <CategoryResultsList
                    posts={POSTS_DATA}
                    readPosts={readPosts}
                  />
                }
              />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
