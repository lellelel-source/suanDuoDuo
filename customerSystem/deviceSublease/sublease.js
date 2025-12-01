/**
 * @file Initializes the device sublease page functionality, including the navigation component.
 */
document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('app-container');

    // Initialize page labels (to avoid encoding issues)
    const labels = {
        pageTitle: '\u6211\u7684\u8f6c\u79df',           // 我的转租
        btnPublish: '\u53d1\u5e03\u8f6c\u79df',         // 发布转租
        tabAll: '\u5168\u90e8',                         // 全部
        tabActive: '\u8f6c\u79df\u4e2d',                // 转租中
        tabRented: '\u5df2\u51fa\u79df',                // 已出租
        tabExpired: '\u5df2\u8fc7\u671f',               // 已过期
        emptyTitle: '\u6682\u65e0\u8f6c\u79df\u4fe1\u606f',  // 暂无转租信息
        emptyDesc: '\u70b9\u51fb\u201c\u53d1\u5e03\u8f6c\u79df\u201d\u6309\u94ae\u53d1\u5e03\u60a8\u7684\u7b2c\u4e00\u6761\u8f6c\u79df\u4fe1\u606f'  // 点击"发布转租"按钮发布您的第一条转租信息
    };

    // Set page labels
    document.getElementById('page-title').textContent = labels.pageTitle;
    document.getElementById('btn-publish').textContent = labels.btnPublish;
    document.getElementById('tab-all-label').textContent = labels.tabAll;
    document.getElementById('tab-active-label').textContent = labels.tabActive;
    document.getElementById('tab-rented-label').textContent = labels.tabRented;
    document.getElementById('tab-expired-label').textContent = labels.tabExpired;
    document.getElementById('empty-title').textContent = labels.emptyTitle;
    document.getElementById('empty-desc').textContent = labels.emptyDesc;

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
            activePage: 'sublease',
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

    // Mock sublease data
    const subleaseList = [
        {
            id: 'sub-001',
            deviceName: '超微 H100整机',
            instanceId: 'idc-h100-001',
            config: '8×H100 80G / Intel 8486 48C / 64G DDR5',
            cardCount: 4,
            price: 28000,
            startDate: '2025-01-01',
            endDate: '2025-06-30',
            contact: '13520841021',
            remark: '设备性能稳定，适合大规模AI训练',
            status: 'active',
            createTime: '2024-12-15T10:30:00',
            region: '甘肃',
            node: '节点 1'
        },
        {
            id: 'sub-002',
            deviceName: '超微 H200整机',
            instanceId: 'idc-h200-001',
            config: '8×H200 141G / Intel 8558 / 64G DDR5',
            cardCount: 2,
            price: 18000,
            startDate: '2024-11-01',
            endDate: '2025-03-31',
            contact: '13520841021',
            remark: '',
            status: 'rented',
            createTime: '2024-10-20T14:20:00',
            region: '甘肃',
            node: '节点 1',
            renter: '张先生',
            renterPhone: '13800138000'
        },
        {
            id: 'sub-003',
            deviceName: '8卡底座S60服务器',
            instanceId: 'idc-s60-001',
            config: '8×S60 / 2×Intel 6530 / 512G DDR5',
            cardCount: 8,
            price: 5500,
            startDate: '2024-08-01',
            endDate: '2024-10-31',
            contact: '13520841021',
            remark: '国产推理卡，性价比高',
            status: 'expired',
            createTime: '2024-07-25T09:15:00',
            region: '甘肃',
            node: '节点 1'
        },
        {
            id: 'sub-004',
            deviceName: '超微 H100整机',
            instanceId: 'idc-h100-002',
            config: '8×H100 80G / Intel 8486 48C / 64G DDR5',
            cardCount: 2,
            price: 14500,
            startDate: '2025-02-01',
            endDate: '2025-08-31',
            contact: '13520841021',
            remark: '长期转租，价格可议',
            status: 'active',
            createTime: '2024-12-20T16:45:00',
            region: '甘肃',
            node: '节点 2'
        }
    ];

    // Current active tab
    let currentTab = 'all';

    // Status configuration
    const statusConfig = {
        active: { class: 'bg-green-100 text-green-800', text: '转租中' },
        rented: { class: 'bg-blue-100 text-blue-800', text: '已出租' },
        expired: { class: 'bg-slate-100 text-slate-600', text: '已过期' }
    };

    // Update tab counts
    function updateCounts() {
        const counts = {
            all: subleaseList.length,
            active: subleaseList.filter(item => item.status === 'active').length,
            rented: subleaseList.filter(item => item.status === 'rented').length,
            expired: subleaseList.filter(item => item.status === 'expired').length
        };

        document.getElementById('count-all').textContent = counts.all;
        document.getElementById('count-active').textContent = counts.active;
        document.getElementById('count-rented').textContent = counts.rented;
        document.getElementById('count-expired').textContent = counts.expired;
    }

    // Switch tab
    window.switchTab = function(tab) {
        currentTab = tab;

        // Update tab styles
        document.querySelectorAll('.tab-link').forEach(link => {
            const linkTab = link.getAttribute('data-tab');
            const countSpan = link.querySelector('span[id^="count-"]');
            if (linkTab === tab) {
                link.classList.remove('border-transparent', 'text-slate-500');
                link.classList.add('border-primary', 'text-primary');
                if (countSpan) {
                    countSpan.classList.remove('bg-slate-100', 'text-slate-600');
                    countSpan.classList.add('bg-primary-light', 'text-primary');
                }
            } else {
                link.classList.remove('border-primary', 'text-primary');
                link.classList.add('border-transparent', 'text-slate-500');
                if (countSpan) {
                    countSpan.classList.remove('bg-primary-light', 'text-primary');
                    countSpan.classList.add('bg-slate-100', 'text-slate-600');
                }
            }
        });

        renderSubleaseList();
    };

    // Render sublease list
    function renderSubleaseList() {
        const container = document.getElementById('sublease-cards-container');
        const emptyState = document.getElementById('empty-state');
        if (!container) return;

        // Filter by current tab
        let filteredList = subleaseList;
        if (currentTab !== 'all') {
            filteredList = subleaseList.filter(item => item.status === currentTab);
        }

        if (filteredList.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        container.innerHTML = filteredList.map(item => {
            const status = statusConfig[item.status] || statusConfig.active;
            const createDate = new Date(item.createTime).toLocaleDateString('zh-CN');

            return `
                <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-slate-100">
                    <!-- Header -->
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-slate-900">${item.deviceName}</h3>
                            <p class="text-sm text-slate-500 mt-1">${item.instanceId}</p>
                        </div>
                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.class}">${status.text}</span>
                    </div>

                    <!-- Details -->
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center text-sm">
                            <svg class="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span class="text-slate-700">${item.region} - ${item.node}</span>
                        </div>

                        <div class="flex items-start text-sm">
                            <svg class="w-4 h-4 text-slate-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                            </svg>
                            <span class="text-slate-700">${item.config}</span>
                        </div>

                        <div class="flex items-center text-sm">
                            <svg class="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            <span class="text-slate-700">转租卡数: <strong>${item.cardCount}</strong> 卡</span>
                        </div>

                        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div class="flex items-center text-sm">
                                <svg class="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <div>
                                    <span class="text-slate-500 text-xs">租期</span>
                                    <p class="text-slate-900 font-medium text-xs">${item.startDate} ~ ${item.endDate}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-slate-500 text-xs">转租价格</span>
                                <p class="text-orange-500 font-semibold">¥${item.price.toLocaleString()}/月</p>
                            </div>
                        </div>

                        ${item.status === 'rented' && item.renter ? `
                        <div class="flex items-center text-sm pt-2 border-t border-slate-100">
                            <svg class="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span class="text-slate-700">承租人: <strong>${item.renter}</strong></span>
                        </div>
                        ` : ''}

                        ${item.remark ? `
                        <div class="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                            ${item.remark}
                        </div>
                        ` : ''}
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-2 pt-4 border-t border-slate-100">
                        ${item.status === 'active' ? `
                            <button onclick="editSublease('${item.id}')" class="flex-1 bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
                                编辑
                            </button>
                            <button onclick="cancelSublease('${item.id}')" class="flex-1 bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                                取消转租
                            </button>
                        ` : item.status === 'rented' ? `
                            <button onclick="viewSubleaseDetail('${item.id}')" class="flex-1 bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
                                查看详情
                            </button>
                            <button onclick="contactRenter('${item.id}')" class="flex-1 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                                联系承租人
                            </button>
                        ` : `
                            <button onclick="republishSublease('${item.id}')" class="flex-1 bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors">
                                重新发布
                            </button>
                            <button onclick="deleteSublease('${item.id}')" class="flex-1 bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors">
                                删除
                            </button>
                        `}
                    </div>

                    <!-- Footer -->
                    <div class="mt-3 text-xs text-slate-400 text-right">
                        发布于 ${createDate}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Mock device list for new sublease
    const availableDevices = [
        {
            instanceId: 'idc-h100-001',
            name: '超微 H100整机',
            config: '8×H100 80G / Intel 8486 48C / 64G DDR5',
            maxCards: 8
        },
        {
            instanceId: 'idc-h200-001',
            name: '超微 H200整机',
            config: '8×H200 141G / Intel 8558 / 64G DDR5',
            maxCards: 8
        },
        {
            instanceId: 'idc-s60-001',
            name: '8卡底座S60服务器',
            config: '8×S60 / 2×Intel 6530 / 512G DDR5',
            maxCards: 8
        }
    ];

    // Show new sublease modal
    window.showNewSubleaseModal = function() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.id = 'sublease-modal';

        const modalContent = `
            <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-slate-800">发布转租</h3>
                    <button onclick="closeSubleaseModal()" class="text-slate-400 hover:text-slate-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Sublease Form -->
                <form id="sublease-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">选择设备</label>
                        <select id="sublease-device-select" name="deviceSelect" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            onchange="updateMaxCards()">
                            <option value="">请选择要转租的设备</option>
                            ${availableDevices.map(d => `<option value="${d.instanceId}" data-max-cards="${d.maxCards}">${d.name} - ${d.config}</option>`).join('')}
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">转租卡数</label>
                            <input type="number" id="sublease-card-count" name="cardCount" required min="1" max="8"
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="请输入卡数" value="1">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">转租价格 (元/月)</label>
                            <input type="number" id="sublease-price" name="price" required min="0" step="0.01"
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="请输入转租价格">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">起租时间</label>
                            <input type="date" id="sublease-start-date" name="startDate" required
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">截止日期</label>
                            <input type="date" id="sublease-end-date" name="endDate" required
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">联系方式</label>
                        <input type="text" id="sublease-contact" name="contact" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="请输入联系电话或微信">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">备注说明</label>
                        <textarea id="sublease-remark" name="remark" rows="3"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            placeholder="请输入其他说明信息（可选）"></textarea>
                    </div>

                    <div class="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p class="text-xs text-yellow-800">
                            <strong>注意：</strong>转租信息将发布到算力市场，其他用户可以看到并联系您。请确保信息准确无误。
                        </p>
                    </div>
                </form>

                <div class="mt-6 flex justify-end space-x-3">
                    <button onclick="closeSubleaseModal()" class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm hover:bg-slate-50 transition-colors">
                        取消
                    </button>
                    <button onclick="submitNewSublease()" class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
                        发布转租
                    </button>
                </div>
            </div>
        `;

        modal.innerHTML = modalContent;
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSubleaseModal();
            }
        });
    };

    // Update max cards based on selected device
    window.updateMaxCards = function() {
        const select = document.getElementById('sublease-device-select');
        const cardCountInput = document.getElementById('sublease-card-count');
        if (select && cardCountInput) {
            const selectedOption = select.options[select.selectedIndex];
            const maxCards = selectedOption.getAttribute('data-max-cards') || 8;
            cardCountInput.max = maxCards;
        }
    };

    // Close sublease modal
    window.closeSubleaseModal = function() {
        const modal = document.getElementById('sublease-modal');
        if (modal) {
            modal.remove();
        }
    };

    // Submit new sublease
    window.submitNewSublease = function() {
        const deviceSelect = document.getElementById('sublease-device-select');
        const cardCount = document.getElementById('sublease-card-count').value;
        const price = document.getElementById('sublease-price').value;
        const startDate = document.getElementById('sublease-start-date').value;
        const endDate = document.getElementById('sublease-end-date').value;
        const contact = document.getElementById('sublease-contact').value;
        const remark = document.getElementById('sublease-remark').value;

        // Validate form
        if (!deviceSelect.value) {
            alert('请选择要转租的设备');
            return;
        }
        if (!cardCount || !price || !startDate || !endDate || !contact) {
            alert('请填写完整的转租信息');
            return;
        }

        // Find device info
        const device = availableDevices.find(d => d.instanceId === deviceSelect.value);

        // Create new sublease
        const newSublease = {
            id: 'sub-' + Date.now(),
            deviceName: device.name,
            instanceId: device.instanceId,
            config: device.config,
            cardCount: parseInt(cardCount),
            price: parseFloat(price),
            startDate: startDate,
            endDate: endDate,
            contact: contact,
            remark: remark,
            status: 'active',
            createTime: new Date().toISOString(),
            region: '甘肃',
            node: '节点 1'
        };

        // Add to list
        subleaseList.unshift(newSublease);

        // Update UI
        updateCounts();
        renderSubleaseList();

        // Show success message
        alert('转租信息已发布成功！');
        closeSubleaseModal();
    };

    // Edit sublease
    window.editSublease = function(id) {
        const item = subleaseList.find(s => s.id === id);
        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.id = 'edit-sublease-modal';

        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-slate-800">\u7f16\u8f91\u8f6c\u79df\u4fe1\u606f</h3>
                    <button onclick="closeEditModal()" class="text-slate-400 hover:text-slate-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Device Info (Read-only) -->
                <div class="bg-slate-50 rounded-lg p-4 mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-slate-700">${item.deviceName}</span>
                        <span class="text-xs text-slate-500">${item.instanceId}</span>
                    </div>
                    <p class="text-xs text-slate-600">${item.config}</p>
                </div>

                <!-- Edit Form -->
                <form id="edit-sublease-form" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">\u8f6c\u79df\u5361\u6570</label>
                            <input type="number" id="edit-card-count" name="cardCount" required min="1" max="8"
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value="${item.cardCount}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">\u8f6c\u79df\u4ef7\u683c (\u5143/\u6708)</label>
                            <input type="number" id="edit-price" name="price" required min="0" step="0.01"
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value="${item.price}">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">\u8d77\u79df\u65f6\u95f4</label>
                            <input type="date" id="edit-start-date" name="startDate" required
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value="${item.startDate}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">\u622a\u6b62\u65e5\u671f</label>
                            <input type="date" id="edit-end-date" name="endDate" required
                                class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value="${item.endDate}">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">\u8054\u7cfb\u65b9\u5f0f</label>
                        <input type="text" id="edit-contact" name="contact" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value="${item.contact}">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">\u5907\u6ce8\u8bf4\u660e</label>
                        <textarea id="edit-remark" name="remark" rows="3"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            placeholder="\u8bf7\u8f93\u5165\u5176\u4ed6\u8bf4\u660e\u4fe1\u606f\uff08\u53ef\u9009\uff09">${item.remark || ''}</textarea>
                    </div>

                    <input type="hidden" id="edit-sublease-id" value="${item.id}">
                </form>

                <div class="mt-6 flex justify-end space-x-3">
                    <button onclick="closeEditModal()" class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm hover:bg-slate-50 transition-colors">
                        \u53d6\u6d88
                    </button>
                    <button onclick="saveEditSublease()" class="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                        \u4fdd\u5b58\u4fee\u6539
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEditModal();
            }
        });
    };

    // Close edit modal
    window.closeEditModal = function() {
        const modal = document.getElementById('edit-sublease-modal');
        if (modal) {
            modal.remove();
        }
    };

    // Save edited sublease
    window.saveEditSublease = function() {
        const id = document.getElementById('edit-sublease-id').value;
        const cardCount = document.getElementById('edit-card-count').value;
        const price = document.getElementById('edit-price').value;
        const startDate = document.getElementById('edit-start-date').value;
        const endDate = document.getElementById('edit-end-date').value;
        const contact = document.getElementById('edit-contact').value;
        const remark = document.getElementById('edit-remark').value;

        // Validate form
        if (!cardCount || !price || !startDate || !endDate || !contact) {
            alert('\u8bf7\u586b\u5199\u5b8c\u6574\u7684\u8f6c\u79df\u4fe1\u606f');
            return;
        }

        // Find and update item
        const item = subleaseList.find(s => s.id === id);
        if (item) {
            item.cardCount = parseInt(cardCount);
            item.price = parseFloat(price);
            item.startDate = startDate;
            item.endDate = endDate;
            item.contact = contact;
            item.remark = remark;

            // Update UI
            renderSubleaseList();

            // Show success message
            alert('\u8f6c\u79df\u4fe1\u606f\u5df2\u4fdd\u5b58');
            closeEditModal();
        }
    };

    // Cancel sublease
    window.cancelSublease = function(id) {
        if (!confirm('确定要取消此转租信息吗？')) return;

        const index = subleaseList.findIndex(s => s.id === id);
        if (index !== -1) {
            subleaseList.splice(index, 1);
            updateCounts();
            renderSubleaseList();
            alert('转租信息已取消');
        }
    };

    // View sublease detail
    window.viewSubleaseDetail = function(id) {
        const item = subleaseList.find(s => s.id === id);
        if (!item) return;

        alert('查看详情：' + item.deviceName + '\n承租人：' + item.renter);
    };

    // Contact renter
    window.contactRenter = function(id) {
        const item = subleaseList.find(s => s.id === id);
        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.id = 'contact-modal';

        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-slate-800">\u8054\u7cfb\u627f\u79df\u4eba</h3>
                    <button onclick="document.getElementById('contact-modal').remove()" class="text-slate-400 hover:text-slate-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">\u627f\u79df\u4eba</label>
                        <div class="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-700">${item.renter || '-'}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">\u624b\u673a\u53f7</label>
                        <div class="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-700 font-mono">${item.renterPhone || '-'}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">\u8f6c\u79df\u8bbe\u5907</label>
                        <div class="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-700">${item.deviceName}</div>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button onclick="copyToClipboard('${item.renterPhone || ''}')" class="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                        \u590d\u5236\u624b\u673a\u53f7
                    </button>
                    <button onclick="document.getElementById('contact-modal').remove()" class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm hover:bg-slate-50 transition-colors">
                        \u5173\u95ed
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };

    // Copy to clipboard helper
    window.copyToClipboard = function(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            alert('\u624b\u673a\u53f7\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u624b\u52a8\u590d\u5236');
        });
    };

    // Republish sublease
    window.republishSublease = function(id) {
        const item = subleaseList.find(s => s.id === id);
        if (!item) return;

        if (!confirm('确定要重新发布此转租信息吗？')) return;

        item.status = 'active';
        item.createTime = new Date().toISOString();
        updateCounts();
        renderSubleaseList();
        alert('转租信息已重新发布');
    };

    // Delete sublease
    window.deleteSublease = function(id) {
        if (!confirm('确定要删除此转租信息吗？此操作不可恢复。')) return;

        const index = subleaseList.findIndex(s => s.id === id);
        if (index !== -1) {
            subleaseList.splice(index, 1);
            updateCounts();
            renderSubleaseList();
            alert('转租信息已删除');
        }
    };

    // Initial render
    updateCounts();
    renderSubleaseList();
});
