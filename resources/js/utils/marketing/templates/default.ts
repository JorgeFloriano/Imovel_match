import { Client } from '../types';
import {
    getRandomGreeting,
    getRandomProfession,
    getRandomAskClientName,
} from '../helpers';

/**
 * Generates custom default marketing text for a client.
 */
export const generateCustomMarketingText = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    let text = getRandomGreeting(client);

    const askName = getRandomAskClientName(client);
    if (askName) {
        text += "\n" + askName;
    }

    text += `\nSou *${userName}*, ${getRandomProfession()}\nEstou entrando em contato referente ao interesse demonstrado em nosso stand de vendas.\n\n`;

    return text;
};
