import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { toast } from "react-toastify"; 

const useUser = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "user",
        async () => {
            try {
                const userDetail = await getUserDetail();
                toast.success("Successfully Logged In")
                return userDetail;
            } catch (err) {
                if (err.response?.status === 401) {
                    console.error("User not authenticated:", err.message);
                } else {
                    console.error("Something went wrong:", err.message);
                    toast.error("Failed to Login", err); 
                }
                throw err;
            }
        },
        { refetchOnWindowFocus: false }
    );
        // console.log(data.uid, "data")
    return { data, isLoading, isError, refetch };
};

export default useUser;
