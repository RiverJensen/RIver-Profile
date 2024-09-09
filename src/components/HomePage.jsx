import React from 'react'
import ApiRequest from './ApiRequest'
import TopBanner from './TopBanner'
import "../css/home.css"
import RiverResume from './RiverResume'
import Links from './Links'

const HomePage = () => {
  return (
    <div>

   
    <h1>HomePage</h1>

<TopBanner/>
<RiverResume/>
<Links/>
    

    </div>
  )
}

export default HomePage