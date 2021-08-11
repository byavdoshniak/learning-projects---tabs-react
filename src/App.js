import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [order, setOrder] = useState(3)

  const getData = async () => {
    setIsLoading(true)
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

  const clickHandler = (order) => {
    setOrder(order)
  }

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

  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        <div className='btn-container'>
          {data.map((item) => {
            return (
              <button
                onClick={() => setOrder(item.order)}
                className={`job-btn ${item.order === order && 'active-btn'}`}
              >
                {item.company}
              </button>
            )
          })}
        </div>

        {data
          .filter((item) => item.order === order)
          .map((item) => {
            return (
              <article key={item.id} className='job-info'>
                <h3>{item.title}</h3>
                <h4>{item.company}</h4>
                <p className='job-date'>{item.dates}</p>
                {item.duties.map((duty) => {
                  return (
                    <div className='job-desc'>
                      <FaAngleDoubleRight className='job-icon' />
                      <p>{duty}</p>
                    </div>
                  )
                })}
              </article>
            )
          })}
      </div>
      <div>
        <button className='btn'>more info</button>
      </div>
    </section>
  )
}

export default App
