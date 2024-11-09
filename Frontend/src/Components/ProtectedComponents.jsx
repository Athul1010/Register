import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                
                if (!token) {
                    alert("No token found! Please log in.");
                    return;
                }

                // Make a request to a protected API endpoint with the token in Authorization header
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/protected`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in the Authorization header
                    }
                });

                setData(response.data); // Set the data from response
            } catch (error) {
                console.error('Error fetching protected data:', error);
                alert('Error fetching protected data');
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>Protected Data</h1>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
    );
}

export default ProtectedComponent;

