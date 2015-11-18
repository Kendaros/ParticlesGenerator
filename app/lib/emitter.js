import { Graphics } from 'pixi.js'

import Particle from './particle'
import Utils from '../utils/number-utils'

class Emitter {
    constructor(scene){

        this.scene = scene;
        this.particles = [];
        this.pool = [];
        this.currentTime = 0;
        this.nb = 40000;

        this.options = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };



        for (let i = 0; i < this.nb; i++) {

            let particle = new Particle(this.options);
            this.pool.push(particle);
        }

        this.throw(1);

    }

    getParticleFromPool() {
        let p = this.pool[0];

        p.reset(this.options);

        this.pool.splice(0,1);
        return p;
    }

    returnParticleToPool(particle, index) {
        this.pool.push(particle);

        this.particles.splice(index, 1);
        this.scene.removeChild(this.particles[index]);
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

            if(this.currentTime > 10) {
                this.currentTime = 0;
                this.throw(1);
            }

            if(!this.particles[i].isAlive){

                this.returnParticleToPool(this.particles[i], i);
            }

            //console.info(this.particles[i].life);
        }
        this.currentTime += dt;
    }
}

export default Emitter