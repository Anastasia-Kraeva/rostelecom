import axios from 'axios';
import {useEffect, useState} from 'react';
import Search from './Search';

function App() {
  const [initialPostList, setInitialPostList] = useState([])
  const [postList, setPostList] = useState([])
  const [filterValue, setFilterValue] = useState('')

  const getPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    setInitialPostList(response.data)
  }

  const filterPostList = () => {
    setPostList(initialPostList.filter(post => post.title.includes(filterValue)))
  }

  const handleChangeInput = (e) => {
    setFilterValue(e.target.value)
  }

  useEffect(getPosts, [])

  useEffect(() => {
      setPostList(initialPostList)
    }, [initialPostList]
  )

  useEffect(filterPostList, [filterValue])

  return (
    <div className="App">
      <Search handleChangeInput={handleChangeInput}/>
      <ul>
        {postList.map(post => {
          return (<li key={`ple-${post.id}`}>{post.title}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
