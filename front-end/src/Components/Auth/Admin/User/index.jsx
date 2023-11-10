import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserList, getNextLinkUsers, getPreviousLinkUsers } from "../../../../store/reducer/usersList";
import UserCard from "./UserCrad";
import './UserList.scss'
function UserList() {
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.userList.usersList);
    const refresh = useSelector((state) => state.userList.refresh);
    const nextLink = useSelector((state) => state.userList.nextLink);
    const previousLink = useSelector((state) => state.userList.previousLink);

    console.log('rrrrrrrrrrrrrrr',refresh)
    useEffect(() => {
        dispatch(getUserList());
    }, [usersList, refresh]);

    const handlePrevLink = (e) => {
        e.preventDefault();
        if (previousLink !== null) {
            dispatch(getNextLinkUsers());
        }
    }

    const handleNextLink = (e) => {
        e.preventDefault();
        if (nextLink !== null) {
            dispatch(getPreviousLinkUsers());
        }
    }
    const usersListResults = usersList?.results || [];

    return (
        <section className="user-list">
            <div >
                {usersListResults.map(item => (
                    <UserCard key={item.id} props={item} />
                ))}

            </div>
            <div className='pagination-section'>
                <button onClick={handlePrevLink} disabled={previousLink === null} >Previous</button>
                <button onClick={handleNextLink} disabled={nextLink === null}>Next</button>
            </div>
        </section>
    );
}

export default UserList;