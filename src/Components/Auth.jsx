import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useSelector,useDispatch} from "react-redux";
import Logo from "../Images/notesin-low-resolution-logo-color-on-transparent-background.png";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addDoc, collection,getDocs } from 'firebase/firestore';
import { setLogin, setUserId } from '../Redux/loginSlice';

function Auth({ register }) {
  const loginstatus=useSelector((state)=>state.loginSlice.loginstate)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const isRegisterForm = register ? true : false
  const firebase=useSelector((state)=>state.firebaseSlice.Firebase)
  const firebaseAuth=useSelector((state)=>state.firebaseSlice.FirebaseAuth)
  const firestore=useSelector((state)=>state.firebaseSlice.Firestore)

  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  
  const userRegistration = (e) => {
    e.preventDefault();

    // Use getAuth() to get the authentication instance
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((result) => {
        const usersCollection = collection(firestore, 'users');
         addDoc(usersCollection, {
          id: result.user.uid,
          username: username,
        });
            }).then(()=>{navigate('/login')})
            .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errorMessage);
          toast.warning(errorMessage);
          // Handle errors
        });
      }
     

      const userLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            dispatch(setUserId(user.uid))
            dispatch(setLogin()); // Corrected line
            navigate('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            toast.warning(errorMessage);
          });
      };
 const forgetPassword=()=>{
  sendPasswordResetEmail(firebaseAuth, email)
  .then(() => {
    toast.info("check your email")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

 }
// Assuming 'firestore' is your Firestore instance

  return (
    <div style={{ width: "100%", height: "100vh",marginTop:"-50px" }} className='d-flex align-items-center justify-content-center'>
      <div className='w-75 container'>
        <Link to={'/'} style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-arrow-left me-1"></i> Back to Home
        </Link>
        <div className="card shadow p-5 bg-success">
          <div className="row align-items-center">
            <div className="col lg-6">
              <img src="https://www.planstudyabroad.uniagents.com/images/login.png" alt="" className='rounded-start w-100' />
            </div>
            <div className="col lg-6">
              <div className='d-flex align-items-center flex-column'>
                <h1 className='fw-bolder text-light mt-2'>
                <Link className="navbar-brand" to={"/"}>
            <img width={"185px"} src={Logo} className="img-fluid" alt="" />
          </Link>                </h1>
                <h5 className="fw-bolder mt-4 pb-3 text-light">
                  {isRegisterForm ? 'Sign up to your Account' : 'Sign in to your Account'}
                </h5>
                <Form  onSubmit={(e)=>isRegisterForm?userRegistration(e):userLogin(e)} className='text-light w-100'>
                  {isRegisterForm && (
                    <>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     
                        <Form.Control onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="UserName" />
                      </Form.Group>
                    
                    </>
                  )}
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     
                     <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email Id" />
                   </Form.Group>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     
                     <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" required  minlength="8" placeholder="Enter Password" />
                     
                    {!isRegisterForm&& <p className='fs-1x' onClick={forgetPassword}><u>Forget Password</u></p>}
                   </Form.Group>
                   {
                    isRegisterForm?
                    <div>
                        <button className='btn btn-light mb-2'>Register</button>
                        <p>Already have account?clicked here to <Link to={'/login'}>Login</Link></p>
                    </div>:
                     <div>
                     <button className='btn btn-light mb-2'>Login</button>
                     <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                 </div>
                   }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />

    </div>
    
  )
}

export default Auth
