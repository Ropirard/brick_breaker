import MovingObject from "./MovingObject";
import theGame from "./Game";

export default class Paddle extends MovingObject
{
    equipment;

    // Propriétés pour l'animation
    animationIndex = 0;
    previousKeyFrameStamp;
    frameRate = 20;

    draw() {
        const sourceY = this.animationIndex * this.size.height;
        theGame.ctx.drawImage(
            this.image,
            0,
            sourceY,
            this.size.width,
            this.size.height,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }

    updateKeyFrame() {
        // Toute 1ère frame
        if(!this.previousKeyFrameStamp) {
            this.previousKeyFrameStamp = theGame.currentLoopStamp;
            return
        }
        const delta = theGame.currentLoopStamp - this.previousKeyFrameStamp

        // Si la frame d'animation de la boucle ne correspond pas au frameRate voulu, on sort
        if(delta < 1000 / this.frameRate) return;

        // Sinon on met à jour l'index d'animation
        this.animationIndex ++;
        if(this.animationIndex > 3) 
            this.animationIndex = 0;

        this.previousKeyFrameStamp = theGame.currentLoopStamp;
    }
}