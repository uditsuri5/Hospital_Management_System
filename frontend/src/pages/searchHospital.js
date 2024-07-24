import React, { useState } from 'react';
import Navbar from '../components/navbar';
import useSearchHospital from '../hooks/useSearchHospital';

const SearchHospital = () => {
    const [search, setSearch] = useState('');
    const { searchHospital } = useSearchHospital();
    const [allHospitalsData, setAllHospitalsData] = useState([]);

    const handleSearch = async () => {
        const data = await searchHospital(search);
        // console.log(data)
        setAllHospitalsData(data);
    };
    
    // console.log(allHospitalsData)
    return (
        <>
            <Navbar />
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="viewAll-container">
                    <div className="viewAllCards">
                        {allHospitalsData.map((hospital, index) => (
                            <div key={index} className="view-card">
                                <div className="image">
                                    <img src={hospital.imageUrl} alt="" />
                                </div>
                                <div className="text">
                                    <p>Name: {hospital.name}</p>
                                    <p>City: {hospital.cityLower}</p>
                                    <p>
                                        Specialities: {hospital.specialities.join(', ')}
                                    </p>
                                    <p>Rating: {hospital.rating}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchHospital;
