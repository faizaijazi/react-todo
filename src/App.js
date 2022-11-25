import { useEffect, useRef, useState } from "react";
import { db } from './firebase'
import { collection, addDoc, getDocs, query } from 'firebase/firestore'

function App() {

  const titleRef = useRef()
  const descRef = useRef()

  const [todos, setTodos] = useState([])

  const addTodo = async () => {
    await addDoc(collection(db, "todos"),{
      title: titleRef.current.value,
      desc: descRef.current.value
    })
    console.log('submit')
  }

  const deleteTodo = (index) =>{
    // let arr = todos
    // arr.splice(index, 1)
    // setTodos(arr)
    console.log('arr')
  }

  useEffect(() => {
    const fetchData = async () =>{
      const q = query(collection(db, "todos"))
      let arr = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        arr.push(doc.data())
      })
      setTodos(arr)
    }
    fetchData()
  }, [todos])
  

  return (
    <div className="container my-4">
      <h2 className="text-center">TODOs List</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          <b>Title</b> <small>(Required)</small>
        </label>
        <input
          type="text"
          className="form-control clear-title"
          ref={titleRef}
          placeholder="Title of your TO-DO"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          <b>Description</b> <small>(Optional)</small>
        </label>
        <textarea
          ref={descRef}
          className="form-control clear-desc"
          rows="3"
          placeholder="Description of your TO-DO"
        ></textarea>
      </div>
      <div className="btn btn-outline-success" onClick={addTodo} >
        Add Task
      </div>
      <div className="btn btn-danger ms-2" >
        Delete All Tasks
      </div>
      <hr className="mt-4" />
      <br />
      <div id="table-content" className="mt-4">
        <h2>Your Tasks</h2>
        <table className="table border border-">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tablebody">
            {todos?.map((e,i)=> (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td className="todoTitle">{e.title}</td>
                <td className="todoDesc">{e.desc}</td>
                <td>
                  <div className="btn btn-sm btn-outline-danger mx-1" onClick={()=>deleteTodo(i)}>Delete</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
