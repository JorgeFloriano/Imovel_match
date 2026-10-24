import { Client } from '../types';
import {
    getRandomGreeting,
    getRandomProfession,
    getRandomPropertyNoun,
    getRandomClosing,
    getRandomElement,
} from '../helpers';

/**
 * Generates marketing message highlighting MRV developments across city regions.
 */
export const generateCustomMarketingTextMrv = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    const locations = ['Zona', 'Região'];
    const near = [
        "pertinho do ",
        "perto do ",
        "próximo ao ",
        "bem próximo do ",
        "ao lado do "
    ];

    const neighborhoods = [
        `⬅️ ${getRandomElement(locations)} Oeste: *Campos Dourados* e *Veredas* (Bairro planejado, ${getRandomElement(near)}Supermercado Lopes na Av. Américo de Figueiredo). 🛒\n`,
        `⬇️ ${getRandomElement(locations)} Sul: *Gran Campolim* (na Rua Augusto Lippel) e *Don Pagliato* (${getRandomElement(near)}Campolim). 🏢\n`,
        `➡️ ${getRandomElement(locations)} Leste: *Scarpone*, torre única e exclusiva, ${getRandomElement(near)}Parque das Águas. 🌳\n`,
        `⬆️ ${getRandomElement(locations)} Norte: *Solar dos Eucaliptos*, ${getRandomElement(near)}SENAI Luiz Pagliato, o melhor custo-benefício da região. 💰\n`
    ];

    // Fisher-Yates shuffle
    const shuffledNeighborhoods = [...neighborhoods];
    for (let i = shuffledNeighborhoods.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledNeighborhoods[i], shuffledNeighborhoods[j]] = [shuffledNeighborhoods[j], shuffledNeighborhoods[i]];
    }

    let text = getRandomGreeting(client);
    text += `Sou *${userName}*, ${getRandomProfession()}\n`;
    text += `Financiar seu ${getRandomPropertyNoun()} na ficou ainda mais fácil com as novas regras do *Minha Casa Minha Vida!* 🚀\n\n`;

    shuffledNeighborhoods.forEach(line => {
        text += line;
    });

    text += "\n";
    text += "Além dos empreendimentos *MRV*, temos *diversas outras opções* na região:\n";
    text += getRandomClosing();

    return text;
};
