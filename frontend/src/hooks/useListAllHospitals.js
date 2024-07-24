const useListAllHospitals = () => {
    const list = async () => {
        try {
            console.log("Inside list all")
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/hospitals/getall`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                return data.data.hospitals;
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error.message);
            alert("List Hospital Failed" + error.message);
        }
    };
    return { list };
};
export default useListAllHospitals