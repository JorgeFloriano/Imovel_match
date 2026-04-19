#!/bin/bash
set -e

echo "🚀 Iniciando Deploy..."

# 1. Entrar no modo de manutenção do Laravel
php artisan down || true

# 2. Puxar as alterações mais recentes do GitHub
git fetch origin
git reset --hard origin/main
git clean -fd

# 3. Instalar dependências do PHP (sem mexer nas pastas de upload)
composer install --no-dev --optimize-autoloader

# 4. Limpar e Otimizar Caches
php artisan optimize:clear
php artisan optimize

# 5. Sair do modo de manutenção
php artisan up

echo "✅ Deploy de código finalizado com sucesso!"
echo "⚠️  Lembre-se: Se houve alterações no Frontend (React/CSS), você ainda precisa subir o arquivo public_build.zip!"
