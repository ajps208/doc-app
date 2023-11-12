import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { addCategory, deleteCategory, getANotes, getAllCategories, updateCategory } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {
  const navigateByUrl = useNavigate();

  const navigate = (categoryId) => {
    navigateByUrl(`/category/${categoryId}`);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryName, setCategoryName] = useState('');
  const [displayCategoryName, setDisplayCategoryName] = useState([]);

  const handleCategoryAdd = async () => {
    if (categoryName) {
      const body = {
        categoryName,
        allNotes: [],
      };

      const response = await addCategory(body);

      if (response.status >= 200 && response.status < 300) {
        handleClose();
        setCategoryName('');
        displayCategory();
      } else {
        toast.error('Uploading error!!!!');
      }
    } else {
      toast.warning('Please provide a category name!!!!');
    }
  };

  const displayCategory = async () => {
    const { data } = await getAllCategories();
    setDisplayCategoryName(data);
  };

  const categoryDelete = async (id) => {
    await deleteCategory(id);
    displayCategory();
  };

  useEffect(() => {
    displayCategory();
  }, []);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const noteDropped = async (e, categoryId) => {
    const noteCardId = e.dataTransfer.getData('cardId');

    const selectedCategory = displayCategoryName.find((item) => item.id === categoryId);

    if (selectedCategory) {
      if (!selectedCategory.allNotes) {
        selectedCategory.allNotes = [];
      }

      const { data } = await getANotes(noteCardId);

      selectedCategory.allNotes.push(data);

      await updateCategory(categoryId, selectedCategory);
      displayCategory();
    } else {
      console.error('Selected category not found');
    }
  };

  return (
    <>
      <div className="d-grid">
        <button className="btn btn-info" onClick={handleShow}>
          Add New Category
        </button>
        <p className='pt-2 text-danger font-italic'>*<small>Drag & Drop notes into categories</small></p>
      </div>

      {displayCategoryName.length > 0 ? (
        displayCategoryName.map((item, index) => (
          <div
            onClick={() => navigate(item?.id)}
            className="border mt-3 mb-3 p-3 rounded"
            key={index}
            draggable
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => noteDropped(e, item?.id)}
          >
            <div className="rounded d-flex justify-content-between align-items-center">
              <h6>{item?.categoryName}</h6>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating
                  categoryDelete(item?.id);
                }}
              >
                <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="fw-bolder mt-3 fs-5 text-danger">
          No Categories Added
        </p>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="border p-3 rounded border-secondary">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Category Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCategoryAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />

    </>
  );
}

export default Category;
