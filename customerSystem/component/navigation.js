/**
 * Navigation Component for 算力多多 Console
 * Encapsulates the left sidebar navigation functionality
 * @class SuanduoNavigation
 */
class SuanduoNavigation {
    /**
     * Constructor for the navigation component
     * @param {Object} config - Configuration object
     * @param {string} config.activePage - Currently active page ('dashboard', 'supermarket', 'vendors', 'orders', 'resources', 'billing', 'account')
     * @param {Object} config.user - User information
     * @param {string} config.user.name - User display name
     * @param {string} config.user.avatar - User avatar URL
     */
    constructor(config = {}) {
        this.activePage = config.activePage || 'dashboard';
        this.user = config.user || {
            name: 'HL 13520841021',
            avatar: 'https://placehold.co/100x100/e3f2fd/2979FF?text=A'
        };

        // Navigation items configuration
        this.navItems = [
            {
                id: 'dashboard',
                href: '../console/index.html',
                label: '控制台',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
                iconActive: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
            },
            {
                id: 'supermarket',
                href: '../computingPowerSupermarket/index.html',
                label: '算力超市',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>',
                iconActive: '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>'
            },
            {
                id: 'vendors',
                href: '../manufacturerLink/index.html',
                label: '厂商链接',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>',
                iconActive: '<path d="M15.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 10.5a3.5 3.5 0 117 0v6.44l-4.27-2.13c-.27-.14-.73-.14-1-.01L12 16.44v-5.94zM21.25 8.5H16.5v6.44l4.27-2.13c.27-.14.73-.14 1-.01l-.02.2v.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8.5z"/>'
            },
            {
                id: 'orders',
                href: '../orderCenter/index.html',
                label: '订单中心',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>'
            },
            {
                id: 'resources',
                href: '../deviceManagement/index.html',
                label: '设备管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c-.67 0-1.27-.33-1.63-.84-.36-.5-.96-.86-1.62-.86s-1.26.36-1.62.86c-.36.51-.96.84-1.63.84H5V5h14v9z"/>'
            },
            {
                id: 'billing',
                href: '../financialCenter/index.html',
                label: '财务中心',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>'
            },
            {
                id: 'account',
                href: '../accountManagement/index.html',
                label: '账户管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
                iconActive: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
            }
        ];
    }

    /**
     * Generate SVG icon HTML
     * @param {string} path - SVG path data
     * @param {string} className - CSS classes for the SVG
     * @param {boolean} isActive - Determines if the icon should be solid or outline
     * @returns {string} SVG HTML string
     */
    generateIcon(path, className = 'w-5 h-5 mr-3', isActive = false) {
        if (isActive) {
            // Render solid icon for active state
            return `<svg class="${className}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
        } else {
            // Render outline icon for inactive state
            return `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
        }
    }

    /**
     * Generate navigation link HTML
     * @param {Object} item - Navigation item configuration
     * @returns {string} Navigation link HTML string
     */
    generateNavLink(item) {
        const isActive = this.activePage === item.id;
        const iconPath = isActive && item.iconActive ? item.iconActive : item.icon;
        const iconHtml = this.generateIcon(iconPath, 'w-5 h-5 mr-3', isActive);

        let linkClasses = "nav-link flex items-center px-4 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors";
        if (isActive) {
            linkClasses += " nav-active";
        } else {
            linkClasses += " text-slate-700";
        }

        return `
            <a href="${item.href}" class="${linkClasses}">
                ${iconHtml}
                ${item.label}
            </a>
        `;
    }

    /**
     * Generate the complete navigation HTML
     * @returns {string} Complete sidebar HTML string
     */
    generateSidebarHTML() {
        const navLinks = this.navItems.map(item => this.generateNavLink(item)).join('');

        return `
            <aside id="sidebar" class="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex-col justify-between hidden sm:flex">
                <div>
                    <!-- Navigation Links -->
                    <nav class="py-4 px-4">
                        ${navLinks}
                    </nav>
                </div>
                <!-- User Profile Section -->
                <div class="p-4 border-t border-slate-200">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-full object-cover" src="${this.user.avatar}" alt="User Avatar">
                        <div class="ml-3">
                            <p class="text-sm font-semibold text-slate-800">${this.user.name}</p>
                            <a href="#" class="text-xs text-slate-500 hover:text-primary">退出登录</a>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    }

    /**
     * Initialize the navigation component
     * @param {HTMLElement} container - Container element to append the sidebar to
     */
    init(container) {
        // Insert the sidebar HTML
        container.insertAdjacentHTML('afterbegin', this.generateSidebarHTML());

        // Initialize navigation functionality
        this.initNavigation();
    }

    /**
     * Initialize navigation event handlers
     */
    initNavigation() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');

        // Handle mobile menu toggle
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });
        }
    }

    /**
     * Update the active navigation state
     * @param {string} pageId - The page ID to activate
     */
    setActivePage(pageId) {
        this.activePage = pageId;

        // Note: This method is now only useful if you re-render the component.
        // The active state is determined at render time.
        // To update the view, you would need to clear and re-init the component.
    }

    /**
     * Update user information
     * @param {Object} user - New user information
     */
    updateUser(user) {
        this.user = { ...this.user, ...user };

        // Update the user profile section in the DOM
        const userNameElement = document.querySelector('#sidebar .text-slate-800');
        const userAvatarElement = document.querySelector('#sidebar .rounded-full');

        if (userNameElement && user.name) {
            userNameElement.textContent = user.name;
        }

        if (userAvatarElement && user.avatar) {
            userAvatarElement.src = user.avatar;
        }
    }
}

// Export for use in other files
window.SuanduoNavigation = SuanduoNavigation;
