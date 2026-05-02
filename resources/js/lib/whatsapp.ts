/**
 * WhatsApp service for handling interactions with the WhatsApp API.
 */
export class WhatsAppService {
    /**
     * Formats a phone number to be used with the WhatsApp API by removing non-numeric characters.
     * Optionally adds the country code if missing (assumes Brazil +55 by default).
     */
    static formatPhone(phone: string, defaultCountryCode: string = '55'): string {
        if (!phone) return '';
        
        let numericPhone = phone.replace(/\D/g, '');
        
        // If it looks like a valid local Brazilian number but without country code (10 or 11 digits)
        if (numericPhone.length === 10 || numericPhone.length === 11) {
            numericPhone = `${defaultCountryCode}${numericPhone}`;
        }
        
        return numericPhone;
    }

    /**
     * Opens a WhatsApp chat in a new tab.
     * @param phone The phone number of the client.
     * @param message Optional pre-filled message.
     */
    static openChat(phone: string, message?: string): void {
        if (!phone) {
            console.error('WhatsAppService: No phone number provided');
            return;
        }

        const formattedPhone = this.formatPhone(phone);
        let url = `https://wa.me/${formattedPhone}`;

        if (message) {
            url += `?text=${encodeURIComponent(message)}`;
        }

        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
