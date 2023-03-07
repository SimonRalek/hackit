document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('time-output').innerHTML = sessionStorage.getItem("timeDiff");
    document.getElementById('dif-output').innerHTML = Math.round(sessionStorage.getItem("offDistance")) + " px"; 
    document.getElementById('back').addEventListener('click', (e) => {
        window.location.href = '../index.html';
    });
    document.getElementById('again').addEventListener('click', (e) => {
        var lastMap = sessionStorage.getItem("lastMap");
        window.location.href = './'+lastMap+'.html';
    });
});