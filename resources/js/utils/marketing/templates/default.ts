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
    userName?: string
): string => {
    let text = getRandomGreeting(client);

    if (userName) {
        text += `\nSou *${userName}*, ${getRandomProfession()}.`;
    }

    const askName = getRandomAskClientName(client);
    if (askName) {
        text += "\n" + askName;
    }

    return text;
};
