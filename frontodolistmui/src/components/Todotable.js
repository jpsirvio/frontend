import React from 'react';
import removeTable from './Todotable';

export default function Todotable(props) {
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.todos.map((todo,index) => 
                        <tr key={index}>
                            <td>{todo.date}</td>
                            <td>{todo.description}</td>
                            <td><button onClick={() => props.removeTable(index)}>remove</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}