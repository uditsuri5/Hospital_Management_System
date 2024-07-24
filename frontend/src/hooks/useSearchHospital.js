import { useNavigate } from "react-router-dom";

const useSearchHospital = () => {
    const navigate = useNavigate();
    const searchHospital = async (search) =>{
        
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/hospitals?city=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                console.log(data.data.hospitals);
                return data.data.hospitals;
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error.message);
            alert("Search Hospital Failed" + error.message);
        }
    }
    return {searchHospital}
}

export default useSearchHospital