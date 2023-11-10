import { useEffect } from 'react';
import { getClaimedDeals } from '../../../store/reducer/claimed';
import { useDispatch, useSelector } from 'react-redux';
import ClaimedCard from './ClaimedCard';
import './Claimed.scss';
function Claimed() {
    const dispatch = useDispatch();
    const claimedDealsState = useSelector(state => state.claimed.claimedDeal);

    useEffect(() => {

        dispatch(getClaimedDeals())
    }, []);
    return (
        <div className='claimed'>
            <h3>Claimed Page</h3>
            <div className='parent-card-deals'>
                {claimedDealsState.map(item => (
                    <ClaimedCard key={item.claimed.id} claimed={item.claimed} deal={item.deal} />
                ))}

            </div>

        </div>
    );
}

export default Claimed;