import 'bootstrap/dist/css/bootstrap.min.css';
import './DealCard.scss'
import { useSelector, useDispatch } from 'react-redux';
import { getDeals } from '../../../../store/reducer/deals';
import AddNewClaimed from '../../Claimed/AddNewClaimed';
import { deleteDeal } from '../../../../store/reducer/deals';
function DealCard(props) {
    const { Name, Description, Status, Amount, id, Currency } = props.props;

    const userState = useSelector((state) => state.signin.userData);
    const dispatch = useDispatch();
    const handleDeleteDeal = () => {
        const success = dispatch(deleteDeal(id))
        if (success) {
            dispatch(getDeals);
        }
    }
    return (
        <div key={id} className='deals-card'>
            <div className="card" style={{ width: '22rem', height: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{Name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted status">{Status}</h6>
                    <p className="card-text card-des">
                        {Description}
                    </p>
                    <a className="card-link">
                        <>

                            <AddNewClaimed Currency={Currency} dealId={id} />

                        </>
                    </a>
                    <a className="card-link">
                        {userState.Role === 'admin' && (
                            <button onClick={handleDeleteDeal}>
                                Delete
                            </button>
                        )}


                    </a>
                    <h6 className="card-subtitle mb-2 text-muted amount">{Amount} {Currency}</h6>
                </div>
            </div>
        </div>
    );
}

export default DealCard;