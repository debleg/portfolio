
//Theme handling based on toggle switch
const themeToggle = document.getElementById("theme-toggle") as HTMLElement | null;
const body = document.body;

//If theme preference is stored, apply on reload
const theme = localStorage.getItem('theme')
if (theme) {
    body.classList.add(theme)
}

//on click the class is changed and the user choice saved in local storage
themeToggle?.addEventListener("click",  () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark")
        localStorage.setItem('theme', 'dark')
    } else {
        body.classList.replace("dark", "light")
        localStorage.setItem('theme', 'light')
    }

})