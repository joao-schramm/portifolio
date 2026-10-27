document.addEventListener("mousemove", (event) => {
    document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
});