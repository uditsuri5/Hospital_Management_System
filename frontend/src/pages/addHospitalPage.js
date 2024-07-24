import { useState } from "react";
import Navbar from "../components/navbar";
import useAddHospital from "../hooks/useAddHospital";

const AddHospitalForm = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [specialities, setSpecialities] = useState([]);
    const [rating, setRating] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { add } = useAddHospital();

    const handleSubmit = () => {
        const cityLower = city.toLowerCase();
        console.log(cityLower);
        console.log({ name, cityLower, imageUrl, specialities, rating });
        add({ name, cityLower, imageUrl, specialities, rating });
    };

    const specialitiesList = ["General", "Cardiologist", "Neurologist", "Dermatologist", "Orthopedic"];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSpecialityChange = (speciality) => {
        if (specialities.includes(speciality)) {
            setSpecialities(specialities.filter(s => s !== speciality));
        } else {
            setSpecialities([...specialities, speciality]);
        }
        setDropdownOpen(false);
    };

    const handleRatingChange = (e) => {
        let value = parseFloat(e.target.value);
        if (value < 0) value = 0;
        if (value > 5) value = 5;
        setRating(value);
    };

    return (
        <>
            <Navbar />
            <div className="add-container">
                <div className="add-box">
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="city">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                    <label htmlFor="specialities">Specialities</label>
                    <div className="dropdown">
                        <div className="dropdown-selected" onClick={toggleDropdown}>
                            {specialities.length > 0 ? specialities.join(', ') : "Select Speciality"}
                        </div>
                        {dropdownOpen && (
                            <ul className="dropdown-menu">
                                {specialitiesList.map(speciality => (
                                    <li key={speciality} onClick={() => handleSpecialityChange(speciality)}>
                                        {speciality}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={handleRatingChange}
                        step="0.1"
                        min="0"
                        max="5"
                    />
                    <button onClick={handleSubmit}>Add Hospital</button>
                </div>
            </div>
        </>
    );
};

export default AddHospitalForm;
