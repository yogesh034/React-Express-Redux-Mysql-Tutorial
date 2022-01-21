import React,{useEffect,useState} from 'react'
import { Container, Row,Col } from 'react-bootstrap';
import Cardcomponent from './Cardcomponent';
import Add_post from './Add_post';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {getblogs} from './redux/action/action';

export default function Home() {

const [post,setPost] = useState([]);
const allblog = useSelector(state => state.allblogs.blogs)

const dispatch = useDispatch();

const fetchpost = ()=>{
    axios.get('http://localhost:3001/allpost')
    .then((res)=>{
        setPost(res.data);
        console.log(res.data);
        dispatch(getblogs(res.data))
        console.log(allblog)
    })
}

useEffect(() => {
    fetchpost() 
   
}, [])



    return (
        <Container>
            <Row >
                <h1 className='m-3'>Blog List</h1><hr/>
                <Col>
                {
                    allblog.map((val, i)=>{
                        return (
                           
                            
                            <Cardcomponent id={val.id} title={val.title} description={val.description} image={val.image} key={val.id}/>
                          
                        )
                    })
                }
                </Col>
                <Col>
                <Add_post />
                </Col>
            </Row>
        </Container>
    )
}
