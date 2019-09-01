import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Button = (props) => {
    return (
        <>
            <button onClick={props.onClick}>{props.text}</button>
        </>
    )
}
const Header = ({heading}) => {
    return (
        <div>
            <h1>{heading}</h1>
        </div>
    )
}
const Statistic = ({text, value}) => {
    return (
        <>
            <table>
                <col width="100px" />
                <col width="100px" />
                <tr>
                    <td>{text}</td>
                    <td>{value}</td>
                </tr>
            </table>
        </>
    )
}
const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    if(all === 0)
        return (
            <div>
                No feedback given
            </div>
        )
    const average = (good-bad)/all
    const positive = good*100/all
    const positiveString = positive + "%"
    return (
        <div>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={average}/>
            <Statistic text="positive" value={positiveString}/>
        </div>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const goodFeed = () => setGood(good+1)
    const neutralFeed = () => setNeutral(neutral+1)
    const badFeed = () => setBad(bad+1)
    return (
        <div>
            <link href="index.css" rel="stylesheet" type="text/css"></link>
            <Header heading="give feedback"/>
            <Button onClick={goodFeed} text="good" />
            <Button onClick={neutralFeed} text="neutral" />
            <Button onClick={badFeed} text="bad" />
            <Header heading="statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))