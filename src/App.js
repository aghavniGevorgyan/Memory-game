import { useEffect, useState } from 'react';
import './App.css';
import SingleCards from './components/SingleCards';
const cardImages=[
  {"src":"/img/flower.jpeg",matched:false},
  {"src":"/img/tree.jpg",matched:false},
  {"src":"/img/fox.avif",matched:false},
  {"src":"/img/zebra.jpeg",matched:false},
  {"src":"/img/lion.jpeg",matched:false},
  {"src":"/img/dog.jpg",matched:false}
]
function App() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)

  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)

  const [disabled,setDisabled]=useState(false)

  const shuffleCards= ()=>{
    const shuffledCards =[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id:Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  console.log(cards,turns);

  const handleChoice =(card)=>{
    // console.log(card);
    choiceOne? setChoiceTwo(card):setChoiceOne(card)
  }

  useEffect(()=>{
    if (choiceOne && choiceTwo) {
    setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        // console.log("cards match");
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src===choiceOne.src) {
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetTurns()
      }else{
        // console.log("is not match");
        setTimeout(() => {
          resetTurns()
        }, 1000);
       

      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);
  const resetTurns=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns + 1)
    setDisabled(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New game</button>
      <div className='card-grid'>
            {cards.map(card=>(
              <SingleCards 
                  key={card.id} 
                  card={card} 
                  handleChoice={handleChoice} 
                  flipped={card===choiceOne || card===choiceTwo || card.matched}
                  disabled={disabled}
                  />
            ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
