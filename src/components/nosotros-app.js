import { LitElement, html } from 'lit';
import { sharedStyles } from './shared-styles.js';

class NosotrosApp extends LitElement {
  static styles = [sharedStyles];

  render() {
    return html`
      <section class="container view">
        <div class="section-heading">
          <p class="eyebrow">Sobre nosotros</p>
          <h2>Credito rapido, humano y siempre al alcance.</h2>
          <p>
            VelozCash nace para apoyar a personas que necesitan resolver una urgencia, estrenar un equipo,
            creditos personalizados o financiar movilidad sin pasar por procesos frios, lentos o confusos.
          </p>
        </div>
        <div class="card-grid">
          ${this.renderInfoCard('Atencion cercana', 'Explicamos cada paso con lenguaje claro, sin vueltas y con trato humano.')}
          ${this.renderInfoCard('Soluciones flexibles', 'Ofrecemos creditos personalizados, celulares y bicicletas electricas con cotizaciones sencillas.')}
          ${this.renderInfoCard('Compromiso claro', 'Antes de aceptar, el cliente conoce monto, enganche, plazo, interes y pago estimado.')}
        </div>
      </section>
    `;
  }

  renderInfoCard(title, text) {
    return html`
      <article class="card">
        <h3>${title}</h3>
        <p>${text}</p>
      </article>
    `;
  }
}

customElements.define('nosotros-app', NosotrosApp);
