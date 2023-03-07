const allImages = document.getElementsByTagName('img');
for (let i = 0; i < allImages.length; i++) {
    allImages[i].ondragstart = function () { return false; };
}
let time = parseInt(sessionStorage.getItem('time'));
let seconds = Math.round(time / 1000 * 10) / 10
document.getElementById('time-output').innerHTML = seconds;
document.getElementById('dif-output').innerHTML = sessionStorage.getItem('difficulty');

document.getElementById('again').addEventListener('click', () => {
    sessionStorage.setItem('time', new Date());
    window.location.href = 'puzzle.html';
});

document.getElementById('back').addEventListener('click', () => {
    window.location.href = '../../index.html';
});