import { Graphics } from 'pixi.js'

import Particle from './particle'
import Utils from '../utils/number-utils'

class Emitter {
    constructor(scene){

        this.scene = scene;
        this.particles = [];
        this.pool = [];
        this.currentTime = 0;
        this.nb = 10000;

        this.options = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };



        for (let i = 0; i < this.nb; i++) {

            let particle = new Particle(this.options);
            this.pool.push(particle);
        }

        this.throw(100);

    }

    getParticleFromPool() {
        let p = this.pool[0];
        this.pool.splice(0,1);
        return p;
    }

    returnParticleToPool(particle) {
        this.pool.push(particle);
    }

    throw(nb){



        for (let i = 0; i < nb; i++) {

            let particle = this.getParticleFromPool();

            this.particles.push(particle);
            this.scene.addChild(particle);

        }

    }

    update(dt){
        //console.info(this.particles.length, this.pool.length);
        for(var i = 0; i < this.particles.length; i++) {
            this.particles[i].move(dt);

            if(this.currentTime > Utils.getRandomInt(1000,2000)) {
                this.currentTime = 0;
                this.throw(100);
            }

            if(this.particles[i].life <= 0){

                this.returnParticleToPool(this.particles[i]);
                this.particles.splice(i, 1);
                this.scene.removeChild(this.particles[i]);
            }
        }
        this.currentTime += dt;
    }
}

export default Emitter