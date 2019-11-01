import React from 'react';

export default (props) => {

  const style = {
    left: `${props.pixel[0]}%`,
    top: `${props.pixel[1]}%`
  }

  return (
    <div className="food" style={style}></div>
  )
}