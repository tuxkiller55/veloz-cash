import { LitElement, html } from 'lit';
import { electricBikes } from '../data/electric-bikes.js';
import {
  calculateProductQuote,
  displayProductPrice,
  formatMoney,
  monthlyInterestRate,
  productTerms,
  renderWhatsappAnchors,
} from '../utils/commerce.js';
import { sharedStyles } from './shared-styles.js';

class BiciElecApp extends LitElement {
  static properties = {
    selectedProductId: { type: String },
    selectedTerm: { type: Number },
    downPaymentPercent: { type: Number },
  };

  constructor() {
    super();
    this.selectedProductId = '';
    this.selectedTerm = 26;
    this.downPaymentPercent = 20;
  }

  static styles = [sharedStyles];

  render() {
    return this.selectedProductId ? this.renderProductDetail() : this.renderCatalog();
  }

  renderCatalog() {
    return html`
      <section class="container view">
        <div class="section-heading">
          <p class="eyebrow">Bicicletas electricas</p>
          <h2>Muevete mejor con pagos semanales.</h2>
          <p>
            Selecciona una bicicleta electrica para ver su cotizacion con enganche.
          </p>
        </div>

        <div class="catalog-grid">
          ${this.bikes.map((product) => this.renderProductCard(product))}
        </div>
      </section>
    `;
  }

  renderProductCard(product) {
    return html`
      <button class="product-card" type="button" @click=${() => this.openProduct(product.id)}>
        <div class="product-art" aria-hidden="true">
          ${product.image
            ? html`<img class="product-image" src=${product.image} alt="" />`
            : html`<div class="bike-shape"><span class="bike-frame"></span></div>`}
        </div>
        <span class="badge">${product.badge}</span>
        <div>
          <h3>${product.name}</h3>
          <p class="product-copy">${product.specs}</p>
        </div>
        <div class="price">${displayProductPrice(product)}</div>
      </button>
    `;
  }

  renderProductDetail() {
    const product = this.selectedProduct;
    const quote = calculateProductQuote(product, this.downPaymentPercent, this.selectedTerm);

    return html`
      <section class="container view product-layout">
        <article class="detail-card">
          <button class="button ghost" type="button" @click=${this.closeProduct}>Volver a bicicletas</button>
          <p class="eyebrow">Bicicleta electrica financiada</p>
          <h2>${displayProductPrice(product)}</h2>
          <h3>${product.name}</h3>
          <p>${product.specs}</p>
          <ul class="restriction-list">
            <li>Pagos semanales con enganche configurable.</li>
            <li>Entrega y resguardo documental segun validacion del cliente.</li>
          </ul>
        </article>

        <aside class="calculator">
          <h3>Cotiza aqui</h3>
          <div class="result-stack">
            <div class="result-row">
              <span>ENGANCHE</span>
              <strong>${formatMoney(quote.downPayment)}</strong>
            </div>
            <div class="result-row">
              <span>PAGO SEMANAL</span>
              <strong>${formatMoney(quote.weeklyPayment)}</strong>
            </div>
          </div>

          <div class="term-grid">
            ${productTerms.map(
              (term) => html`
                <button
                  class="term-button"
                  type="button"
                  aria-pressed=${this.selectedTerm === term ? 'true' : 'false'}
                  @click=${() => (this.selectedTerm = term)}
                >
                  ${term} semanas
                </button>
              `
            )}
          </div>

          <div class="range-row">
            <div class="range-heading">
              <span>Enganche ${this.downPaymentPercent}%</span>
              <strong>${formatMoney(quote.downPayment)}</strong>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              step="5"
              .value=${String(this.downPaymentPercent)}
              aria-label="Porcentaje de enganche"
              @input=${this.updateDownPayment}
            />
          </div>

          <p class="note">Cotizacion informativa sujeta a disponibilidad, validacion y condiciones firmadas.</p>
          <div class="actions">${renderWhatsappAnchors(html, this.productWhatsappMessage(product), 'primary')}</div>
        </aside>
      </section>
    `;
  }

  get bikes() {
    return electricBikes;
  }

  get selectedProduct() {
    return this.bikes.find((product) => product.id === this.selectedProductId) ?? this.bikes[0];
  }

  openProduct(productId) {
    this.selectedProductId = productId;
    this.selectedTerm = 26;
    this.downPaymentPercent = 20;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeProduct = () => {
    this.selectedProductId = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  updateDownPayment = (event) => {
    this.downPaymentPercent = Number(event.target.value);
  };

  productWhatsappMessage(product) {
    return `Hola VelozCash, quiero cotizar ${product.name} de ${displayProductPrice(product)}.`;
  }
}

customElements.define('bici-elec-app', BiciElecApp);
