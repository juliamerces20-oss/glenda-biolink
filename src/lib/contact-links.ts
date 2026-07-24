// PLACEHOLDER: Glenda/Ju devem substituir pelo número real de WhatsApp
// (formato internacional, só dígitos, ex: "5521970295930").
export const WHATSAPP_NUMBER_PLACEHOLDER = "5500000000000";

// PLACEHOLDER: Glenda/Ju devem substituir pelo link real de agendamento
// (Calendly, Cal.com, etc.) antes de publicar.
export const AGENDA_LINK_PLACEHOLDER = "#agenda-glenda";

export function buildWhatsAppUrl(
  message: string,
  number: string = WHATSAPP_NUMBER_PLACEHOLDER,
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
