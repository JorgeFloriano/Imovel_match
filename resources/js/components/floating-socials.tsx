import React from 'react';
import { usePage } from '@inertiajs/react';
import SocialButton from '@/components/social-button';
import WhatsAppIcon from '@/components/icons/whatsapp-icon';
import InstagramIcon from '@/components/icons/instagram-icon';

interface FloatingSocialsProps {
    whatsappNumber?: string;
    whatsappMessage?: string;
    instagramUsername?: string;
}

export default function FloatingSocials({ 
    whatsappNumber = "5515991600906", 
    whatsappMessage, 
    instagramUsername = "martadesouza.imob" 
}: FloatingSocialsProps) {
    const { props } = usePage<any>();
    const property = props.property;
    
    const defaultMessage = property 
        ? `Olá! Gostaria de mais informações sobre o imóvel: ${property.description}`
        : "Olá! Gostaria de tirar algumas dúvidas.";
        
    const finalMessage = whatsappMessage || defaultMessage;
    const encodedMessage = finalMessage ? `?text=${encodeURIComponent(finalMessage)}` : '';
    const whatsappHref = `https://wa.me/${whatsappNumber}${encodedMessage}`;
    const instagramHref = `https://instagram.com/${instagramUsername}`;

    return (
        <>
            <SocialButton
                href={whatsappHref}
                icon={<WhatsAppIcon />}
                label="Fale com nossa equipe!"
                className="fixed top-22 right-4 md:right-6"
            />
            <SocialButton
                href={instagramHref}
                icon={<InstagramIcon />}
                label="Siga nosso Instagram!"
                className="fixed bottom-4 left-4 md:bottom-6 md:left-6"
            />
        </>
    );
}
