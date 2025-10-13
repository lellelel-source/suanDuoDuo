/**
 * @file Initializes the resource management page functionality, including the navigation component.
 * @author Gemini
 */
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
            activePage: 'resources',
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

    // Tab switching functionality
    const tabs = document.querySelectorAll('[data-tab]');
    const tableBody = document.getElementById('resource-table-body');

    const originalContent = tableBody.innerHTML;

    const mockData = {
        cloud: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-slate-900">prod-model-trainer-01</div>
                    <div class="text-xs text-slate-500">gpu-ins-a1b2c3d4</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">运行中</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">西北三区</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">1 * NVIDIA-RTX-4090-D</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">按量计费</td>
            </tr>
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-slate-900">dev-notebook-server</div>
                    <div class="text-xs text-slate-500">gpu-ins-e5f6g7h8</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">已停止</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">华北一区</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">1 * NVIDIA-RTX-4090-D</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">按量计费</td>
            </tr>
        `,
        idc: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-slate-900">backup-storage-01</div>
                    <div class="text-xs text-slate-500">oss-bkt-i9j0k1l2</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">可用</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">华北一区</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">100 GB / 1 TB</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">包年包月</td>
            </tr>
        `,
        server: `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-slate-900">campus-server-01</div>
                    <div class="text-xs text-slate-500">cs-ins-x1y2z3a4</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">维护中</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">园区A-机房2</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">8 vCPU / 32 GB RAM</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">包年包月</td>
            </tr>
        `
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            tabs.forEach(t => {
                t.classList.remove('border-primary', 'text-primary');
                t.classList.add('border-transparent', 'text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300');
                t.querySelector('span').classList.remove('bg-primary-light', 'text-primary');
                t.querySelector('span').classList.add('bg-slate-100', 'text-slate-600');
            });

            this.classList.add('border-primary', 'text-primary');
            this.classList.remove('border-transparent', 'text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300');
            this.querySelector('span').classList.add('bg-primary-light', 'text-primary');
            this.querySelector('span').classList.remove('bg-slate-100', 'text-slate-600');

            const tabType = this.getAttribute('data-tab');
            if (tabType === 'server') {
                tableBody.innerHTML = mockData.server;
            } else if (tabType === 'cloud') {
                tableBody.innerHTML = mockData.cloud;
            } else if (tabType === 'idc') {
                tableBody.innerHTML = mockData.idc;
            } else {
                tableBody.innerHTML = originalContent;
            }
        });
    });
});
