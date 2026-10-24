import { Client } from '../types';
import {
    getRandomGreeting,
    getRandomProfession,
    getRandomClosing,
    getRandomElement,
} from '../helpers';

/**
 * Generates marketing message highlighting company website and Residencial Lago de Davos.
 */
export const generateSiteLinkMarketingText = (
    client: Client,
    userName: string = 'Marta de Souza'
): string => {
    const sentencesOne = [
        "Trabalhamos com imóveis prontos e lançamentos em Sorocaba e região.",
        "Temos excelentes opções de prontos para morar e lançamentos em Sorocaba e cidades vizinhas.",
        "Contamos com um catálogo completo de imóveis novos e na planta pela região de Sorocaba.",
        "Oferecemos desde oportunidades na planta até imóveis prontos na região de Sorocaba.",
        "Atuamos com lançamentos exclusivos e imóveis já finalizados em Sorocaba e arredores.",
        "Seja para morar ou investir, temos opções prontas e na planta em Sorocaba e municípios próximos.",
        "Dispomos de uma grande variedade de lançamentos e prontos na região de Sorocaba."
    ];

    const sentencesTwo = [
        "Posso te apresentar as opções ou se preferir acesse nosso site em: martadesouzaimoveis.com",
        "Posso te enviar algumas propostas por aqui ou se preferir navegar no nosso site: martadesouzaimoveis.com",
        "Se quiser, te mando os melhores perfis agora mesmo, ou você pode conferir as fotos no site: martadesouzaimoveis.com",
        "Posso selecionar os melhores projetos para você ou, se preferir navegar sozinho, visite: martadesouzaimoveis.com",
        "Fico à disposição para te mostrar os imóveis por aqui, mas você também pode conhecer nossa vitrine virtual: martadesouzaimoveis.com",
        "Posso te guiar nessa escolha enviando fotos por chat, ou você pode explorar nosso catálogo em: martadesouzaimoveis.com",
        "Se preferir um atendimento personalizado, te mando as opções agora. Para ver todos os modelos, acesse: martadesouzaimoveis.com"
    ];

    let text = getRandomGreeting(client, true) + `\n`;
    text += `*${userName}* aqui, ${getRandomProfession()}\n`;
    text += `Passando para informar sobre o *RESIDENCIAL LAGO DE DAVOS* o mais novo empreendimento da construtora *MRV* em Sorocaba.\n`;
    text += `Pertinho do supermercado correia do Bairro Santa Barbara, com variedade de comércio na Américo de Figueiredo, fácil acesso para a Raposo Tavares e Cruz de ferro na zona norte.\n`;
    text += getRandomElement(sentencesOne) + "\n";
    text += getRandomElement(sentencesTwo) + "\n";
    text += getRandomClosing();

    return text;
};
