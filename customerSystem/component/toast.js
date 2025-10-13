/**
 * Toast Notification Component for 算力多多 System
 * Provides reusable toast notifications with customizable messages and types
 * @class SuanduoToast
 */
class SuanduoToast {
    /**
     * Constructor for the toast component
     * @param {Object} config - Configuration object
     * @param {string} config.position - Position of toast ('top-center', 'top-right', 'bottom-center', 'bottom-right')
     * @param {number} config.duration - Duration in milliseconds (default: 3000)
     * @param {boolean} config.autoHide - Whether to auto-hide the toast (default: true)
     */
    constructor(config = {}) {
        this.position = config.position || 'top-center';
        this.duration = config.duration || 3000;
        this.autoHide = config.autoHide !== false;
        this.container = null;
        
        this.init();
    }

    /**
     * Initialize the toast container
     */
    init() {
        // Create toast container when DOM is ready
        const create = () => {
            this.container = document.getElementById('toast-container');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'toast-container';
                this.container.className = this.getContainerClasses();
                document.body.appendChild(this.container);
            } else {
                // Ensure correct classes in case position changed
                this.container.className = this.getContainerClasses();
            }
        };

        if (document.body) {
            create();
        } else {
            document.addEventListener('DOMContentLoaded', () => create(), { once: true });
        }

        // Add CSS styles if not already present
        this.addStyles();
    }

    /**
     * Get CSS classes for container based on position
     * @returns {string} CSS classes
     */
    getContainerClasses() {
        const baseClasses = 'fixed z-50 pointer-events-none';
        
        switch (this.position) {
            case 'top-center':
                return `${baseClasses} top-5 left-1/2 transform -translate-x-1/2`;
            case 'top-right':
                return `${baseClasses} top-5 right-5`;
            case 'bottom-center':
                return `${baseClasses} bottom-5 left-1/2 transform -translate-x-1/2`;
            case 'bottom-right':
                return `${baseClasses} bottom-5 right-5`;
            default:
                return `${baseClasses} top-5 left-1/2 transform -translate-x-1/2`;
        }
    }

    /**
     * Add CSS styles for toast notifications
     */
    addStyles() {
        if (document.getElementById('suanduo-toast-styles')) return;

        const style = document.createElement('style');
        style.id = 'suanduo-toast-styles';
        style.textContent = `
            .suanduo-toast {
                background-color: #10b981;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                margin-bottom: 8px;
                pointer-events: auto;
                transform: translateY(-100px);
                opacity: 0;
                transition: all 0.3s ease-in-out;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 200px;
                max-width: 400px;
                text-align: center;
            }
            
            .suanduo-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .suanduo-toast.success {
                background-color: #10b981;
            }
            
            .suanduo-toast.error {
                background-color: #ef4444;
            }
            
            .suanduo-toast.warning {
                background-color: #f59e0b;
            }
            
            .suanduo-toast.info {
                background-color: #3b82f6;
            }
            
            .suanduo-toast .toast-icon {
                margin-right: 8px;
                flex-shrink: 0;
            }
            
            .suanduo-toast .toast-message {
                flex: 1;
            }
            
            .suanduo-toast .toast-close {
                margin-left: 12px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .suanduo-toast .toast-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Get icon SVG for different toast types
     * @param {string} type - Toast type ('success', 'error', 'warning', 'info')
     * @returns {string} SVG icon HTML
     */
    getIcon(type) {
        const iconClass = 'w-5 h-5';
        
        switch (type) {
            case 'success':
                return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>`;
            case 'error':
                return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>`;
            case 'warning':
                return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>`;
            case 'info':
                return `<svg class="${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`;
            default:
                return '';
        }
    }

    /**
     * Show a toast notification
     * @param {string|Object} message - Toast message or configuration object
     * @param {string} type - Toast type ('success', 'error', 'warning', 'info')
     * @param {Object} options - Additional options
     */
    show(message, type = 'success', options = {}) {
        // Handle object parameter
        if (typeof message === 'object') {
            options = message;
            message = options.message || '';
            type = options.type || 'success';
        }

        // Ensure container exists (in case this was constructed before DOM was ready)
        if (!this.container || !document.getElementById('toast-container')) {
            this.init();
        }
        if (!this.container && document.body) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = this.getContainerClasses();
            document.body.appendChild(this.container);
        }

        const toastId = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const showCloseButton = options.showClose === true;
        const duration = options.duration || this.duration;
        
        // Create toast element
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `suanduo-toast ${type}`;
        
        const iconHtml = this.getIcon(type);
        const closeButtonHtml = showCloseButton ? 
            `<div class="toast-close" onclick="window.suanduoToast.hide('${toastId}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>` : '';
        
        toast.innerHTML = `
            ${iconHtml ? `<div class="toast-icon">${iconHtml}</div>` : ''}
            <div class="toast-message">${message}</div>
            ${closeButtonHtml}
        `;
        
        // Add to container
        this.container.appendChild(toast);
        
        // Trigger show animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto hide if enabled
        if (this.autoHide && duration > 0) {
            setTimeout(() => {
                this.hide(toastId);
            }, duration);
        }
        
        return toastId;
    }

    /**
     * Hide a specific toast
     * @param {string} toastId - Toast ID to hide
     */
    hide(toastId) {
        const toast = document.getElementById(toastId);
        if (!toast) return;
        
        toast.classList.remove('show');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Hide all toasts
     */
    hideAll() {
        const toasts = this.container.querySelectorAll('.suanduo-toast');
        toasts.forEach(toast => {
            this.hide(toast.id);
        });
    }

    /**
     * Show success toast
     * @param {string} message - Success message
     * @param {Object} options - Additional options
     */
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }

    /**
     * Show error toast
     * @param {string} message - Error message
     * @param {Object} options - Additional options
     */
    error(message, options = {}) {
        return this.show(message, 'error', options);
    }

    /**
     * Show warning toast
     * @param {string} message - Warning message
     * @param {Object} options - Additional options
     */
    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }

    /**
     * Show info toast
     * @param {string} message - Info message
     * @param {Object} options - Additional options
     */
    info(message, options = {}) {
        return this.show(message, 'info', options);
    }
}

// Create global instance
window.suanduoToast = new SuanduoToast();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SuanduoToast;
}
