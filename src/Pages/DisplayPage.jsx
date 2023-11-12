import React from 'react'
import View from "../Components/View"
import Category from "../Components/Category"
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'

function DisplayPage() {
  return (
    <div style={{minHeight:"250vh"}}>
     <div className="container d-flex align-items-center justify-content-between mt-0">
      {/* <Link to={"/watch-history"} style={{textDecoration:"none",color:"white"}} className='fs-5'>Watch History</Link> */}
    </div>
    <Row className="container-fluid   w-100 ">
      <Col className='all-videos col-lg-8 mt-5'>
        <h3 className='px-5 '>All Notes</h3>
        <div className='videos d-flex flex-row flex-wrap  w-100'>
        <View/>
        </div>

      </Col>
      <Col className='category col-lg '>
        <Category/>
      </Col>

    </Row>
    </div>
  )
}

export default DisplayPage