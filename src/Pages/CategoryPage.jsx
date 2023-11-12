import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getACategories, getANotes, updateCategory } from '../Services/allAPI';
import { Modal } from 'react-bootstrap';
import sticky from '../Images/note.png';

function CategoryPage() {
  const [show, setShow] = useState(false);
  const [notesdata, setNoteData] = useState([]);
  const [cat, setCat] = useState({});
  const { categoryId } = useParams();
  const handleClose = () => setShow(false);

  const handleShow = async (id) => {
    const { data } = await getANotes(id);
    setNoteData(data);
    setShow(true);
  }
  const deleteNote = async (noteId) => {
    // Create a copy of the category object
    const updatedCategory = { ...cat };
  
    if (updatedCategory) {
      if (updatedCategory.allNotes) {
        // Filter out the note with the given noteId from the allNotes array
        updatedCategory.allNotes = updatedCategory.allNotes.filter((note) => note.id !== noteId);
  
        // Update the category
        await updateCategory(categoryId, updatedCategory);
  
        // Update the state with the modified category object
        setCat(updatedCategory);
      } else {
        console.error('Selected category has no notes');
      }
    } else {
      console.error('Category not found');
    }
  }
  

  const fetchCategory = async () => {
    const { data } = await getACategories(categoryId);
    setCat(data);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <h4 className='text-start mx-5 mt-2'>{cat.categoryName}</h4>

      <div style={{minHeight:"80vh"}} className='d-flex flex-wrap flex-row'>
        {cat.allNotes ? cat.allNotes.map((item) => (
          <div key={item.id} style={{ width: "280px", position: "relative" }}>
            <img onClick={() => handleShow(item?.id)} style={{ objectFit: "cover" }} className="img-fluid w-100 mt-0 po" src={sticky} alt="" />
            <h5 className='text-break' style={{color:"black", Width: "50px", position: "absolute", top: "90px", left: "80px", height: "300px" }}>{item?.title}</h5>
            <div style={{color:"black", position: "absolute", top: "180px", left: "90px" }} className='d-flex'>
              <h6>{item?.time}</h6>
              <i onClick={() => deleteNote(item?.id)} className="fa-solid fa-trash text-danger mx-2"></i>
            </div>
          </div>
        )) : <p className='text-danger'>No Notes</p>}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-break'>{notesdata?.title}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body className='text-break'>{notesdata?.note}</Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryPage;
