import React from 'react'

const Header = ({course}) => {
    return(
      <h1>
        {course.name}
      </h1>
    )
  }
  
  const Total = ({course}) => {
    let initialValue = 0
    return(
      <div>
        <b>
        Total exercises &nbsp;
        {course.parts.reduce((a,b) => {
          return a + b.exercises
        }, initialValue)}
        </b>
      </div>
    )
  }
  
  const Part = ({course}) => {
    return(
      <>
      {course.name} {course.exercises}
      </>
    )
  }
  
  const Content = ({course}) => {
    return (
      <>
      {course.parts.map(part => {
        return <div key={part.id} ><Part course={part}/></div>
      })}
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
      </>
    )
  }

  export default Course