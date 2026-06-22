import { css } from 'lit';

export const sharedStyles = css`
    :host {
      display: block;
      color: var(--color-ink);
      font-family: var(--font-body);
    }

    .site-shell {
      min-height: 100vh;
      background:
        linear-gradient(135deg, rgba(255, 197, 48, 0.18) 0 25%, transparent 25% 50%),
        linear-gradient(180deg, #fff8e6 0%, #fffdf8 45%, #ffffff 100%);
      background-size: 30px 30px, auto;
    }

    .container {
      width: min(1160px, calc(100% - 2rem));
      margin-inline: auto;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 20;
      border-bottom: 1px solid rgba(32, 18, 18, 0.1);
      background: rgba(255, 248, 230, 0.9);
      backdrop-filter: blur(16px);
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      min-height: 76px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      border: 0;
      background: transparent;
      cursor: pointer;
    }

    .brand img {
      width: min(240px, 52vw);
      height: auto;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }

    nav button,
    .menu-button,
    .button,
    .chip,
    .product-card,
    .term-button {
      font: inherit;
    }

    nav button {
      border: 0;
      background: transparent;
      color: rgba(32, 18, 18, 0.72);
      font-size: 0.94rem;
      font-weight: 850;
      cursor: pointer;
    }

    nav button[aria-current='page'] {
      color: var(--color-red);
    }

    .menu-button {
      display: none;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 999px;
      background: var(--color-red);
      color: white;
      cursor: pointer;
    }

    .menu-button span,
    .menu-button::before,
    .menu-button::after {
      display: block;
      width: 18px;
      height: 2px;
      margin: 4px auto;
      border-radius: 999px;
      background: currentColor;
      content: '';
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1,
    h2,
    h3 {
      font-family: var(--font-title);
      letter-spacing: 0;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
      align-items: center;
      gap: clamp(2rem, 6vw, 5rem);
      min-height: calc(100vh - 76px);
      padding-block: clamp(2.5rem, 7vw, 6rem);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      margin-bottom: 1rem;
      color: var(--color-red);
      font-weight: 950;
    }

    .eyebrow::before {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--color-yellow);
      content: '';
    }

    h1 {
      max-width: 12ch;
      margin-bottom: 1rem;
      color: var(--color-red);
      font-size: clamp(3.1rem, 8vw, 6.5rem);
      line-height: 0.92;
    }

    .hero-copy,
    .section-heading p,
    .card p,
    .product-copy,
    .note {
      color: rgba(32, 18, 18, 0.68);
      line-height: 1.62;
    }

    .hero-copy {
      max-width: 38rem;
      font-size: clamp(1.08rem, 2vw, 1.28rem);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      margin-top: 2rem;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      min-height: 52px;
      border: 2px solid transparent;
      border-radius: 999px;
      padding: 0 1.25rem;
      font-weight: 950;
      text-decoration: none;
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease;
    }

    .button:hover {
      transform: translateY(-2px);
    }

    .button.primary {
      background: var(--color-red);
      color: white;
      box-shadow: 0 16px 36px rgba(216, 44, 44, 0.25);
    }

    .button.yellow {
      background: var(--color-yellow);
      color: #271515;
      box-shadow: 0 16px 36px rgba(255, 197, 48, 0.36);
    }

    .button.ghost {
      border-color: rgba(32, 18, 18, 0.14);
      background: rgba(255, 255, 255, 0.7);
      color: var(--color-ink);
    }

    .whatsapp-icon {
      width: 1.35rem;
      height: 1.35rem;
      flex: 0 0 auto;
      fill: currentColor;
    }

    .hero-panel,
    .card,
    .calculator,
    .product-card {
      border: 1px solid rgba(32, 18, 18, 0.1);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.92);
      box-shadow: 0 20px 54px rgba(32, 18, 18, 0.08);
    }

    .hero-panel {
      display: grid;
      gap: 1rem;
      padding: clamp(1.2rem, 3vw, 2rem);
    }

    .hero-banner {
      display: grid;
      place-items: center;
      min-height: clamp(260px, 38vw, 440px);
      border-radius: 8px;
      background:
        radial-gradient(circle at 78% 20%, rgba(255, 197, 48, 0.28), transparent 10rem),
        linear-gradient(135deg, #120909, #2b1212 54%, #5f1515);
      overflow: hidden;
      padding: clamp(1.2rem, 4vw, 2.5rem);
    }

    .hero-banner img {
      width: min(100%, 680px);
      filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.28));
    }

    .promo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .promo-tile {
      min-height: 150px;
      border-radius: 8px;
      background:
        radial-gradient(circle at 75% 20%, rgba(255, 197, 48, 0.55), transparent 4rem),
        linear-gradient(135deg, var(--color-red), #8f1717);
      color: white;
      padding: 1rem;
    }

    .promo-tile:nth-child(2) {
      background:
        radial-gradient(circle at 78% 18%, rgba(216, 44, 44, 0.28), transparent 4rem),
        linear-gradient(135deg, var(--color-yellow), #ffdc68);
      color: #291616;
    }

    .promo-tile strong {
      display: block;
      font-family: var(--font-title);
      font-size: 1.35rem;
      line-height: 1.1;
    }

    .promo-tile span {
      display: block;
      margin-top: 0.45rem;
      font-weight: 800;
      opacity: 0.84;
    }

    .view {
      min-height: calc(100vh - 76px);
      padding-block: clamp(3rem, 7vw, 6rem);
    }

    .section-heading {
      max-width: 760px;
      margin-bottom: clamp(1.5rem, 4vw, 3rem);
    }

    .section-heading h2 {
      margin-bottom: 0.8rem;
      color: var(--color-red);
      font-size: clamp(2.1rem, 5vw, 4rem);
      line-height: 1;
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .catalog-layout {
      display: grid;
      grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.15fr);
      gap: clamp(1.5rem, 5vw, 3rem);
      align-items: start;
    }

    .filter-panel {
      position: sticky;
      top: 96px;
      display: grid;
      gap: 1.5rem;
      border: 1px solid rgba(32, 18, 18, 0.08);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 20px 54px rgba(32, 18, 18, 0.08);
      padding: clamp(1rem, 2vw, 1.5rem);
    }

    .filter-group h3 {
      margin-bottom: 0.8rem;
      color: rgba(32, 18, 18, 0.82);
      font-size: 1.15rem;
    }

    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
    }

    .filter-chip {
      min-height: 44px;
      border: 1px solid rgba(32, 18, 18, 0.16);
      border-radius: 8px;
      background: white;
      color: rgba(32, 18, 18, 0.76);
      padding: 0 0.85rem;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }

    .filter-chip[aria-pressed='true'] {
      border-color: var(--color-red);
      background: rgba(216, 44, 44, 0.08);
      color: var(--color-red);
      box-shadow: inset 0 0 0 1px var(--color-red);
    }

    .catalog-results {
      display: grid;
      gap: 1.25rem;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      min-height: 58px;
      border: 1px solid rgba(32, 18, 18, 0.12);
      border-radius: 999px;
      background: white;
      padding: 0 1rem;
      box-shadow: 0 14px 34px rgba(32, 18, 18, 0.06);
    }

    .search-box span {
      color: var(--color-red);
      font-size: 1.45rem;
      line-height: 1;
    }

    .search-box input {
      width: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--color-ink);
      font: inherit;
      font-weight: 750;
    }

    .result-count {
      margin: 0;
      color: rgba(32, 18, 18, 0.56);
      font-size: 1rem;
      font-weight: 800;
    }

    .empty-state {
      border: 1px solid rgba(32, 18, 18, 0.1);
      border-radius: 8px;
      background: white;
      padding: 2rem;
      color: rgba(32, 18, 18, 0.68);
      font-weight: 800;
    }

    .product-card {
      display: grid;
      gap: 1rem;
      padding: 1rem;
      text-align: left;
      cursor: pointer;
    }

    .product-art {
      display: grid;
      place-items: center;
      min-height: 220px;
      border-radius: 8px;
      background:
        radial-gradient(circle at 72% 20%, rgba(255, 197, 48, 0.45), transparent 8rem),
        linear-gradient(135deg, rgba(216, 44, 44, 0.12), rgba(255, 197, 48, 0.14));
      overflow: hidden;
      padding: 1rem;
    }

    .product-image {
      width: 100%;
      max-width: 230px;
      height: 220px;
      object-fit: contain;
      filter: drop-shadow(0 16px 26px rgba(32, 18, 18, 0.18));
    }

    .phone-shape {
      width: 106px;
      aspect-ratio: 9 / 18;
      border: 8px solid #211313;
      border-radius: 24px;
      background: linear-gradient(160deg, var(--color-red), #531313);
      box-shadow: 0 22px 38px rgba(32, 18, 18, 0.22);
    }

    .bike-shape {
      position: relative;
      width: 180px;
      height: 110px;
    }

    .bike-shape::before,
    .bike-shape::after {
      position: absolute;
      bottom: 0;
      width: 62px;
      height: 62px;
      border: 8px solid var(--color-red);
      border-radius: 999px;
      content: '';
    }

    .bike-shape::before {
      left: 0;
    }

    .bike-shape::after {
      right: 0;
    }

    .bike-frame {
      position: absolute;
      inset: 28px 36px 32px;
      border: 8px solid #211313;
      border-top: 0;
      transform: skewX(-18deg);
    }

    .product-card h3 {
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }

    .price {
      color: var(--color-red);
      font-family: var(--font-title);
      font-size: 1.9rem;
      font-weight: 950;
      line-height: 1;
    }

    .badge {
      display: inline-flex;
      width: fit-content;
      border-radius: 999px;
      background: rgba(255, 197, 48, 0.28);
      padding: 0.35rem 0.7rem;
      color: #5e2c00;
      font-size: 0.8rem;
      font-weight: 950;
    }

    .product-layout,
    .loan-layout,
    .custom-credit-layout {
      display: grid;
      grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1.1fr);
      gap: clamp(1.5rem, 5vw, 4rem);
      align-items: start;
    }

    .detail-card,
    .calculator {
      padding: clamp(1.15rem, 3vw, 2rem);
    }

    .detail-card {
      border-radius: 8px;
      background: #fff7df;
    }

    .detail-card h2 {
      margin: 0.5rem 0;
      color: var(--color-red);
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1;
    }

    .restriction-list {
      display: grid;
      gap: 0.65rem;
      margin: 1.25rem 0 0;
      padding: 0;
      list-style: none;
    }

    .restriction-list li {
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      gap: 0.55rem;
      color: rgba(32, 18, 18, 0.72);
      font-weight: 800;
      line-height: 1.45;
    }

    .restriction-list li::before {
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: 999px;
      background: var(--color-yellow);
      color: var(--color-red);
      content: '✓';
      font-weight: 950;
    }

    .calculator h3 {
      margin-bottom: 1.4rem;
      color: var(--color-ink);
      font-size: clamp(1.55rem, 4vw, 2.35rem);
      text-align: center;
    }

    .quote-guide {
      margin-bottom: 1.35rem;
      border: 1px solid rgba(216, 44, 44, 0.12);
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(255, 197, 48, 0.18), rgba(255, 255, 255, 0.82));
      padding: 1rem;
    }

    .quote-guide h4 {
      margin: 0 0 0.75rem;
      color: var(--color-red);
      font-family: var(--font-title);
      font-size: 1.08rem;
      letter-spacing: 0;
    }

    .quote-guide ol {
      display: grid;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: quoteSteps;
    }

    .quote-guide li {
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 0.6rem;
      align-items: center;
      color: rgba(32, 18, 18, 0.76);
      font-weight: 800;
      line-height: 1.35;
      counter-increment: quoteSteps;
    }

    .quote-guide li::before {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      background: var(--color-red);
      color: white;
      content: counter(quoteSteps);
      font-size: 0.9rem;
      font-weight: 950;
    }

    .quote-guide p {
      margin: 0.75rem 0 0;
      color: rgba(32, 18, 18, 0.68);
      font-size: 0.92rem;
      font-weight: 850;
    }

    .result-stack {
      display: grid;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .result-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      min-height: 66px;
      border-radius: 8px;
      background: #f4f1ec;
      padding: 0 1rem;
    }

    .result-row span {
      color: rgba(32, 18, 18, 0.62);
      font-weight: 950;
    }

    .result-row strong {
      color: var(--color-red);
      font-size: clamp(1.35rem, 4vw, 2rem);
      font-weight: 950;
    }

    .term-grid,
    .loan-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.7rem;
      margin-bottom: 1.25rem;
    }

    .term-button,
    .chip {
      min-height: 52px;
      border: 1px solid rgba(32, 18, 18, 0.14);
      border-radius: 8px;
      background: white;
      color: var(--color-red);
      font-weight: 900;
      cursor: pointer;
    }

    .term-button[aria-pressed='true'],
    .chip[aria-pressed='true'] {
      border-color: var(--color-red);
      background: rgba(216, 44, 44, 0.08);
      box-shadow: inset 0 0 0 1px var(--color-red);
    }

    .range-row {
      display: grid;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .range-heading {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      color: rgba(32, 18, 18, 0.76);
      font-weight: 950;
    }

    input[type='range'] {
      width: 100%;
      accent-color: var(--color-red);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.7rem;
      margin-bottom: 1rem;
    }

    .summary-pill {
      border: 1px solid rgba(32, 18, 18, 0.09);
      border-radius: 8px;
      background: #fff8e6;
      padding: 0.8rem;
    }

    .summary-pill span {
      display: block;
      margin-bottom: 0.2rem;
      color: rgba(32, 18, 18, 0.55);
      font-size: 0.78rem;
      font-weight: 950;
    }

    .summary-pill strong {
      color: var(--color-ink);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .card {
      padding: clamp(1.1rem, 2vw, 1.5rem);
    }

    .card h3 {
      margin-bottom: 0.45rem;
    }

    .footer-cta {
      padding-block: clamp(3rem, 7vw, 5rem);
      background: var(--color-red);
      color: white;
    }

    .footer-cta .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .footer-cta h2 {
      max-width: 640px;
      margin-bottom: 0.5rem;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1;
    }

    .footer-cta p {
      margin-bottom: 0;
      color: rgba(255, 255, 255, 0.78);
    }

    footer {
      padding: 2rem 0;
      background: #211313;
      color: rgba(255, 255, 255, 0.72);
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      font-weight: 800;
    }

    .footer-content span:first-child {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 920px) {
      .hero,
      .catalog-layout,
      .product-layout,
      .loan-layout,
      .custom-credit-layout {
        grid-template-columns: 1fr;
      }

      .catalog-grid,
      .card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .hero {
        min-height: auto;
      }

      .footer-cta .container {
        align-items: flex-start;
        flex-direction: column;
      }

      .filter-panel {
        position: static;
      }
    }

    @media (max-width: 720px) {
      .nav {
        min-height: 68px;
      }

      .brand img {
        width: min(190px, 60vw);
      }

      .menu-button {
        display: block;
      }

      nav {
        position: absolute;
        inset: 68px 1rem auto;
        display: grid;
        border: 1px solid rgba(32, 18, 18, 0.1);
        border-radius: 8px;
        background: white;
        padding: 0.8rem;
        box-shadow: 0 18px 40px rgba(32, 18, 18, 0.16);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-10px);
        transition: opacity 160ms ease, transform 160ms ease;
      }

      nav[data-open='true'] {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      nav button {
        padding: 0.75rem;
        text-align: left;
      }

      .actions,
      .button {
        width: 100%;
      }

      .button {
        padding-inline: 1rem;
      }

      .catalog-grid,
      .card-grid,
      .term-grid,
      .loan-grid,
      .summary-grid {
        grid-template-columns: 1fr;
      }

      .promo-grid {
        grid-template-columns: 1fr;
      }

      .result-row {
        align-items: flex-start;
        flex-direction: column;
        padding-block: 1rem;
      }

      .footer-content {
        align-items: flex-start;
        flex-direction: column;
      }
    }
`;
