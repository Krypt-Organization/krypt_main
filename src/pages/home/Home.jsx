import React from 'react'
import Main from "./Main"
import Participate from './Participate'
import HiddenTreasures from './HiddenTreasures'


function Home() {
  return (
    <React.Fragment>
      {/* <div>Home</div> */}
      <Main/>
      <Participate/>
      <HiddenTreasures/>
    </React.Fragment>
  )
}

export default Home