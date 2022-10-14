import React, {useState} from 'react';

const TodoList = () => {
    
    console.log("-----------------------------------------")
    const [desc, setDesc] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    console.log("start: " + todos);

    const inputChanged = (event) => {  
        setDesc(event.target.value);
    }

    const addTodo = (event) => {   
        event.preventDefault();
        setTodos([...todos, desc]);
    }

    return(
        <div>
            <input type="text" onChange={inputChanged} value={desc} />
            <button onClick={addTodo}>Add</button>
            <table><tbody>
                {todos.map((todo,index) => <tr key={index}><td>{todo} <button onClick={() => setTodos(todos.filter((todo, i) => i !== index))}>remove</button></td></tr>)}
            </tbody></table>
        </div>
    );
};

export default TodoList;