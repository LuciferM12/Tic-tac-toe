import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (newBoard) =>{
    //Se revisa todo el arreglo de ganadores
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]){
        return newBoard[a] //Retorna al ganador de la partida 
      }
    }
    return null
  }

export const checkEndGame = (newBoard) =>{
  return newBoard.every((square)=> square != null) //Verifica que todas las posiciones del arreglo estan ocupadas.
}
