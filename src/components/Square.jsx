export const Square = ({children, isSelected, updateBoard, index}) =>{
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