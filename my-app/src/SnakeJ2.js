import React from 'react';

export default (props) => {
  return (
    <div className="snakeJ2">
      {props.snakePixelJ2.map((pixel, i) => {
        const style = {
          left: `${pixel[0]}%`,
          top: `${pixel[1]}%`
        }
        return (
          <div className="snakePixelJ2" key={i} style={style}></div>
        )
      })}
    </div>
  )
}