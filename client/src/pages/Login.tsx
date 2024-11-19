import { useState, ChangeEvent, FormEvent } from 'react';
import { UserLogin } from "../interfaces/UserLogin.tsx";
import { login } from '../api/authAPI.tsx';
import Auth from '../utils/auth.tsx';


const Login = () => {
    // State to manage the login form data
    const [loginData, setLoginData] = useState<UserLogin>({
        username: '',
        password: ''
    });

    // Handle changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData({
            // the line below spreads the loginData object into the new state (loginData)
            ...loginData,
            // the line below Dynamically sets the field in loginData whose name matches the name of the input to the new value
            // meaning it will match the inputted username value to username and password to password
            [name]: value
        });
    };

    // Handle form submission for login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Call the login API endpoint with loginData
            const data = await login(loginData);
            // If the login is successful, call Auth.login to store the token in localStorage
            Auth.login(data.token)
        } catch (err) {
            console.error('Failed to login', err); // Log any errors that occur during login
        }
    };

    return (
        <div className='form-container'>
          <form className='form login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            {/* Username input field */}
            <div className="form-group">
              <label>Username</label>
              <input 
                className="form-input"
                type='text'
                name='username'
                value={loginData.username || ''}
                onChange={handleChange}
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label>Password</label>
              <input 
                className="form-input"
                type='password'
                name='password'
                value={loginData.password || ''}
                onChange={handleChange}
              />
            </div>
            {/* Submit button for the login form */}
            <div className="form-group">
              <button className="btn btn-primary" type='submit'>Login</button>
            </div>
          </form>
        </div>
      );

}

export default Login;