import React, { Component } from 'react';

class Menu extends Component{

    render() {
        return(
        <div className="Menu">
            <h2>Bienvenue</h2>
            <h3>Règles</h3>
            <ul>
                <li>Vous allez jouer en 1 contre 1</li>
                <li>Vous allez tous les 2 incarner un snake</li>
                <li>Vous pouvez manger un fruit pour grandir</li>
                <li>Celui qui atteint 15 points en premier gagne la partie, il n'y pas de collision entre joueur</li>
                <li>Si un des joueurs entre en collision avec un mur, il perd même s'il a un meilleur score</li>
            </ul>
            <h3>Touches</h3>
            <h4>Joueur 1 (Snake Vert)</h4>
            <p>Touches : Z,Q,S,D</p>
            <h4>Joueur 2 (Snake Bleu)</h4>
            <p>Touches : O,K,L,M (Car les flèches feront bouger la page)</p>
        </div>
        )
    }
}

export default Menu;




