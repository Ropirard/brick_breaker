// Import de la feuille de style
import '../assets/css/style.css'
// Import des assets de sprite
import ballImgSrc from '../assets/img/ball.png';
import paddleImgSrc from '../assets/img/paddle.png';
import brickImgSrc from '../assets/img/brick.png';
import edgeImgSrc from '../assets/img/edge.png';
import Ball from './Ball';
import GameObject from './GameObject';

class Game {

    //context du dessin du canvas
    ctx;
    // Images 
    images = {
        ball: null,
        paddle: null,
        brick: null,
        edge: null
    };
    // State (un objet qui décrit l'état actuel du jeu, les balles, les briques encore présentes, etc..)
    state = {
        // Balles (plusieurs car possible multiball)
        balls: [],
        // Bordure de la mort
        deathEdge: null,
        // Bordure à rebond
        bouncingEdges: [],
        // Paddle
        paddle: null
    }

    start() {
        console.log('jeu démarré');
        // initialisation de l'interface HTML
        this.initHtmlUI();
        // Initialisation des images 
        this.initImages();
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

    // Création des images
    initImages() {
        // Balle
        const imgBall = new Image();
        imgBall.src = ballImgSrc;
        this.images.ball = imgBall;

        // Paddle
        const imgPaddle = new Image();
        imgPaddle.src = paddleImgSrc;
        this.images.paddle = imgPaddle;

        // Brique
        const imgBrick = new Image();
        imgBrick.src = brickImgSrc;
        this.images.brick = imgBrick;

        // Bordure
        const imgEdge = new Image();
        imgEdge.src = edgeImgSrc;
        this.images.edge = imgEdge;
    }

    // Mise en place des objets du jeu dans la scene
    initGameObjects() {
        // Ball
        const ball = new Ball(this.images.ball, 20, 20, 45, 2);
        ball.setPosition(400, 300);
        this.state.balls.push(ball);

        // Dessin des balles
        this.state.balls.forEach( theBall => {
            theBall.draw();
        });

        // Bordure de la mort
        const deathEdge = new GameObject(this.images.edge, 800, 20);
        deathEdge.setPosition(0, 630);
        this.state.deathEdge = deathEdge;
        // TODO : On le dessine ou pas ?

        // Bordure à rebond
        const edgeTop = new GameObject(this.images.edge, 800, 20);
        edgeTop.setPosition(0, 0);
        const edgeRight = new GameObject(this.images.edge, 20, 610);
        edgeRight.setPosition(780, 20);
        const edgeLeft = new GameObject(this.images.edge, 20, 610);
        edgeLeft.setPosition(0, 20);
        this.state.bouncingEdges.push(edgeTop, edgeRight, edgeLeft);

        // Dessin des bordures à rebond
        this.state.bouncingEdges.forEach( theEdge => {
            theEdge.draw();
        });
    }

    // Boucle d'animation
    loop() {

        // == RENDU VISUEL == //

        // On efface tous les dessins
        this.ctx.clearRect(0, 0, 800, 600);
        
        // Dessin des bordures à rebond
        this.state.bouncingEdges.forEach(theEdge => {
            theEdge.draw();
        });

        // Cycle des balles
        this.state.balls.forEach(theBall => {
            theBall.update();


            // TODO : Remplacer par la collision avec les edges

            const bounds = theBall.getBounds();
            // TODO en mieux: détection des collisions
            // Collision avec le coté droit ou gauche de la scène : Inversion du X de la vélocité
            if (bounds.right >= 800 || bounds.left <= 0) {
                theBall.reversedOrientationX();
            }

            if (bounds.bottom >= 600 || bounds.top <= 0) {
                theBall.reversedOrientationY();
            }

            theBall.draw();
        })

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