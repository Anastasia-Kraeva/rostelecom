import axios from 'axios';
import {useEffect, useState} from 'react';
import Search from './Search';

function App() {
  const sortingStatus = [
    {id: 1, value: 'сортировать'},
    {id: 2, value: 'по возрастанию'},
    {id: 3, value: 'по убыванию'}
  ]
  const [initialPostList, setInitialPostList] = useState([])
  const [postList, setPostList] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState(sortingStatus[0].value)

  const getPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    setInitialPostList(response.data)
  }

  const filterPostList = () => {
    const filteredPostList = initialPostList.filter(post => post.title.includes(filterValue))
    sortValue !== sortingStatus[0].value ?
      sortPostList(filteredPostList) :
      setPostList(filteredPostList)
  }

  const compareFunction = (previousEl, currentEl) => {
    if (previousEl.title > currentEl.title) return 1
    if (previousEl.title < currentEl.title) return -1
    return 0
  }

  const sortPostList = (postList) => {
    sortValue === sortingStatus[0].value ?
      filterPostList() :
      (() => {
        let sortedPostList = [...postList].sort(compareFunction)
        if (sortValue === sortingStatus[2].value) {
          sortedPostList = sortedPostList.reverse()
        }
        setPostList(sortedPostList)
      })()
  }

  const handleChangeInput = (e) => {
    setFilterValue(e.target.value)
  }

  const handleChangeSelect = (e) => {
    setSortValue(e.target.value)
  }

  useEffect(getPosts, [])

  useEffect(() => {
      setPostList(initialPostList)
    }, [initialPostList]
  )

  useEffect(filterPostList, [filterValue])

  useEffect(() => {
    sortPostList(postList)
  }, [sortValue])

  return (
    <div className="App">
      <Search handleChangeInput={handleChangeInput}
              handleChangeSelect={handleChangeSelect}
              sortValue={sortValue}
              sortingStatusOptions={sortingStatus}/>
      <ul>
        {postList.map(post => {
          return (<li key={`ple-${post.id}`}>{post.title}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
