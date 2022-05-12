import React , {useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from '../context/dataContext'
import { format } from 'date-fns'
import api from '../App4/api/posts'

const EditPost = () => {
    const [editTitle,setEditTitle] = useState('');
    const [editBody,setEditBody] = useState('');
    const Navigate = useNavigate();
    const {posts ,setPosts} = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(()=>{
        if(post){
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    },[post,setEditBody,setEditTitle])

    const handleEdit=async (id)=>{
        const datetime=format(new Date(), 'MMMM dd, yyyy PP');
        const updatePost = {id,title:editTitle,datetime,body : editBody };
        try{
          const response = await api.put(`/posts/${id}`,updatePost);
          setPosts(posts.map(post => post.id === id ? {...response.data} : post ));
          setEditBody('');
          setEditTitle('');
          Navigate('/');
        }catch(err){
          console.log(`Error: ${err.message}`);
          
        }
      }

  return (
        <main className='NewPost'>
        {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
                    <label htmlFor="PostTitle">Title:</label>
                    <input 
                            type="text"
                            id='postTItle'
                            required
                            value={editTitle}
                            onChange={(e)=>setEditTitle(e.target.value)} 
                        />
                        <label htmlFor="postBody">Post:</label>
                        <input 
                            id='postBody'
                            type="text"
                            required
                            value={editBody}
                            onChange={(e)=>setEditBody(e.target.value)} 
                        />
                        <button type='submit' onClick={()=> handleEdit(post.id)}>Submit</button>
                </form>
            </>
            }
            {!editTitle &&
                <>
                    <h2>Post not Found</h2>
                    <p>Well, that's Nothing</p>
                    <p>
                        <Link to='/'>Go to Home Page......</Link>
                    </p>
                </> 
            }
        </main>
  )
}

export default EditPost