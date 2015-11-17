import { Graphics } from 'pixi.js'

import Particle from './particle'
import Utils from '../utils/number-utils'

class Emitter {
    constructor(scene){

        this.scene = scene;
        this.particles = [];
        this.currentTime = 0;

        this.throw(100);

    }

    throw(nb){

        this.options = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        for (let i = 0; i < nb; i++) {

            let particle = new Particle(this.options);

            this.particles.push(particle);
            this.scene.addChild(particle);

        }

    }

    update(dt){
        for(var i = 0; i < this.particles.length; i++) {
            this.particles[i].move(dt);

            if(this.currentTime > Utils.getRandomInt(1000,2000)) {
                this.currentTime = 0;
                this.throw(Utils.getRandomInt(100,300));
            }

            if(this.particles[i].life <= 0){
                this.particles.splice(i, 1);
                this.scene.removeChild(this.particles[i]);
            }
        }
        this.currentTime += dt;
    }
}

export default Emitter