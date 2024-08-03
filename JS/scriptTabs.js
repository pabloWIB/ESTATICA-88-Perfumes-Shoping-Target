function openTab(event, tabId) {
    // Get all tab content elements
    var contents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    // Get all tab buttons
    var buttons = document.getElementsByClassName('tab-button');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');

    // Highlight the selected tab button
    event.currentTarget.classList.add('active');
}

// Set default tab to be opened
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.tab-button').click();
});

