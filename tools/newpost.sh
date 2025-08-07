#!/bin/bash

# Verifica se um título foi fornecido
if [ -z "$1" ]; then
  echo "Erro: Você precisa fornecer um título para o post."
  echo "Uso: ./newpost.sh \"Meu Título Incrível\""
  exit 1
fi

# Pega o título do primeiro argumento
TITLE="$1"

# Converte o título para um "slug" (minúsculas, espaços por hífens)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Pega a data atual para o nome do arquivo (YYYY-MM-DD)
FILENAME_DATE=$(date +"%Y-%m-%d")

# Pega a data e hora formatada para o front matter (YYYY-MM-DD HH:MM:SS +/-TTTT)
POST_DATE=$(date +"%Y-%m-%d %H:%M:%S %z")

# Define o nome completo do arquivo
FILENAME="_posts/${FILENAME_DATE}-${SLUG}.md"

# Cria o arquivo com o front matter no formato exato
# Edite as categorias e tags aqui conforme necessário
cat > "$FILENAME" << EOL
---
layout: post
title: "$TITLE"
date: '$POST_DATE'
categories: [TOP_CATEGORY, SUB_CATEGORY]
tags: [TAG]
---
EOL

echo "Post criado com sucesso em: $FILENAME"