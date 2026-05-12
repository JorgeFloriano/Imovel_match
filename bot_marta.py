import asyncio
import random
from playwright.async_api import async_playwright

# --- CONFIGURAÇÕES ---
CRM_URL_PART = "notify" 
WA_URL = "https://web.whatsapp.com"

async def bot_marta():
    async with async_playwright() as p:
        try:
            print("🔗 Conectando ao navegador...")
            browser = await p.chromium.connect_over_cdp("http://localhost:9222")
            context = browser.contexts[0]
            
            page_sistema = None
            page_wa = None

            # Identifica as abas
            for pg in context.pages:
                if "web.whatsapp.com" in pg.url:
                    page_wa = pg
                if CRM_URL_PART in pg.url:
                    page_sistema = pg

            if not page_sistema or not page_wa:
                print("❌ Erro: Abas do sistema ou WhatsApp não encontradas!")
                return

            print("🤖 Robô Marta (Multi-tarefa) iniciado.")
            print("Tarefa: Analisar lista, colar mensagens (modo teste) e mapear números inválidos.")
            
            invalid_ids = []
            processed_count = 0

            while True:
                await page_sistema.bring_to_front()
                await asyncio.sleep(1)

                # 1. Busca as linhas da tabela
                rows = await page_sistema.query_selector_all("tbody tr")
                
                target_row = None
                target_name_btn = None
                
                for row in rows:
                    name_btn = await row.query_selector("th button")
                    if not name_btn: continue
                    
                    is_clicked = await name_btn.evaluate("el => el.classList.contains('text-blue-600') || el.classList.contains('text-blue-500')")
                    
                    if not is_clicked:
                        target_row = row
                        target_name_btn = name_btn
                        break
                
                if not target_row:
                    print("\n✅ Todos os clientes visíveis foram processados!")
                    # Finaliza salvando no sistema
                    save_btn = await page_sistema.query_selector("th button[title*='Registrar']")
                    if save_btn and await save_btn.is_enabled():
                        print("💾 Clicando em Salvar Tudo no sistema...")
                        await save_btn.click()
                        await asyncio.sleep(2)
                    break

                client_id = await target_row.get_attribute("data-id")
                client_name = (await target_name_btn.inner_text()).strip()
                print(f"\n👤 [{processed_count + 1}] Analisando: {client_name} (ID: {client_id})")

                # 2. Clica no nome para copiar a URL do WhatsApp
                await target_name_btn.click()
                await asyncio.sleep(0.6)
                wa_link = await page_sistema.evaluate("navigator.clipboard.readText()")
                
                if "web.whatsapp.com/send" not in wa_link:
                    print(f"⚠️ Falha ao obter link para {client_name}")
                    continue

                # 3. Vai para o WhatsApp verificar o número
                await page_wa.bring_to_front()
                await page_wa.goto(wa_link)
                
                is_invalid = False
                try:
                    # Espera o erro ou a caixa de texto
                    await page_wa.wait_for_selector('div[data-animate-modal-body="true"], div[contenteditable="true"][data-tab="10"]', timeout=18000)
                    await asyncio.sleep(1.5)

                    # CHECA SE O NÚMERO É INVÁLIDO
                    modal_body = await page_wa.query_selector('div[data-animate-modal-body="true"]')
                    if modal_body:
                        alert_text = await modal_body.inner_text()
                        if any(msg in alert_text.lower() for msg in ["isn't on", "not on", "não está no", "inválido", "invalid", "ok"]):
                            is_invalid = True

                    if not is_invalid:
                        # Prova real: tem botão OK mas não tem campo de chat?
                        ok_btn = await page_wa.query_selector('div[role="button"] >> text="OK"')
                        chat_input = await page_wa.query_selector('div[contenteditable="true"][data-tab="10"]')
                        if ok_btn and not chat_input:
                            is_invalid = True

                    if is_invalid:
                        print(f"❌ NÚMERO INVÁLIDO: {client_name} (Adicionado à lista de limpeza)")
                        invalid_ids.append(client_id)
                        await page_wa.keyboard.press("Escape")
                        await asyncio.sleep(1)
                        continue # Pula para o próximo cliente

                    # CHECA SE JÁ EXISTE CONVERSA (Se o número for válido)
                    msg_input = await page_wa.query_selector('div[contenteditable="true"][data-tab="10"]')
                    previous_messages = await page_wa.query_selector_all(".message-in, .message-out")
                    if len(previous_messages) > 0:
                        print(f"⏭️ {client_name} já possui histórico. Pulando para o próximo.")
                        continue

                    # SE CHEGOU AQUI: Número é válido e é o primeiro contato
                    print(f"✨ Preparando primeiro contato para {client_name}...")
                    
                    # 4. Volta ao sistema para pegar o texto de marketing
                    await page_sistema.bring_to_front()
                    marketing_btn = await target_row.query_selector("td button[title*='marketing']")
                    if marketing_btn:
                        await marketing_btn.click()
                        await asyncio.sleep(0.6)
                        # O texto já está no clipboard agora
                        
                        # 5. Volta ao WA para colar (Modo Teste)
                        await page_wa.bring_to_front()
                        await msg_input.focus()
                        
                        # Simula Ctrl+V
                        await page_wa.keyboard.down("Control")
                        await page_wa.keyboard.press("v")
                        await page_wa.keyboard.up("Control")
                        
                        await asyncio.sleep(1)
                        # await page_wa.keyboard.press("Enter") # DESATIVADO CONFORME PEDIDO
                        print(f"✅ Mensagem colada para {client_name} (Aguardando envio manual)")

                except Exception as e:
                    print(f"⚠️ Erro ao processar {client_name}: {e}")
                
                processed_count += 1
                wait_time = random.uniform(2.0, 4.5)
                await asyncio.sleep(wait_time)

            # RELATÓRIO FINAL E SCRIPT DE LIMPEZA
            if invalid_ids:
                print("\n" + "="*60)
                print("📝 SCRIPT SQL DE LIMPEZA (IDs Inválidos):")
                print("="*60)
                ids_str = ", ".join(invalid_ids)
                sql_command = f"DELETE FROM clients WHERE id IN ({ids_str});"
                print(f"\n{sql_command}\n")
                print("="*60)
                
                with open("limpeza_automatica.sql", "w") as f:
                    f.write(sql_command)
                print(f"Arquivo 'limpeza_automatica.sql' gerado com sucesso.")
            else:
                print("\n✅ Processamento concluído. Nenhum número inválido detectado.")

        except Exception as e:
            print(f"❌ Erro crítico: {e}")

if __name__ == "__main__":
    asyncio.run(bot_marta())