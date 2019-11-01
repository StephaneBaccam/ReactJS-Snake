/*import React, { Component } from 'react';

class Snake extends Component{

    render() {
        //console.log(this.props);
        const {snakePixelJ1} = this.props;
        const snake = snakePixelJ1.map((pixel,i) => {
            const style = {
                left: `${pixel[0]}$`,
                top: `${pixel[1]}$`
            }
            return(
                <div className="snakePixelJ1" key={i} style={style}></div>
            )
        })
        return(
           <div className="game">
                {snake}
           </div>
        )
    }
}

export default Snake; */ //^Ne fonctionne pas

import React from 'react';

export default (props) => {
  return (
    <div className="snakeJ1">
      {props.snakePixelJ1.map((pixel, i) => {
        const style = {
          left: `${pixel[0]}%`,
          top: `${pixel[1]}%`
        }
        return (
          <div className="snakePixelJ1" key={i} style={style}></div>
        )
      })}
    </div>
  )
}