
var car;
var old_pos = { x: 0, y: 0 };
var mouse_pos = { x: 0, y: 0 };
var PolygonPts;
const canvas = document.getElementById("GameBoard");
const ctx = canvas.getContext("2d");
var DrawInterval;
var totalDistance = 0;
var offDistance = 0;
var map;
var map_string;
function show(type) {
    canvas.style.display = "block";
    
    map_string = type;
    switch(type) {
        case "venkov": {  
            map = 0;
            car = new Tractor(mapsData[map].importantPts[0], mapsData[map].importantPts[1]);
            break;
        }
        
        case "poust": {  
            map = 1;
            car = new Jeep(mapsData[map].importantPts[0], mapsData[map].importantPts[1]);
            break;
        }
        case "formule": {  
            map = 2;
            car = new Formula(mapsData[map].importantPts[0], mapsData[map].importantPts[1]);
            break;
        }
        default: {
            alert("Script index.js ran on wrong page!");
            break;
        }
    }
    //car = new Formula(map3ImportantPts[0], map3ImportantPts[1]); // TODO menit importantPts a Vehicle
    PolygonPts = mapsData[map].data;
    drawMap();
    car.draw();
    DrawInterval = setInterval(drw, 20);
    addEventListener("click", eventClick);
}

function eventClick(event) {
    var mouse_pos = getMousePos(canvas, event);
    var car_touched = Intersects.pointBox(mouse_pos.x, mouse_pos.y, car.getPolygon()[0].x, car.getPolygon()[0].y, car.size.x, car.size.y);
    if (car_touched) {
        start();
    }
}

function drw() {
    car.draw();
}

function start() {
    removeEventListener("click", eventClick);
    addEventListener("mousemove", (event) => {
        mouse_pos = getMousePos(canvas, event);
        drawMap();
        car.updatePos(mouse_pos);
        car.draw();
        if (checkEndState(mouse_pos)) {
            endTime = new Date();
            var timeDiff = endTime - startTime;
            sessionStorage.setItem("timeDiff", timeDiff/1000);
            sessionStorage.setItem("offDistance", offDistance);
            sessionStorage.setItem("lastMap", map_string);
            window.location.href = '../pages/results.html';
        }
    });
    setInterval(updateCarRotation, 50);
    startTime = new Date();
}

function updateCarRotation() {
    let vecx = mouse_pos.x - old_pos.x;
    let vecy = mouse_pos.y - old_pos.y;
    let distance = Math.sqrt(Math.pow(vecx, 2) + Math.pow(vecy, 2));
    if (distance > 6) {
        car.updateRot({ x: vecx, y: vecy });
        old_pos = mouse_pos;
        totalDistance += distance;
        if (car.offroad) {
            offDistance += distance;
        }
    }
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw background
    //done via css


    //draw path
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.moveTo(PolygonPts[0], PolygonPts[1]);
    for (var i = 2; i < PolygonPts.length; i += 2) {
        ctx.lineTo(PolygonPts[i], PolygonPts[i + 1]);
    }
    ctx.closePath();
    ctx.fill();


    //draw end
    ctx.fillStyle = "rgba(100, 100, 100, 1)";
    ctx.fillRect(mapsData[map].importantPts[2] - 40, mapsData[map].importantPts[3] - 20, 10, 40); 
}
//check if car intercepts with end line
function checkEndState(MousePos) {
    return Intersects.boxBox(car.pos.x, car.pos.y, car.size.x, car.size.y,
        mapsData[map].importantPts[2] - 40, mapsData[map].importantPts[3] - 20, 10, 40);
}