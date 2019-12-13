const progress_circle_proto = Object.create(HTMLElement.prototype);

const progress_circle = document.customElements.define("progress-circle", {
    prototype: progress_circle_proto
});
