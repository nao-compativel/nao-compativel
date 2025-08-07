#!/bin/bash

# --- LISTA DE TÍTULOS GENÉRICOS ---
# Estes títulos serão usados para criar posts genéricos no blog

titulos_redes=(
  "Introdução aos Protocolos de Rede Essenciais"
  "O que é o Modelo OSI e por que ele é importante"
  "Entendendo Endereçamento IP: IPv4 vs IPv6"
  "DNS: O Catálogo de Endereços da Internet"
  "Princípios de Roteamento e Switching para Iniciantes"
  "Como funciona uma Rede Wi-Fi"
)

titulos_seguranca=(
  "Os 5 Pilares da Cibersegurança"
  "Como Criar Senhas Fortes e Seguras em 2025"
  "Phishing: O que é e Como se Proteger de Ataques"
  "A Importância de Manter seus Softwares Atualizados"
  "Fundamentos da Criptografia para o Dia a Dia"
  "O que é um Firewall e Como Ele Protege sua Rede"
  "Introdução a Engenharia Social"
  "O que é um Ataque de Negação de Serviço (DDoS)"
)

# --- CONTEÚDO GENÉRICO PARA OS POSTS ---
CONTEUDO_EXEMPLO="\n\nEste é um post de exemplo gerado automaticamente para povoar o blog. O conteúdo completo será adicionado em breve.\n\nNeste artigo, vamos explorar os conceitos fundamentais sobre este tópico, oferecendo uma visão clara e objetiva para iniciantes e entusiastas da área. Fique ligado para mais atualizações e artigos detalhados sobre tecnologia e segurança.\n\n*Este conteúdo é um placeholder.*"

# --- LÓGICA DE CRIAÇÃO ---
echo "Verificando se o script ./newpost.sh existe..."
if [ ! -f "newpost.sh" ]; then
  echo "ERRO: O script ./newpost.sh não foi encontrado na pasta."
  echo "Certifique-se de que ele está no mesmo diretório antes de continuar."
  exit 1
fi

echo -e "\nIniciando a criação de publicações genéricas..."
i=0

# Combina as duas listas de títulos em uma só
todos_os_titulos=("${titulos_redes[@]}" "${titulos_seguranca[@]}")

for titulo in "${todos_os_titulos[@]}"; do
  # --- AJUSTE IMPORTANTE DE DATA ---
  # Calcula a data para o post (hoje, ontem, anteontem, etc.)
  # ESCOLHA A LINHA QUE FUNCIONA NO SEU SISTEMA E APAGUE/COMENTE A OUTRA

  # Para Linux (Ubuntu, Mint, etc.)
  DATA_POST=$(date -d "-$i days" +"%Y-%m-%d")

  # Para macOS (BSD date)
  # DATA_POST=$(date -v-${i}d +"%Y-%m-%d")

  echo "-> Criando post para '$DATA_POST': $titulo"
  
  # Executa o script original para criar o arquivo com o front matter
  ./newpost.sh "$titulo" > /dev/null # Oculta a saída do newpost.sh

  # Agora, adicionamos o conteúdo genérico ao arquivo recém-criado
  SLUG=$(echo "$titulo" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  FILENAME="_posts/${FILENAME_DATE:-$(date +%Y-%m-%d)}-${SLUG}.md"
  
  # A lógica de nome de arquivo no newpost.sh usa a data atual, então vamos encontrá-lo
  # Uma forma mais segura é encontrar o último arquivo modificado.
  ULTIMO_ARQUIVO=$(find _posts -type f -mmin -1)

  if [ -n "$ULTIMO_ARQUIVO" ]; then
    echo -e "$CONTEUDO_EXEMPLO" >> "$ULTIMO_ARQUIVO"
  fi

  # Incrementa o contador para o próximo post ser um dia antes
  ((i++))
  sleep 1 # Pequena pausa para garantir que os arquivos não sejam criados no mesmo segundo
done

echo -e "\nConcluído! ${#todos_os_titulos[@]} posts genéricos foram criados na pasta _posts."