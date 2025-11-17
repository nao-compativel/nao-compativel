import fm from "front-matter";

// 1. Importa todos os arquivos .md
const postModules = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const allPosts = Object.values(postModules).map((markdownContent) => {
  const parsed = fm(markdownContent);

  // 2. Retorna o objeto COM VALORES PADRÃO
  return {
    id: parsed.attributes.id || Date.now(), // Garante um ID
    title: parsed.attributes.title || "Sem Título", // Garante um Título
    date: parsed.attributes.date || new Date().toISOString().split("T")[0], // Garante data
    category: parsed.attributes.category || "Geral",
    tags: parsed.attributes.tags || [],
    readTime: parsed.attributes.readTime || "1 min",
    slug: parsed.attributes.slug || "post-sem-slug",
    ...parsed.attributes, // Sobrescreve com os dados reais se existirem
    content: parsed.body || "", // O texto do post
  };
});

// 3. Ordena por data
allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

export const POSTS_DATA = allPosts;
