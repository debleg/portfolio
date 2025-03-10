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
          dialog.classList.add("bloom"); //add base animation class independently
          setTimeout(() => {
            dialog.classList.add("active"); //needs slight delay to trigger and show
          }, 1);
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
        if (dialog) {
          dialog.classList.remove("active"); //remove effect first so animation can play in the other direction
          setTimeout(() => {
            dialog.classList.remove("bloom");
            dialog.close();
          }, 320); //needs delay to happen, same as animation length in sass/css
        }
      }
    }
  });

  //the following allow clicking on a menu link to be redirected to a different section of the page without the dialog remaining open and preventing scroll
  const menuDialog = document.getElementById(
    "menu-dialog"
  ) as HTMLDialogElement | null;

  const menuInternalLinks = document.querySelectorAll<HTMLAnchorElement>(
    "#menu-dialog .header__menu--link"
  );

  menuInternalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuDialog) {
        menuDialog.close();
      }
    });
  });
}
