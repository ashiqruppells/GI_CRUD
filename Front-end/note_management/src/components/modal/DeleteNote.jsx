import { React, useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

function DeleteModal({
		isOpen,
		onClose,
		defaultValues = {
			title: "",
			body: "",
		},
	}) {
	if (!isOpen) return null;

  
    const deleteNoteHandler = () => {
      axios
        .delete(`http://127.0.0.1:8000/api/v1/notes/delete/${defaultValues.id}/`)
        .then((res) => {
          const { StatusCode, data } = res.data;
          if (StatusCode === 6000) {
            window.location.reload();
            onDelete(); // Call the onDelete prop to notify the parent component
          } else {
            console.log(data);
          }
        })
    };
  
    return (
      <Container>
        <div className="modal-overlay">
          <div className="modal">
		  	<ModalHeading>Delete Note</ModalHeading>
            <div className="modal-content">
              <FormContainer>
                <p>Are you sure you want to delete this note?</p>
              </FormContainer>
              <ButtonContainer>
                <Button onClick={deleteNoteHandler}>
                  Delete
                </Button>
                <Button onClick={onClose}>
                  Cancel
                </Button>
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const ModalHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

  const Container = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
  }

  .modal-content {
    text-align: center;
  }
`;
  
const FormContainer = styled.div`
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    width: 180px;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .form-group button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 32px;
`;
const Button = styled.div`
  background: #308e11;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 120px;
  padding: 11px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

  export default DeleteModal;