---
trigger: always_on
---

# Regras e Arquitetura - Imovel_match (Laravel Breeze + React + Inertia.js)

Este documento dita as regras arquiteturais e de negócio para Assistentes de IA e novos desenvolvedores trabalhando neste projeto. Sempre consulte estas regras antes de criar novas páginas ou alterar o fluxo de dados.

## 1. Terminologia de Áreas do Projeto (Site vs Admin)

*   **Site**: Refere-se exclusivamente à parte **pública** do projeto (onde o usuário final acessa sem login).
    *   Exemplos: Página inicial (`welcome.tsx`), Sobre nós (`about.tsx`), Listagem de imóveis pública (`properties.tsx`), Detalhes do imóvel (`property-details.tsx`).
*   **Admin**: Refere-se à parte **administrativa e restrita** do projeto (exige autenticação).
    *   Exemplos: Dashboard, gestão de clientes, imóveis, configurações e rotas de autenticação (login/registro).

## 2. Organização de Diretórios (React)

A divisão de responsabilidades no front-end em `resources/js/` deve ser estrita:

*   **`/pages/site/`**: Deve conter todas as páginas públicas (sem autenticação).
*   **`/pages/admin/`**: Deve conter todas as pastas e páginas do painel administrativo (ex: `auth/`, `properties/`, `clients/`, `settings/`).
*   **Regra de Ouro para Pages**: Arquivos dentro de `pages/` **não** devem conter grandes blocos de marcação HTML repetitiva. Devem focar no estado da página e compor componentes menores. Eles são apenas "Entry Points" do `Inertia::render()`.
*   **`/components/`**: Contém componentes de UI reutilizáveis (Botões, Inputs, Cards). Devem ser componentes burros (Dumb Components) que recebem dados via `props`.
*   **`/layouts/`**: Componentes de "casca" (ex: `AuthenticatedLayout`, `GuestLayout`).

## 3. Roteamento (Controllers e Rotas)

*   **Rotas do Site**: Retornam `Inertia::render('site/NomeDaPagina')`. Normalmente ficam fora do middleware de auth em `routes/web.php`.
*   **Rotas do Admin**: Retornam `Inertia::render('admin/modulo/NomeDaPagina')`. Devem obrigatoriamente estar dentro do grupo de middleware `['auth', 'verified']`.
*   **Navegação React**: Nunca use `<a href="...">` convencional. Use sempre o componente `<Link href={route('nome.rota')}>` utilizando a biblioteca `ziggy-js`.

## 4. Formulários e Submissões

*   Nunca utilize `axios` ou `fetch` manualmente para formulários CRUD.
*   **Use estritamente o hook `useForm` do Inertia**: `const { data, setData, post, processing, errors } = useForm({...})`.
*   Isso garante o comportamento SPA, previne reloads e consome automaticamente os erros de validação do back-end Laravel.

## 5. Compartilhamento Global de Dados

*   Não passe dados repetitivos (como usuário logado) manualmente em cada controller.
*   Tudo que for global (`auth.user`, mensagens flash de `success`/`error`) deve ser compartilhado no arquivo backend: `app/Http/Middleware/HandleInertiaRequests.php`.
*   No React, consuma através de: `const { auth, flash } = usePage().props;`

## 6. Lógica de Negócio e Estilização

*   **Thin Controllers**: Deixe a lógica pesada, validações (Form Requests) e tratamentos do lado do servidor (Laravel). O React atua puramente como "Motor de Template" (View).
*   **Consultas ao Banco**: Sempre evite "N+1" nos controllers utilizando o Eager Loading do Eloquent (ex: `Property::with(['region'])->get()`).
*   **Estilização**: Prioridade absoluta para as classes utilitárias do **TailwindCSS**. Evite escrever CSS puro a menos que seja estritamente necessário (como definições de tema root ou animações de keyframe complexas).

## 7. Mobile First

*   Todas as páginas devem ser projetadas com foco primeiro em dispositivos móveis (mobile).
*   Aumente o tamanho da fonte do texto padrão para 15px ou 16px em mobile (`text-base`).
*   Utilize espaçamentos internos generosos e que se adaptem ao toque (`gap-3`, `p-4`).
*   Priorize layouts verticais e use `flex-col` ou `grid` com apenas 1 coluna como padrão.
*   Os breakpoints de `md:` (tablets/desktops) devem ser usados para "desdobrar" o layout, não para redimensionar ou compactar o layout mobile.

## 8. Regras de Texto e Escrita (Marketing/CRM)

Ao gerar qualquer conteúdo textual (mensagens de WhatsApp, emails, descrições) para o sistema:

*   **Regra da Profissão**: Sempre utilize o termo "corretora" ou "consultora" para se referir à profissional, evitando "corretor" ou "consultor".
*   **Regra da Origem**: Ao mencionar a origem do lead ("chegou pelo site", "pelo classificados"), utilize sempre letras minúsculas (ex: "chegou pelo site", "veio dos classificados").
*   **Escrita de Números**: Para valores monetários (R$), utilize o formato com ponto e vírgula (ex: R$ 4.500,00).
*   **Nomes de Imóveis/Empreendimentos**: Nomes próprios de empreendimentos (ex: "Grand Campolim", "Solar dos Eucaliptos") devem ser sempre escritos em **negrito**.
*   **Localidades e Referências**: Nomes de bairros, regiões e pontos de referência (ex: "Zona Leste", "perto do SENAI") devem ser sempre escritos em **negrito**.

### 8.1. Diretório de Arquivos de Marketing

Para manter a organização e facilitar a manutenção futura de novas campanhas ou segmentações de clientes, todos os arquivos relacionados a mensagens de marketing, modelos de texto e conteúdo dinâmico devem seguir a seguinte estrutura de diretórios:

*   **Localização**: As mensagens e textos dinâmicos devem ser armazenados em arquivos JavaScript (`.js`) ou TypeScript (`.ts`) dentro de um diretório dedicado.
*   **Estrutura do Diretório**: Os arquivos devem ser organizados preferencialmente dentro de um diretório chamado `marketing` ou `messages`, ubicado na raiz dos arquivos React (geralmente `/resources/js/marketing/` ou `/resources/js/utils/marketing/`).
*   **Arquivos por Segmentação**: Se o sistema suportar diferentes tipos de campanhas, origens de leads ou produtos específicos (ex: MRV, Tenda), os arquivos de texto correspondentes devem seguir uma estrutura hierárquica clara, por exemplo:
    ```
    /marketing/
    ├── utils.js
    ├── templates/
    │   ├── mrv.js
    │   ├── tenda.js
    │   ├── region-oeste.js
    │   └── region-sul.js
    ```
*   **Regra de Imports**: Ao utilizar esses arquivos em componentes, sempre utilize o import explícito (ex: `import { generateMarketingText } from '@/utils/marketing/templates/mrv';`).
