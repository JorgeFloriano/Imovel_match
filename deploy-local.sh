#!/bin/bash
set -e

# Configurações do seu servidor HostGator (PREENCHA AQUI)
USER_HOSTGATOR="martad20"
IP_HOSTGATOR="108.167.132.219"
CAMINHO_PROJETO="/home1/martad20/martadesouzaimoveis.com"
PORTA_SSH="2222" # A HostGator geralmente usa a porta 2222 para SSH

echo "🚀 Iniciando Build Local..."

# 1. Gerar o build do frontend
npm run build

echo "📦 Enviando arquivos para o servidor via Rsync..."

# 2. Sincronizar a pasta public/build diretamente com a HostGator
# O rsync é inteligente: ele só envia os arquivos que foram modificados, sendo muito mais rápido!
rsync -avz -e "ssh -p $PORTA_SSH" public/build/ $USER_HOSTGATOR@$IP_HOSTGATOR:$CAMINHO_PROJETO/public/build/

echo "✅ Build e Upload do Frontend Finalizados com sucesso!"
echo "⚠️  Não esqueça de entrar no servidor e rodar o './deploy.sh' caso tenha alterações no backend/PHP."
