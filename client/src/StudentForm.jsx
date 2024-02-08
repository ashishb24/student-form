import React, { useState } from 'react';
import PdfButton from './pdfButton';


const StudentForm = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        mobileNo: '',
        city: '',
        cast: '',
        hobbies: [],
        
    });

    const handleCityChange = (e) => {
        setFormData({ ...formData, city: e.target.value });
    };

    const handleCastChange = (e) => {
        setFormData({ ...formData, cast: e.target.value });
    };

    const handleHobbyChange = (e) => {
        const hobbyValue = e.target.value;
        setFormData((prevData) => {
            if (prevData.hobbies.includes(hobbyValue)) {
                return {
                    ...prevData,
                    hobbies: prevData.hobbies.filter((hobby) => hobby !== hobbyValue),
                };
            } else {
                return { ...prevData, hobbies: [...prevData.hobbies, hobbyValue] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiEndpoint = 'http://localhost:5000/register';
            const formDataToSend = new FormData();

            if (!formData.cast || !formData.city || !formData.mobileNo || !formData.studentName) {
                alert('enter all fields')
            }
            // Append individual form fields to FormData
            formDataToSend.append('studentName', formData.studentName);
            formDataToSend.append('mobileNo', formData.mobileNo);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('cast', formData.cast);
            formData.hobbies.forEach((hobby) => formDataToSend.append('hobbies', hobby));

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success (you can redirect or show a success message)
                const responseData = await response.json();
                console.log('Registration successful', responseData);
            } else {
                // Handle errors (you can show an error message)
                const errorData = await response.json();
                console.error('Registration failed', errorData);
            }
        } catch (error) {
            console.error('Error during registration', error);
            console.log(formData);
        }

    };



    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-sections">
                <label htmlFor="">Student Name :</label>
                <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    name="studentName"
                />
            </div>
            <div className="form-sections">
                <label htmlFor="">Student Mobile No :</label>
                <input
                    type="text"
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    name="mobileNo"
                />
            </div>
            <div className="form-sections">
                <label htmlFor="">City :</label>
                <select name="city" id="city" value={formData.city} onChange={handleCityChange}>
                    <option value="Ahmadabad">Ahmadabad</option>
                    <option value="surat">Surat</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="pune">Pune</option>
                </select>
            </div>
            <div className="form-sections">
                <label htmlFor="">Cast :</label>
                <input
                    type="radio"
                    id="obc"
                    name="cast"
                    value="obc"
                    checked={formData.cast === 'obc'}
                    onChange={handleCastChange}
                />
                <label htmlFor="obc">OBC</label>

                <input
                    type="radio"
                    id="sc"
                    name="cast"
                    value="sc"
                    checked={formData.cast === 'sc'}
                    onChange={handleCastChange}
                />
                <label htmlFor="sc">SC</label>

                <input
                    type="radio"
                    id="st"
                    name="cast"
                    value="st"
                    checked={formData.cast === 'st'}
                    onChange={handleCastChange}
                />
                <label htmlFor="st">ST</label>
            </div>
            <div className="form-sections">
                <label htmlFor="">Hobbies :</label>
                <input
                    type="checkbox"
                    id="hobby1"
                    name="hobby"
                    value="reading"
                    checked={formData.hobbies.includes('reading')}
                    onChange={handleHobbyChange}
                />
                <label htmlFor="hobby1">Reading</label>

                <input
                    type="checkbox"
                    id="hobby2"
                    name="hobby"
                    value="singing"
                    checked={formData.hobbies.includes('singing')}
                    onChange={handleHobbyChange}
                />
                <label htmlFor="hobby2">Singing</label>

                <input
                    type="checkbox"
                    id="hobby3"
                    name="hobby"
                    value="traveling"
                    checked={formData.hobbies.includes('traveling')}
                    onChange={handleHobbyChange}
                />
                <label htmlFor="hobby3">Traveling</label>
            </div>
           
            <button type="submit">Submit</button>
        </form>
        <PdfButton/>
        </>
    );
};

export default StudentForm;