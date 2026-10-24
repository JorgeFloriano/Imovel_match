import { Client } from '../types';
import {
    getRandomTitle,
    getRandomGreeting,
    getRandomProfession,
    getRandomPropertyNoun,
} from '../helpers';

/**
 * Generates marketing message for Feirão Casa Paulista campaign.
 */
export const generateFeiraoCasaPaulistaText = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    const facilities = [
        `📄 *Desconto casa paulista de R$13 mil*\n`,
        `💰 *Subsídio de até R$55 mil*\n`,
        `🔑 *Entrada facilitada*\n`,
    ];

    const randomFeiraoClosing = (): string => {
        const closings = [
            "Vamos proveitar e simular as condições? 😊",
            "Posso te ajudar com uma simulação sem compromisso? 📑",
            "Que tal conhecer as oportunidades disponíveis? 🚪",
            "Quer saber como ficariam as parcelas para o seu perfil? 💹"
        ];
        return closings[Math.floor(Math.random() * closings.length)];
    };

    // Fisher-Yates shuffle
    const shuffledFacilities = [...facilities];
    for (let i = shuffledFacilities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledFacilities[i], shuffledFacilities[j]] = [shuffledFacilities[j], shuffledFacilities[i]];
    }

    let text = getRandomTitle();
    text += getRandomGreeting(client);
    text += `Sou *${userName}*, ${getRandomProfession()}\n`;
    text += "Estamos com oportunidades imperdíveis no *FEIRÃO CASA PAULISTA* 🏡\n\n";

    shuffledFacilities.forEach(line => {
        text += line;
    });

    text += "\n";
    text += "O evento acontece nos *dias 29, 30, 31 de maio e 01 de junho no parque das águas* e a partir de agora já estamos negociando nas *condições facilitadas!!*\n";
    text += `Adquirir um ${getRandomPropertyNoun()} é mais que um investimento, é o começo de uma nova história. ❤️🏠\n`;
    text += randomFeiraoClosing();

    return text;
};
