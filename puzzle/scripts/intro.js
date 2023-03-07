document.addEventListener("DOMContentLoaded", () => {

    const allImages = document.getElementsByTagName('img');
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].ondragstart = function () { return false; };
    }
    const images = document.getElementsByClassName('images')[0].children;
    addImgListeners(images);
    const pieces = document.getElementsByClassName('count')[0].children;
    initSelection(images, pieces);


    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener('click', (e) => {
            selectCount(document.getElementsByClassName('selectedCount')[0], false);
            selectCount(pieces[i], true);
        });
    }


    document.getElementById('start').addEventListener('click', (e) => {
        sessionStorage.setItem('difficulty', document.getElementsByClassName('selectedCount')[0].dataset.dif);
        sessionStorage.setItem('image', document.getElementsByClassName('selectedImg')[0].src);
        sessionStorage.setItem('count', document.getElementsByClassName('selectedCount')[0].dataset.value);
        sessionStorage.setItem('size', document.getElementsByClassName('selectedCount')[0].dataset.size);
        window.location.href = 'pages/puzzle.html';
    });
    
    document.getElementById('file').addEventListener('change', uploadPicture);
});

function addImgListeners(images) {
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', (e) => {
            selectImg(document.getElementsByClassName('selectedImg')[0], false);
            selectImg(images[i], true);
        });
    }
}


function uploadPicture() {
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = document.createElement("img");
        image.src = e.target.result;
        image.id = 'new';
        image.height = 168;
        image.width = 168;
        sessionStorage.setItem('custom-aspectratio', Math.round(image.width / image.height * 10) / 10);
        if (document.getElementById('new')) {
            document.getElementsByClassName('images')[0].removeChild(document.getElementById('new'));
        }
        document.getElementsByClassName('images')[0].appendChild(image);
    }
    reader.readAsDataURL(file);
    selectImg(document.getElementsByClassName('selectedImg')[0], false);
    setTimeout(() => {
        selectImg(document.getElementById('new'), true);
        addImgListeners(document.getElementsByClassName('images')[0].children);
    }, 100);

}


function selectImg(el, exp) {
    if (exp) {
        el.classList.add('selectedImg');
        el.style.outline = '4px solid red';
        return;
    }

    el.classList.remove('selectedImg');
    el.style.outline = 'none';
}

function selectCount(el, exp) {
    if (exp) {
        el.classList.add('selectedCount');
        el.style.outline = '4px solid red';
        return;
    }

    el.classList.remove('selectedCount');
    el.style.outline = 'none';
}

function initSelection(images, pieces) {
    selectImg(images[0], true);
    selectCount(pieces[0], true);
}