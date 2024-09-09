import React from 'react'
import Main from "./Main"
import Participate from './Participate'
import HiddenTreasures from './HiddenTreasures'
import ProductList from '../products/ProductList'


function Home() {
  return (
    <React.Fragment>
      {/* <div>Home</div> */}
      <Main/>
      <Participate/>
      <HiddenTreasures/>
      <ProductList/>
    </React.Fragment>
  )
}

export default Home