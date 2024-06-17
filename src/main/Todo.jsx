import React, { useState } from 'react';
import ShortUniqueId from 'short-unique-id';

const Todo = () => {
  const uid = new ShortUniqueId();
  const [isDefaultPage, setIsDefaultPage] = useState(true)
  const handlePageChange = (e) => {
    if((e.target.id === 'daily' && isDefaultPage ) || (e.target.id === 'long' && !isDefaultPage )){
      return;
    }
    setIsDefaultPage(!isDefaultPage)
  }

  const data = {
    daily:[
      {
        id:uid.rnd(),
        title:"read this",
        desc:"here - www.google.com , check for all and some extras",
        date:"11/06/2024",
        isCompleted:false
      },
      {
        id:uid.rnd(),
        title:"read this",
        desc:"here - www.google.com , check for all and some extras",
        date:"11/06/2024",
        isCompleted:false
      }
    ],
    long:[
      {
        id:uid.rnd(),
        title:"Complete this",
        desc:"here - www.google.com , check for all and some extras",
        date:"11/06/2024",
        isCompleted:false
      },
      {
        id:uid.rnd(),
        title:"read this",
        desc:"here - www.google.com , check for all and some extras",
        date:"11/06/2024",
        isCompleted:false
      }
    ]
  }

  return (
    <>
        <div className='outerContainer'>
          <div className="toggleContainer">
            <h1 onClick={handlePageChange} id='daily' className={isDefaultPage ? "active heading" : 'heading'}  >Daily Tasks</h1>
            <h1 onClick={handlePageChange} id='long' className={isDefaultPage ? "heading" : "active heading"} >Long Time</h1>
          </div>
          <div className='mainCont'>
            { isDefaultPage ? 
              <div className='taskContainer'>
                <ul>
                  {data.daily.map( task => <li key={task.id}>{task.title}</li>)}
                </ul>
              </div> 
              :
              <div className='taskContainer'> 
                <ul>
                  {data.long.map( task => <li key={task.id}>{task.title}</li>)}
                </ul>
              </div>
            }
          </div>
        </div>
    </>
  )
}

export default Todo;