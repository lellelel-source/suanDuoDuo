document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('app-container');

    // Initialize the top header component
    if (window.TopHeader && appContainer) {
        const topHeader = new TopHeader();
        topHeader.init(appContainer);
    } else {
        console.error('TopHeader component not found or app container is missing.');
    }

    // Initialize the navigation component inside the main content area
    const contentContainer = document.querySelector('.flex.flex-1.overflow-hidden');
    if (window.SuanduoNavigation && contentContainer) {
        const navConfig = {
            activePage: 'orders', // Set 'orders' as the active page
            user: {
                name: 'HL 13520841021',
                avatar: 'https://placehold.co/100x100/e3f2fd/2979FF?text=A'
            }
        };
        const navigation = new SuanduoNavigation(navConfig);
        navigation.init(contentContainer);
    } else {
        console.error('SuanduoNavigation component not found or content container is missing.');
    }

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const ordersList = document.getElementById('orders-list');

    // Dummy data for demonstration
    const dummyOrders = {
        all: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024073012345</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">并行科技-入门级-容器实例</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥1,200.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-30 10:30</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        已完成
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark">详情</a>
                </td>
            </tr>
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024073012346</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">阿里云-企业级-专属节点</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥25,000.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-30 11:00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        待支付
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark mr-4">支付</a>
                    <a href="#" class="text-slate-600 hover:text-primary-dark">取消</a>
                </td>
            </tr>
             <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024072912340</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">福石投资-旗舰级-园区算力集群</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥150,000.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-29 15:45</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        已取消
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark">再次购买</a>
                </td>
            </tr>
        `,
        pending: `
             <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024073012346</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">阿里云-企业级-专属节点</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥25,000.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-30 11:00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        待支付
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark mr-4">支付</a>
                    <a href="#" class="text-slate-600 hover:text-primary-dark">取消</a>
                </td>
            </tr>
        `,
        processing: `
            <tr>
                <td colspan="6" class="text-center py-10 text-slate-500">没有处理中的订单</td>
            </tr>
        `,
        completed: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024073012345</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">并行科技-入门级-容器实例</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥1,200.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-30 10:30</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        已完成
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark">详情</a>
                </td>
            </tr>
        `,
        cancelled: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">2024072912340</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">福石投资-旗舰级-园区算力集群</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">¥150,000.00</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2024-07-29 15:45</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        已取消
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-primary hover:text-primary-dark">再次购买</a>
                </td>
            </tr>
        `
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab style
            tabs.forEach(t => t.classList.remove('tab-btn-active'));
            tab.classList.add('tab-btn-active');

            // Update table content
            const tabName = tab.dataset.tab;
            if (ordersList && dummyOrders[tabName]) {
                ordersList.innerHTML = dummyOrders[tabName];
            }
        });
    });
});


