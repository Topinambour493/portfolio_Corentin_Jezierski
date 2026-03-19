let block = null;
let img = null;
const header = document.querySelector('header');


let resizeTimeout;
let dBlockx = 0;
let dBlocky = 0;
let dImgx = 0;
let dImgy = 0;
let animationReady = false;
let ticking = false;
let scaleRatioImg = null;
let scaleRatioBlock = null;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function initFLIP() {

    block = document.querySelector('#leftHeader');
    img = document.querySelector('#rightHeader');

    if (!block || !header) return;

    // FIRST
    const startBlock = block.getBoundingClientRect();
    const startImg = img.getBoundingClientRect();

    // Move element to destination
    header.prepend(block);
    header.append(img);

    // LAST
    const endBlock = block.getBoundingClientRect();
    const endImg = img.getBoundingClientRect();

    // INVERT
    dBlockx = startBlock.left - endBlock.left;
    dBlocky = startBlock.top - endBlock.top;

    dImgx = startImg.left - endImg.left;
    dImgy = startImg.top - endImg.top;

    scaleRatioBlock= endBlock.width / startBlock.width;
    scaleRatioImg = endImg.width / startImg.width;


    animationReady = true;
}

function updateAnimation() {
    if (!animationReady) return;

    // Animation sur le scroll
    let progress = clamp(window.scrollY / Math.min(window.innerHeight *0.8, document.body.scrollHeight - window.innerHeight) , 0, 1);

    // Scale proportionnel
    const scaleBlock = 1 - (1 - scaleRatioBlock) * progress;
    const scaleImg = 1 - (1 - scaleRatioImg) * progress;

    block.style.transformOrigin = 'top right';
    img.style.transformOrigin = 'top left';
    block.style.transform = `
        translate(${dBlockx * (1 - progress)}px, ${dBlocky * (1 - progress)}px)
        scale(${scaleBlock})
    `;
    img.style.transform = `
        translate(${dImgx * (1 - progress)}px, ${dImgy * (1 - progress)}px)
        scale(${scaleImg})
    `;
}


function calculateFLIP() {
    const firstBlock = block.getBoundingClientRect();
    const firstImg = img.getBoundingClientRect();

    // Remettre les transforms à zéro pour calculer le "Last"
    block.style.transform = '';
    img.style.transform = '';

    const lastBlock = block.getBoundingClientRect();
    const lastImg = img.getBoundingClientRect();

    dBlockx = firstBlock.left - lastBlock.left;
    dBlocky = firstBlock.top - lastBlock.top;

    dImgx = firstImg.left - lastImg.left;
    dImgy = firstImg.top - lastImg.top;

    scaleRatioBlock = firstBlock.width / lastBlock.width;
    scaleRatioImg = firstImg.width / lastImg.width;

    animationReady = true;
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateAnimation();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        calculateFLIP();
        updateAnimation();
    }, 100);
});

// Lancer le FLIP une fois que tout est chargé
window.addEventListener('load', () => {
    window.scrollTo(1, 0);
    initFLIP()
    updateAnimation()
});



