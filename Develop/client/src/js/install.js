const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // event.preventDefault();
    window.defferedPrompt = event;
    divInstall.classlist.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // do i have to change the start to event? or at least the variable and the output
    const start = window.defferedPrompt;
    if (!start) {
        return;
    }
    start.prompt();
    window.defferedPrompt = null;
    // click event handler i believe
    butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null;
});
