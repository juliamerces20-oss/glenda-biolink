// PLACEHOLDER: Glenda/Ju devem substituir pelo número real de WhatsApp
// (formato internacional, só dígitos, ex: "5521970295930").
export const WHATSAPP_NUMBER_PLACEHOLDER = "5500000000000";

export const AGENDA_LINK_PLACEHOLDER =
  "https://calendar.app.google/qnigoVZBBHGBCpDK9";

export function buildWhatsAppUrl(
  message: string,
  number: string = WHATSAPP_NUMBER_PLACEHOLDER,
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
