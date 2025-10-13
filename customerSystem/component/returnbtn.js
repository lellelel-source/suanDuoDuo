/**
 * ReturnButton Component
 * Renders a 'Return to' link with a back arrow.
 * @class ReturnButton
 */
class ReturnButton {
    /**
     * @param {Object} config - Configuration object.
     * @param {string} config.text - The text to display next to the arrow.
     * @param {string} config.href - The URL to link to.
     */
    constructor(config) {
        this.text = config.text || '返回';
        this.href = config.href || '#';
    }

    /**
     * Generates the HTML for the return button.
     * @returns {string} The HTML string for the button.
     */
    render() {
        return `
            <a href="${this.href}" class="inline-flex items-center text-slate-700 hover:text-primary text-lg font-semibold">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 18l-6-6m0 0l6-6m-6 6h12"></path></svg>
                ${this.text}
            </a>
        `;
    }
}

// Export for use in other files
window.ReturnButton = ReturnButton;
