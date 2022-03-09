class Ikon extends HTMLElement {
  static get observedAttributes() {
    return ['class', 'name'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const cn   = this.getAttribute('class');
    const name = this.getAttribute('name');


    const svg       = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgInner  = this.getSvgInner(name);
    const style     = document.createElement('style');
    const styleFill = this.getForcedColorsFill()

    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', cn);
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.appendChild(svgInner);

    style.textContent = `
svg {
  height: 100%;
  width: 100%;
}

@media (forced-colors: true) {
  .${cn} {
    fill: ${styleFill};
  }
}`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(svg);

  }

  getSvgInner(name) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    if (name === 'enlarge') {
      path.setAttribute('d', 'M 9 1 L 9 2 L 12.292969 2 L 2 12.292969 L 2 9 L 1 9 L 1 14 L 6 14 L 6 13 L 2.707031 13 L 13 2.707031 L 13 6 L 14 6 L 14 1 Z');
    } else if (name === 'compress') {
      path.setAttribute('d', 'M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z');
    }

    return path
  }

  getForcedColorsFill() {
    const parentTag = this.parentNode.tagName
    const grandparentTag = this.parentNode.parentNode.tagName

    return parentTag === 'BUTTON' || grandparentTag === 'BUTTON'
      ? 'ButtonText'
      : 'CanvasText'
  }
}

window.customElements.define('ik-on', Ikon);
