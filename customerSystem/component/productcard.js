/**
 * Product Card component for rendering a rich product tile similar to the design screenshot.
 * The component is framework-agnostic and returns a string of HTML, or can mount into a container.
 *
 * Usage example:
 * const card = new ProductCard({
 *   title: '燧原S60-8卡服务器',
 *   vendorName: '憨猴科技集团有限公司',
 *   thumbnailUrl: 'https://placehold.co/120x120/png',
 *   introItems: [
 *     { label: 'GPU', value: '8*S60' },
 *     { label: 'CPU', value: '2*Intel 6530' },
 *     { label: '内存', value: '512G' },
 *     { label: '计费', value: '按小时' },
 *     { label: '类型', value: '容器化训练推服' }
 *   ],
 *   scopeText: '适用范围: 容器化模型训练推服务 开通容器算力规格:【GPU】8*S60...',
 *   deliveryForm: '容器化',
 *   billing: '卡时',
 *   region: '全国',
 *   priceText: '¥0 起',
 *   trial: { label: '免费试用', href: '#' },
 *   buy: { label: '立即购买', href: 'bingxingIDC/build instant.html' }
 * });
 * container.insertAdjacentHTML('beforeend', card.render());
 *
 * @class ProductCard
 */
class ProductCard {
    /**
     * @param {Object} options - Product card configuration.
     * @param {string} options.title - Product title.
     * @param {string} [options.vendorName] - Vendor/company name to display.
     * @param {string} [options.vendorBadgeLabel='服务商'] - Badge text before vendor name.
     * @param {string} [options.thumbnailUrl] - Thumbnail image URL (square works best).
     * @param {Array<{label:string,value:string}>} [options.introItems] - Key/value intro items displayed as lines like 【键】 值.
     * @param {string} [options.scopeText] - Scope/description paragraph under intro.
     * @param {string} [options.deliveryForm] - 供应形态 value.
     * @param {string} [options.billing] - 计费方式 value.
     * @param {string} [options.region] - 地区 value.
     * @param {string} [options.priceText] - Price text shown in the footer left (e.g., '¥0 起').
     * @param {{label:string, href?:string}} [options.trial] - Left action (trial) config.
     * @param {{label:string, href?:string}} [options.buy] - Right action (buy) config.
     */
    constructor(options = {}) {
        /** @type {string} */
        this.title = options.title || '';
        /** @type {string} */
        this.vendorName = options.vendorName || '';
        /** @type {string} */
        this.vendorBadgeLabel = options.vendorBadgeLabel || '服务商';
        /** @type {string|undefined} */
        this.thumbnailUrl = options.thumbnailUrl;
        /** @type {Array<{label:string,value:string}>} */
        this.introItems = Array.isArray(options.introItems) ? options.introItems : [];
        /** @type {string} */
        this.scopeText = options.scopeText || '';
        /** @type {string} */
        this.deliveryForm = options.deliveryForm || '';
        /** @type {string} */
        this.billing = options.billing || '';
        /** @type {string} */
        this.region = options.region || '';
        /** @type {string} */
        this.priceText = options.priceText || '';
        /** @type {{label:string, href?:string}|undefined} */
        this.trial = options.trial;
        /** @type {{label:string, href?:string}|undefined} */
        this.buy = options.buy;
    }

    /**
     * Build the intro section text using bracketed labels.【键】 值 with line breaks.
     * @private
     * @returns {string}
     */
    buildIntroText() {
        if (!this.introItems.length) return '';
        return this.introItems.map(it => `【${it.label}】 ${it.value}`).join('\n');
    }

    /**
     * Get a small inline SVG icon.
     * @private
     * @param {'crown'|'gift'|'cart'} name
     * @param {string} className
     * @returns {string}
     */
    icon(name, className = 'w-4 h-4') {
        if (name === 'crown') {
            return `<svg class="${className}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 16l-2-9 5 4 4-6 4 6 5-4-2 9H5zm0 2h14v2H5v-2z"/></svg>`;
        }
        if (name === 'gift') {
            return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0H4m16 0V7a2 2 0 00-2-2h-3.5a1.5 1.5 0 110-3C16.33 2 18 3.67 18 5m-6 7V4m0 8H4m8 0h8"/></svg>`;
        }
        // cart
        return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293A1 1 0 005 17h12m0 0a2 2 0 110 4 2 2 0 010-4m-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
    }

    /**
     * Generate the HTML string for the card.
     * @returns {string}
     */
    render() {
        const introText = this.buildIntroText();
        const thumb = this.thumbnailUrl || 'https://placehold.co/120x120/eff6ff/1e40af?text=GPU';

        return `
        <div class="product-card h-full flex flex-col border rounded-lg bg-white shadow-sm">
            <div class="p-5 flex items-start">
                <div class="w-28 h-28 rounded overflow-hidden border bg-slate-50 flex items-center justify-center mr-4">
                    <img src="${thumb}" alt="thumb" class="w-full h-full object-cover"/>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-bold text-slate-900 truncate">${this.title}</h3>
                    <div class="mt-2 text-slate-600 text-sm flex items-center">
                        <span class="text-slate-400 mr-1">${this.icon('crown','w-4 h-4')}</span>
                        <span class="mr-2">${this.vendorBadgeLabel}</span>
                        <span class="font-medium text-slate-700 truncate">${this.vendorName || ''}</span>
                    </div>
                </div>
            </div>
            <div class="px-5 pb-5 flex-1 flex flex-col">
                ${introText ? `<div class="text-sm text-slate-700 whitespace-pre-line">${introText}</div>` : ''}
                ${this.scopeText ? `<div class="mt-3 text-sm text-slate-600 whitespace-pre-line">${this.scopeText}</div>` : ''}
                <div class="mt-auto">
                    <div class="border-t border-slate-200"></div>
                    <div class="mt-4 grid grid-cols-3 gap-2 text-sm text-slate-600">
                        <div class="truncate"><span class="text-slate-500">供应形态：</span><span>${this.deliveryForm || '-'}</span></div>
                        <div class="text-center truncate"><span class="text-slate-500">计费方式：</span><span>${this.billing || '-'}</span></div>
                        <div class="text-right truncate"><span class="text-slate-500">地区：</span><span>${this.region || '-'}</span></div>
                    </div>
                    <div class="pt-4 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            ${this.trial ? `<a ${this.trial.href ? `href="${this.trial.href}"` : ''} class="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium"><span class="mr-1">${this.icon('gift','w-4 h-4')}</span>${this.trial.label}</a>` : ''}
                            ${this.priceText ? `<div class="text-slate-900 font-semibold">${this.priceText}</div>` : ''}
                        </div>
                        ${this.buy ? `<a ${this.buy.href ? `href="${this.buy.href}"` : ''} class="inline-flex items-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded">${this.icon('cart','w-4 h-4 mr-1')}${this.buy.label}</a>` : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * Mount the card into a container element.
     * @param {HTMLElement} container - The container to append the card to.
     * @param {'beforeend'|'afterbegin'|'beforebegin'|'afterend'} [position='beforeend'] - Insert position.
     * @returns {HTMLElement|null} The created card element.
     */
    mount(container, position = 'beforeend') {
        if (!container) return null;
        container.insertAdjacentHTML(position, this.render());
        // Return the last child for convenience when using 'beforeend'
        if (position === 'beforeend') return container.lastElementChild;
        return null;
    }
}

// Export for global usage
window.ProductCard = ProductCard;


