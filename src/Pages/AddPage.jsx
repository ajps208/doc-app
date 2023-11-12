import React, { useEffect, useState } from 'react';
import './AddPage.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { doc, getDoc, addDoc, collection, ref, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function AddPage({edit}) {
  const loginStatus = useSelector((state) => state.loginSlice.loginstate);

  const{id}=useParams()
  
  console.log(id);
  const userID=useSelector((state)=>state.loginSlice.userid)
  const firestore = useSelector((state) => state.firebaseSlice.Firestore);
  const firebaseAuth=useSelector((state)=>state.firebaseSlice.FirebaseAuth)
  
  const isEdit=edit ? true : false

  const navigateByUrl = useNavigate();

  const navigate = () => {
    navigateByUrl(`/home`);
  };
  const [value, setValue] = useState('');
  const[title,setTitile]=useState('')
  // const[senddata,setSendData]=useState('')
 
  const handleNotes =  (e) => {
    e.preventDefault();
  
    if (!title || !value) {
      toast.warning("Please fill in all fields");
    } else {
      let today = new Date();
      const timestamp = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(today);
  
      try {
          const usersCollection = collection(firestore, 'notes'); 
          addDoc(usersCollection, {
          userId: userID,
          name: title,
          description: value,
          currentTime: timestamp,
          fav: "",
        });
        navigate()
      } catch (error) {
        // Handle the error here, you might want to log it or show a message
        console.error("Error adding note:", error);
      }
    }
  };
  // --------------------------------------------------------------------------------
  useEffect(()=>{
    if (isEdit) {
      const docRef = doc(firestore,"notes", id);
    
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setValue( docSnap.data().description)
            setTitile( docSnap.data().name)

          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  },[isEdit])
  const handleUpdate = () => {
    updateDoc(doc(firestore, 'notes', id), {
      name: title,
      description: value,
    })
      .then(() => {
        // console.log("Data updated successfully!");
        toast.success("Data updated successfully!")
        navigate('/home')
      })
      .catch((error) => {
        console.error(error);
        toast.warning(error)
      });
  };
  const handleReset=()=>{
    setTitile("")
    setValue("")
  }
  

  return (
    <>
      {loginStatus?<div  style={{minHeight:"100vh"}} className="container contact-form">
        
        <div className="contact-image mt-3">
  {  isEdit? <i className="fa-solid fa-file-pen fa-5x"></i> :<i className="fa-regular fa-pen-to-square fa-5x"></i>
  }      </div>
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group ">
                <input
                  onChange={(e) =>setTitile(e.target.value)}
                  type="text"
                  name="txtName"
                  className="form-control"
                  placeholder="Subject Name"
                  value={title}
                  required
                />
              </div>
              {/* <div className="form-group pt-3">
                <input
                  type="submit"
                  name="btnSubmit"
                  className="btnContactSubmit bg-success"
                  value="Upload File"
                />
              </div> */}
              <div className='d-flex w-100 justify-content-between flex-wrap'>
                <div className="form-group pt-3">
                  <input onClick={(e) =>isEdit? handleUpdate(e): handleNotes(e)} type="reset" name="btnSubmit" className="btnContact bg-danger" value="Submit" />
                </div>
                <div className="form-group pt-3">
                  <input type="button" onClick={handleReset} name="btnSubmit" className="btnContact bg-info" value="Reset" />
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-1k">
              <div className="form-group">
              <ReactQuill theme="snow" value={value} placeholder='Enter your notes !!!' onChange={setValue} />
              </div>
            </div>
          </div>
        </form>
        <ToastContainer position="top-center" theme="colored" autoClose={2000} />
  
      </div>: <Navigate to="/" />}
    </>
    
  );
}

export default AddPage;
