var canvas = document.getElementById("animacion");
var ctx = canvas.getContext('2d');   //pincel 
var img = new Image();
img.src = "FlappyBirdSprite.png";
const background = new Image();
background.src = 'fondo.png'; 
const tuboArriba = new Image();
tuboArriba.src = 'tuboArri.png'; 
const tuboAbajo = new Image();
tuboAbajo.src = 'tuboAba.png'; 
const winner = new Image();
winner.src = 'winner.png';
const loser = new Image();
loser.src = 'loser.png';

var x = 250;   //flappy
var y = canvas.height/2; //flappy
var flappyWit= 136; //width del flappy
var flappyHeig = 90; //height del flappy
var ancho= 100; //witdth del tubo
var alto = 500;

var dy = 2;
var pasos = 6;                     
var indice = 0;
let movingUp = false; // Variable para controlar el movimiento de la bola
let position = 0; //para el fondo
var numero=0;
var numero2=0;
var nivel=3;
let gameOver = false;
var score=0;
var velocidad=2;

let M = 
   [[0,4,255,180,127,90], 
    [245,4,265,180,133,90],
    [497,4,272,180,136,90],]


var posInicial = 1000;
var posInicial2 = 1000;
var bandera=0;
var ban=0;
var velocidadTubo = 12;

let Tubos = [
    [ //primer nivel
    { "alturaAbajo": 700, "alturaArriba": -250, "alto": 250},
    { "alturaAbajo": 750, "alturaArriba": -200, "alto": 300},
    { "alturaAbajo": 650, "alturaArriba": -300, "alto": 200},
    { "alturaAbajo": 500, "alturaArriba": -450, "alto": 50},
    ],
    [ //segundo nivel
    { "alturaAbajo": 770, "alturaArriba": -180, "alto": 320},
    { "alturaAbajo": 750, "alturaArriba": -100, "alto": 400},
    { "alturaAbajo": 600, "alturaArriba": -250, "alto": 250},
    { "alturaAbajo": 500, "alturaArriba": -350, "alto": 150},
    ],                 
    [ //tercer nivel
    { "alturaAbajo": 700, "alturaArriba": -50,  "alto":450},
    { "alturaAbajo": 600, "alturaArriba": -150, "alto":350},
    { "alturaAbajo": 400, "alturaArriba": -350, "alto":150},
    { "alturaAbajo": 500, "alturaArriba": -250, "alto":250},
    ],
    [ //cuarto nivel
    { "alturaAbajo": 700, "alturaArriba": 0,    "alto":500},
    { "alturaAbajo": 650, "alturaArriba": -50,  "alto":450},
    { "alturaAbajo": 400, "alturaArriba": -300, "alto":200},
    { "alturaAbajo": 500, "alturaArriba": -200, "alto":300},
    ]            
]

    img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
       // setInterval(generaTubo, 5000);
        setInterval(draw,100); //inicia bola
    }
    background.onload = function(){
        moverFondo(); // Inicia la animación de fondo
    }
    
    document.addEventListener("keydown",detectarTecla);

function detectarTecla(e) {
    if (e.keyCode == 32) {
        movingUp = true;
    }
}

document.addEventListener("keyup", function (e) { //detectar cuando se suelta la tecla del espacio
    if (e.keyCode == 32) {
        movingUp = false;
    }
});

function draw() {
    if (gameOver) {
        if (score>=100){
        ctx.font="80px Arial"
        ctx.fillStyle="black"
        ctx.fillText("YOU ARE A WINNER!!!",80,x+100);  
        dibujaWinner();
        return;          
        }else{
        ctx.font="100px Arial"
        ctx.fillStyle="black"
        ctx.fillText("G A M E   O V E R",100,x+100);
        dibujaLoser();
        return;
        }
    }
     
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujaFondo();
    dibujaFondo2();
    dibujaBola();
    dibujaTubo();
    if(bandera==1)
    dibujaTubo2();
    ctx.font="40px Arial"
    ctx.fillStyle="black"
    ctx.fillText("Score :"+score,800,40);
    ctx.font="40px Arial"
    ctx.fillStyle="black"
    ctx.fillText("Nivel :"+(nivel+1),800,80);
    verificaNivel();
    
    if (movingUp)    //si se detecta la tecla
        y -= (dy * pasos);
    else
        y += (dy*pasos)+5;

    if (y > 763){//para que la bola no se pase de los limites
        y=763;
        gameOver= true;
    }    
    if (y < -7)
        gameOver= true;
    
    detectaColision2();
    detectaColision();
}

