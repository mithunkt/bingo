import React from 'react';
import Cell from './components/Cell'
import Bingo from './components/Bingo'
import useCellState from './hooks/useCellState'
import './App.css';

const App = () => {

  const {cellData, updateCellData, bingoCount} = useCellState()

  const cellClickHandler = (event) => {
    const cellId = event.currentTarget.id
    updateCellData(cellId, 'select')
  }

  const resetHandler = () => updateCellData('', 'reset')

  return (
    <div className="app">
      <header className="app-header">
        Bingo Game
      </header>
      <Bingo status={bingoCount}/>
      <section>
        <div className="cell-container">
          { cellData && cellData.map((item) => (
            <Cell 
              {...item}
              onClick={ cellClickHandler }
            />
          )) }
        </div>
        <div className="controls">
          <button className="btn btn-red" onClick={ resetHandler }>{'Reset'}</button>
        </div>
      </section>
    </div>
  );
}

export default App;