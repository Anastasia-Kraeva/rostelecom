import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [postList, setPostList] = useState([])

  const getPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    setPostList(response.data)
  }

  useEffect(getPosts, [])

  return (
    <div className="App">
      <ol>
        {postList.map(post => {
          return (<li key={`ple-${post.id}`}>{post.title}</li>)
        })}
      </ol>
    </div>
  );
}

export default App;
