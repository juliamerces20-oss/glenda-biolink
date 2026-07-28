export const WHATSAPP_NUMBER_PLACEHOLDER = "5521968893152";

export const AGENDA_LINK_PLACEHOLDER =
  "https://calendar.app.google/qnigoVZBBHGBCpDK9";

export function buildWhatsAppUrl(
  message: string,
  number: string = WHATSAPP_NUMBER_PLACEHOLDER,
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
