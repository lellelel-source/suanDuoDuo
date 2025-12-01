/**
 * Government Navigation Component for District Officer Dashboard
 * @class GovNavigation
 */
class GovNavigation {
    /**
     * Constructor for the navigation component
     * @param {Object} config - Configuration object
     * @param {string} config.activePage - Currently active page ('dashboard', 'reports', 'settings')
     * @param {Object} config.user - User information
     */
    constructor(config = {}) {
        this.activePage = config.activePage || 'dashboard';
        this.user = config.user || {
            name: '区级管理员',
            avatar: 'https://placehold.co/100x100/2979FF/ffffff?text=管'
        };

        // Navigation items for government officers
        this.navItems = [
            {
                id: 'dashboard',
                href: 'index.html',
                label: '数据看板',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
                iconActive: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>'
            },
            {
                id: 'reports',
                href: '#',
                label: '报表管理',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
                iconActive: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
            },
            {
                id: 'settings',
                href: '#',
                label: '系统设置',
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
                iconActive: '<path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
            }
        ];
    }

    /**
     * Generate SVG icon HTML
     */
    generateIcon(path, className = 'w-5 h-5 mr-3', isActive = false) {
        if (isActive) {
            return `<svg class="${className}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
        } else {
            return `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
        }
    }

    /**
     * Generate navigation link HTML
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
     */
    generateSidebarHTML() {
        const navLinks = this.navItems.map(item => this.generateNavLink(item)).join('');

        return `
            <aside id="sidebar" class="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex-col justify-between hidden sm:flex">
                <div>
                    <!-- Logo/Title -->
                    <div class="p-4 border-b border-slate-200">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm font-bold text-slate-800">区级政府</p>
                                <p class="text-xs text-slate-500">管理看板</p>
                            </div>
                        </div>
                    </div>
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
     */
    init(container) {
        container.insertAdjacentHTML('afterbegin', this.generateSidebarHTML());
        this.initNavigation();
    }

    /**
     * Initialize navigation event handlers
     */
    initNavigation() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
            });
        }
    }
}

// Export for use in other files
window.GovNavigation = GovNavigation;
