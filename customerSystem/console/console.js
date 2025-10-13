/**
 * @file Initializes the console page functionality, including the navigation component.
 * @author Gemini
 */

/**
 * Executes when the DOM is fully loaded.
 * Configures and initializes the SuanduoNavigation component.
 * @listens DOMContentLoaded
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
            activePage: 'dashboard',
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
});
