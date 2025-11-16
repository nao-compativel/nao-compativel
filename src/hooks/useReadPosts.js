import { useState, useEffect } from "react";

// Chave para salvar no localStorage
const STORAGE_KEY = "readPosts";

// Helper para pegar a data de hoje formatada
function getFormattedDate() {
  return new Date().toISOString().split("T")[0]; // Retorna "YYYY-MM-DD"
}

export function useReadPosts() {
  const [readPosts, setReadPosts] = useState({});

  // 1. Carrega os posts lidos do localStorage na primeira vez
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setReadPosts(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Erro ao carregar posts lidos:", error);
      setReadPosts({});
    }
  }, []);

  // 2. Função para marcar um post como lido
  const markAsRead = (slug) => {
    if (!slug) return;

    setReadPosts((prevReadPosts) => {
      // Se já tiver uma data, não faz nada
      if (prevReadPosts[slug]) {
        return prevReadPosts;
      }

      // Armazena a data de hoje no slug do post
      const newReadPosts = {
        ...prevReadPosts,
        [slug]: getFormattedDate(), // "slug-do-post": "2025-11-16"
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newReadPosts));
      } catch (error) {
        console.error("Erro ao salvar post lido:", error);
      }

      return newReadPosts;
    });
  };

  return [readPosts, markAsRead];
}
