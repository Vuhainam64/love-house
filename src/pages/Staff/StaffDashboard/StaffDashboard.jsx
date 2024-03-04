import React from 'react'
import StatsGrid from './StatsGrid'
import { StaffSidebar, DBHeader } from '../../../components'
import Chart from './Chart'

function StaffDashboard() {
  return (
   <>
    <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          <DBHeader />
          <div className="">
           <StatsGrid/>
          <Chart/>
          </div>
        </div>
      </div>
   </>
  )
}

export default StaffDashboard