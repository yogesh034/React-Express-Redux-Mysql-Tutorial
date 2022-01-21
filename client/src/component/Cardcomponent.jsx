import React,{useState} from 'react'
import { Card,Button,Modal,Form,FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {getblogs} from './redux/action/action';
import axios from 'axios';
import {getCurrentDate} from './utils'

export default function Cardcomponent(props) {
const [showModal,setShowModal] = useState(false);
const [selectFile,setSelectFile] = useState(null);
    const [selectFilename,setSelectFilename] = useState(null);
    const [title,setTitle] = useState(null);
    const [desc,setDesc] = useState(null);
    const [getimage,setGetimage] = useState('');
    const [editId,setEditId] = useState(null);

const allblogs = useSelector(state => state.allblogs.blogs)

const dispatch = useDispatch();
const saveFile = (e)=>{
    setSelectFile(e.target.files[0]);
    setSelectFilename(e.target.files[0].name);
    console.log(e.target.files);
}
const uploadFile = async (id) => {

    const formData = new FormData();
    formData.append("file", selectFile);
    formData.append("id", id);
    formData.append("fileName", selectFilename);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("curdate", getCurrentDate());
    
    await axios.post(
        `http://localhost:3001/update/`,formData).then((res)=>{
            console.log(res)
           
       
    });
    setShowModal(false)
    window.location.reload(true)

}
const removePost = (id) =>{
    axios.delete(`http://localhost:3001/delete/${id}`).then((res)=>{
        console.log(res)
    })
    const newblogs =  allblogs.filter((post)=>post.id !== id)
    dispatch(getblogs(newblogs))
}
const editPost = (id) =>{
    console.log(id);
    setShowModal(true);
    axios.get(`http://localhost:3001/edit/${id}`).then((res)=>{
        console.log(res.data[0])
        setTitle(res.data[0].title);
        setEditId(res.data[0].id);
        setDesc(res.data[0].description);
        setGetimage(res.data[0].image);
    })
}

const handleModal= ()=>{
    setShowModal(false)
}

    return (
        <div key={props.id}>
            <Card style={{ width: '25rem' }} >
                    <Card.Img variant="top" src={props.image} width="200" height="150"/>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                        {props.description}
                        </Card.Text>
                        <Button className='m-1' variant="primary" onClick={()=>{editPost(props.id)}}>Edit</Button>
                        <Button className='m-1' variant="danger" onClick={()=>{removePost(props.id)}}>Remove</Button>
                    </Card.Body>
            </Card>
            <hr/>
        <Modal show={showModal} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Blog Post</Modal.Header>  
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingTextarea2" label="Title">
                    <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}} value={title == null ? '' : title}/>
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        onChange={(e)=>{setDesc(e.target.value)}}
                        value={desc == null ? '' : desc}
                        />
                    </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <img src={getimage} width="400" height="150"/>
                    <Form.Control type="file" name="image" onChange={saveFile} />
                    
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={()=>{uploadFile(editId)}}>
                        Update
                    </Button>   
        </Modal.Body>  
         
        </Modal>
        </div>
    )
}
