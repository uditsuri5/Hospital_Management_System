import { useEffect, useState } from "react";
import useListAllHospitals from "../hooks/useListAllHospitals";
import Navbar from "../components/navbar";
import axios from 'axios';

const ViewAllHospitalPage = () => {
    const { list } = useListAllHospitals();
    const [allHospitalsData, setAllHospitalsData] = useState([]);
    const [editData, setEditData] = useState({});
    const [editId, setEditId] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [specialities, setSpecialities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await list();
            setAllHospitalsData(data);
        };

        fetchData();
    }, []);

    const handleEdit = (hospital) => {
        setEditId(hospital._id);
        setEditData(hospital);
        setSpecialities(hospital.specialities || []);
    };

    const handleSave = async (id) => {
        try {
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/hospitals/edit`, {
                ...editData,
                specialities,
                id,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { data } = res;
            if (data.status === "success") {
                setAllHospitalsData(allHospitalsData.map((hospital) =>
                    hospital._id === id ? { ...editData, specialities } : hospital
                ));
                setEditId(null);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error.message);
            alert("Edit Hospital Failed: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Delete hospital with id: " + id);
            const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/hospitals/delete`, {
                params: { id },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { data } = res;
            if (data.status === "success") {
                alert("Hospital deleted successfully");
                setAllHospitalsData(allHospitalsData.filter(hospital => hospital._id !== id));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error.message);
            alert("Delete Hospital Failed: " + error.message);
        }
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
    };

    return (
        <>
            <Navbar />
            <div className="viewAll-container">
                <div className="viewAllCards">
                    {allHospitalsData.map((hospital) => (
                        <div key={hospital._id} className={`view-card ${editId === hospital._id ? 'editing' : ''}`}>
                            <div className="text">
                                {editId === hospital._id ? (
                                    <>
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                                        <label htmlFor="city">City: </label>
                                        <input type="text" value={editData.cityLower} onChange={(e) => setEditData({ ...editData, cityLower: e.target.value })} />
                                        <label htmlFor="imageUrl">Image Url: </label>
                                        <input type="text" value={editData.imageUrl} onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })} />
                                        <label htmlFor="specialities">Specialities: </label>
                                        <div className="dropdown">
                                            <div className="dropdown-selected" onClick={toggleDropdown}>
                                                {specialities.length > 0 ? specialities.join(', ') : "Select Speciality"}
                                            </div>
                                            {dropdownOpen && (
                                                <ul className="dropdown-menu">
                                                    {specialitiesList.map(speciality => (
                                                        <li key={speciality} onClick={() => handleSpecialityChange(speciality)}>
                                                            {specialities.includes(speciality) ? <strong>{speciality}</strong> : speciality}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <label htmlFor="rating">Rating: </label>
                                        <input type="text" value={editData.rating} onChange={(e) => setEditData({ ...editData, rating: e.target.value })} />
                                    </>
                                ) : (
                                    <>
                                        <p>Name: {hospital.name}</p>
                                        <p>City: {hospital.cityLower}</p>
                                        <p>Specialities: {hospital.specialities.join(', ')}</p>
                                        <p>Rating: {hospital.rating}</p>
                                    </>
                                )}
                                <div className="crud">
                                    {editId === hospital._id ? (
                                        <button onClick={() => handleSave(hospital._id)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(hospital)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(hospital._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewAllHospitalPage;
