import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerPost } from '../../services/loginPost';
import '../../styles/App.css';

const RegistrationPage = () => {
    const navigate = useNavigate();

    const [serverError, setServerError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = yup.object().shape({
        userName: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const userData = {
            ...data,
            userRole: 'User',
        };
        try {
            setServerError(null);
            setIsSubmitting(true);
            await registerPost(userData);
            navigate('/login');
        } catch (error) {
            setIsSubmitting(false);
            if (error.response) {
                const { data: responseData } = error.response;
                if (responseData) {
                    const formattedErrors = Object.entries(responseData)
                        .map(([key, messages]) => {
                            if (Array.isArray(messages)) {
                                return `${key}: ${messages.join(', ')}`;
                            }
                            return `${key}: ${messages}`;
                        })
                        .join('\n');
                    setServerError(formattedErrors);
                } else {
                    setServerError('Unknown error. Please try again later.');
                }
            } else {
                setServerError('Network error. Check your connection and try again.');
            }
        }
    };

    return (
        <div className="page">
            <h1>Registration</h1>
            <br></br>
            <br></br>
            <section>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="userName">Username</label>
                                </td>
                                <td>
                                    <input
                                        id="userName"
                                        type="text"
                                        className="form-control"
                                        {...register('userName')}
                                    />
                                    {errors.userName && (<span className="text-danger">Invalid username!</span>)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="email">Email</label>
                                </td>
                                <td>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        {...register('email')}
                                    />
                                    {errors.email && (<span className="text-danger">Invalid email!</span> )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="password">Password</label>
                                </td>
                                <td>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        {...register('password')}
                                    />
                                    {errors.password && (<span className="text-danger">Invalid password!</span> )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <button
                        type="submit"
                        id="register-button"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {serverError && (
                    <div className="alert alert-danger" role="alert">
                        An error occurred while registering!
                    </div>
                )}
            </section>
        </div>
    );
};

export default RegistrationPage;