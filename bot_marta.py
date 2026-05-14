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
            print("Tarefa: Analisar lista, enviar mensagens e mapear números inválidos.")
            
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
                await asyncio.sleep(0.8)
                wa_link = await page_sistema.evaluate("navigator.clipboard.readText()")
                
                if "web.whatsapp.com/send" not in wa_link:
                    print(f"⚠️ Falha ao obter link para {client_name}")
                    continue

                # 3. Vai para o WhatsApp verificar o número
                await page_wa.bring_to_front()
                await page_wa.goto(wa_link)
                
                is_invalid = False
                try:
                    # ESPERA INTELIGENTE: Aguarda o ERRO, a CAIXA DE MENSAGEM ou o BOTÃO OK
                    await page_wa.wait_for_selector('div[data-animate-modal-body="true"], div[contenteditable="true"][data-tab="10"], div[role="button"]', timeout=25000)
                    
                    # Pausa essencial para carregar o modal de erro ou o histórico de mensagens
                    await asyncio.sleep(3.5)

                    # CHECAGEM DE NÚMERO INVÁLIDO
                    modal_body = await page_wa.query_selector('div[data-animate-modal-body="true"]')
                    ok_btn = await page_wa.query_selector('div[role="button"] >> text="OK"')
                    chat_input_check = await page_wa.query_selector('div[contenteditable="true"][data-tab="10"]')

                    if ok_btn and not chat_input_check:
                        is_invalid = True
                    elif modal_body:
                        alert_text = await modal_body.inner_text()
                        if any(msg in alert_text.lower() for msg in ["isn't on", "not on", "não está no", "inválido", "invalid"]):
                            is_invalid = True

                    if is_invalid:
                        print(f"❌ NÚMERO INVÁLIDO: {client_name} (ID: {client_id})")
                        invalid_ids.append(client_id)
                        await page_wa.keyboard.press("Escape")
                        await asyncio.sleep(1.5)
                        continue 

                    # AGUARDA O CHAT ABRIR COMPLETAMENTE (Espera pelo Header/Nome do contato)
                    try:
                        await page_wa.wait_for_selector('header', timeout=10000)
                        # Pausa extra para o WhatsApp carregar mensagens antigas do servidor
                        await asyncio.sleep(2.5)
                    except:
                        pass

                    # CHECA SE JÁ EXISTE CONVERSA (Se o número for válido)
                    # Usamos seletores de balão de mensagem para garantir
                    previous_messages = await page_wa.query_selector_all(".message-in, .message-out")
                    
                    if len(previous_messages) > 0:
                        print(f"⏭️ {client_name} já possui histórico ({len(previous_messages)} mensagens). Pulando.")
                        continue

                    # SE CHEGOU AQUI: Número é válido e é o primeiro contato
                    print(f"✨ Primeiro contato detectado para {client_name}. Buscando texto...")
                    
                    # 4. Volta ao sistema para pegar o texto de marketing
                    await page_sistema.bring_to_front()
                    marketing_btn = await target_row.query_selector("td button[title*='marketing']")
                    if marketing_btn:
                        await marketing_btn.click()
                        await asyncio.sleep(0.8)
                        
                        # 5. Volta ao WA para colar
                        await page_wa.bring_to_front()
                        
                        # RE-VERIFICAÇÃO DE SEGURANÇA FINAL
                        try:
                            msg_input = await page_wa.wait_for_selector('div[contenteditable="true"][data-tab="10"]', timeout=12000)
                            if msg_input:
                                # Última checagem de histórico antes de colar (segurança tripla)
                                await asyncio.sleep(1)
                                final_check = await page_wa.query_selector_all(".message-in, .message-out")
                                if len(final_check) > 0:
                                    print(f"⏭️ {client_name} carregou histórico agora. Cancelando envio.")
                                    continue

                                await msg_input.focus()
                                await page_wa.keyboard.down("Control")
                                await page_wa.keyboard.press("v")
                                await page_wa.keyboard.up("Control")
                                
                                await asyncio.sleep(1.5)
                                await page_wa.keyboard.press("Enter") 
                                print(f"✅ Mensagem enviada para {client_name}")
                            else:
                                print(f"⚠️ Campo de chat sumiu para {client_name}. Pulando.")
                        except Exception as e:
                            print(f"⚠️ Erro ao focar no chat de {client_name}: {e}")

                except Exception as e:
                    print(f"⚠️ Erro ao processar WhatsApp para {client_name}: {e}")
                
                processed_count += 1
                wait_time = random.uniform(3.0, 6.0)
                await asyncio.sleep(wait_time)

            # RELATÓRIO FINAL
            if invalid_ids:
                print("\n" + "="*60)
                print("📝 SCRIPT SQL DE LIMPEZA:")
                print("="*60)
                ids_str = ", ".join(invalid_ids)
                sql_command = f"DELETE FROM clients WHERE id IN ({ids_str});"
                print(f"\n{sql_command}\n")
                print("="*60)
                
                with open("limpeza_automatica.sql", "w") as f:
                    f.write(sql_command)
                print(f"Arquivo 'limpeza_automatica.sql' gerado com sucesso.")
            else:
                print("\n✅ Processamento concluído. Nenhum número inválido.")

        except Exception as e:
            print(f"❌ Erro crítico: {e}")

if __name__ == "__main__":
    asyncio.run(bot_marta())