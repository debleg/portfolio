export function setupDialogListeners() {
  /* This logic was modified multiple times
    
    Initially it only applied to the mobile menu and stayed relatively simple
    
    Then it had to incorporate the projects and it got complicated and heavily nested
     
    Then icons got in the way of clicking on buttons hence the use of closest
    */

  document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const openButton = target.closest(".open-dialog") as HTMLElement | null;
    if (openButton) {
      const dialogId = openButton.getAttribute("data-dialog-target");
      if (dialogId) {
        const dialog = document.getElementById(
          dialogId
        ) as HTMLDialogElement | null;
        if (dialog) {
          dialog.showModal();
        }
      }
    }

    const closeButton = target.closest(".close-dialog") as HTMLElement | null;
    if (closeButton) {
      const dialogId = closeButton.getAttribute("data-dialog-id");
      if (dialogId) {
        const dialog = document.getElementById(
          dialogId
        ) as HTMLDialogElement | null;
        if (dialog) dialog.close();
      }
    }
  });
}
