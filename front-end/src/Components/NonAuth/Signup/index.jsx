import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../store/reducer/signup';
import './Signup.scss';
import Loading from '../../CommanComponents/Loading';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch();
    const [passwordError, setPasswordError] = useState(false);
    const loading = useSelector(state => state.signup.loading)
    const navigate = useNavigate();


    const handleRepeatPasswordChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (formData.password !== value) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        birthday: '',
        gender: 'male',
        imageUrl: '',
        password: '',
        repeatPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordError === false) {


            const success = await dispatch(signupUser(formData));

            if (success) {
                navigate('/');
            }
        }

    };


    return (
        <div className='signup-section'>
            <div className='hero-section'>
                <h4>Make The Best Deals</h4>
            </div>

            <div className='from-section'>
                <h3>Signup</h3>

                <form onSubmit={handleSubmit}>
                    <div className='comman'>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <div className='comman'>
                        <input
                            type="date"
                            name="birthday"
                            placeholder="Birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="Input Personal Image Link"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        value={formData.repeatPassword}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleRepeatPasswordChange(e);
                        }}

                        required
                    />
                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit'>Signup</button>)
                    }
                    {passwordError && <span className="error-message">  Password does not Match</span>}


                </form>
            </div>
        </div>
    );
}

export default Signup;
