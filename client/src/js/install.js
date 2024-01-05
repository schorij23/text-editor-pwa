const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Stores the events
    window.deferredPrompt = event;
    // Remove hidden class from button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    // Shows Prompt
    promptEvent.prompt();
    // Resets deferred prompt, only used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear Prompt
    window.deferredPrompt = null;
});
