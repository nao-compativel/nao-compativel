// 1. Encontra todos os arquivos .json na pasta 'posts'
// 'eager: true' faz com que os arquivos sejam carregados imediatamente
const postModules = import.meta.glob("./posts/*.json", { eager: true });

// 2. Extrai os dados de cada post (eles estão na propriedade 'default' ou direto no módulo)
// e transforma o objeto em um array
const allPosts = Object.values(postModules).map(
  (module) => module.default || module
);

// 3. Ordena os posts pela data, do mais recente para o mais antigo
// (Fazemos isso aqui para garantir que a lista já esteja ordenada)
allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 4. Exporta a lista pronta
export const POSTS_DATA = allPosts;
