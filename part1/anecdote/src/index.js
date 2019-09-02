import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Header = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const getNext = () => {
        setSelected(Math.floor(Math.random()*6))
    }
    const [maxVotes, setMVotes] = useState(0)
    const [maxVselect, setMSelect] = useState(0)
    const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})
    const addVote = () => {
        const voted = {...points}
        voted[selected] += 1
        if(voted[selected] > maxVotes){
            setMVotes(voted[selected])
            setMSelect(selected)
        }
        setPoints(voted)
    }
    return (
    <div>
        <Header text="Anecdote of the day"/>
        {props.anecdotes[selected]} <br/>
        has {points[selected]} votes <br/>
        <button onClick={() => addVote()}>
            vote
        </button>
        <button onClick={getNext}>
            next anecdote
        </button>
        <Header text="Anecdote with most votes"/>
        {props.anecdotes[maxVselect]}
    </div>
)
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)