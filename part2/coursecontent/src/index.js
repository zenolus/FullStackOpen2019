import React from 'react';
import ReactDOM from 'react-dom';
const Header = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}
const SubHeader = ({text}) => {
    return (
        <>
            <h2>{text}</h2>
        </>
    )
}
const Part = ({part}) => {
    return (
        <>
            <p>{part.name} {part.exercises}</p>
        </>
    )
}
const Content = ({parts}) => {
    const getParts = parts.map(part => {
        return (
            <Part 
                key = {part.id}
                part = {part}/>
        )
    })
    return (
        <>
            {getParts}
            <Total parts={parts}/>
        </>
    )
}
const Course = (props) => {
    const {course} = {...props}
    return (
        <div>
            <SubHeader text={course.name} />
            <Content parts={course.parts}/>
        </div>
    )
}
const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum+part.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}
const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    const getCourses = courses.map((course) => {
            return (
                <div key={course.id}>
                    <Course course={course} />
                </div>
            )
        })
    return (
        <div>
            <Header text="Web development curriculum"/>
            {getCourses}
        </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))