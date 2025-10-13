/**
 * Navigation Component for 算力多多 Console
 * Encapsulates the left sidebar navigation functionality
 * @class SuanduoNavigation
 */
class SuanduoNavigation {
    /**
     * Constructor for the navigation component
     * @param {Object} config - Configuration object
     * @param {string} config.activePage - Currently active page ('dashboard', 'supermarket', 'orders', 'resources', 'billing', 'account')
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
                href: '../homepage/homepage.html',
                label: '数据看板',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
                iconActive: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
            },
            {
                id: 'users',
                label: '用户管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
                iconActive: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
                submenu: [
                    { id: 'user-list', href: '#', label: '用户列表' },
                    { id: 'user-verification', href: '#', label: '企业认证审核' }
                ]
            },
            {
                id: 'orders',
                label: '订单管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>',
                submenu: [
                    { id: 'order-list', href: '#', label: '全部订单' },
                    { id: 'order-pending', href: '#', label: '待处理订单' }
                ]
            },
            {
                id: 'resources',
                label: '算力资源管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c-.67 0-1.27-.33-1.63-.84-.36-.5-.96-.86-1.62-.86s-1.26.36-1.62.86c-.36.51-.96.84-1.63.84H5V5h14v9z"/>',
                submenu: [
                    { id: 'resource-products', href: '#', label: '产品管理' },
                    { id: 'resource-suppliers', href: '#', label: '供应商管理' }
                ]
            },
            {
                id: 'supplier-links',
                href: '#',
                label: '厂商链接',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>',
                iconActive: '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>'
            },
            {
                id: 'billing',
                label: '财务管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>',
                submenu: [
                    { id: 'billing-transactions', href: '#', label: '交易流水' },
                    { id: 'billing-invoices', href: '#', label: '发票管理' },
                    { id: 'billing-reports', href: '#', label: '财务报表' }
                ]
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
        
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        const linkContent = `
            ${iconHtml}
            <span class="flex-1">${item.label}</span>
            ${hasSubmenu ? `
                <svg class="w-4 h-4 text-slate-500 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>` : ''}
        `;

        if (hasSubmenu) {
            const submenuLinks = item.submenu.map(subItem => `
                <li>
                    <a href="${subItem.href}" class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md ml-8">${subItem.label}</a>
                </li>
            `).join('');

            return `
                <div class="nav-item">
                    <button class="${linkClasses} w-full text-left">
                        ${linkContent}
                    </button>
                    <ul class="submenu hidden mt-1 space-y-1">
                        ${submenuLinks}
                    </ul>
                </div>
            `;
        }

        return `
            <div class="nav-item">
                <a href="${item.href}" class="${linkClasses}">
                    ${linkContent}
                </a>
            </div>
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
                     <div class="h-16 flex items-center px-4 border-b border-slate-200">
                        <h1 class="text-xl font-bold text-primary">算力多多 | 管理后台</h1>
                    </div>
                    <!-- Navigation Links -->
                    <nav class="py-4 px-4 space-y-1">
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
        
        // Handle submenu toggles
        const navItems = document.querySelectorAll('.nav-item button');
        navItems.forEach(button => {
            button.addEventListener('click', () => {
                const submenu = button.nextElementSibling;
                const arrow = button.querySelector('svg:last-child');
                if (submenu && submenu.classList.contains('submenu')) {
                    submenu.classList.toggle('hidden');
                    arrow.classList.toggle('rotate-180');
                }
            });
        });
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
