import { useState, useEffect } from 'react'

const CELL_SIZE = 5

const WINNERS = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,6,12,18,24],
    [4,8,12,16,20],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
];

const useCellState = () => {

  const [cellData, setCellData] = useState()
  const [isRunning, setIsRunning] = useState(false)
  const [generation, setGeneration] = useState(0)
  const [currentCount, setCurrentCount] = useState(1)
  const [bingoCount, setBingoCount] = useState(0)
  const [mode, setMode] = useState()

  useEffect(() => {
    setCellData(generateCellData())
  }, [])

  useEffect(() => {
    if(currentCount === 26) { checkBingo() }
  },[cellData])

  const generateCellData = () => {
    let cellData = []
    let id = 0
    for (let x = 0; x < CELL_SIZE; x++) {
        for (let y = 0; y < CELL_SIZE; y++) {
          cellData.push({id, x, y, isLive: null })
          id++
        }
    }
    return cellData
  }

  const checkBingo = () => {
    let finalWinnerCount = 0
    WINNERS.forEach((winnerItem, index) => {
        let cellSelected = 0
        winnerItem.forEach((winnerIndex, item) => {
            let matchingCell = cellData.find((cellIndex) => winnerIndex === cellIndex.id)
            if(matchingCell && matchingCell.isSelected){ 
              cellSelected = cellSelected + 1 
            }
        })
        if (cellSelected >= 5) {
            finalWinnerCount = finalWinnerCount +1
        }
    })
    setBingoCount(finalWinnerCount)
    if (finalWinnerCount >= 5) {console.log('>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<')}
  }

  const updateCellData = (id, mode) => { 
    setMode(mode)
    switch(mode) {
      case 'reset': 
        setIsRunning(false)
        setGeneration(0)
        setCurrentCount(1)
        setBingoCount(0)
        setCellData(generateCellData())
        break;
      case 'select':
        let counterChanged = false 
        setCellData(cellData?.map((cell) => {
          if(cell.id === parseInt(id) && !cell.isLive) {
            counterChanged = true  
            return { ...cell, isLive: currentCount }
          } else {
            return cell
          }
        }))
        if (counterChanged){
            setCurrentCount(currentCount+1)
        }
        if(currentCount === 26) {
            setCellData(cellData?.map((cell) => {
                if(cell.id === parseInt(id)) {
                  return { ...cell, isSelected: !cell.isSelected }
                } else {
                  return cell
                }
            }))
        }
        break;
      case 'game':
        break;              
      default: break;              
    }
  }

  return {
    cellData,
    updateCellData,
    isRunning,
    generation,
    setCellData,
    bingoCount,
  } 

}

export default useCellState