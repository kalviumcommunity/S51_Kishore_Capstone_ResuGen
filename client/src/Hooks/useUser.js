import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { toast } from "react-toastify"; 

const useUser = () => {
    const toastOptions = {
        style: {
            backgroundColor: "#333",
            color: "#fff",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
        },
    };

    const { data, isLoading, isError, refetch } = useQuery(
        "user",
        async () => {
            try {
                const userDetail = await getUserDetail();
                toast.success("Successfully Logged In", toastOptions);
                return userDetail;
            } catch (err) {
                if (err.response?.status === 401) {
                    console.error("User not authenticated:", err.message);
                } else {
                    console.error("Something went wrong:", err.message);
                    toast.error("Failed to Login", toastOptions);
                }
                throw err;
            }
        },
        { refetchOnWindowFocus: false }
    );

    return { data, isLoading, isError, refetch };
};

export default useUser;
