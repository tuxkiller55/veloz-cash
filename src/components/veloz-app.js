import { LitElement, html } from 'lit';
import logoUrl from '../assets/logoNuevo2.png';
import markUrl from '../assets/velozcash-mark.svg';
import { defaultWhatsappMessage, navItems } from '../data/site.js';
import { renderWhatsappAnchors } from '../utils/commerce.js';
import { sharedStyles } from './shared-styles.js';
import './inicio-app.js';
import './celulares-app.js';
import './bici-elec-app.js';
import './nosotros-app.js';

class VelozApp extends LitElement {
  static properties = {
    activeView: { type: String },
    menuOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.activeView = 'welcome';
    this.menuOpen = false;
  }

  static styles = [sharedStyles];

  render() {
    return html`
      <main class="site-shell">
        ${this.renderHeader()}
        ${this.renderActiveView()}
        ${this.renderFooterCta()}
        ${this.renderFooter()}
      </main>
    `;
  }

  renderHeader() {
    return html`
      <header>
        <div class="container nav">
          <button class="brand" type="button" aria-label="VelozCash inicio" @click=${() => this.setView('welcome')}>
            <img src=${logoUrl} alt="VelozCash" />
          </button>

          <button
            class="menu-button"
            type="button"
            aria-label="Abrir menu"
            @click=${() => (this.menuOpen = !this.menuOpen)}
          >
            <span></span>
          </button>

          <nav data-open=${this.menuOpen ? 'true' : 'false'}>
            ${navItems.map(
              (item) => html`
                <button
                  type="button"
                  aria-current=${this.activeView === item.id ? 'page' : 'false'}
                  @click=${() => this.setView(item.id)}
                >
                  ${item.label}
                </button>
              `
            )}
          </nav>
        </div>
      </header>
    `;
  }

  renderActiveView() {
    if (this.activeView === 'phones') return html`<celulares-app></celulares-app>`;
    if (this.activeView === 'bikes') return html`<bici-elec-app></bici-elec-app>`;
    if (this.activeView === 'about') return html`<nosotros-app></nosotros-app>`;

    return html`<inicio-app @navigate=${(event) => this.setView(event.detail)}></inicio-app>`;
  }

  renderFooterCta() {
    return html`
      <section class="footer-cta">
        <div class="container">
          <div>
            <h2>VelozCash, siempre al alcance de tu mano.</h2>
            <p>Creditos personalizados, celulares y movilidad con una experiencia clara y personalizada.</p>
          </div>
          <div class="actions">
            ${renderWhatsappAnchors(html, defaultWhatsappMessage, 'yellow')}
          </div>
        </div>
      </section>
    `;
  }

  renderFooter() {
    return html`
      <footer>
        <div class="container footer-content">
          <span><img src=${markUrl} alt="" width="26" height="26" /> VelozCash</span>
          <span>Propuesta visual rojo + amarillo</span>
        </div>
      </footer>
    `;
  }

  setView(view) {
    this.activeView = view;
    this.menuOpen = false;
    window.history.replaceState(null, '', view === 'welcome' ? '/' : `#${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

customElements.define('veloz-app', VelozApp);
