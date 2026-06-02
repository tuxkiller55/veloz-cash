import { whatsappContacts } from '../data/site.js';

export const productTerms = [13, 26, 39];
export const monthlyInterestRate = 0.16;
export const weeksPerMonth = 4.33;

export function formatMoney(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
}

export function displayProductPrice(product) {
  return product.priceLabel ?? formatMoney(product.price);
}

export function calculateProductQuote(product, downPaymentPercent, selectedTerm) {
  const downPayment = Math.round(product.price * (downPaymentPercent / 100));
  const financedAmount = product.price - downPayment;
  const months = selectedTerm / weeksPerMonth;
  const totalFinanced = financedAmount * (1 + monthlyInterestRate * months);
  const weeklyPayment = Math.ceil(totalFinanced / selectedTerm);
  const totalToPay = downPayment + weeklyPayment * selectedTerm;

  return { downPayment, financedAmount, weeklyPayment, totalToPay };
}

export function whatsappLink(phone, message) {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export function renderWhatsappAnchors(html, message, variant = 'primary') {
  return html`
    ${whatsappContacts.map(
      (contact) => html`
        <a class="button ${variant}" href=${whatsappLink(contact.phone, message)} target="_blank" rel="noreferrer">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12.04 3.4a8.48 8.48 0 0 0-7.25 12.87l-.92 3.37 3.45-.9a8.44 8.44 0 0 0 4.72 1.43h.01a8.39 8.39 0 0 0 5.98-2.48 8.46 8.46 0 0 0-5.99-14.29Zm4.98 13.28a7 7 0 0 1-4.97 2.06h-.01a6.98 6.98 0 0 1-3.93-1.2l-.28-.17-2.04.53.54-1.99-.18-.29a7.03 7.03 0 1 1 10.87 1.06Zm-1.53-2.01c-.19-.1-1.14-.56-1.31-.62-.18-.07-.31-.1-.44.1-.13.19-.5.62-.61.75-.11.13-.23.14-.42.05-.19-.1-.8-.3-1.53-.94-.57-.5-.95-1.12-1.06-1.31-.11-.2-.01-.3.08-.4.08-.08.19-.23.29-.34.1-.12.13-.2.19-.33.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.2-.68.67-.68 1.62 0 .95.7 1.88.8 2.01.1.13 1.37 2.08 3.31 2.92.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.14-.47 1.3-.92.16-.45.16-.84.11-.92-.05-.08-.18-.13-.37-.23Z"
            ></path>
          </svg>
          ${contact.label}
        </a>
      `
    )}
  `;
}
