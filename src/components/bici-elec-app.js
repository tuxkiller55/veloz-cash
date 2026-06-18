import { LitElement, css, html } from 'lit';
import { electricBikes } from '../data/electric-bikes.js';
import {
  calculateBikeQuote,
  displayProductPrice,
  formatMoney,
  renderWhatsappAnchors,
} from '../utils/commerce.js';
import { sharedStyles } from './shared-styles.js';

const bikeTerms = [13, 26];

class BiciElecApp extends LitElement {
  static properties = {
    selectedProductId: { type: String },
    selectedTerm: { type: Number },
    selectedMediaIndex: { type: Number },
  };

  constructor() {
    super();
    this.selectedProductId = '';
    this.selectedTerm = 13;
    this.selectedMediaIndex = 0;
  }

  static styles = [
    sharedStyles,
    css`
      .bike-gallery {
        display: grid;
        gap: 0.8rem;
        margin-bottom: 1.25rem;
      }

      .gallery-stage {
        display: grid;
        place-items: center;
        min-height: 360px;
        border: 1px solid rgba(32, 18, 18, 0.1);
        border-radius: 8px;
        background: white;
        overflow: hidden;
        padding: 1rem;
      }

      .gallery-stage img,
      .gallery-stage video {
        width: 100%;
        max-height: 460px;
        object-fit: contain;
      }

      .gallery-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
      }

      .gallery-thumbnails {
        display: flex;
        flex: 1;
        gap: 0.5rem;
        overflow-x: auto;
      }

      .gallery-thumbnail {
        width: 64px;
        height: 64px;
        flex: 0 0 auto;
        border: 2px solid transparent;
        border-radius: 8px;
        background: white;
        padding: 0.2rem;
        cursor: pointer;
      }

      .gallery-thumbnail[aria-pressed='true'] {
        border-color: var(--color-red);
      }

      .gallery-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

    `,
  ];

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
            Conoce nuestra bicicleta electrica y elige pagos semanales a 13 o 26 semanas.
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
    const quote = calculateBikeQuote(product, this.selectedTerm);

    return html`
      <section class="container view product-layout">
        <article class="detail-card">
          <button class="button ghost" type="button" @click=${this.closeProduct}>Volver a bicicletas</button>
          ${this.renderGallery(product)}
          <p class="eyebrow">Bicicleta electrica financiada</p>
          <h2>${displayProductPrice(product)}</h2>
          <h3>${product.name}</h3>
          <p>${product.specs}</p>
          <ul class="restriction-list">
            <li>Enganche fijo de ${formatMoney(quote.downPayment)}.</li>
            <li>Pagos semanales con total definido desde el inicio.</li>
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
            <div class="result-row">
              <span>PRECIO TOTAL</span>
              <strong>${formatMoney(quote.totalToPay)}</strong>
            </div>
          </div>

          <div class="term-grid">
            ${bikeTerms.map(
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

          <p class="note">Cotizacion informativa sujeta a disponibilidad, validacion y condiciones firmadas.</p>
          <div class="actions">${renderWhatsappAnchors(html, this.productWhatsappMessage(product), 'primary')}</div>
        </aside>
      </section>
    `;
  }

  renderGallery(product) {
    const media = product.media?.length
      ? product.media
      : [{ type: 'image', src: product.image, alt: product.name }];
    const selected = media[this.selectedMediaIndex] ?? media[0];

    return html`
      <div class="bike-gallery">
        <div class="gallery-stage">
          ${selected.type === 'video'
            ? html`<video src=${selected.src} poster=${selected.poster ?? product.image} controls playsinline preload="metadata"></video>`
            : html`<img src=${selected.src} alt=${selected.alt ?? product.name} />`}
        </div>

        ${media.length > 1
          ? html`
              <div class="gallery-controls">
                <button class="button ghost" type="button" @click=${() => this.changeMedia(-1)} aria-label="Anterior">
                  &larr;
                </button>
                <div class="gallery-thumbnails">
                  ${media.map(
                    (item, index) => html`
                      <button
                        class="gallery-thumbnail"
                        type="button"
                        aria-label=${item.type === 'video' ? 'Ver video' : `Ver imagen ${index + 1}`}
                        aria-pressed=${this.selectedMediaIndex === index ? 'true' : 'false'}
                        @click=${() => (this.selectedMediaIndex = index)}
                      >
                        ${item.type === 'video'
                          ? html`<span aria-hidden="true">▶ Video</span>`
                          : html`<img src=${item.src} alt="" />`}
                      </button>
                    `
                  )}
                </div>
                <button class="button ghost" type="button" @click=${() => this.changeMedia(1)} aria-label="Siguiente">
                  &rarr;
                </button>
              </div>
            `
          : ''}
      </div>
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
    this.selectedTerm = 13;
    this.selectedMediaIndex = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeProduct = () => {
    this.selectedProductId = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  changeMedia(direction) {
    const mediaLength = this.selectedProduct.media?.length ?? 1;
    this.selectedMediaIndex = (this.selectedMediaIndex + direction + mediaLength) % mediaLength;
  }

  productWhatsappMessage(product) {
    return `Hola VelozCash, quiero cotizar ${product.name} de ${displayProductPrice(product)}.`;
  }
}

customElements.define('bici-elec-app', BiciElecApp);
