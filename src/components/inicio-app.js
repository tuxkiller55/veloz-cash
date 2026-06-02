import { LitElement, html } from 'lit';
import logoUrl from '../assets/logoNuevo2.png';
import { defaultWhatsappMessage } from '../data/site.js';
import { renderWhatsappAnchors } from '../utils/commerce.js';
import { sharedStyles } from './shared-styles.js';

class InicioApp extends LitElement {
  static styles = [sharedStyles];

  render() {
    return html`
      <section class="container hero">
        <div>
          <p class="eyebrow">Credito, equipos y alivio rapido</p>
          <h1>Estrena hoy, paga con calma.</h1>
          <p class="hero-copy">
            VelozCash combina creditos personalizados, celulares y bicicletas electricas con pagos claros,
            atencion humana y cotizaciones rapidas por WhatsApp.
          </p>

          <div class="actions">
            <button class="button primary" type="button" @click=${() => this.navigate('phones')}>
              Ver celulares
            </button>
            ${renderWhatsappAnchors(html, defaultWhatsappMessage, 'ghost')}
          </div>
        </div>

        <div class="hero-panel">
          <div class="hero-banner">
            <img src=${logoUrl} alt="VelozCash - Siempre al alcance de tu mano" />
          </div>
          <p class="eyebrow">Promociones VelozCash</p>
          <div class="promo-grid">
            <div class="promo-tile">
              <strong>Celulares a credito</strong>
              <span>13, 26 o 39 semanas</span>
            </div>
            <div class="promo-tile">
              <strong>Bicicletas electricas</strong>
              <span>Movilidad sin pagar todo de golpe</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  navigate(view) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: view, bubbles: true, composed: true }));
  }
}

customElements.define('inicio-app', InicioApp);
