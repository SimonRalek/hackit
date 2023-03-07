class Tractor extends Vehicle {
    constructor(posx, posy) {
        super(posx,posy);
        this.spriteNormal = new Image();
        this.spriteNormal.src = `../assets/venkov/onRoad.png`;
        this.spriteNormal.width = 69;
        this.spriteNormal.height = 53;
        this.spriteOutside = new Image();
        this.spriteOutside.src = `../assets/venkov/offRoad.png`;
        this.size = { x: this.spriteNormal.width, y: this.spriteNormal.height };
        this.pos = { x: posx - this.size.x / 2, y: posy - this.size.y / 2 };
    }
    draw() {
        if (!intersect(this.getPolygon(), map1BetterData).length == 0) {
            ctx.save();
            ctx.translate(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
            ctx.rotate(-this.rotation);
            ctx.drawImage(this.spriteNormal, -this.size.x / 2, -this.size.y / 2);
            ctx.restore();
            this.offroad = false;
        } else {
            ctx.save();
            ctx.translate(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
            ctx.rotate(-this.rotation);
            ctx.drawImage(this.spriteOutside, -this.size.x / 2, -this.size.y / 2);
            ctx.restore();
            this.offroad = true;
        }
    }
}