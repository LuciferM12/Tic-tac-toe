import { useState } from "react"
import confetti from "canvas-confetti"

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}` //Para poder cambiar de quien es el turno

  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
  
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null es que no hay ganador, false es que hay un empate

  const checkWinner = (newBoard) =>{
    //Se revisa todo el arreglo de ganadores
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]){
        return newBoard[a] //Retorna al ganador de la partida 
      }
    }
    return null
  }

  //Resetea todos los estados a los iniciales logrando que se pueda volver a jugar
  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square)=> square != null) //Verifica que todas las posiciones del arreglo estan ocupadas.
  }

  const updateBoard = (index) =>{
    //Si la posición ya tiene algo, entonces no lo actualizamos o si ya hay un ganador
    if(board[index] || winner) return
    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn //x u o
    setBoard(newBoard) 
    //Cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)
    //revisar si hay ganbador
    const newWinner = checkWinner(newBoard)
    if(newWinner)
    {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){//Checar si el juego se ha terminado
      setWinner(false) //Empate
    }

  }


  return (
    <main className="board">
      <h1>Tic Tac Toe </h1>
      <button onClick={resetGame}>Resetea el juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index} 
                index = {index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner != null &&(
          <section className="winner"> 
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano: ' 
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square> }
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
