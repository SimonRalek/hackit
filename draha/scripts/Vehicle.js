class Vehicle {
    constructor(posx, posy) {
        this.rotation;
        this.offroad = false;
    }
    updatePos(MousePos) {
        this.pos.x = MousePos.x - this.size.x/2;
        this.pos.y = MousePos.y - this.size.y/2;
    }
    updateRot(DirectionVector) {
        this.rotation = Math.atan2(DirectionVector.x, DirectionVector.y)-Math.PI/2;
    }
    getPolygon() {
        return [
            {x: this.pos.x , y: this.pos.y},
            {x: this.pos.x + this.size.x, y: this.pos.y},
            {x: this.pos.x + this.size.x, y: this.pos.y + this.size.y},
            {x: this.pos.x, y: this.pos.y + this.size.y}
        ];
    }
}