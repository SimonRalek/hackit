document.addEventListener("DOMContentLoaded", () => {

    const allImages = document.getElementsByTagName('img');
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].ondragstart = function () { return false; };
    }
    const images = document.getElementsByClassName('grid')[0].getElementsByTagName('img');
    initSelection(images);

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', (e) => {
            selectImg(document.getElementsByClassName('selectedImg')[0], false);
            selectImg(e.target, true);
        });
    }

    document.getElementById('start').addEventListener('click', (e) => {
        let selectedImg = document.getElementsByClassName('selectedImg')[0];

        window.location.href = selectedImg.dataset.href;
    });
    

});

function selectImg(el, exp) {
    if (exp) {
        el.classList.add('selectedImg');
        el.style.outline = '4px solid red';
        return;
    }

    el.classList.remove('selectedImg');
    el.style.outline = 'none';
}

function initSelection(images, pieces) {
    selectImg(images[0], true);
}