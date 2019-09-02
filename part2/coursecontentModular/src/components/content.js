import React from 'react'
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
const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum+part.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}
export {Content, Part, Total}