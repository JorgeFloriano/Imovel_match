import { Client } from '../types';
import {
    getRandomGreeting,
    getRandomProfession,
    getRandomPropertyNoun,
    getRandomClosing,
    getRandomElement,
} from '../helpers';

/**
 * Generates marketing message highlighting ACCESS developments (Parque Verano, Parque Lobato).
 */
export const generateCustomMarketingTextAccess = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    const near = [
        "pertinho do ",
        "perto do ",
        "próximo ao ",
        "bem próximo do ",
        "ao lado do "
    ];

    const neighborhoods = [
        `*Parque Verano* - Jardim Gutierres.\nLocalização privilegiada ${getRandomElement(near)}acesso à Rodovia Raposo Tavares, ${getRandomElement(near)}Zoológico e Iperatriz Cervejaria 🦁 🍻\n`,
        `*Parque Lobato* - Parque Santa Isabel.\nEstrategicamente localizado ${getRandomElement(near)}cruzamento entre as Rodovias Armando Panunzio e Raposo Tavares, ${getRandomElement(near)}Hospital Unimed e Sorocaba refrescos (Coca-Cola) 🍹 🏥\n`,
    ];

    // Fisher-Yates shuffle
    const shuffledNeighborhoods = [...neighborhoods];
    for (let i = shuffledNeighborhoods.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledNeighborhoods[i], shuffledNeighborhoods[j]] = [shuffledNeighborhoods[j], shuffledNeighborhoods[i]];
    }

    let text = getRandomGreeting(client);
    text += `Sou *${userName}*, ${getRandomProfession()}\n`;
    text += `Financiar seu ${getRandomPropertyNoun()} na região de Sorocaba ficou ainda mais fácil com as novas regras do *Minha Casa Minha Vida!* 🚀\n`;
    text += "Entrada parcelada e as melhores condições nos empreendimentos *ACCESS* em andamento entre diversas opções:\n\n";

    shuffledNeighborhoods.forEach(line => {
        text += line;
    });

    text += "\n";
    text += getRandomClosing();

    return text;
};
