import React from "react";


const UserList = (props)=>{
    return(
        <>
        <li>{props.email}</li>
        <li>{props.psw}</li>
        </>
    )
}

export default UserList