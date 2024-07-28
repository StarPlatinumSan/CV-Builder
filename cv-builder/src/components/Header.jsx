import { useState } from 'react'

export default function App() {
  return (
    <>
      <header className='header'>
        <h1 className='title'>React <span className="resume">Resume</span> Builder</h1>
        <div className='sidebarMenu'></div>
        <div className='circleTop circle'></div>
        <div className='circleBottom circle'></div>
        <div className='smallCircle circle'></div>
        <div className='smallerCircle circle'></div>
        <div className="otherSmallerCircleTop circle"></div>
        <div className="otherSmallerCircleBottom circle"></div>
      </header> 
    </>
  )
}