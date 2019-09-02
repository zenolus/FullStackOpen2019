import React from 'react'
import {Header} from './components/headers'
import Course from './components/course'
const App = ({courses}) => {
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
export default App