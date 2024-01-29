import React from 'react'
import bg_why from "../../assets/images/bg_why.jpg"

function WhySection() {
  return (
    <div className="relative parallax-section bg-cover bg-no-repeat bg-center h-[540px] pt-28 mb-24 " style={{ backgroundImage: `url(${bg_why})` }}>
       <div className="absolute inset-0 bg-cover bg-black opacity-10 group-hover:opacity-70" />
    </div>
  )
}

export default WhySection