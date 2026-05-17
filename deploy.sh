#!/bin/bash
set -e

echo "🚀 Iniciando Deploy..."

# 1. Entrar no modo de manutenção do Laravel
php artisan down || true

# Remover o link simbólico antigo se ele existir para evitar erro de permissão no Git
if [ -L "public/storage" ]; then
    echo "🔧 Removendo link simbólico antigo de public/storage..."
    rm "public/storage"
fi

# 2. Puxar as alterações mais recentes do GitHub
git reset --hard HEAD     # Desfaz qualquer alteração acidental em arquivos monitorados
git clean -fd             # Remove arquivos novos/não monitorados que possam conflitar
git pull origin main      # Puxa o código limpo do repositório

# Garante que o link simbólico do storage seja recriado corretamente pelo Laravel
echo "🔗 Recriando link simbólico do storage..."
php artisan storage:link || true

# 3. Instalar dependências do PHP
composer install --no-dev --optimize-autoloader

# 4. Limpar e Otimizar Caches
php artisan optimize:clear
php artisan optimize

# 5. Sair do modo de manutenção
php artisan up

echo "✅ Deploy de código finalizado com sucesso!"
echo "⚠️  Lembre-se: Se houve alterações no Frontend (React/CSS), você ainda precisa subir o arquivo public_build.zip!"