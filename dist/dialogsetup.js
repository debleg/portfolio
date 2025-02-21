export function setupDialogListeners() {
    /* This logic was modified multiple times
      
      Initially it only applied to the mobile menu and stayed relatively simple
      
      Then it had to incorporate the projects and it got complicated and heavily nested
       
      Then icons got in the way of clicking on buttons hence the use of closest
      */
    document.body.addEventListener("click", (event) => {
        const target = event.target;
        const openButton = target.closest(".open-dialog");
        if (openButton) {
            const dialogId = openButton.getAttribute("data-dialog-target");
            if (dialogId) {
                const dialog = document.getElementById(dialogId);
                if (dialog) {
                    dialog.showModal();
                }
            }
        }
        const closeButton = target.closest(".close-dialog");
        if (closeButton) {
            const dialogId = closeButton.getAttribute("data-dialog-id");
            if (dialogId) {
                const dialog = document.getElementById(dialogId);
                if (dialog)
                    dialog.close();
            }
        }
    });
}
//# sourceMappingURL=dialogsetup.js.map