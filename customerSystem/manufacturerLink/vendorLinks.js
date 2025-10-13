/**
 * Vendor Links Page JavaScript
 * Handles vendor links management functionality
 */

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeModal();
    initializeVendorActions();
});

/**
 * Initialize the main page components
 */
function initializePage() {
    // Initialize navigation with 'vendors' as active page
    const navigation = new SuanduoNavigation({
        activePage: 'vendors',
        user: {
            name: 'HL 13520841021',
            avatar: 'https://placehold.co/100x100/e3f2fd/2979FF?text=A'
        }
    });

    // Initialize top header
    const topHeader = new TopHeader();

    // Get the containers and initialize components
    const appContainer = document.getElementById('app-container');
    const contentContainer = document.getElementById('content-container');
    
    // Insert top header into app container
    topHeader.init(appContainer);
    
    // Insert navigation sidebar into content container
    navigation.init(contentContainer);
}

/**
 * Initialize modal functionality
 */
function initializeModal() {
    const modal = document.getElementById('add-vendor-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const vendorForm = document.getElementById('vendor-form');

    // Hide modal functions
    function hideModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    closeModalBtn.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Handle form submission
    vendorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleAddVendor();
    });
}

/**
 * Handle adding new vendor
 */
function handleAddVendor() {
    const companyName = document.getElementById('company-name').value;
    const creditCode = document.getElementById('credit-code').value;
    const vendorName = document.getElementById('vendor-name').value;

    // Validate input
    if (!companyName || !creditCode || !vendorName) {
        alert('请填写所有必填字段');
        return;
    }

    // Add new row to table
    addVendorToTable(companyName, creditCode, vendorName);

    // Hide modal
    document.getElementById('add-vendor-modal').classList.add('hidden');
    document.getElementById('add-vendor-modal').classList.remove('flex');

    // Show success message
    showSuccessMessage('厂商添加成功');
}

/**
 * Add vendor to table
 */
function addVendorToTable(companyName, creditCode, vendorName) {
    const tableBody = document.getElementById('vendor-table-body');
    const newRow = document.createElement('tr');
    newRow.className = 'bg-white border-b hover:bg-slate-50';
    
    newRow.innerHTML = `
        <td class="px-6 py-4">${companyName}</td>
        <td class="px-6 py-4">${creditCode}</td>
        <td class="px-6 py-4">${vendorName}</td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="text-primary hover:underline text-sm view-btn">查看</button>
                <button class="text-orange-600 hover:underline text-sm edit-btn">编辑</button>
                <button class="text-red-600 hover:underline text-sm delete-btn">删除</button>
            </div>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Add event listeners to new buttons
    initializeRowActions(newRow);
}

/**
 * Initialize vendor action buttons
 */
function initializeVendorActions() {
    const tableBody = document.getElementById('vendor-table-body');
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        initializeRowActions(row);
    });
}

/**
 * Initialize actions for a specific row
 */
function initializeRowActions(row) {
    const viewBtn = row.querySelector('.view-btn');
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    
    if (viewBtn) {
        viewBtn.addEventListener('click', function() {
            const companyName = row.cells[0].textContent;
            alert(`查看厂商: ${companyName}`);
        });
    }
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const companyName = row.cells[0].textContent;
            alert(`编辑厂商: ${companyName}`);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const companyName = row.cells[0].textContent;
            if (confirm(`确定要删除厂商 "${companyName}" 吗？`)) {
                row.remove();
                showSuccessMessage('厂商删除成功');
            }
        });
    }
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    // Create temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
