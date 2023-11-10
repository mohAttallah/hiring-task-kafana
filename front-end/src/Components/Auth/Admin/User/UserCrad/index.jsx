import './UserCard.scss';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { changeUserStatus, getUserList, deleteUser } from '../../../../../store/reducer/usersList';
function UserCard({ props }) {
    const dispatch = useDispatch()

    const handleSaveChanges = () => {
        const success = dispatch(changeUserStatus(status, props.id))
        if (success) {
            setshowButton(false)
        }
    };

    const handleDeleteButton = () => {
        const success = dispatch(deleteUser(props.id))
        if (success) {
            dispatch(getUserList);
        }
    }
    const [status, setStatus] = useState(props.Status);
    const [showButton, setshowButton] = useState(false);
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setshowButton(true)
    };
    const buttonClassName = showButton ? 'visible' : 'hidden';

    return (
        <div className='users-card'>
            <div className='img-container'>
                {props.Img ? (
                    <img src={props.Img} alt="User" />
                ) : (
                    <img src="https://images.pexels.com/photos/18684565/pexels-photo-18684565/free-photo-of-old-tenements-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User" />
                )}
            </div>

            <h4>{props.Username}</h4>
            <h5>{props.Role}</h5>

            <select id="statusSelect" value={status} onChange={handleStatusChange}>
                <option value="Active">Active</option>
                <option value="In Active">Inactive</option>
                <option value="Deleted">Deleted</option>
                <option value="Expired">Expired</option>
            </select>
            <button className={buttonClassName} onClick={handleSaveChanges}>Save </button>
            <button className='delete-btn' onClick={handleDeleteButton}>Delete</button>



        </div>
    );
}

export default UserCard;