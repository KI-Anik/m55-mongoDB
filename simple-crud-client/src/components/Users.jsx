import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
    const loadUsers = useLoaderData()
    const [users, setUsers] = useState(loadUsers)

    const handleDelete = pId => {
        console.log(pId)
        fetch(`http://localhost:5000/users/${pId}`, {
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount){
                alert('deleted successfully')
                const remaining = users.filter(user => user._id !== pId)
                setUsers(remaining)
            }
        })
    }
    return (
        <div>
            <h2>{users.length}</h2>
            <div>
                {
                    users.map(user => <p key={user._id} >
                        {user.name}: {user.email} <button
                        onClick={()=> handleDelete(user._id)}
                        >X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;