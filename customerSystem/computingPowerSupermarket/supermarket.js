/**
 * @file Initializes the supermarket page functionality, including the navigation component.
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
            activePage: 'supermarket',
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

    // --- Supermarket Page Specific Logic ---
    /**
     * 当前页面展示的数据集合（受筛选影响）。
     * @type {Array<Object>}
     */
    const productData = [];

    const productList = document.getElementById('product-list');
    const filtersContainer = document.getElementById('filters');
    const vendorFilterRow = document.getElementById('vendor-filter-row');
    const vendorButtonsContainer = document.getElementById('vendor-filter-buttons');
    const cloudProviderFilterRow = document.getElementById('cloud-provider-filter-row');
    const cloudContent = document.getElementById('cloud-content');
    const productListContainer = document.getElementById('product-list-container');
    const cloudRegistrationForm = document.getElementById('cloud-registration-form');
    let currentFilters = {
        powerSource: 'IDC',
        cloudProvider: null, // No default since there's no "全部" option
        manufacturer: 'all',
        region: 'all',
        level: 'all',
        billing: 'all',
        scope: 'all',
        resourceType: 'all',
        gpu: 'all',
        productType: 'all',
        node: 'all'
    };

    const levelDescriptions = {
        '入门级': '适用于个人开发者、测试环境等轻量级应用场景。',
        '企业级': '适用于生产环境、中小型企业应用，提供稳定可靠的计算能力。',
        '旗舰级': '适用于大规模并发、高性能计算、大数据分析等要求苛刻的业务场景。'
    };

    /**
     * 所有区域的静态产品清单
     * @type {Array<{name:string, manufacturer:string, region:string, level?:string, billing?:string, scope?:string, resourceType?:string, gpu?:string, productType?:string, node?:string, gpu_display?:string, price?:number, priceText?:string, available?:number|string, details?:string, quotes?:Array}>}
     */
    const ALL_PRODUCTS = [
        // 甘肃区域产品
        {
            name: '超微 H100整机',
            manufacturer: '服务商一',
            region: '甘肃',
            scope: '节点 1',
            productType: 'H100 整机',
            level: '旗舰级', // High-end product for demanding workloads
            gpu_display: 'H100 整机',
            priceText: '¥55999<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 128,
            node: '节点 1',
            details: [
                'GPU: HGX NVLink 8×H100 80G 模组',
                'CPU: Intel 8486 48C 2.1GHz 350W',
                '内存: 64G DDR5 4800',
                '硬盘: 960G SATA SSD + 3.84T NVME SSD',
                '网络: 双25G网卡（含光模块）',
                '电源: 3200W(1+1冗余)',
                'RAID: 4口缓存RAID卡',
                'HCA: ConnectX-7 PCIe IB/400GE'
            ].join('\n')
        },
        {
            name: '超微 H200整机',
            manufacturer: '服务商一',
            region: '甘肃',
            scope: '节点 1',
            productType: 'H200 整机',
            level: '旗舰级', // Latest and most powerful hardware
            gpu_display: 'H200 整机',
            priceText: '¥67999<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 128,
            node: '节点 1',
            details: [
                'GPU: HGX NVLink 8×H200 141G 模组',
                'CPU: Intel 8558',
                '内存: 64G DDR5 4800',
                '硬盘: 960G SATA SSD + 3.84T NVME SSD',
                '网络: 双25G网卡（含光模块）',
                'RAID: 4口缓存RAID卡',
                'HCA: ConnectX-7 PCIe IB/400GE'
            ].join('\n')
        },
        {
            name: '8卡底座S60服务器',
            manufacturer: '服务商一',
            region: '甘肃',
            scope: '节点 1',
            productType: 'S60 服务器',
            level: '企业级', // Enterprise-grade for production environments
            gpu_display: 'S60 服务器',
            priceText: '¥6399<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 512,
            node: '节点 1',
            details: [
                'CPU: 2× Intel 6530 270W, 32 cores Base 2.1G, Turbo 4GHz',
                '内存: 512G DDR5 4800MHz（64G×8条），每颗CPU 4路内存，1 DPC',
                '硬盘: 2×480G SATA SSD（可选硬件RAID卡，支持RAID 1）',
                '可选硬盘: 1×3.84T U.2 NVME',
                '主板: 至少9×PCIe Gen5 x16插槽，支持接入8×双宽AI加速卡；PCIe Topo需要 2个 PCIe Gen5 Switch，Balance Mode；',
                '网络: 至少2×25G的服务器以太网（含2个25G光模块）（含2个25G光模块）',
                '网络2: 至少2个100G IB/以太网（含2个100G光模块）',
                '带外: 1×1Gb/s 管理（RJ45）',
                '前置IO: 1×前面板1Gb/s管理口及USB/以及状态灯（OCP，RJ45）',
                '散热: 风冷',
                '电源: 4U',
                '电源配置: 4×2400W及以上 具备两路向后16A热插拔',
                '国内AI推理支持卡: 8*S60性能加速卡'
            ].join('\n')
        },
        {
            name: '超微 8卡4090服务器',
            manufacturer: '服务商一',
            region: '甘肃',
            scope: '节点 1',
            productType: '8卡4090 服务器',
            level: '入门级', // Entry-level for development and testing
            gpu_display: '8×RTX 4090',
            priceText: '¥5699<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 256,
            node: '节点 1',
            details: [
                '显卡: 8×RTX 4090',
                'CPU/主板/存储: 同S60底座规格或等效',
                '网络: 至少2×25G',
                '电源: 2400W×4（或等效）'
            ].join('\n')
        },
        // 西北区域产品
        {
            name: '联想 H100 GPU集群',
            manufacturer: '服务商二',
            region: '西北',
            scope: '节点 A',
            productType: 'H100 集群',
            level: '企业级', // Enterprise-grade cluster solution
            gpu_display: 'H100 集群',
            priceText: '¥48999<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 64,
            node: '节点 A',
            details: [
                'GPU: 4×H100 80G 模组',
                'CPU: AMD EPYC 9534 64C 2.45GHz',
                '内存: 128G DDR5 4800',
                '硬盘: 1.92T NVME SSD',
                '网络: 双100G网卡',
                '电源: 2000W 高效电源'
            ].join('\n')
        },
        {
            name: '戴尔 A100 训练服务器',
            manufacturer: '服务商三',
            region: '西北',
            scope: '节点 B',
            productType: 'A100 服务器',
            level: '企业级', // Enterprise-grade training server
            gpu_display: 'A100 服务器',
            priceText: '¥36999<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 32,
            node: '节点 B',
            details: [
                'GPU: 8×A100 40G 模组',
                'CPU: Intel 8380 40C 2.3GHz',
                '内存: 256G DDR4 3200',
                '硬盘: 3.84T NVME SSD',
                '网络: InfiniBand HDR'
            ].join('\n')
        },
        // 华北区域产品
        {
            name: 'HPE H200 推理集群',
            manufacturer: '服务商四',
            region: '华北',
            scope: '数据中心 1',
            productType: 'H200 集群',
            level: '旗舰级', // Flagship-level inference cluster
            gpu_display: 'H200 集群',
            priceText: '¥72999<span class="text-sm font-normal text-slate-500">/台/月</span>',
            available: 96,
            node: '数据中心 1',
            details: [
                'GPU: 8×H200 141G 模组',
                'CPU: Intel 8570 48C 2.1GHz',
                '内存: 1024G DDR5 5600',
                '硬盘: 7.68T NVME SSD',
                '网络: 双400G以太网',
                '特性: 专为AI推理优化'
            ].join('\n')
        }
    ];

    /**
     * Handle cloud provider selection and show/hide registration form
     * @param {string} provider - Selected cloud provider name
     */
    function handleCloudProviderSelection(provider) {
        if (!cloudDefaultMessage || !cloudRegistrationForm || !selectedProviderSpan) return;
        
        if (provider && provider !== 'all') {
            // Show registration form for specific provider
            cloudDefaultMessage.classList.add('hidden');
            cloudRegistrationForm.classList.remove('hidden');
            selectedProviderSpan.textContent = provider;
            
            // Clear form inputs
            const companyNameInput = document.getElementById('company-name');
            const creditCodeInput = document.getElementById('credit-code');
            const phoneNumberInput = document.getElementById('phone-number');
            const emailInput = document.getElementById('email');
            if (companyNameInput) companyNameInput.value = '';
            if (creditCodeInput) creditCodeInput.value = '';
            if (phoneNumberInput) phoneNumberInput.value = '';
            if (emailInput) emailInput.value = '';
        } else {
            // Show default message
            cloudDefaultMessage.classList.remove('hidden');
            cloudRegistrationForm.classList.add('hidden');
        }
    }

    function renderProducts() {
        if (!productList) return;
        productList.innerHTML = '';
        
        const filteredData = productData.filter(p => {
            return (currentFilters.region === 'all' || p.region === currentFilters.region) &&
                   (currentFilters.manufacturer === 'all' || p.manufacturer === currentFilters.manufacturer) &&
                   (currentFilters.level === 'all' || p.level === currentFilters.level) &&
                   (currentFilters.billing === 'all' || p.billing === currentFilters.billing) &&
                   (currentFilters.scope === 'all' || p.scope === currentFilters.scope) &&
                   (currentFilters.resourceType === 'all' || p.resourceType === currentFilters.resourceType) &&
                   (currentFilters.gpu === 'all' || p.gpu === currentFilters.gpu) &&
                   (currentFilters.productType === 'all' || p.productType === currentFilters.productType || 
                    (p.productType && p.productType.includes(currentFilters.productType)));
        });

        if (filteredData.length === 0) {
            productList.innerHTML = `<div class="text-center py-10 text-slate-500">没有找到匹配的资源。</div>`;
            return;
        }

        filteredData.forEach(product => {
            const billingFromPriceText = (typeof product.priceText === 'string')
                ? (product.priceText.includes('小时') ? '按小时' : (product.priceText.includes('月') ? '按月' : ''))
                : (typeof product.price === 'number' ? '按小时' : '');

            const deliveryForm = (product.productType && product.productType.includes('整机'))
                ? '整机'
                : (product.productType ? '服务器' : '');

            const introItems = [];
            if (product.gpu_display || product.productType) {
                introItems.push({ label: 'GPU', value: product.gpu_display || product.productType });
            }
            if (product.node) {
                introItems.push({ label: '节点', value: product.node });
            }
            if (product.available !== undefined) {
                introItems.push({ label: '可用', value: String(product.available) });
            }

            const priceText = (typeof product.priceText === 'string' && product.priceText.length > 0)
                ? product.priceText
                : (typeof product.price === 'number' ? `¥${product.price.toFixed(2)}<span class="text-sm font-normal text-slate-500">/小时</span>` : '');

            const card = new ProductCard({
                title: product.name || '',
                vendorName: product.manufacturer || '',
                thumbnailUrl: product.thumbnailUrl,
                introItems,
                scopeText: product.details || '',
                deliveryForm,
                billing: billingFromPriceText,
                region: product.region || '',
                priceText,
                buy: { label: '立即购买', href: 'serviceProvider/hanhou.html' }
            });

            card.mount(productList);
        });
    }
    
    /**
     * Toggle between IDC and Cloud Provider views
     * @param {string} powerSource - 'IDC' or '云厂商'
     */
    function switchPowerSource(powerSource) {
        const idcFilters = document.querySelectorAll('.idc-filter');
        
        if (powerSource === 'IDC') {
            // Show IDC filters and product list
            idcFilters.forEach(el => el.classList.remove('hidden'));
            if (cloudProviderFilterRow) cloudProviderFilterRow.classList.add('hidden');
            if (cloudContent) cloudContent.classList.add('hidden');
            if (productListContainer) productListContainer.classList.remove('hidden');
            
            // Reset cloud provider filter
            currentFilters.cloudProvider = null;
            const cloudProviderButtons = cloudProviderFilterRow?.querySelectorAll('button');
            if (cloudProviderButtons) {
                cloudProviderButtons.forEach(btn => btn.classList.remove('filter-btn-active'));
                // Since there's no "全部" button anymore, just reset without setting any active state
            }
        } else if (powerSource === '云厂商') {
            // Hide IDC filters and product list, show cloud provider filter and cloud content
            idcFilters.forEach(el => el.classList.add('hidden'));
            if (cloudProviderFilterRow) cloudProviderFilterRow.classList.remove('hidden');
            if (cloudContent) cloudContent.classList.remove('hidden');
            if (productListContainer) productListContainer.classList.add('hidden');

            // Reset IDC filters
            resetIdcFilters();

            // Check if we should show the new entity guidance popup
            const hideUntil = localStorage.getItem('hideNewEntityPopupUntil');
            const shouldShowPopup = !hideUntil || Date.now() > parseInt(hideUntil, 10);

            if (shouldShowPopup) {
                // Show the new entity guidance popup
                showNewEntityGuidancePopup(() => {
                    // Callback after popup is closed - auto-select 阿里云
                    selectAliyunProvider();
                });
            } else {
                // Skip popup and directly select 阿里云
                selectAliyunProvider();
            }
        }
    }

    /**
     * Select 阿里云 as the default cloud provider
     */
    function selectAliyunProvider() {
        const aliyunButton = cloudProviderFilterRow?.querySelector('button[data-filter="阿里云"]');
        if (aliyunButton) {
            // Remove active state from all cloud provider buttons
            const cloudProviderButtons = cloudProviderFilterRow?.querySelectorAll('button');
            cloudProviderButtons?.forEach(btn => btn.classList.remove('filter-btn-active'));

            // Set 阿里云 as active
            aliyunButton.classList.add('filter-btn-active');
            currentFilters.cloudProvider = '阿里云';

            // Show the registration form for 阿里云
            handleCloudProviderSelection('阿里云');
        }
    }

    /**
     * Show the new entity guidance popup with countdown
     * @param {Function} onClose - Callback function when popup is closed
     */
    function showNewEntityGuidancePopup(onClose) {
        // Remove existing popup if any
        const existingPopup = document.getElementById('new-entity-guidance-popup');
        if (existingPopup) existingPopup.remove();

        let countdown = 10;
        let countdownInterval = null;

        const popupHtml = `
            <div id="new-entity-guidance-popup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
                    <div class="bg-primary p-4">
                        <h3 class="text-xl font-bold text-white text-center">新主体 vs 老主体 - 选择指南</h3>
                    </div>
                    <div class="p-6">
                        <!-- Comparison Table -->
                        <div class="overflow-x-auto mb-6">
                            <table class="w-full border-collapse">
                                <thead>
                                    <tr class="bg-slate-100">
                                        <th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700">对比项</th>
                                        <th class="border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-green-700 bg-green-50">
                                            <div class="flex items-center justify-center">
                                                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>
                                                新主体（推荐）
                                            </div>
                                        </th>
                                        <th class="border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-600">老主体</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">首购折扣</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">最高5折优惠</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">无折扣</td>
                                    </tr>
                                    <tr class="bg-slate-50">
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">免费体验金</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">赠送5000元</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">无赠送</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">GPU资源配额</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">优先分配稀缺资源</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">标准排队</td>
                                    </tr>
                                    <tr class="bg-slate-50">
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">技术支持</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">专属顾问1对1服务</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">标准工单支持</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">返佣比例</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">最高15%返佣</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">无返佣</td>
                                    </tr>
                                    <tr class="bg-slate-50">
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-slate-700 font-medium">活动参与资格</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-green-700 bg-green-50 font-semibold">可参与新客专属活动</td>
                                        <td class="border border-slate-300 px-4 py-3 text-sm text-center text-slate-500">仅限老客活动</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Recommendation Note -->
                        <div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
                            <div class="flex">
                                <svg class="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                <div class="text-sm text-amber-800">
                                    <strong>温馨提示：</strong>如果您的企业已在目标云厂商注册过账号，建议使用关联公司或新设立的企业主体进行注册，以享受新用户专属优惠。
                                </div>
                            </div>
                        </div>

                        <!-- Don't show again checkbox -->
                        <div class="flex items-center mb-4">
                            <input type="checkbox" id="dont-show-again" class="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary">
                            <label for="dont-show-again" class="ml-2 text-sm text-slate-600">30天内不再提示</label>
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-center">
                            <button type="button" id="close-guidance-popup" disabled
                                    class="bg-primary hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-md transition-colors min-w-[200px]">
                                我已了解 (<span id="countdown-timer">${countdown}</span>s)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHtml);

        const closeBtn = document.getElementById('close-guidance-popup');
        const countdownTimer = document.getElementById('countdown-timer');
        const dontShowAgainCheckbox = document.getElementById('dont-show-again');
        const popup = document.getElementById('new-entity-guidance-popup');

        // Start countdown
        countdownInterval = setInterval(() => {
            countdown--;
            if (countdownTimer) {
                countdownTimer.textContent = countdown;
            }
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                if (closeBtn) {
                    closeBtn.disabled = false;
                    closeBtn.textContent = '我已了解';
                }
            }
        }, 1000);

        // Close button handler
        const handleClose = () => {
            if (countdown > 0) return; // Don't close if countdown not finished

            // Check if "don't show again" is checked
            if (dontShowAgainCheckbox?.checked) {
                // Set expiration to 30 days from now
                const expirationTime = Date.now() + (30 * 24 * 60 * 60 * 1000);
                localStorage.setItem('hideNewEntityPopupUntil', expirationTime.toString());
            }

            // Clean up
            clearInterval(countdownInterval);
            popup?.remove();

            // Call the callback
            if (typeof onClose === 'function') {
                onClose();
            }
        };

        closeBtn?.addEventListener('click', handleClose);
    }

    /**
     * Reset all IDC filters to their default state
     */
    function resetIdcFilters() {
        const filterGroups = ['manufacturer', 'region', 'level', 'billing', 'scope', 'resourceType', 'gpu', 'productType'];
        filterGroups.forEach(group => {
            currentFilters[group] = 'all';
            const buttons = document.querySelectorAll(`[data-filter-group="${group}"] button`);
            buttons.forEach(btn => {
                btn.classList.remove('filter-btn-active');
                btn.disabled = false;
                btn.classList.remove('filter-disabled');
                if (btn.dataset.filter === 'all') {
                    btn.classList.add('filter-btn-active');
                }
            });
        });
        
        // Keep vendor filter row visible - it's now always shown
        // if (vendorFilterRow) vendorFilterRow.classList.add('hidden');
        
        // Keep filters enabled in IDC mode for normal usage
        // enableOtherFilters(false); // Removed - we want filters to be usable
    }

    /**
     * Enables or disables other filter groups based on manufacturer selection
     * @param {boolean} enable - Whether to enable or disable the filters
     * @deprecated This function is no longer used as we keep all filters enabled
     */
    function enableOtherFilters(enable) {
        // This function is deprecated - we now keep all filters enabled
        // to allow users to filter by product type, level, etc. regardless of manufacturer selection
        return;
        
        /* Old logic kept for reference:
        const filterGroups = ['region', 'level', 'billing', 'scope', 'resourceType', 'gpu', 'productType'];
        filterGroups.forEach(group => {
            const buttons = document.querySelectorAll(`[data-filter-group="${group}"] button`);
            buttons.forEach(btn => {
                if (enable) {
                    btn.disabled = false;
                    btn.classList.remove('filter-disabled');
                } else {
                    btn.disabled = true;
                    btn.classList.add('filter-disabled');
                    // Reset to 'all' when disabled
                    btn.classList.remove('filter-btn-active');
                    if (btn.dataset.filter === 'all') {
                        btn.classList.add('filter-btn-active');
                    }
                }
            });
        });
        
        // Reset other filters when manufacturer changes
        if (!enable) {
            filterGroups.forEach(group => {
                currentFilters[group] = 'all';
            });
        }
        */
    }

    /**
     * Update manufacturer filter buttons based on selected region.
     * @param {string} region - 区域名 or 'all' for default
     */
    function updateManufacturerOptionsForRegion(region) {
        if (!vendorButtonsContainer) return;
        
        const REGION_TO_MANUFACTURERS = {
            '甘肃': ['服务商一'],
            '西北': ['服务商二', '服务商三'],
            '华北': ['服务商四'],
            'all': ['服务商一', '服务商二', '服务商三', '服务商四'] // All manufacturers when region is "全部"
        };
        
        const vendors = (REGION_TO_MANUFACTURERS[region] && REGION_TO_MANUFACTURERS[region].length)
            ? REGION_TO_MANUFACTURERS[region]
            : ['服务商一']; // Fallback to default
            
        const baseBtn = '<button class="filter-btn filter-btn-active" data-filter="all">全部</button>';
        const vendorBtns = vendors.map(v => `<button class="filter-btn" data-filter="${v}">${v}</button>`).join('');
        vendorButtonsContainer.innerHTML = baseBtn + vendorBtns;

        // Ensure buttons are enabled
        vendorButtonsContainer.querySelectorAll('button').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('filter-disabled');
        });
        
        // Reset manufacturer filter to "all" when updating options
        currentFilters.manufacturer = 'all';
    }

    /**
     * 根据当前筛选条件决定展示的数据。
     * 当 区域=全部 时，显示所有区域的产品；当 区域=甘肃 时，显示甘肃的产品。
     * 只在算力来源为IDC时生效。
     * @returns {void}
     */
    function updateProductsForFilters() {
        // 清空当前数据
        productData.length = 0;
        
        // 只在IDC模式下处理产品数据
        if (currentFilters.powerSource === 'IDC') {
            const vendor = currentFilters.manufacturer;
            let list = [];
            
            if (currentFilters.region === 'all' || currentFilters.region === '全部') {
                // 显示所有区域的产品
                list = ALL_PRODUCTS.slice(); // Copy all products from all regions
            } else {
                // 根据特定区域筛选产品
                list = ALL_PRODUCTS.filter(p => p.region === currentFilters.region);
            }
            
            // 根据服务商筛选
            if (vendor && vendor !== 'all') {
                list = list.filter(p => p.manufacturer === vendor);
            }
            
            list.forEach(p => productData.push(p));
        }
    }

    if (filtersContainer) {
        filtersContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
                const group = e.target.parentElement.dataset.filterGroup;
                const value = e.target.dataset.filter;
                
                if (group && value) {
                    currentFilters[group] = value;
                    
                    // Update active button style
                    e.target.parentElement.querySelectorAll('button').forEach(btn => {
                        btn.classList.remove('filter-btn-active');
                    });
                    e.target.classList.add('filter-btn-active');

                    // Handle power source selection
                    if (group === 'powerSource') {
                        switchPowerSource(value);
                        // Clear product data when switching to cloud providers
                        if (value === '云厂商') {
                            productData.length = 0;
                            renderProducts();
                        } else {
                            // Re-render products for IDC
                            updateProductsForFilters();
                            renderProducts();
                        }
                        return; // Early return to avoid other filter logic
                    }

                    // Handle cloud provider selection
                    if (group === 'cloudProvider') {
                        handleCloudProviderSelection(value);
                        return;
                    }

                    // Only handle IDC filters if power source is IDC
                    if (currentFilters.powerSource !== 'IDC') {
                        return;
                    }

                    // Handle manufacturer selection - keep other filters enabled
                    if (group === 'manufacturer') {
                        // Always keep other filters enabled regardless of manufacturer selection
                        // This allows users to filter by product type, level, etc. even when manufacturer="全部"
                        // enableOtherFilters(true); // Already enabled, no need to change
                    }

                    // Handle region selection - update vendor options but keep filter visible
                    if (group === 'region') {
                        if (value === 'all') {
                            currentFilters.manufacturer = 'all';
                            // Reset vendor to show default options and set "全部" as active
                            updateManufacturerOptionsForRegion('all');
                        } else {
                            // Update vendor options based on selected region
                            updateManufacturerOptionsForRegion(value);
                        }
                    }

                    // Handle level description
                    if (group === 'level') {
                        updateLevelDescription(value);
                    }

                    // 根据筛选条件重置数据源
                    updateProductsForFilters();
                    renderProducts();
                }
            }
        });
    }
    
    function updateLevelDescription(level) {
        const descriptionEl = document.getElementById('level-description');
        if (!descriptionEl) return;

        const description = levelDescriptions[level] || '';
        
        descriptionEl.style.height = description ? '1.5rem' : '0';
        descriptionEl.style.marginTop = description ? '0.5rem' : '0';
        descriptionEl.style.opacity = 0;

        setTimeout(() => {
            descriptionEl.textContent = description;
            descriptionEl.style.opacity = 1;
        }, 150);
    }
    
    // Cloud provider form handlers
    const submitInvitationBtn = document.getElementById('submit-invitation');
    
    /**
     * Simulate checking if the company is a new user for the cloud provider
     * In production, this would be an API call to the cloud provider's system
     * @param {string} companyName - Company name
     * @param {string} creditCode - Unified credit code
     * @param {string} phoneNumber - Phone number
     * @param {string} email - Email address
     * @param {string} provider - Cloud provider name
     * @returns {Promise<{isNew: boolean, reason?: string}>}
     */
    async function checkNewUserStatus(companyName, creditCode, phoneNumber, email, provider) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulated existing users database (for demo purposes)
        const existingUsers = {
            creditCodes: ['91110000MA01ABCD12', '91310000MA02EFGH34'],
            phones: ['13800138000', '13900139000'],
            emails: ['existing@company.com', 'registered@enterprise.cn']
        };
        
        // Check if any of the provided info already exists
        if (existingUsers.creditCodes.includes(creditCode)) {
            return { isNew: false, reason: '该统一信用代码已在' + provider + '注册过账号' };
        }
        if (existingUsers.phones.includes(phoneNumber)) {
            return { isNew: false, reason: '该手机号已在' + provider + '注册过账号' };
        }
        if (existingUsers.emails.includes(email)) {
            return { isNew: false, reason: '该邮箱已在' + provider + '注册过账号' };
        }
        
        // All checks passed - this is a new user
        return { isNew: true };
    }
    
    /**
     * Show the new user verification result modal
     * @param {boolean} isNew - Whether the user is new
     * @param {string} reason - Reason if not new
     * @param {string} provider - Cloud provider name
     */
    function showVerificationResult(isNew, reason, provider) {
        // Remove existing modal if any
        const existingModal = document.getElementById('verification-result-modal');
        if (existingModal) existingModal.remove();
        
        // Cloud provider invitation links
        const providerLinks = {
            '阿里云': 'https://cn.aliyun.com/daily-act/ecs/activity_selection?from_alibabacloud=&userCode=cu2il7k2&gad_source=1&gad_campaignid=23089212124&gbraid=0AAAAAo5RAXubFIaqMDslqhQG9HAu26X5V&gclid=Cj0KCQiA_8TJBhDNARIsAPX5qxSMiAfwI_kAcimfDaO3gCc-pZ4a7OpN3RhWj6SMsyKCuafRTvVVssMaAtBeEALw_wcB',
            '腾讯云': 'https://cloud.tencent.com/',
            '火山云': 'https://www.volcengine.com/',
            '华为云': 'https://www.huaweicloud.com/'
        };
        
        const inviteLink = providerLinks[provider] || providerLinks['阿里云'];
        
        const modalHtml = `
            <div id="verification-result-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                    <div class="p-6">
                        ${isNew ? `
                            <!-- Success State -->
                            <div class="text-center">
                                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                    <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-slate-800 mb-2">验证通过</h3>
                                <p class="text-sm text-slate-600 mb-4">
                                    恭喜！您的企业信息验证通过，符合${provider}新用户条件。
                                </p>
                                <p class="text-sm text-slate-500 mb-6">
                                    点击下方按钮前往${provider}专属邀请页面完成注册。
                                </p>
                                <div class="space-y-3">
                                    <a href="${inviteLink}" target="_blank" rel="noopener noreferrer"
                                       class="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition-colors text-center">
                                        前往${provider}注册
                                    </a>
                                    <button type="button" id="close-verification-modal"
                                            class="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors">
                                        关闭
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <!-- Failure State -->
                            <div class="text-center">
                                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                    <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-slate-800 mb-2">验证未通过</h3>
                                <p class="text-sm text-slate-600 mb-4">
                                    抱歉，您的企业信息不符合${provider}新用户条件。
                                </p>
                                <div class="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
                                    <p class="text-sm text-red-700">
                                        <strong>原因：</strong>${reason}
                                    </p>
                                </div>
                                <p class="text-xs text-slate-500 mb-4">
                                    如有疑问，请联系客服或尝试使用其他企业信息。
                                </p>
                                <button type="button" id="close-verification-modal"
                                        class="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors">
                                    关闭
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add close button handler
        document.getElementById('close-verification-modal')?.addEventListener('click', () => {
            document.getElementById('verification-result-modal')?.remove();
        });
        
        // Close on backdrop click
        document.getElementById('verification-result-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'verification-result-modal') {
                e.target.remove();
            }
        });
    }
    
    if (submitInvitationBtn) {
        submitInvitationBtn.addEventListener('click', async () => {
            const companyName = document.getElementById('company-name')?.value.trim();
            const creditCode = document.getElementById('credit-code')?.value.trim();
            const phoneNumber = document.getElementById('phone-number')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const provider = currentFilters.cloudProvider || '阿里云';
            
            // Validate required fields
            if (!companyName || !creditCode || !phoneNumber || !email) {
                if (window.suanduoToast) {
                    window.suanduoToast.error('请填写完整的企业信息');
                } else {
                    alert('请填写完整的企业信息');
                }
                return;
            }
            
            // Validate credit code length
            if (creditCode.length !== 18) {
                if (window.suanduoToast) {
                    window.suanduoToast.error('统一信用代码必须为18位');
                } else {
                    alert('统一信用代码必须为18位');
                }
                return;
            }
            
            // Validate phone number format (Chinese mobile phone)
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(phoneNumber)) {
                if (window.suanduoToast) {
                    window.suanduoToast.error('请输入正确的手机号');
                } else {
                    alert('请输入正确的手机号');
                }
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (window.suanduoToast) {
                    window.suanduoToast.error('请输入正确的邮箱地址');
                } else {
                    alert('请输入正确的邮箱地址');
                }
                return;
            }
            
            // Show loading state
            submitInvitationBtn.disabled = true;
            submitInvitationBtn.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>验证中...</span>';
            
            try {
                // Check if the company is a new user
                const result = await checkNewUserStatus(companyName, creditCode, phoneNumber, email, provider);
                
                // Show verification result modal
                showVerificationResult(result.isNew, result.reason, provider);
                
            } catch (error) {
                console.error('Verification error:', error);
                if (window.suanduoToast) {
                    window.suanduoToast.error('验证失败，请稍后重试');
                } else {
                    alert('验证失败，请稍后重试');
                }
            } finally {
                // Reset button state
                submitInvitationBtn.disabled = false;
                submitInvitationBtn.textContent = '提交';
            }
        });
    }

    // Initial render for supermarket
    if (document.getElementById('supermarket-page')) {
        // Initialize with IDC mode
        switchPowerSource('IDC');
        // Keep filters enabled in IDC mode - user can select them normally
        updateProductsForFilters();
        renderProducts();
        updateLevelDescription('all');
    }
});
