import asyncio
import random
from playwright.async_api import async_playwright

# --- CONFIGURAÇÕES ---
CRM_URL_PART = "notify" 

async def bot_marta_clear():
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

            print("🤖 Robô de Limpeza iniciado. Varrendo lista...")
            
            invalid_ids = []
            processed_count = 0

            while True:
                await page_sistema.bring_to_front()
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
                    print("\n✅ Verificação de lista concluída!")
                    break

                client_id = await target_row.get_attribute("data-id")
                client_name = (await target_name_btn.inner_text()).strip()
                
                # 1. Clica no nome para gerar o link
                await target_name_btn.click()
                await asyncio.sleep(0.6)
                wa_link = await page_sistema.evaluate("navigator.clipboard.readText()")
                
                if "web.whatsapp.com/send" not in wa_link:
                    continue

                # 2. Verifica no WhatsApp
                print(f"🔍 [{processed_count + 1}] Verificando {client_name} (ID: {client_id})...")
                await page_wa.bring_to_front()
                await page_wa.goto(wa_link)
                
                is_invalid = False
                try:
                    # Aguarda o modal de animação do WA ou a caixa de mensagem
                    # data-animate-modal-body="true" foi identificado no Inspecionar do usuário
                    await page_wa.wait_for_selector('div[data-animate-modal-body="true"], div[contenteditable="true"][data-tab="10"]', timeout=18000)
                    
                    # Pausa para garantir que o conteúdo do modal carregou
                    await asyncio.sleep(2)

                    # Tenta ler o conteúdo do modal de erro especificamente
                    modal_body = await page_wa.query_selector('div[data-animate-modal-body="true"]')
                    if modal_body:
                        alert_text = await modal_body.inner_text()
                        # Verifica se o texto contém as frases de erro (inglês ou português)
                        if any(msg in alert_text.lower() for msg in ["isn't on", "not on", "não está no", "inválido", "invalid"]):
                            is_invalid = True
                            print(f"❌ Detectado via texto do modal: {alert_text}")

                    # Prova real secundária: Se tem botão OK mas não tem chat input
                    if not is_invalid:
                        ok_button = await page_wa.query_selector('div[role="button"] >> text="OK"')
                        chat_input = await page_wa.query_selector('div[contenteditable="true"][data-tab="10"]')
                        if ok_button and not chat_input:
                            is_invalid = True
                            print(f"❌ Detectado via botão OK sem campo de chat.")

                    if is_invalid:
                        invalid_ids.append(client_id)
                        print(f"❌ NÚMERO INVÁLIDO CONFIRMADO: {client_name}")
                        
                        # Tenta fechar o modal
                        await page_wa.keyboard.press("Escape")
                        await asyncio.sleep(1)
                except Exception:
                    # Timeout geralmente significa que o número é OK
                    pass

                if not is_invalid:
                    print(f"✅ Número OK.")

                processed_count += 1
                await asyncio.sleep(random.uniform(1.2, 2.0))

            # RESULTADO FINAL: GERAÇÃO DO SQL
            print("\n" + "="*60)
            if invalid_ids:
                print("📝 SCRIPT SQL PARA DELETAR NÚMEROS INVÁLIDOS:")
                print("="*60)
                ids_str = ", ".join(invalid_ids)
                sql_command = f"DELETE FROM clients WHERE id IN ({ids_str});"
                print(f"\n{sql_command}\n")
                print("="*60)
                
                with open("limpeza_clientes_whatsapp.sql", "w") as f:
                    f.write(sql_command)
                print(f"\nArquivo 'limpeza_clientes_whatsapp.sql' gerado com {len(invalid_ids)} IDs.")
            else:
                print("Nenhum número inválido foi detectado nesta varredura.")
            print("="*60)

        except Exception as e:
            print(f"❌ Erro crítico: {e}")

if __name__ == "__main__":
    asyncio.run(bot_marta_clear())
