import React,{useEffect, useState} from 'react'
import {  Modal } from 'react-bootstrap'
import sticky from '../Images/note.png';
import { doc,collection, query, where, getDocs,deleteDoc,updateDoc} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function View() {
  const navigateByUrl = useNavigate();

  const navigate = (id) => {
  
    navigateByUrl(`/edit/${id}`);
  };
  
  const mode = useSelector((state) => state.darkmode.modestatus);
  const loginStatus = useSelector((state) => state.loginSlice.loginstate);
  const userID = useSelector((state) => state.loginSlice.userid);
  const firestore = useSelector((state) => state.firebaseSlice.Firestore);
  const [allNotes,setAllNotes]=useState([])
  const[title,setTitle]=useState("")
  const[description,setDescription]=useState("")
  const[userid,setUserId]=useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow =async (name,des,id) =>{
     setShow(true)
     setTitle(name)
     setDescription(des)
     setUserId(id)
    };
 
  const  handleDelete=async(id)=>{
    console.log("clicked");
    await deleteDoc(doc(firestore, "notes", id));
  }
  
  useEffect(() => {
    async function fetchData() {
      if (loginStatus) {
        const q = query(collection(firestore, "notes"), where("userId", "==", userID));

        try {
          const querySnapshot = await getDocs(q);
          const notesArray = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            notesArray.push({ id: doc.id, data: doc.data() });
            // console.log(notesArray);
            setAllNotes(notesArray); // 
          });
        } catch (error) {
          console.error("Error getting documents: ", error);
          // toast.warning("Error getting documents: ", error)
        }
      }
    }

    fetchData();
  }, [handleDelete,loginStatus, userID, firestore]);

  const addToFavourites=(uid)=>{

    updateDoc(doc(firestore, 'notes', uid), {
     fav:true
    })
      .then(() => {
        // console.log("Data updated successfully!");
        toast.success("added to favourites")
        // navigate('/home')
      })
      .catch((error) => {
        console.error(error);
        toast.warning(error)
      });

  }
 
//  console.log(allNotes);
 
  
  
  return (
    <>
{allNotes.length>0 ?allNotes.map((note) => (
        <div key={note.id} style={{ width: "280px", position: "relative" }}>
          <img  onClick={()=>handleShow(note.data.name,note.data.description,note.id)} style={{ objectFit: "cover" }} className="img-fluid w-100 mt-0 po" src={sticky} alt="" />
          <h5  className='text-break' style={{color:"black", Width: "50px", position: "absolute", top: "90px", left: "80px", height: "300px" }}>{note.data.name}</h5>
          <div style={{color:"black", position: "absolute", top: "180px", left: "90px" }
        } className='d-flex'>
            <h6>{note.data.currentTime}</h6>
           <i onClick={()=>handleDelete(note.id)} className="px-3 mb-2 fa-solid fa-trash text-danger"></i>
          </div>
        </div>)):
     <p className='text-danger'>No Notes</p>}
    <Modal size='xl' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        <div className='d-flex w-100  justify-content-between'>
            <Modal.Title className='text-break'>{title}</Modal.Title>
           <div>
           <button className='btn' onClick={() => navigate(userid)}><i class="fa-solid fa-pen"></i></button>
              <button onClick={()=>addToFavourites(userid)} className='btn'><i class="fa-solid fa-heart" style={{color: "#f60909"}}></i></button>
           </div>
        </div>
        </Modal.Header>
        <Modal.Body className='text-break'><ReactQuill  modules={{ toolbar: false}}  theme="snow" value={description} placeholder='Enter your notes !!!' />

</Modal.Body>
        
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />

    </>
  )
}

export default View