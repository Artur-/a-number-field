import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';

document.head.appendChild(html`
  <dom-module id="number-field-text-field-theme" theme-for="vaadin-text-field">
  <template>
  <style>
  :host(.center5361) [part="value"] {
    text-align: center
  }
  </style>
  </template>
  </dom-module>
`.content);

/**
 * `a-number-field`
 * A number field with up/down buttons
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ANumberField extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-flex;
        --vaadin-text-field-default-width: 8em;
      }

      [part="text-field"] {
        flex: 1;
      }

      iron-icon {
        cursor: pointer;
        text-align: center;
      }

      iron-icon[disabled] {
        cursor: default;
        opacity: 0.1;
      }
      
    </style>
    <vaadin-text-field id="input" class="center5361" value="{{value}}" label="[[label]]" theme="center" pattern="\\d*" part="text-field" prevent-invalid-input="">
      <iron-icon slot="prefix" id="minus" icon="vaadin:minus" on-click="_minus" disabled$="[[_isLessOrEqual(value, min)]]"></iron-icon>
      <iron-icon slot="suffix" id="plus" icon="vaadin:plus" on-click="_plus" disabled$="[[_isGreaterOrEqual(value, max)]]"></iron-icon>
    </vaadin-text-field>
    `;
  }
  static get properties() {
    return {
      value: {
        type: Number,
        value: 1,
        notify: true
      },
      min: {
        type: Number,
        value: 0,
        notify: true,
        observer: '_boundaryChanged'
      },
      max: {
        type: Number,
        value: 100,
        notify: true,
        observer: '_boundaryChanged'
      },
      label: String
    };
  }
  ready() {
    super.ready();

    this.$.input.addEventListener("input", e => { 
      if (this.value == "") {
        this.value = 0;
      }
      if (this.value > this.max) {
        this.value = this.max;
      }
      if (this.value < this.min) {
        this.value = this.min;
      }
    });
  }
  
  _boundaryChanged() {
    if (this.value > this.max) {
      this.value = this.max;
    }
    if (this.value < this.min) {
      this.value = this.min;
    }
  }

  _plus() {
    if (this.value < this.max) {
      this.value++;
    }
  }

  _minus() {
    if (this.value > this.min) {
      this.value--;
    }
  }

  _isGreaterOrEqual(value, boundary) {
    return value >= boundary;
  }

  _isLessOrEqual(value, boundary) {
    return value <= boundary;
  }
}

window.customElements.define('a-number-field', ANumberField);
