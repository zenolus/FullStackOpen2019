import React from 'react'
import {SubHeader} from './headers'
import {Content} from './content'
const Course = (props) => {
    const {course} = {...props}
    return (
        <div>
            <SubHeader text={course.name} />
            <Content parts={course.parts}/>
        </div>
    )
}
export default Course