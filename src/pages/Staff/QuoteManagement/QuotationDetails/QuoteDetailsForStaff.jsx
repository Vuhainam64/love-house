import React from 'react'

import { StaffSidebar } from '../../../../components'
import Overview from './Overview'
import Material from './Material'
import Topbar from '../../../../components/QuotationComponent/Topbar/Topbar'
import Worker from './Worker'

export default function QuoteDetailsForStaff() {
  return (
    <>
    <div className="flex">
      <StaffSidebar/>
      <div className="h-screen flex-1 p-7">
        {/* <Topbar/> */}
        <Overview/>
        <Material/>
        <Worker/>
        
      </div>
    </div>
    </>
  )
}
