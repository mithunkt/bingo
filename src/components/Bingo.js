import React from 'react'

const Bingo = ({status}) => {
    let bingoStr = 'BINGO'

    return (
        <div className='bingo-text'>
            { [ ...bingoStr ].map((letter, index) => {
                console.log(typeof letter)
                return (<span className={index < status ? 'bingo-text__selected' : ''}>{ letter }</span>)
}) }
        </div>
    )
}

export default Bingo