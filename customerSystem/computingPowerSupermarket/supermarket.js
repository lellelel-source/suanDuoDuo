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
    const cloudDefaultMessage = document.getElementById('cloud-default-message');
    const cloudRegistrationForm = document.getElementById('cloud-registration-form');
    const selectedProviderSpan = document.getElementById('selected-provider');
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
        }
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
    
    if (submitInvitationBtn) {
        submitInvitationBtn.addEventListener('click', () => {
            const companyName = document.getElementById('company-name')?.value.trim();
            const creditCode = document.getElementById('credit-code')?.value.trim();
            const phoneNumber = document.getElementById('phone-number')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            
            // Validate required fields
            if (!companyName || !creditCode || !phoneNumber || !email) {
                // Use toast instead of alert for better UX
                if (window.suanduoToast) {
                    window.suanduoToast.error('请填写完整的企业信息');
                } else {
                    alert('请填写完整的企业信息');
                }
                return;
            }
            
            // Validate credit code length
            if (creditCode.length !== 18) {
                // Use toast instead of alert for better UX
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
            
            // Show success toast and redirect to Manufacturer Link page
            if (window.suanduoToast) {
                window.suanduoToast.success('提交成功');
                
                // Redirect to Manufacturer Link page after showing toast
                setTimeout(() => {
                    window.location.href = '../manufacturerLink/index.html';
                }, 1000); // Wait 1 second to allow user to see the toast
            } else {
                // Fallback if toast is not available
                alert(`提交成功！\n企业名称：${companyName}\n信用代码：${creditCode}\n云厂商：${currentFilters.cloudProvider}`);
                window.location.href = '../manufacturerLink/index.html';
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
