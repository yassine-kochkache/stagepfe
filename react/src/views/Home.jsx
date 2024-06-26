import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LockClosedIcon, ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';

const Home = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [numTelephone, setNumTelephone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('Choose a file');
    const [error, setError] = useState({ __html: '' });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user-profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
                    }
                });
                const userData = response.data.user;
                setName(userData.name);
                setEmail(userData.email);
                setNumTelephone(userData.numtelephone || '');
                setAdresse(userData.adresse || '');
                // You can populate other fields similarly
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle error fetching user profile
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array ensures this effect runs once on component mount

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError({ __html: '' });

        const formData = new FormData();
        if (name) formData.append('name', name);
        if (email) formData.append('email', email);
        if (password) formData.append('password', password);
        if (passwordConfirmation) formData.append('password_confirmation', passwordConfirmation);
        if (numTelephone) formData.append('numtelephone', numTelephone);
        if (adresse) formData.append('adresse', adresse);
        if (image) {
            formData.append('imageduprofile', image);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/update-profile', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Profile updated:', response.data);
            // Handle success (e.g., show success message)
        } catch (error) {
            if (error.response) {
                const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
                setError({ __html: finalErrors.join('<br>') });
            }
            console.error('Error updating profile:', error.response.data);
            // Handle error updating profile
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageduprofile') {
            setImage(files[0]);
            setImageName(files[0].name);
        } else if (name === 'numtelephone') {
            setNumTelephone(value);
        } else if (name === 'adresse') {
            setAdresse(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'password_confirmation') {
            setPasswordConfirmation(value);
        }
    };

    const handleFileClick = () => {
        document.getElementById('imageduprofile').click();
    };

    return (
        <>
            <div>
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Update Your Profile
            </h2>

            {error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="name" className="sr-only">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="numtelephone" className="sr-only">
                            Phone Number
                        </label>
                        <input
                            id="numtelephone"
                            name="numtelephone"
                            type="text"
                            value={numTelephone}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div>
                        <label htmlFor="adresse" className="sr-only">
                            Address
                        </label>
                        <input
                            id="adresse"
                            name="adresse"
                            type="text"
                            value={adresse}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Address"
                        />
                    </div>
                    <div className="relative">
                        <input
                            id="imageduprofile"
                            name="imageduprofile"
                            type="file"
                            onChange={handleChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={handleFileClick}
                            className="relative block w-full cursor-pointer appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 bg-white focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <span className="inline-flex items-center">
                                <ArrowUpOnSquareIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                                {imageName}
                            </span>
                        </button>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="sr-only">
                            Password Confirmation
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={handleChange}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password Confirmation"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Update Profile
                    </button>
                </div>
            </form>
        </>
    );
};

export default Home;
