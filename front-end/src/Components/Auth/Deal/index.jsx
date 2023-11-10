import 'bootstrap/dist/css/bootstrap.min.css';
import './Deal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getDeals } from '../../../store/reducer/deals';
import { getPreviousLinkDeals } from '../../../store/reducer/deals';
import { getNextLinkDeals } from '../../../store/reducer/deals';
import { useEffect } from 'react';
import DealCard from './DealCard';
function Deal() {
    const dispatch = useDispatch();
    const dealState = useSelector((state) => state.deals.deals);
    const nextLink = useSelector((state) => state.deals.nextLink);
    const previousLink = useSelector((state) => state.deals.previousLink);

    useEffect(() => {
        dispatch(getDeals());
    }, [dispatch]);


    const handlePrevLink = (e) => {
        e.preventDefault();
        if (previousLink !== null) {
            dispatch(getPreviousLinkDeals());
        }
    }

    const handleNextLink = (e) => {
        e.preventDefault();
        if (nextLink !== null) {
            dispatch(getNextLinkDeals());
        }
    }


    // Check if dealState.results exists before accessing it
    const dealsResult = dealState?.results || [];

    return (
        <div className='deal-page'>
            <h3>Deal Page</h3>
            <div className='parent-card-deals'>
                
                {dealsResult.map(item => (
                    <DealCard key={item.id} props={item} />
                ))}

            </div>
            <div className='pagination-section'>
                <button onClick={handlePrevLink} disabled={previousLink === null} >Previous</button>
                <button onClick={handleNextLink} disabled={nextLink === null}>Next</button>
            </div>
        </div>
    );
}

export default Deal;
