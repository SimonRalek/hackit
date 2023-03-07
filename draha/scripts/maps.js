let venkovData = [137, 89, 591, 83, 593, 446, 139, 458, 146, 391, 518, 389, 519, 149, 122, 159];
let map1BetterData = getData(venkovData);
let map1ImportantPts = [178, 127, 180, 426];  //bod pro start a bod pro konec

let poustData = [25, 25, 250, 25, 250, 200, 520, 200, 520, 500, 740, 500, 740, 25, 840, 25, 840, 620, 400, 620, 400, 330, 150, 330, 150, 145, 25, 145];
let map2BetterData = getData(poustData);
let map2ImportantPts = [90,90, 790, 55];

let formulaData = [35,275,165,275,350,30,835,30,835,565,720,565,720,140,415,140,300,285,520,570,835,570,835,600,520,600,270,350,35,350];
let map3BetterData = getData(formulaData);
let map3ImportantPts = [90,325, 780, 580];

let mapsData = [{data: venkovData, data2: map1BetterData, importantPts: map1ImportantPts},
    {data: poustData, data2: map2BetterData, importantPts: map2ImportantPts},
    {data: formulaData, data2: map1BetterData, importantPts: map3ImportantPts},
]
function getData(input) {
    let data = new Array(); //potřeba pro nový algoritmus protnutí vozidla
    for (var i = 0; i < input.length; i += 2) {
        data.push({ x: input[i], y: input[i + 1] });
    }
    return data;
}