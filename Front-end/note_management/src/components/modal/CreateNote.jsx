import { React, useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

function CreateNote({
  isOpen,
  onClose,
  isEdit=false,
  defaultValues = {
    title: "",
    body: "",
  },
}) {
  console.log(defaultValues);

  if (!isOpen) return null;

  const [inputs, setInputs] = useState(defaultValues);
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const createNoteHandler = () => {

    axios
      .post("http://127.0.0.1:8000/api/v1/notes/create-note/", inputs)
      .then((res) => {
        const { StatusCode, data } = res.data;
        if (StatusCode === 6000) {
          // console.log(data);
          window.location.reload();
          // closeHandler();
          uploadCallback();
        } else {
          console.log(data);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const editHandler = ()=>{
	axios
      .put(`http://127.0.0.1:8000/api/v1/notes/edit/${defaultValues.id}/`, inputs)
      .then((res) => {
        const { StatusCode, data } = res.data;
        if (StatusCode === 6000) {
          // console.log(data);
          window.location.reload();
          // closeHandler();
          uploadCallback();
        } else {
          console.log(data);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }

  return (
    <Container>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <FormContainer>
              <form method="POST">
                <div className="form-group">
                  <label htmlFor="name">Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    placeholder="Enter Title"
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Note</label>
                  <input
                    type="text"
                    name="body"
                    value={inputs.body}
                    placeholder="Enter Note"
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </div>
              </form>
            </FormContainer>
            <ButtonContainer>
              <Button onClick={isEdit? editHandler :  createNoteHandler}>Submit</Button>
              <Button onClick={onClose}>Close</Button>
            </ButtonContainer>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CreateNote;

const Container = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Adjust the z-index as needed */
  }

  /* Styling for the modal */
  .modal {
    background-color: #fff; /* Background color of the modal */
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
    /* width: 630px; */
    /* height: 700px; */
  }

  /* Styling for modal content (you can customize this) */
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
`;
