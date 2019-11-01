import React from 'react';
import Menu from './Menu';
import SnakeJ1 from './SnakeJ1';
import SnakeJ2 from './SnakeJ2';
import Food from './Food';

const coordonneeAleatoire = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = { //sera appellé pour revenir à l'état initial quand la partie se termine
  food: coordonneeAleatoire(),
  vitesseJ1: 100,
  vitesseJ2: 100,
  directionJ1: '', //Pas d'initialisation pour ne pas les faire bouger dès le lancement de la page
  directionJ2: '',
  scoreJ1: 2,
  scoreJ2: 2,
  snakePixelJ1: [ //Le joueur 1 commence au coin TopLeft 
    [0,0],
    [2,0]
  ],
  snakePixelJ2: [ //Le joueur 2 commence au coin BottomRight
    [98,98],
    [96,98]
  ]
}

class App extends React.Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnakeJ1, this.state.vitesseJ1);
    setInterval(this.moveSnakeJ2, this.state.vitesseJ2);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.verifCollision();
    this.verifManger();
    this.verifScore();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 90: //Z
        this.setState({directionJ1: 'HAUTJ1'});
        break;
      case 83: //S
        this.setState({directionJ1: 'BASJ1'});
        break;
      case 81: //Q
        this.setState({directionJ1: 'GAUCHEJ1'});
        break;
      case 68: //D
        this.setState({directionJ1: 'DROITEJ1'});
        break;
      case 79: //O
        this.setState({directionJ2: 'HAUTJ2'});
        break;
      case 76: //L
        this.setState({directionJ2: 'BASJ2'});
        break;
      case 75: //K
        this.setState({directionJ2: 'GAUCHEJ2'});
        break;
      case 77: //M
        this.setState({directionJ2: 'DROITEJ2'});
        break;
      default:
        break;
    }
  }

  moveSnakeJ1 = () => { //Mouvement du joueur 1
    let pixels = [...this.state.snakePixelJ1];
    let tete = pixels[pixels.length - 1];

    switch (this.state.directionJ1) {
      case 'DROITEJ1':
        tete = [tete[0] + 2, tete[1]];
        break;
      case 'GAUCHEJ1':
        tete = [tete[0] - 2, tete[1]];
        break;
      case 'BASJ1':
        tete = [tete[0], tete[1] + 2];
        break;
      case 'HAUTJ1':
        tete = [tete[0], tete[1] - 2];
        break;
      default:
        break;
    }
    pixels.push(tete);
    pixels.shift();
    this.setState({
      snakePixelJ1: pixels
    })
  }

  moveSnakeJ2 = () => { //Mouvement du joueur 2
    let pixels = [...this.state.snakePixelJ2];
    let tete = pixels[pixels.length - 1];

    switch (this.state.directionJ2) {
      case 'DROITEJ2':
        tete = [tete[0] + 2, tete[1]];
        break;
      case 'GAUCHEJ2':
        tete = [tete[0] - 2, tete[1]];
        break;
      case 'BASJ2':
        tete = [tete[0], tete[1] + 2];
        break;
      case 'HAUTJ2':
        tete = [tete[0], tete[1] - 2];
        break;
      default:
        break;
    }
    pixels.push(tete);
    pixels.shift();
    this.setState({
      snakePixelJ2: pixels
    })
  }

  verifCollision() {
    let teteJ1 = this.state.snakePixelJ1[this.state.snakePixelJ1.length - 1];
    let teteJ2 = this.state.snakePixelJ2[this.state.snakePixelJ2.length - 1];

    if (teteJ1[0] >= 100 || teteJ1[1] >= 100 || teteJ1[0] < 0 || teteJ1[1] < 0) { //Collision J1 / Mur
      alert(`Le joueur 1 a perdu. ScoreJ1 : ${this.state.snakePixelJ1.length-1}, ScoreJ2 : ${this.state.snakePixelJ2.length}` );
      this.setState(initialState); 
    }

    if (teteJ2[0] >= 100 || teteJ2[1] >= 100 || teteJ2[0] < 0 || teteJ2[1] < 0) { //Collision J2 / Mur
      alert(`Le joueur 2 a perdu. ScoreJ1 : ${this.state.snakePixelJ1.length-1}, ScoreJ2 : ${this.state.snakePixelJ2.length}` );
      this.setState(initialState);
    }

    /*if (teteJ2[0] == teteJ1[0]) { //Collision J1/J2, ne fonctionne pas correctement
      
    } */

  }

  verifScore() { //Les conditions de victoire
    let scoreJ1 = this.state.scoreJ1;
    let scoreJ2 = this.state.scoreJ2;
    // eslint-disable-next-line 
    if(scoreJ1==15) {
      alert(`Le joueur 1 remporte la partie!`)
      this.setState(initialState);
    }
    // eslint-disable-next-line 
    else if(scoreJ2==15) {
      alert(`Le joueur 2 remporte la partie!`)
      this.setState(initialState);
    }
  }

  verifManger() {
    let teteJ1 = this.state.snakePixelJ1[this.state.snakePixelJ1.length - 1];
    let teteJ2 = this.state.snakePixelJ2[this.state.snakePixelJ2.length - 1];
    let food = this.state.food;
    // eslint-disable-next-line 
    if(teteJ1[0] == food[0] && teteJ1[1] == food[1]) { //Si le joueur 1 mange le fruit
      this.setState({
        food: coordonneeAleatoire(),
        scoreJ1: this.state.snakePixelJ1.length
      })
      let nouveauSnake = [...this.state.snakePixelJ1];
      nouveauSnake.unshift([])
      this.setState({
        snakePixelJ1: nouveauSnake,
        vitesseJ1: this.state.vitesse*1.02 //Augmente la vitesse de 2% à chaque fois qu'on mange un fruit (N'a pas l'air de fonctionner)
      })
    }
    // eslint-disable-next-line 
    if(teteJ2[0] == food[0] && teteJ2[1] == food[1]) { //Si le joueur 2 mange le fruit
      this.setState({
        food: coordonneeAleatoire(),
        scoreJ2: this.state.snakePixelJ2.length
      })
      let nouveauSnake = [...this.state.snakePixelJ2];
      nouveauSnake.unshift([])
      this.setState({
        snakePixelJ2: nouveauSnake,
        vitesseJ2: this.state.vitesse*1.02 //Augmente la vitesse de 2% à chaque fois qu'on mange un fruit (N'a pas l'air de fonctionner)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Snake 1V1</h1>
        <Menu/>
        <p>Score J1 : {this.state.scoreJ1}</p>
        <p>Score J2 : {this.state.scoreJ2}</p>
        <div className="game">
          <SnakeJ1 snakePixelJ1={this.state.snakePixelJ1}/>
          <SnakeJ2 snakePixelJ2={this.state.snakePixelJ2}/>
          <Food pixel={this.state.food}/>
        </div>
      </div>
    );
  }
}

export default App;
