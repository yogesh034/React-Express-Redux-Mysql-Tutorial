import React,{useState} from 'react'
import { Button,Form,FloatingLabel } from 'react-bootstrap';
import axios,{ post } from 'axios';
import {getCurrentDate} from './utils'
import {useDispatch} from 'react-redux';
import {getblogs,addblogpost} from './redux/action/action';
export default function Add_post() {

    const [selectFile,setSelectFile] = useState(null);
    const [selectFilename,setSelectFilename] = useState(null);
    const [title,setTitle] = useState(null);
    const [desc,setDesc] = useState(null);
    const [inputKey,setInputKey] = useState(Date.now());
    const dispatch = useDispatch()
    
    const saveFile = (e)=>{
        setSelectFile(e.target.files[0]);
        setSelectFilename(e.target.files[0].name);
        console.log(e.target.files);
    }

    const uploadFile = async (e) => {
        
        const formData = new FormData();
        formData.append("file", selectFile);
        formData.append("fileName", selectFilename);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("curdate", getCurrentDate());

        
        await axios.post(
            "http://localhost:3001/addpost",formData,{
            headers: {
                'content-type': 'multipart/form-data;boundary=MyBoundary'
            }
        }).then((res)=>{

            
            console.log('Its Working1',res.data.insertId);
            
            const data = {
                id : res.data.insertId,
                title : title,
                description:desc,
                image:"http://localhost:3001/public/image/"+selectFilename,
                date:getCurrentDate()
            }
    
            dispatch(addblogpost(data))
        });
        
        setTitle(null);
        setDesc(null);
        setSelectFile(null);
        setInputKey(Date.now())
         
      };
 
     
    return (
        <div>
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
                    <Form.Control type="file" name="image" onChange={saveFile} key={inputKey}/>
                    
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={uploadFile}>
                        Submit
                    </Button>
                    
        </div>
    )
}
