export interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    marital_status: string;
    need_financing: boolean;
    dependents: number;
    profession: string;
    revenue: number;
    capital: number;
    fgts: number;
    has_property: boolean;
    compromised_income: number;
    origin: string | null;
    created_at?: string;
    last_contact_at?: string | null;
}

export const generateWhatsAppLink = (phone: string, message: string): string => {
    let client_phone = phone.replace(/\D/g, '');
    // Add country code 55 (Brazil) if it is 10 or 11 digits
    if (client_phone.length === 10 || client_phone.length === 11) {
        client_phone = '55' + client_phone;
    }
    return `https://api.whatsapp.com/send?phone=${client_phone}&text=${encodeURIComponent(message)}`;
};

const randomTitle = (): string => {
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

const randomGreeting = (client: Client): string => {
    // Get current hour in Sao Paulo timezone
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

    let firstName = client.name ? client.name.split(' ')[0] : '';
    // Se o nome for "Nome", "NOME" ou "nome", deixamos vazio para evitar "Bom dia Nome"
    if (firstName.toLowerCase() === 'nome') {
        firstName = '';
    }

    const namePart = firstName ? ` ${firstName}` : '';
    
    const greetings = [
        `Olá${namePart}, tudo bem? 👋🏼\n`,
        `${timeGreeting.trim()}${namePart}, tudo bem? 👋🏼\n`,
        `Oi${namePart}, como vai você? 😊\n`,
        `${timeGreeting.trim()}${namePart}, como vai você? 😊\n`,
        `Olá${namePart}, prazer em falar com você! 👋\n`,
        `${timeGreeting.trim()}${namePart}, prazer em falar com você! 👋\n`
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
};

const randomProfession = (): string => {
    const professions = [
        "consultora imobiliária.",
        "especialista em imóveis.",
        "corretora imobiliária.",
        "corretora de imóveis.",
        "consultora de imóveis."
    ];
    return professions[Math.floor(Math.random() * professions.length)];
};

const randomProperty = (): string => {
    const properties = [
        "apê",
        "apartamento",
        "imóvel",
    ];
    return properties[Math.floor(Math.random() * properties.length)];
};

const randomClosing = (): string => {
    const closings = [
        "Vamos simular as condições e conhecer os decorados? 😊",
        "Posso te ajudar com uma simulação sem compromisso? 📑",
        "Que tal agendarmos uma visita aos decorados? 🚪",
        "Quer saber como ficariam as parcelas para o seu perfil? 💹"
    ];
    return closings[Math.floor(Math.random() * closings.length)];
};

export const shuffleExclusiveAdvantages = (): string => {
    let message = "✅ *VANTAGENS EXCLUSIVAS:*\n";
    const exclusiveAdvantages = [
        "• Valorização garantida 📈\n",
        "• Condições que cabem no seu bolso 💳\n",
        "• Localização privilegiada 📍\n",
        "• Plantas inteligentes e modernas 🏗️\n",
    ];

    // Shuffle array
    for (let i = exclusiveAdvantages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [exclusiveAdvantages[i], exclusiveAdvantages[j]] = [exclusiveAdvantages[j], exclusiveAdvantages[i]];
    }

    exclusiveAdvantages.forEach(advantage => {
        message += advantage;
    });

    message += "\n";
    return message;
};

export const generateCustomMarketingTextMrv = (client: Client, userName: string = 'Marta de Souza'): string => {
    const locations = ['Zona', 'Região'];
    const near = [
        "pertinho do ",
        "perto do ",
        "próximo ao ",
        "bem próximo do ",
        "ao lado do "
    ];

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const neighborhoods = [
        `⬅️ ${getRandomElement(locations)} Oeste: *Campos Dourados* e *Veredas* (Bairro planejado, ${getRandomElement(near)}Supermercado Lopes na Av. Américo de Figueiredo). 🛒\n`,
        `⬇️ ${getRandomElement(locations)} Sul: *Gran Campolim* (na Rua Augusto Lippel) e *Don Pagliato* (${getRandomElement(near)}Campolim). 🏢\n`,
        `➡️ ${getRandomElement(locations)} Leste: *Scarpone*, torre única e exclusiva, ${getRandomElement(near)}Parque das Águas. 🌳\n`,
        `⬆️ ${getRandomElement(locations)} Norte: *Solar dos Eucaliptos*, ${getRandomElement(near)}SENAI Luiz Pagliato, o melhor custo-benefício da região. 💰\n`
    ];

    // Shuffle array
    for (let i = neighborhoods.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [neighborhoods[i], neighborhoods[j]] = [neighborhoods[j], neighborhoods[i]];
    }

    let text = randomTitle();
    text += randomGreeting(client);
    text += `Sou *${userName}*, ${randomProfession()}\n`;
    text += `Financiar seu ${randomProperty()} na região de Sorocaba ficou ainda mais fácil com as novas regras do *Minha Casa Minha Vida!* 🚀\n`;
    text += "Entrada parcelada e as melhores condições em 6 empreendimentos *MRV* em andamento entre diversas opções:\n\n";

    neighborhoods.forEach(line => {
        text += line;
    });

    text += "\n";
    text += randomClosing();

    return text;
};

export const generateCustomMarketingTextAccess = (client: Client, userName: string = 'Marta de Souza'): string => {
    const near = [
        "pertinho do ",
        "perto do ",
        "próximo ao ",
        "bem próximo do ",
        "ao lado do "
    ];

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const neighborhoods = [
        `*Parque Verano* - Jardim Gutierres.\nLocalização privilegiada ${getRandomElement(near)}acesso à Rodovia Raposo Tavares, ${getRandomElement(near)}Zoológico e Iperatriz Cervejaria 🦁 🍻\n`,
        `*Parque Lobato* - Parque Santa Isabel.\nEstrategicamente localizado ${getRandomElement(near)}cruzamento entre as Rodovias Armando Panunzio e Raposo Tavares, ${getRandomElement(near)}Hospital Unimed e Sorocaba refrescos (Coca-Cola) 🍹 🏥\n`,
    ];

    // Shuffle array
    for (let i = neighborhoods.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [neighborhoods[i], neighborhoods[j]] = [neighborhoods[j], neighborhoods[i]];
    }

    let text = randomGreeting(client);
    text += `Sou *${userName}*, ${randomProfession()}\n`;
    text += `Financiar seu ${randomProperty()} na região de Sorocaba ficou ainda mais fácil com as novas regras do *Minha Casa Minha Vida!* 🚀\n`;
    text += "Entrada parcelada e as melhores condições nos empreendimentos *ACCESS* em andamento entre diversas opções:\n\n";

    neighborhoods.forEach(line => {
        text += line;
    });

    text += "\n";
    text += randomClosing();

    return text;
};

// Fallback for default marketing text (without properties for now)
export const generateCustomMarketingText = (client: Client, userName: string = 'Marta de Souza'): string => {
    let text = randomTitle();
    text += randomGreeting(client);
    text += `Sou *${userName}*, ${randomProfession()}\n`;
    text += "Que tal conhecer as *melhores oportunidades* para morar ou investir na região de Sorocaba?\n";
    text += "🎯 *Temos ótimas opções que podem combinar perfeitamente com seu perfil!*\n\n";
    
    text += shuffleExclusiveAdvantages();

    text += "⏳ *Não deixe o tempo passar!*\n";
    text += "Sonhar alto também começa com um bom planejamento! 💭🔑\n";
    text += "💬 Fale comigo, te mostro as novidades e detalhes sobre esses e outros lançamentos! 📱💬 \n";
    text += `Adquirir um ${randomProperty()} é mais que um investimento, é o começo de uma nova história. ❤️🏠\n`;
    text += randomClosing();

    return text;
};

export const generateSpecificPropertyMarketingText = (client: any, property: any, userName: string = 'Marta de Souza'): string => {
    let text = randomTitle();
    text += randomGreeting(client);
    text += `Sou *${userName}*, ${randomProfession()}\n`;
    text += "✨ *QUE TAL CONHECER UMA ÓTIMA OPORTUNIDADE PARA MORAR OU INVESTIR EM SOROCABA?!* \n\n";

    text += `🏠 *${property.description}*\n`;

    if (property.obs) {
        text += `${property.obs}\n`;
    }

    text += "\n";

    if (property.delivery_key) {
        const dateOnly = property.delivery_key.split('T')[0]; // Remove a parte de tempo "T00:00:00Z"
        const parts = dateOnly.split('-'); // ["2028", "11", "30"]
        const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : property.delivery_key;
        text += `🔑 Previsão de entrega das chaves para ${formattedDate}\n`;
    }

    if (property.building_area && property.building_area > 0) {
        text += `📏 ${property.building_area} m² de área construída\n`;
    }

    if (property.rooms && property.rooms > 0) {
        text += `🛏️ ${property.rooms} dormitório${property.rooms > 1 ? "s" : ""}\n`;
    }

    if (property.suites && property.suites > 0) {
        text += `🛁 ${property.suites} suíte${property.suites > 1 ? "s" : ""}\n`;
    }

    if (property.garages && property.garages > 0) {
        text += `🚗 ${property.garages} vaga${property.garages > 1 ? "s" : ""} de garagem\n`;
    }

    if (property.balcony) {
        text += `🌇 Com varanda\n`;
    }

    if (property.region?.name) {
        text += `📍 Localizado na região ${property.region.name}\n`;
    }

    text += shuffleExclusiveAdvantages();

    text += "⏳ *Não deixe o tempo passar!*\n";
    text += "Sonhar alto também começa com um bom planejamento! 💭\n";
    text += "💬 Fale comigo, te mostro as novidades e detalhes sobre esse e outros lançamentos! 📱💬 \n";
    text += `Adquirir um ${property.description} é mais que um investimento, é o começo de uma nova história. 🏠❤️\n`;

    text += randomClosing();

    return text;
};
