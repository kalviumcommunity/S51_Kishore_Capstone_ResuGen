import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { toast } from "react-toastify"; 

const useUser = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "user",
        async () => {
            try {
                const userDetail = await getUserDetail();
                return userDetail;
                toast.success("Succesfully Login In")
            } catch (err) {
                if (err.response?.status === 401) {
                    console.error("User not authenticated:", err.message);
                } else {
                    // Handle errors
                    console.error("Something went wrong:", err.message);
                    toast.error("Failed to Login", err); 
                }
                throw err;
            }
        },
        { refetchOnWindowFocus: false }
    );

    return { data, isLoading, isError, refetch };
};

export default useUser;