function dibujaBola(){
    ctx.drawImage(img,M[indice][0],M[indice][1],M[indice][2],M[indice][3],x,y, M[indice][4]/2,M[indice][5]/2);
    indice = (indice + 1) % 3;
}

function dibujaFondo(){
    ctx.drawImage(background, position, 0, canvas.width, canvas.height); 
}

function dibujaWinner(){
    ctx.drawImage(winner, 350, 400, 300, 300); 
}

function dibujaLoser(){
    ctx.drawImage(loser, 350, 400, 300, 300); 
}

function dibujaTubo(){
    if(posInicial>=1000)
        generaAleatorio();
    var niveles;
    niveles=nivel; 
    ctx.drawImage(tuboArriba, posInicial, Tubos[niveles][numero].alturaArriba, ancho, alto);
    ctx.drawImage(tuboAbajo, posInicial, Tubos[niveles][numero].alturaAbajo, ancho, alto);
    posInicial = posInicial-velocidadTubo;  
    if(posInicial<=-100){
        posInicial=1000;   
    }
    if(posInicial<=500)
        bandera=1;
    if(posInicial==100)
        score= score+1;
}

function dibujaTubo2(){
    if(posInicial2>=1000)
        generaAleatorio2();
        var niveless;
        niveless=nivel; 
    ctx.drawImage(tuboArriba, posInicial2, Tubos[niveless][numero2].alturaArriba, ancho, alto);
    ctx.drawImage(tuboAbajo, posInicial2, Tubos[niveless][numero2].alturaAbajo, ancho, alto);
    posInicial2 =posInicial2-velocidadTubo; 
    if(posInicial2<=-100)
        posInicial2=1000;
        
    if(posInicial2==100)
        score +=1;
        
        
}


function dibujaFondo2(){
    const secondBackgroundX = position + canvas.width;
    ctx.drawImage(background, secondBackgroundX, 0, canvas.width, canvas.height);
}


function arriba(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dibujaBola();
    y -= dy*pasos;
    if(y < 0)
    y += dy*pasos;
    console.log(y);
}
    
function moverFondo() {
    position = position-velocidad; //nueva posición del fondo
    if (position <= -canvas.width) 
        position = 0;  //reinicia para la prox imagen seguida 
        requestAnimationFrame(moverFondo);  // llama nuevamente a la función en el sig cuadro disponible
}

function generaAleatorio(){ //numero entre el 0 y 3 
var ran = Math.random(); //num aleatorio entre 0 y 1
ran = ran * 4; //num entre 0 a 4
numero = Math.floor(ran); //redondea
console.log(numero); 
}

function generaAleatorio2(){ //numero entre el 0 y 3 
    var ran2 = Math.random(); //num aleatorio entre 0 y 1
    ran2 = ran2 * 4; //num entre 0 a 4
    numero2 = Math.floor(ran2); //redondea
    }
    
    function verificaNivel(){
        if (score >=10 && score <=29){ //subió a nivel 2
        velocidad = 2; //aumenta la velocidad del paisaje
        velocidadTubo= 15;
        if (posInicial<=-80 || posInicial2<=-80)
            ban=1;
        if (ban==1)
            nivel=1;
        }
        if (score >=30 && score <=59){ //subió a nivel 3
            dy=2;
            velocidad = 3; //aumenta la velocidad del paisaje
            velocidadTubo= 18;
            if (posInicial<=-80 || posInicial2<=-80)
                ban=1;
            if (ban==1)
                nivel=2;
        }
        if (score >=60 && score <=100){ //subió a nivel 4
            dy=2;
            velocidad = 3; //aumenta la velocidad del paisaje
            velocidadTubo= 18;
            if (posInicial<=-80 || posInicial2<=-80)
                ban=1;
            if (ban==1)
                nivel=3;
        }
        if (score==100)
        gameOver=true;
    }

      
      function detectaColision() {
          const tubo = Tubos[nivel][numero];
          if (
            ((x + flappyWit / 2) > posInicial+5) &&
            ((x - flappyWit / 2) < (posInicial +ancho)) &&
            (((y - flappyHeig / 2) < (tubo.alto -45 )) || ((y + flappyHeig / 2) > (tubo.alturaAbajo + 5)))
          ) {
            // Colisión detectada, el juego debe terminar.
            gameOver = true;
          }
      }
  
      function detectaColision2() {
        const tubo2 = Tubos[nivel][numero2];
        if (
          ((x + flappyWit / 2) > posInicial2+5) &&
          ((x - flappyWit / 2) < (posInicial2 +ancho)) &&
          (((y - flappyHeig / 2) < (tubo2.alto -45)) || ((y + flappyHeig / 2) > (tubo2.alturaAbajo + 5)))
        ) {
          gameOver = true;
        }
    }