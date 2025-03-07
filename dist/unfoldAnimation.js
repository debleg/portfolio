export function unfoldSection() {
    const unfoldSections = document.querySelectorAll(".unfold");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
            else {
                entry.target.classList.remove("active"); //works both ways, fades out when the element is out of view, up or down
            }
        });
    }, {
        threshold: [0.1, 0.2, 0.8], // Trigger points, adjustable but smoother with these values, originally [0, 0.1, 1] (fully out, partially visible, fully visible)
    });
    unfoldSections.forEach((section) => {
        observer.observe(section);
    });
}
//# sourceMappingURL=unfoldAnimation.js.map