import React from 'react'
import View from "../Components/View"
import Category from "../Components/Category"
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


function DisplayPage() {
  const loginStatus = useSelector((state) => state.loginSlice.loginstate);

  return (
   <>
    {loginStatus?  <div>
       <div className="container d-flex align-items-center justify-content-between mt-0">
        {/* <Link to={"/watch-history"} style={{textDecoration:"none",color:"white"}} className='fs-5'>Watch History</Link> */}
      </div>
      <Row className="container-fluid   w-100 ">
        <Col className='all-videos col-lg-8 mt-5'>
         <div className='d-flex '>
            <h2 className='px-5 '>All Notes</h2>
             <h6 className='mt-3 text-danger'><Link className='text-danger' style={{textDecoration:"none"}} to={'/favourites'}>view favourites</Link></h6>
    
         </div>
          <div className='videos d-flex flex-row flex-wrap  w-100'>
          <View/>
          </div>
  
        </Col>
        <Col className='category col-lg '>
          {/* <Category/> */}
        </Col>
  
      </Row>
      </div>:  <Navigate to="/" />}
   </>
  )
}

export default DisplayPage