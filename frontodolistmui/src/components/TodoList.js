import React, { useState, useRef } from 'react';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const columns = [  
    { field: "description" , sortable: true, filter: true, floatingFilter: true },  
    { field: "date" , sortable: true, filter: true, floatingFilter: true },  
    { field: "priority" , sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }];
  const [value, setValue] = useState('one');


  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if(gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) =>      
            index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }
        else {
            alert('Select row first');
        }
  };

  const handleDate = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const handleChange = (event, value) => {  
    setValue(value);
  };

  return (
    <div>
      
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Todos" />
      </Tabs>
      
      {value === 'one' && <div>Hello! Click on TODOS to see the todolist.</div>}

      {value === 'two' && <div>
            <div style={{height: '70%', width: '800px', margin: 'auto' }}>
            <h1>TodoList</h1>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                <TextField label="Description" variant="standard" name="description" onChange={inputChanged} value={todo.description}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label="Date"
                    inputFormat='DD/MM/YYYY'
                    name="date"
                    value={todo.date}
                    onChange={date => handleDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField label="Priority" variant="standard" name="priority" onChange={inputChanged} value={todo.priority}/>
                <Button onClick={addTodo} variant="outlined">Add</Button>
                <Button onClick={deleteTodo} variant="outlined" color="error">Delete</Button>
            </Stack>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '800px', margin: 'auto'}} >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={todos}
                    animateRows={true}
                    >
                </AgGridReact> 
            </div>
        </div>}

    </div>
  );
};

export default Todolist;