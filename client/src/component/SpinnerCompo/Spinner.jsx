import React from 'react'
import "./Spinner.css"
import {PropagateLoader} from "react-spinners"
 
const Spinner = () => {
  return (
    <>
        <div className="spinner">
          <PropagateLoader color='#000' size={45} />
        </div>
    </>
  )
}

export default Spinner