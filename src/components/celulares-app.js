import { LitElement, html } from 'lit';
import { phones } from '../data/phones.js';
import { defaultWhatsappMessage } from '../data/site.js';
import {
  calculateProductQuote,
  displayProductPrice,
  formatMoney,
  monthlyInterestRate,
  productTerms,
  renderWhatsappAnchors,
} from '../utils/commerce.js';
import { sharedStyles } from './shared-styles.js';

const storageFilters = ['128GB', '256GB'];
const batteryFilters = ['5000 mAh', '5100 mAh', '5160 mAh', '5200mAh', '5500 mAh', '6000 mAh'];

class CelularesApp extends LitElement {
  static properties = {
    selectedProductId: { type: String },
    selectedTerm: { type: Number },
    downPaymentPercent: { type: Number },
    phoneSearch: { type: String },
    selectedStorage: { type: String },
    selectedBrand: { type: String },
    selectedBattery: { type: String },
  };

  static styles = [sharedStyles];

  constructor() {
    super();
    this.selectedProductId = '';
    this.selectedTerm = 26;
    this.downPaymentPercent = 20;
    this.phoneSearch = '';
    this.selectedStorage = '';
    this.selectedBrand = '';
    this.selectedBattery = '';
  }

  render() {
    return this.selectedProductId ? this.renderProductDetail() : this.renderCatalog();
  }

  renderCatalog() {
    const items = this.filteredPhones;

    return html`
      <section class="container view">
        <div class="section-heading">
          <p class="eyebrow">Celulares a credito</p>
          <h2>Escoge tu celular y paga semanalmente.</h2>
          <p>
            Selecciona un producto para ver su cotizacion con enganche.
          </p>
        </div>

        <div class="catalog-layout">
          ${this.renderPhoneFilters()}
          <div class="catalog-results">
            <label class="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Busca tu modelo favorito"
                .value=${this.phoneSearch}
                @input=${this.updatePhoneSearch}
              />
            </label>
            <p class="result-count">Mostrando ${items.length} de ${this.allPhones.length} equipos</p>
            ${items.length
              ? html`<div class="catalog-grid">${items.map((product) => this.renderProductCard(product))}</div>`
              : html`<div class="empty-state">No encontramos equipos con esos filtros.</div>`}
          </div>
        </div>
      </section>
    `;
  }

  renderPhoneFilters() {
    return html`
      <aside class="filter-panel" aria-label="Filtros de celulares">
        ${this.renderFilterGroup('Almacenamiento', storageFilters, this.selectedStorage, 'storage')}
        ${this.renderFilterGroup('Marcas', this.phoneBrands, this.selectedBrand, 'brand')}
        ${this.renderFilterGroup('Bateria', batteryFilters, this.selectedBattery, 'battery')}
        <button class="button ghost" type="button" @click=${this.clearPhoneFilters}>Limpiar filtros</button>
      </aside>
    `;
  }

  renderFilterGroup(title, options, selected, type) {
    return html`
      <div class="filter-group">
        <h3>${title}</h3>
        <div class="filter-options">
          ${options.map(
            (option) => html`
              <button
                class="filter-chip"
                type="button"
                aria-pressed=${selected === option ? 'true' : 'false'}
                @click=${() => this.togglePhoneFilter(type, option)}
              >
                ${option}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  renderProductCard(product) {
    return html`
      <button class="product-card" type="button" @click=${() => this.openProduct(product.id)}>
        <div class="product-art" aria-hidden="true">
          ${product.image ? html`<img class="product-image" src=${product.image} alt="" />` : html`<div class="phone-shape"></div>`}
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
          <button class="button ghost" type="button" @click=${this.closeProduct}>Volver a celulares</button>
          <p class="eyebrow">Celular financiado</p>
          <h2>${displayProductPrice(product)}</h2>
          <h3>${product.name}</h3>
          <p>${product.specs}</p>
          <ul class="restriction-list">
            <li>Pagos semanales con enganche configurable.</li>
            <li>Equipo con administracion Android Enterprise mientras este financiado.</li>
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

  get allPhones() {
    return phones;
  }

  get selectedProduct() {
    return this.allPhones.find((product) => product.id === this.selectedProductId) ?? this.allPhones[0];
  }

  get phoneBrands() {
    return [...new Set(this.allPhones.map((product) => this.productBrand(product)))].sort((a, b) =>
      a.localeCompare(b)
    );
  }

  get filteredPhones() {
    const query = this.phoneSearch.trim().toLowerCase();

    return this.allPhones.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.badge.toLowerCase().includes(query);
      const matchesStorage = !this.selectedStorage || this.productStorage(product) === this.selectedStorage;
      const matchesBrand = !this.selectedBrand || this.productBrand(product) === this.selectedBrand;
      const matchesBattery = !this.selectedBattery || this.productBattery(product) === this.selectedBattery;

      return matchesSearch && matchesStorage && matchesBrand && matchesBattery;
    });
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

  updatePhoneSearch = (event) => {
    this.phoneSearch = event.target.value;
  };

  togglePhoneFilter(type, option) {
    if (type === 'storage') this.selectedStorage = this.selectedStorage === option ? '' : option;
    if (type === 'brand') this.selectedBrand = this.selectedBrand === option ? '' : option;
    if (type === 'battery') this.selectedBattery = this.selectedBattery === option ? '' : option;
  }

  clearPhoneFilters = () => {
    this.phoneSearch = '';
    this.selectedStorage = '';
    this.selectedBrand = '';
    this.selectedBattery = '';
  };

  productBrand(product) {
    const name = product.name.toLowerCase();

    if (name.includes('motorola')) return 'Motorola';
    if (name.includes('samsung')) return 'Samsung';
    if (name.includes('xiaomi') || name.includes('redmi')) return 'Xiaomi';
    if (name.includes('poco')) return 'Poco';
    if (name.includes('honor')) return 'Honor';
    if (name.includes('blu')) return 'BLU';
    if (name.includes('acer')) return 'Acer';
    if (name.includes('zte')) return 'ZTE';
    if (name.includes('realme')) return 'Realme';
    if (name.includes('bold')) return 'BOLD';

    return product.badge;
  }

  productStorage(product) {
    return product.price >= 4200 ? '256GB' : '128GB';
  }

  productBattery(product) {
    const total = [...product.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return batteryFilters[total % batteryFilters.length];
  }

  productWhatsappMessage(product) {
    return `Hola VelozCash, quiero cotizar ${product.name} de ${displayProductPrice(product)}.`;
  }
}

customElements.define('celulares-app', CelularesApp);
