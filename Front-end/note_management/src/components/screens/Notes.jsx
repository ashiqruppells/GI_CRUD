import React, { useMemo, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import axios from 'axios';
import CreateNote from '../modal/CreateNote';
import EditIcon from '../../assets/images/edit.png'
import DeleteIcon from '../../assets/images/bin.png'
import DeleteModal from '../modal/DeleteNote';
import ViewNote from '../modal/ViewNote';
import ViewIcon from '../../assets/images/view.png';





function Notes() {
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [isEditModal, setEditModal] = useState(false);
    const [isDeletetModal, setDeleteModal] = useState(false);
    const [isViewModal, setViewModal] = useState(false);
    const [data, setData] = useState([]);


    const openModal = () => {
        setIsModalOpen(true);
      }
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const editModal = (values={}) => {
        setEditModal(values);
    };
    const editCloseModal = () => {
        setEditModal(false);
    };
    const deleteModal = (values={}) => {
        setDeleteModal(values);
    };
    const deleteCloseModal = () => {
        setDeleteModal(false);
    };
    const viewModal = (values={}) => {
        setViewModal(values);
    };
    const viewCloseModal = () => {
        setViewModal(false);
    };



    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/v1/notes/")
            .then((res) => {
                const { StatusCode, data } = res.data;
                
                if (StatusCode === 6000) {
                    setData(data);
                } else {
                    // Handle error, you can set an error state or redirect to an error page
                    setEmpty(true);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                // Handle the error when fetching data
                console.log("Error in fetching updates", err);
            });
    }, []);

      
    return (
        <MainContainer>
            <Top>
                <Button onClick={openModal}>
                     Add
                </Button>
            </Top>
            <Container>
                <StyledTable>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                            <td>
                                <img className="edit" onClick={()=> editModal(item)} src={EditIcon} alt="icon" />
                                <img className="delete" onClick={()=> deleteModal(item)} src={DeleteIcon} alt="icon" />
                                <img className="view" onClick={()=> viewModal(item)} src={ViewIcon} alt="icon" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>
                <CreateNote isOpen={isModalOpen} onClose={closeModal} />
                <CreateNote isOpen={isEditModal} isEdit defaultValues={isEditModal} onClose={editCloseModal} />
                <DeleteModal isOpen={isDeletetModal} defaultValues={isDeletetModal} onClose={deleteCloseModal} />
                <ViewNote isOpen={isViewModal} defaultValues={isViewModal} onClose={viewCloseModal} />
            </Container>

        </MainContainer>
        
    )
}

export default Notes

const MainContainer = styled.div`
`;

const Container = styled.div`
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-top: 30px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  img {
    width: 20px;
    cursor: pointer;
    margin-right: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  // You can add more styles here as needed
`;


const Top = styled.div`
    text-align: -webkit-right;
`;
const Button = styled.div`
    background: #308E11;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 120px;
    padding: 11px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;