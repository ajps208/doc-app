import React, { useState } from 'react';
import './AddPage.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { doc, addDoc,collection } from "firebase/firestore"; 

function AddPage() {
  const userID=useSelector((state)=>state.loginSlice.userid)
  const firestore=useSelector((state)=>state.firebaseSlice.Firestore)
  const firebaseAuth=useSelector((state)=>state.firebaseSlice.FirebaseAuth)



  const navigateByUrl = useNavigate();

  const navigate = () => {
    navigateByUrl(`/home`);
  };
  const [value, setValue] = useState('');
  const[title,setTitile]=useState('')
  const[time,setTime]=useState('')
 
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
        
      } catch (error) {
        // Handle the error here, you might want to log it or show a message
        console.error("Error adding note:", error);
      }
    }
  };
  

  //   if (response.status >= 200 && response.status < 300) {
  //     // Clear the form fields by setting notes state to an empty object

  //     toast.success(`${response.data.title} notes upload was successful`);
  //     setNotes({title:"",note:"",time:""})
  //     navigate()

  //   } else {
  //     toast.error("Upload error... Please try again later!!!");
  //   }}
  // }
  return (
    <div  style={{minHeight:"100vh"}} className="container contact-form">
      
      <div className="contact-image mt-3">
        <i className="fa-regular fa-pen-to-square fa-5x"></i>
      </div>
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
                <input onClick={(e) => handleNotes(e)} type="reset" name="btnSubmit" className="btnContact bg-danger" value="Submit" />
              </div>
              <div className="form-group pt-3">
                <input type="submit" name="btnSubmit" className="btnContact bg-info" value="Reset" />
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

    </div>
    
  );
}

export default AddPage;
