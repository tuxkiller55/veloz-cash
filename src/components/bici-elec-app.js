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
    zoomOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.selectedProductId = '';
    this.selectedTerm = 13;
    this.selectedMediaIndex = 0;
    this.zoomOpen = false;
  }

  static styles = [
    sharedStyles,
    css`
      .bike-gallery {
        display: grid;
        gap: 0.65rem;
        margin-bottom: 0.9rem;
      }

      .bike-detail {
        padding-top: 1rem;
      }

      .detail-toolbar {
        display: flex;
        margin-bottom: 0.65rem;
      }

      .back-button,
      .zoom-button,
      .gallery-arrow,
      .zoom-close {
        display: inline-grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(32, 18, 18, 0.14);
        border-radius: 999px;
        background: white;
        color: var(--color-ink);
        font: inherit;
        font-size: 1.35rem;
        font-weight: 900;
        cursor: pointer;
      }

      .back-button:hover,
      .zoom-button:hover,
      .gallery-arrow:hover {
        border-color: var(--color-red);
        color: var(--color-red);
      }

      .gallery-stage {
        position: relative;
        display: grid;
        place-items: center;
        min-height: 260px;
        border: 1px solid rgba(32, 18, 18, 0.1);
        border-radius: 8px;
        background: white;
        overflow: hidden;
        padding: 1rem;
      }

      .gallery-stage img,
      .gallery-stage video {
        width: 100%;
        max-height: 340px;
        object-fit: contain;
      }

      .zoom-button {
        position: absolute;
        right: 0.7rem;
        bottom: 0.7rem;
        z-index: 1;
        box-shadow: 0 10px 24px rgba(32, 18, 18, 0.16);
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

      .credit-intro {
        margin-bottom: 1.25rem;
      }

      .credit-intro h3 {
        margin-bottom: 0.75rem;
        color: var(--color-red);
        font-size: clamp(1.2rem, 3vw, 1.55rem);
      }

      .credit-intro .restriction-list {
        margin-top: 0;
      }

      .calculator-disclaimer {
        margin: 1rem 0 0;
        color: rgba(32, 18, 18, 0.66);
        font-size: 0.76rem;
        font-weight: 850;
        line-height: 1.45;
      }

      .zoom-dialog {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: grid;
        place-items: center;
        border: 0;
        background: rgba(15, 10, 10, 0.88);
        padding: clamp(1rem, 4vw, 3rem);
      }

      .zoom-dialog img {
        width: auto;
        max-width: min(1100px, 94vw);
        max-height: 90vh;
        object-fit: contain;
      }

      .zoom-close {
        position: fixed;
        top: 1rem;
        right: 1rem;
        border-color: rgba(255, 255, 255, 0.35);
        background: rgba(255, 255, 255, 0.12);
        color: white;
      }

      @media (max-width: 720px) {
        .bike-detail {
          padding-top: 0.65rem;
        }

        .gallery-stage {
          min-height: 230px;
        }

        .gallery-stage img,
        .gallery-stage video {
          max-height: 300px;
        }
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
      <section class="container view bike-detail">
        <div class="detail-toolbar">
          <button class="back-button" type="button" @click=${this.closeProduct} aria-label="Volver a bicicletas" title="Volver a bicicletas">
            &larr;
          </button>
        </div>

        <div class="product-layout">
          <article class="detail-card">
            ${this.renderGallery(product)}
            <p class="eyebrow">Precio de contado</p>
            <h2>${displayProductPrice(product)}</h2>
            <h3>${product.name}</h3>
            <p>${product.specs}</p>
          </article>

          <aside class="calculator">
            <div class="credit-intro">
              <h3>O si lo prefieres, llevatela a credito</h3>
              <ul class="restriction-list">
                <li>Enganche fijo de ${formatMoney(quote.downPayment)}.</li>
                <li>Pagos semanales congelados durante el plazo elegido.</li>
                <li>Entrega inmediata.*</li>
              </ul>
            </div>

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
            <p class="calculator-disclaimer">
              *Sujeta a validacion, aprobacion y firma de la documentacion requerida.
            </p>
          </aside>
        </div>
      </section>
      ${this.renderZoom(product)}
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
            : html`
                <img src=${selected.src} alt=${selected.alt ?? product.name} />
                <button class="zoom-button" type="button" @click=${() => (this.zoomOpen = true)} aria-label="Ampliar imagen" title="Ampliar imagen">
                  +
                </button>
              `}
        </div>

        ${media.length > 1
          ? html`
              <div class="gallery-controls">
                <button class="gallery-arrow" type="button" @click=${() => this.changeMedia(-1)} aria-label="Anterior" title="Anterior">
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
                <button class="gallery-arrow" type="button" @click=${() => this.changeMedia(1)} aria-label="Siguiente" title="Siguiente">
                  &rarr;
                </button>
              </div>
            `
          : ''}
      </div>
    `;
  }

  renderZoom(product) {
    if (!this.zoomOpen) return '';

    const media = product.media?.length
      ? product.media
      : [{ type: 'image', src: product.image, alt: product.name }];
    const selected = media[this.selectedMediaIndex] ?? media[0];

    if (selected.type !== 'image') return '';

    return html`
      <div class="zoom-dialog" role="dialog" aria-modal="true" aria-label="Imagen ampliada" @click=${this.closeZoom}>
        <button class="zoom-close" type="button" @click=${this.closeZoom} aria-label="Cerrar zoom" title="Cerrar">
          &times;
        </button>
        <img src=${selected.src} alt=${selected.alt ?? product.name} @click=${(event) => event.stopPropagation()} />
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
    this.zoomOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeProduct = () => {
    this.selectedProductId = '';
    this.zoomOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  closeZoom = () => {
    this.zoomOpen = false;
  };

  changeMedia(direction) {
    const mediaLength = this.selectedProduct.media?.length ?? 1;
    this.selectedMediaIndex = (this.selectedMediaIndex + direction + mediaLength) % mediaLength;
    this.zoomOpen = false;
  }

  productWhatsappMessage(product) {
    return `Hola VelozCash, quiero cotizar ${product.name} de ${displayProductPrice(product)}.`;
  }
}

customElements.define('bici-elec-app', BiciElecApp);
