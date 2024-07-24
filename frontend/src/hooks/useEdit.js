const useEdit = () => {

    const edit = async ({ name, cityLower, imageUrl, specialities, rating }) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/hospitals/edit`, {
                method: "PUT",
                body: JSON.stringify({ name, cityLower, imageUrl, specialities, rating }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.status === "success") {
                alert("Hospital edited successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error.message);
            alert("Edit Hospital Failed" + error.message);
        }
    };
}