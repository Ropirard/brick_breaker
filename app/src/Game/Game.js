// Import de la feuille de style
import '../assets/css/style.css'
import ballImgSrc from '../assets/img/ball.png';
import CustomMath from './CustomMath';
class Game {

    //context du dessin du canvas
    ctx;
    // Images 
    ballImg;

    // Temporaire : position de base de la balle
    ballX = 400;
    ballY = 300;
    ballSpeed = 8;
    ballAngle = 30;
    ballVelocity = {
        x: this.ballSpeed * Math.cos(CustomMath.degToRad(this.ballAngle)), // Trajectoire de la balle avec 30° d'angle (PI/6)
        y: this.ballSpeed * -1 * Math.sin(CustomMath.degToRad(this.ballAngle))
    };

    start() {
        console.log('jeu démarré');
        // initialisation de l'interface HTML
        this.initHtmlUI();
        // Initialisation des objets du jeu
        this.initGameObjects();
        // Lancement de la boucle
        requestAnimationFrame(this.loop.bind(this));
        // Après la boucle 
    }

    // Méthode 'privée'
    initHtmlUI() {
        const elH1 = document.createElement('h1');
        elH1.textContent = 'Salut';

        document.body.append(elH1);

        const elCanvas = document.createElement('canvas');
        elCanvas.width = 800;
        elCanvas.height = 600;

        document.body.append(elH1, elCanvas);

        //recupération du context de dessin
        this.ctx = elCanvas.getContext('2d');

    }

    // Mise en place des objets du jeu dans la scene
    initGameObjects() {
        //1- On créer une baluise HTML <img> qui sera jamais ajoutée au DOM
        this.ballImg = new Image();
        //2- on récuère le nom de l'image génére par webpack
        this.ballImg.src = ballImgSrc;
        //3- On demande au context de dessiner cette image ds le canvas
        this.ctx.drawImage(this.ballImg, this.ballX, this.ballY);
    }

    // Boucle d'animation
    loop() {
        // Mise à jour de la position de la balle
        this.ballX += this.ballVelocity.x;
        this.ballY += this.ballVelocity.y;

        // TODO : Détection des collisions 
        // Collision avec le coté droit de la scène : Inversion du X de la vélocité
        if( this.ballX + 20 >= 800 || this.ballX <= 0 ) {
            this.ballVelocity.x *= -1;
        }

        // Collision avec le coté bas ou haut de la scène : Inversion du Y de la vélocité
        if( this.ballY + 20 >= 600 || this.ballY <= 0 ) {
            this.ballVelocity.y *= -1;
        }

        // == RENDU VISUEL == //

        // On efface tous les dessins
        this.ctx.clearRect(0, 0, 800, 600);

        // Dessin des objets
        this.ctx.drawImage(this.ballImg, this.ballX, this.ballY);

        // Appel de la frame suivante 
        requestAnimationFrame(this.loop.bind(this));
    }

    //fonction test inutile ds le jeu
    drawTest() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fc0';
        this.ctx.arc(400, 300, 100, 0, Math.PI * 2 - Math.PI / 3);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

const theGame = new Game;
export default theGame;