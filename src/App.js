import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [value, setValue] = useState(0)

  const getData = async () => {
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading</h1>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='loading'>
        <h1>Ooops...Error ocured</h1>
      </div>
    )
  }

  const { company, dates, duties, title } = data[value]
  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        <div className='btn-container'>
          {data.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && 'active-btn'}`}
              >
                {item.company}
              </button>
            )
          })}
        </div>
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className='job-desc' key={index}>
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <div>
        <button className='btn'>more info</button>
      </div>
    </section>
  )
}

export default App
