import React from 'react'

const Cell = ({onClick, id, isSelected, isLive, isWinner}) => {
    const getClassName = () => {
        let className = 'cell'
        if (isSelected) { className = className + ' live' }
        if (isWinner) { className = className + ' winner' }
        return className
    }

    return (
        <div
            className={getClassName()}
            id={id}
            key={id}
            onClick={onClick}
    >{isLive}</div>
    )
}

export default Cell