import React from 'react';
import ReactDOM from 'react-dom';
const Header = (props) => {
    return (
        <>
            <h1>{props.course['name']}</h1>
        </>
    )
}
const Part = (props) => {
    return (
        <>
            <p>{props.p['name']} {props.p['exercises']}</p>
        </>
    )
}
const Content = (props) => {
    return (
        <>
            <Part p = {props.parts[0]} />
            <Part p = {props.parts[1]} />
            <Part p = {props.parts[2]} />
        </>
    )
}
const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts[0]['exercises']+props.parts[1]['exercises']+props.parts[2]['exercises']}</p>
        </>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))