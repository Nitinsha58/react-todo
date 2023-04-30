import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = useState([{}]);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState();
  const [checked, setChecked] = useState(false);

  const changeValue = (e) => {
    setValue(e.target.value)
  }

  const changeCheck = (e) => {
    console.log(e.target.checked)
    setChecked(e.target.checked)
  }

  useEffect(()=>{
    const localData = localStorage.getItem('Todos');
    if (localData !== null){
      setTodos(JSON.parse(localData));
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('Todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = ()=>{
    if (index >= 0 && value){
      const updateTodos = [...todos];
      updateTodos[index].text = value;
      updateTodos[index].checked = checked;

      setTodos(updateTodos);
      setValue('');
      setChecked(false);
      setIndex();
    }else if (value){
      setTodos(prevTodos => {
        const newTodo = {text: value, checked: checked};
        return [...prevTodos, newTodo];
      })
      setValue('');
    }
  }

  const editTodo = (index) => {
    const updateTodos = [...todos];
    const updateValue = updateTodos[index].text;
    setValue(updateValue);
    setIndex(index);
    setChecked(updateTodos[index].checked);
  }

  const deleteTodo = (index) => {
    const updateTodos = [...todos];
    updateTodos.splice(index, 1);
    setTodos(updateTodos);
  }

  return (
    <div className="App">
      <h1>Todos</h1>
      <input type="text" name="" id="" value={value} onChange={changeValue}/>
      <input type="checkbox" checked={checked} onChange={changeCheck} />
      <button onClick={addTodo}>{index ? "Update" : "Add Todo"}</button>
      <ul> 
        {todos.map((todo, index) => (
          <li key={index} onDoubleClick={() => {editTodo(index)}}>
            <p className='todo-text' style = {{ textDecoration : todo.checked ? "line-through" : "none"}}>{todo.text}</p>
            {/* <input type="button" value="Edit" onClick={() => {editTodo(index)}} className='todo-button' /> */}
            <input type="button" value="Delete" onClick={deleteTodo} className='todo-button' />
          </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
