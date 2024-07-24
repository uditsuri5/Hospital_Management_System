import { useNavigate } from "react-router-dom";

const useAddHospital = () =>{
    const navigate = useNavigate()

    const add = async ({ name, cityLower, imageUrl, specialities, rating }) => {
    try{
        if (imageUrl.length == 0 || imageUrl == "" || imageUrl == null) {
            imageUrl = "https://res.cloudinary.com/dxecoctrm/image/upload/v1721512038/wrxlpqozimsuy4nftvrh.png"
        }
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/hospitals/create`, {
            method: "POST",
            body: JSON.stringify({ name, cityLower, imageUrl, specialities, rating }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        if (data.status === "success") {
            alert("Hospital added successfully");
            navigate("/");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error.message);
        alert("Add Hospital Failed" + error.message);
    }
       
   }

   return {add};
}

export default useAddHospital
