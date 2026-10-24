import { Client } from './types';

/**
 * Extracts and sanitizes the first name of a client.
 * Returns empty string if invalid or generic placeholder.
 */
export const getFirstName = (client: Client): string => {
    const invalidNames = ['nome', 'sim', 'não', 'nao'];

    const firstName = client?.name ? client.name.trim().split(' ')[0] : '';
    if (!firstName || invalidNames.includes(firstName.toLowerCase())) {
        return '';
    }
    return firstName;
};

/**
 * Returns a randomized catchy title for marketing messages.
 */
export const getRandomTitle = (): string => {
    const titles = [
        "🌟 *SEU NOVO APÊ ESTÁ AQUI!* 🌟\n\n",
        "🏠 *OPORTUNIDADE: CONQUISTE SEU IMÓVEL!* 🏠\n\n",
        "🚀 *O SONHO DA CASA PRÓPRIA ESTÁ PERTO!* 🚀\n\n",
        "✨ *NOVIDADES SOBRE SEU NOVO APARTAMENTO* ✨\n\n",
        "🔑 *CHEGOU A HORA DE SAIR DO ALUGUEL!* 🔑\n\n",
        "📊 *CONDIÇÕES EXCLUSIVAS PARA VOCÊ!* 📊\n\n",
        "🌟 *SEU FUTURO ESTÁ SENDO CONSTRUÍDO AGORA!* 🌟\n\n",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
};

/**
 * Returns a context-aware greeting based on São Paulo timezone,
 * optionally including the client's first name.
 */
export const getRandomGreeting = (client: Client, includeName: boolean = false): string => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
        hour12: false
    });
    const hour = parseInt(formatter.format(now), 10);
    
    let timeGreeting = "Boa noite ";
    if (hour >= 5 && hour < 12) {
        timeGreeting = "Bom dia ";
    } else if (hour >= 12 && hour < 18) {
        timeGreeting = "Boa tarde ";
    }

    const firstName = getFirstName(client);

    const clientNameGreetings = [
        `${timeGreeting.trim()} ${firstName}, como vai? 😊`,
        `${timeGreeting.trim()} ${firstName}, tudo bem? ☺️`,
        `Olá ${firstName}, tudo bem? 🙂`,
        `Olá ${firstName}, como vai? 😊`,
        `Oi ${firstName}, como vai? ☺️`,
        `Oi ${firstName}, tudo bem? 🙂`,
    ];

    const greetings = [
        `${timeGreeting.trim()}, como vai? 😊`,
        `${timeGreeting.trim()}, tudo bem? ☺️`,
        `Olá, tudo bem? 🙂`,
        `Olá, como vai? 😊`,
        `Oi, como vai? ☺️`,
        `Oi, tudo bem? 🙂`,
    ];

    if (includeName && firstName) {
        return clientNameGreetings[Math.floor(Math.random() * clientNameGreetings.length)];
    }

    return greetings[Math.floor(Math.random() * greetings.length)];
};

/**
 * Generates an inquiry phrase checking if this is the client's number.
 */
export const getRandomAskClientName = (client: Client): string => {
    const firstName = getFirstName(client);
    if (!firstName) return '';

    const askClientName = [
        `Eu falo com ${firstName}?`,
        `Neste número falo com ${firstName}?`,
        `Nesse número falo com ${firstName}?`,
        `${firstName} é neste número?`,
        `Esse é o contato de ${firstName}?`,
        `Nesse contato falo com ${firstName}?`,
    ];

    return askClientName[Math.floor(Math.random() * askClientName.length)];
};

/**
 * Returns a professional title following project branding rules (consultora / corretora).
 */
export const getRandomProfession = (): string => {
    const professions = [
        "consultora imobiliária",
        "especialista em imóveis",
        "corretora imobiliária",
        "corretora de imóveis",
        "consultora de imóveis",
        "trabalho com consultoria imobiliária",
        "trabalho com vendas de imóveis",
        "trabalho como consultora imobiliária",
        "trabalho como corretora imobiliária",
    ];
    return professions[Math.floor(Math.random() * professions.length)];
};

export const getRandomDefaultTextBody = (): string => {
    const textBodies = [
        "Recebi seu contato devido ao interesse na compra de apartamento na região de Sorocaba, está correto?\n\n",
        "Recebi seu contato devido ao possível interesse na compra de imóvel em Sorocaba, ainda está pesquisando?\n",
        "Estou entrando em contato pois recebi seu número associado ao interesse na compra de apartamento na região de Sorocaba. Gostaria de confirmar, sua busca continua ativa?\n\n",
        "Estou entrando em contato porque recebi seu número como interessado em comprar um apartamento, você ainda está procurando?\n",
        "Meu contato é referente ao seu possível interesse na compra de apartamento na região de Sorocaba, está correto?",
        ""
    ];
    return textBodies[Math.floor(Math.random() * textBodies.length)];
};

/**
 * Returns random property noun synonym.
 */
export const getRandomPropertyNoun = (): string => {
    const properties = [
        "apê",
        "apartamento",
        "imóvel",
    ];
    return properties[Math.floor(Math.random() * properties.length)];
};

/**
 * Returns a call-to-action closing phrase.
 */
export const getRandomClosing = (): string => {
    const closings = [
        "Vamos simular as condições e conhecer os decorados? 😊",
        "Posso te ajudar com uma simulação sem compromisso? 📑",
        "Que tal agendarmos uma visita aos decorados? 🚪",
        "Quer saber como ficariam as parcelas para o seu perfil? 💹"
    ];
    return closings[Math.floor(Math.random() * closings.length)];
};

/**
 * Generates a shuffled bulleted list of exclusive advantages.
 */
export const shuffleExclusiveAdvantages = (): string => {
    const exclusiveAdvantages = [
        "• Valorização garantida 📈\n",
        "• Condições que cabem no seu bolso 💳\n",
        "• Localização privilegiada 📍\n",
        "• Plantas inteligentes e modernas 🏗️\n",
    ];

    // Fisher-Yates shuffle
    const shuffled = [...exclusiveAdvantages];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return "✅ *VANTAGENS EXCLUSIVAS:*\n" + shuffled.join('') + "\n";
};

/**
 * Helper to pick a random element from an array.
 */
export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
