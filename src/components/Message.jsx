import React from 'react'

export const Message = ({description, error=true}) => {
    const errorStyles = {
        "color": `${error ? 'red' : 'green'}`,
        "fontSize": "12px",
        "fontWeight": "600",
        "marginTop": "5px",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "padding": "20px 50px",
    }

  return (
    <div style={errorStyles}>
        <h3>{description}</h3>
    </div>
  )
}
