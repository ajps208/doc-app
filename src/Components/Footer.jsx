import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Images/notesin-low-resolution-logo-color-on-transparent-background.png";
import Logo1 from "../Images/logo-light.png";
import { useSelector } from 'react-redux';


function Footer() {
  const mode=useSelector((state)=>state.darkmode.modestatus)

  return (
    <>
    <hr />
     <div
      className="d-flex flex-column justify-content-center align-items-center "
      style={{ width: "100%", height: "300px" }}
    >
      <div className="footer-content d-flex justify-content-evenly w-100 flex-wrap">
        <div style={{ width: "400px" }} className="website">
          <h4>
           
        <img width={"165px"}  src={!mode?Logo:Logo1} className="img-fluid" alt="" />
          </h4>
          <h6>
          Designed with passion and precision by Ajith PS.
No specific code license, just pure dedication.
Created with love for the craft.
          </h6>
        </div>
        <div className="links d-flex flex-column">
          <h4>Links</h4>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
          <Link to={"/add"} style={{ textDecoration: "none", color: "black" }}>
            Add Notes
          </Link>
          <Link
            to={"/home"}
            style={{ textDecoration: "none", color: "black" }}
          >
            View Notes
          </Link>
          <Link
            to={"/categoryk"}
            style={{ textDecoration: "none", color: "black" }}
          >
           Category
          </Link>
        </div>
      
        <div className="contact d-flex flex-column flex-wrap">
          <h4>Contact Us</h4>
          <div className="d-flex">
            <input
              className="form-control"
              placeholder="Enter Your Mail"
              type="text"
            />
            <div className="btn btn-primary ms-3">Subscribe</div>
          </div>
          <div className="d-flex justify-content-evenly mt-3 fs-5">
            <Link
              to={"/watch-history"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i
                className="fa-brands fa-twitter"
                style={{ color: "black" }}
              ></i>
            </Link>
            <Link
              to={"/watch-history"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i class="fa-brands fa-linkedin"></i>
            </Link>
            <Link
              to={"/watch-history"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i class="fa-brands fa-facebook"></i>
            </Link>

            <Link
              to={"/watch-history"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i class="fa-solid fa-envelope"></i>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <p>Copyright © 2023 NotesIn. Built with React.</p>
    </div></>
  )
}

export default Footer