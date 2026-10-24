import { Client } from '../types';
import {
    getRandomGreeting,
    getRandomProfession,
    getRandomAskClientName,
    getRandomDefaultTextBody
} from '../helpers';

/**
 * Generates custom default marketing text for a client.
 */
export const generateCustomMarketingText = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    let text = getRandomGreeting(client);

    text += `\nSou *${userName}*, ${getRandomProfession()}.`;
    
    const askName = getRandomAskClientName(client);
    if (askName) {
        text += "\n" + askName;
    }

    text += `\n${getRandomDefaultTextBody()}`;

    return text;
};
