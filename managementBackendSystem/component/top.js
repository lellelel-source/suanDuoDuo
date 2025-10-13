/**
 * TopHeader Component for 算力多多 Console
 * Encapsulates the top header bar functionality.
 * @class TopHeader
 */
class TopHeader {
    /**
     * Constructor for the header component.
     */
    constructor() {
        // No initial configuration needed for this version.
    }

    /**
     * Generates the HTML for the header.
     * @returns {string} The HTML string for the header.
     */
    render() {
        return `
            <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
                <div class="flex items-center">
                    <button id="menu-toggle" class="sm:hidden text-slate-600 mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div class="relative hidden md:block ml-6">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" placeholder="搜索用户/订单/资源" class="block w-80 pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="../../index.html" class="bg-gray-100 text-gray-700 font-semibold px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors text-sm">
                        重新选择系统
                    </a>
                    <button class="text-slate-500 hover:text-primary">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </button>
                     <div class="relative" x-data="{ isOpen: false }">
                        <button @click="isOpen = !isOpen" class="flex items-center space-x-2">
                             <img class="h-8 w-8 rounded-full object-cover" src="https://placehold.co/100x100/e3f2fd/2979FF?text=A" alt="Admin Avatar">
                             <span class="text-sm font-medium text-slate-700">管理员</span>
                             <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="isOpen" @click.away="isOpen = false" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">个人中心</a>
                            <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">退出登录</a>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    /**
     * Initializes the header component and attaches it to the container.
     * @param {HTMLElement} container - The container element to prepend the header to.
     */
    init(container) {
        container.insertAdjacentHTML('afterbegin', this.render());
    }
}

// Export for use in other files
window.TopHeader = TopHeader;
