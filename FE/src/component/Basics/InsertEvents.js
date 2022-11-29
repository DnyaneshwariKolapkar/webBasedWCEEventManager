import React from 'react'
import './insertform.css';

const InsertEvents = () => {
  return (
    <>
    <div className='insertformbody'>
                <div>
                    <div className='form'>
                        <h1>Upload file for inserting events </h1>
                        <br />
                        <input className='insertformbodyinput' type="file" accept='image/*'/>
                        <br />
                        <button type="submit" className='buttonloginpage'>Submit</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default InsertEvents