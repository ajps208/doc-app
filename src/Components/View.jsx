import React,{useEffect, useState} from 'react'
import {  Modal } from 'react-bootstrap'
import sticky from '../Images/note.png';
import { deleteANote, getANotes, getAllNotes } from '../Services/allAPI';


function View() {
  const [show, setShow] = useState(false);
  const [deletestaus,setDeletestaus]=useState(false)
  const handleClose = () => setShow(false);
  const[singleNote,setSingleNote]=useState("")
  const handleShow =async (nid) =>{
     setShow(true)
     const {data}=await getANotes(nid)
     setSingleNote(data)
    //  console.log(singleNote);
    };
  const[allNotes,setAllNotes]=useState([])
  const getAllNoteDetailes=async()=>{
    const {data}=await getAllNotes()
    setAllNotes(data)
    // console.log(allNotes);
  }
  const handleDelete=async(id)=>{
    const response=await deleteANote(id)
    setDeletestaus(true)


  }
  useEffect(()=>{
    getAllNoteDetailes()
  },[deletestaus])
 
  const dragStarted = (e, id) => {
    console.log("data transferred");
    e.dataTransfer.setData("cardId", id); // Use noteData.id for the specific note being dragged
  };
  
  return (
    <>
 {allNotes.length > 0 ? allNotes.map((noteData) => (
        <div  draggable onDragStart={(e)=>{dragStarted(e,noteData?.id)}} key={noteData.id} style={{ width: "280px", position: "relative" }}>
          <img onClick={()=>handleShow(noteData?.id)} style={{ objectFit: "cover" }} className="img-fluid w-100 mt-0 po" src={sticky} alt="" />
          <h5 className='text-break' style={{color:"black", Width: "50px", position: "absolute", top: "90px", left: "80px", height: "300px" }}>{noteData?.title}</h5>
          <div style={{color:"black", position: "absolute", top: "180px", left: "90px" }
        } className='d-flex'>
            <h6>{noteData?.time}</h6>
           <i onClick={()=>handleDelete(noteData?.id)} className="px-3 mb-2 fa-solid fa-trash text-danger"></i>
          </div>
        </div>
      )) : <p className='text-danger'>No Notes</p>}
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className='text-break'>{singleNote?.title}</Modal.Title>
          {/* <button className='btn'><i class="fa-solid fa-pen"></i></button> */}
        </Modal.Header>
        <Modal.Body className='text-break'>{singleNote?.note}</Modal.Body>
        
      </Modal>
    </>
  )
}

export default View