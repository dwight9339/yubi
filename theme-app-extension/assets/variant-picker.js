class variantPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.thumbnails = this.querySelectorAll(".variant-thumbnail");
    this.thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", this.setSelectedVariant);
    });
  }

  disconnectedCallback() {
    this.thumbnails.forEach((thumbnail) => {
      thumbnail.removeEventListener("click", this.setSelectedVariant);
    });
  }

  setSelectedVariant({ currentTarget }) {
    const { variantId } = currentTarget.dataset;
    // const url = `${window.location.pathname}?variant=${variantId}`;
    window.location.search = `?variant=${variantId}`;
  }
}

customElements.define("variant-picker", variantPicker);