#!/bin/bash
set -e

echo "🚀 Iniciando Deploy..."

# 1. Entrar no modo de manutenção do Laravel
php artisan down || true

# 2. Puxar as alterações mais recentes do GitHub
git reset --hard HEAD     # Desfaz qualquer alteração acidental em arquivos monitorados
git clean -fd             # Remove arquivos novos/não monitorados que possam conflitar
git pull origin main      # Puxa o código limpo do repositório

# 3. Instalar dependências do PHP
composer install --no-dev --optimize-autoloader

# 4. Limpar e Otimizar Caches
php artisan optimize:clear
php artisan optimize

# 5. Sair do modo de manutenção
php artisan up

echo "✅ Deploy de código finalizado com sucesso!"
echo "⚠️  Lembre-se: Se houve alterações no Frontend (React/CSS), você ainda precisa subir o arquivo public_build.zip!"