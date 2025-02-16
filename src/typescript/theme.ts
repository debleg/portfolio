/**
 * Theme handling based on toggle switch
 */

export function themeHandling() {
  const themeToggleInput = document.getElementById(
    "theme-toggle"
  ) as HTMLInputElement | null;
  const lightLabel = document.querySelector(
    ".to-light-theme"
  ) as HTMLElement | null;
  const darkLabel = document.querySelector(
    ".to-dark-theme"
  ) as HTMLElement | null;
  const body = document.body;

  /**
   * Apply theme preference on reload if stored, else applies light by default
   */
  function applyTheme() {
    const theme = localStorage.getItem("theme");
    if (theme == "light") {
      body.classList.add("light");
      themeToggleInput!.checked = false;
    }
    if (theme == "dark") {
      body.classList.add("dark");
      themeToggleInput!.checked = true;
    } else {
      body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }

  applyTheme();

  /**
   * Called when toggle is interacted with
   * the class is changed
   * the user choice is saved in local storage
   * the input check is saved
   */

  function toggleTheme() {
    if (body.classList.contains("light")) {
      body.classList.replace("light", "dark");
      themeToggleInput!.checked = true;
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.replace("dark", "light");
      themeToggleInput!.checked = false;
      localStorage.setItem("theme", "light");
    }
  }

  //due to visually hidden and tab index -1 the checkbox itself can't be used as target, the labels are what the user interacts with instead
  [lightLabel, darkLabel].forEach((label) => {
    label?.addEventListener("click", toggleTheme);

    //for keyboard accessibility
    label?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); //no scroll on space bar press
        toggleTheme();
      }
    });
  });
}
