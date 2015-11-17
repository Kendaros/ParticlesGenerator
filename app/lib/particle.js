import { Sprite } from 'pixi.js'

class Particle extends Sprite {
    constructor(options){

        var texture = PIXI.Texture.fromImage("./assets/img/particle.png");

        super(texture);
        this.x = options.x;
        this.y = options.y;
        this.vx = Math.random()*2;
        this.vy = Math.random()*2;
        this.angle =  Math.floor(Math.random() * 360)+1;
        this.life = Math.random()*5000;
        //this.beginFill('0xFFFFFF');
        this.size = Math.random()*2;
        //this.drawCircle(0, 0, this.size);



    }

    move(dt){
        this.x += Math.sin(this.angle * Math.PI/180) * this.vx;
        this.y += Math.cos(this.angle * Math.PI/180) * this.vy;
        if(this.life <= 1000){
            this.alpha =(this.life/1000);
        }
        this.life -= dt;
    }
}

export default Particle