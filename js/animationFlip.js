const block = document.querySelector('#leftHeader');
const img = document.querySelector('#rightHeader');
const header = document.querySelector('header');

let dBlockx = 0;
let dBlocky = 0;
let dImgx = 0;
let dImgy = 0;
let animationReady = false;
let ticking = false;
const minScaleBlock = 0.6;
const minScaleImg = 0.9;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function initFLIP() {
    // FIRST
    const startBlock = block.getBoundingClientRect();
    const startImg = img.getBoundingClientRect();

    // Move element to destination
    header.append(block);
    header.append(img);

    // LAST
    const endBlock = block.getBoundingClientRect();
    const endImg = img.getBoundingClientRect();

    // INVERT
    dBlockx = startBlock.left - endBlock.left;
    dBlocky = startBlock.top - endBlock.top;

    dImgx = startImg.left - endImg.left;
    dImgy = startImg.top - endImg.top;

    animationReady = true;
}

function updateAnimation() {
    if (!animationReady) return;

    // Animation sur 300px de scroll
    const progress = clamp(window.scrollY / 200, 0, 1);

    // Scale proportionnel
    const scaleBlock = 1 - (1 - minScaleBlock) * progress;
    const scaleImg = 1 - (1 - minScaleImg) * progress;

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


window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateAnimation();
            ticking = false;
        });
        ticking = true;
    }
});

// Lancer le FLIP une fois que tout est chargé
window.addEventListener('load', () => {
    initFLIP();
    updateAnimation();
});