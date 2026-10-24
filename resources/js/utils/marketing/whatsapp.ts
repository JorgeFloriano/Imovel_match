/**
 * Generates a WhatsApp click-to-chat API link.
 * Automatically handles Brazilian phone numbers (adds country code 55 when 10 or 11 digits).
 */
export const generateWhatsAppLink = (phone: string, message: string): string => {
    let clientPhone = phone.replace(/\D/g, '');
    
    // Add country code 55 (Brazil) if it is 10 or 11 digits
    if (clientPhone.length === 10 || clientPhone.length === 11) {
        clientPhone = '55' + clientPhone;
    }
    
    return `https://api.whatsapp.com/send?phone=${clientPhone}&text=${encodeURIComponent(message)}`;
};
