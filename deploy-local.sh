#!/bin/bash
set -e

echo "🚀 Iniciando Build Local..."

# 1. Gerar o build do frontend
npm run build

echo "📦 Compactando o frontend..."
# 2. Criar o zip
zip -r public_build.zip public/build

echo "✅ Build Finalizado!"