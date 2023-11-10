import 'bootstrap/dist/css/bootstrap.min.css';
import './ClaimedCard.scss'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
function ClaimedCard(props) {
    const { claimed, deal } = props;

    const [showDealDetails, setShowDealDetails] = useState(false);
    const handleToggleDetails = () => {
        setShowDealDetails(!showDealDetails);
    };
    return (
        <Card className='claiemd-card'>
            <Card.Body>
                <Card.Text>Claimed Amount: {claimed.Amount} {claimed.Currency}</Card.Text>
                <Card.Text>DealName: {deal.Name}</Card.Text>

                <Button className='button-show' onClick={handleToggleDetails}>
                    {showDealDetails ? 'Hide Deal Details' : 'Show Deal Details'}
                </Button>
                {showDealDetails && (
                    <div>
                        <Card.Text>Deal Amount: {deal.Amount} {deal.Currency}</Card.Text>
                        <Card.Text>Description: {deal.Description}</Card.Text>
                    </div>
                )}
            </Card.Body>
        </Card>
    );

}

export default ClaimedCard;