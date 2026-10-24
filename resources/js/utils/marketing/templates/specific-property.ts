import { Client, PropertyMarketingData } from '../types';
import {
    getRandomTitle,
    getRandomGreeting,
    getRandomProfession,
    getRandomClosing,
    shuffleExclusiveAdvantages,
} from '../helpers';

/**
 * Generates marketing message for a specific property opportunity.
 */
export const generateSpecificPropertyMarketingText = (
    client: Client | any,
    property: PropertyMarketingData | any,
    userName: string = 'Marta de Souza'
): string => {
    let text = getRandomTitle();
    text += getRandomGreeting(client);
    text += `Sou *${userName}*, ${getRandomProfession()}\n`;
    text += "✨ *QUE TAL CONHECER UMA ÓTIMA OPORTUNIDADE PARA MORAR OU INVESTIR EM SOROCABA?!* \n\n";

    text += `🏠 *${property.description}*\n`;

    if (property.obs) {
        text += `${property.obs}\n`;
    }

    text += "\n";

    if (property.delivery_key) {
        const dateOnly = property.delivery_key.split('T')[0];
        const parts = dateOnly.split('-');
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

    text += getRandomClosing();

    return text;
};
