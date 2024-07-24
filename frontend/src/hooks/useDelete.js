// const useDelete = 

// import axios from 'axios';

// const deleteHospitalbyId = async (id) => {
//     try {
//         console.log(id);
//         const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/hospitals/delete`, {
//             DeletedId: { id },
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const { data } = res;
//         if (data.status === "success") {
//             alert("Hospital deleted successfully");
//         } else {
//             alert(data.message);
//         }
//     } catch (error) {
//         console.log(error.message);
//         alert("Delete Hospital Failed: " + error.message);
//     }
// };


// }

// export default useDelete();

// export default deleteHospitalbyId