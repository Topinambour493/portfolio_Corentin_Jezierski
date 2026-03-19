
function scrollToProjects() {

    const target = document.querySelector('#projects');
    if (!target) return;

    const offset = window.innerHeight * 0.13; // 13vh
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;

    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * easeInOut(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}