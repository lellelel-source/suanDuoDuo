/**
 * @file Initializes the financial center page functionality, including the navigation component.
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
            activePage: 'billing',
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

    // --- Financial Center Page Specific Logic ---
    const billingPage = document.getElementById('billing-page');
    const invoicePage = document.getElementById('invoice-page');
    const invoiceBtn = document.getElementById('invoice-btn');

    // Function to show billing section
    function showBilling() {
        billingPage.classList.remove('hidden');
        invoicePage.classList.add('hidden');
    }

    // Function to show invoice section
    function showInvoice() {
        billingPage.classList.add('hidden');
        invoicePage.classList.remove('hidden');
        
        // Initialize the return button when showing invoice section
        if (window.ReturnButton) {
            const returnButton = new ReturnButton({
                text: '返回财务',
                href: '#'
            });
            document.getElementById('return-button-container').innerHTML = returnButton.render();
            
            // Update the return button styling to match the 充值 button style
            const returnLink = document.querySelector('#return-button-container a');
            if (returnLink) {
                // Remove default classes and add button-like styling
                returnLink.className = 'bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-slate-300 transition-colors inline-flex items-center';
                
                // Add click event to the return button
                returnLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showBilling();
                });
            }
        }
    }

    // Event listeners for section switching
    if (invoiceBtn) {
        invoiceBtn.addEventListener('click', showInvoice);
    }
});
