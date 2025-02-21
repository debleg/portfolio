export function setupDialogListeners() {
    //complete overhaul: modals need to work on both menu and projects, linking buttons to modals prevents issues, heavy nesting for typescript safety
    document.body.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("open-dialog")) {
            const dialogId = target.getAttribute("data-dialog-target");
            if (dialogId) {
                const dialog = document.getElementById(dialogId);
                if (dialog)
                    dialog.showModal();
            }
        }
        if (target.classList.contains("close-dialog")) {
            const dialogId = target.getAttribute("data-dialog-id");
            if (dialogId) {
                const dialog = document.getElementById(dialogId);
                if (dialog)
                    dialog.close();
            }
        }
    });
}
//# sourceMappingURL=dialogsetup.js.map