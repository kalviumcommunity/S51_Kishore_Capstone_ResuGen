import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { toast } from "react-toastify";

const useUser = () => {
    const toastOptions = {
        style: {
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        },
    };

    const { data, isLoading, isError, refetch } = useQuery(
        "user",
        async () => {
            try {
                const userDetail = await getUserDetail();
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

    useEffect(() => {
    }, [data]);

    return { data, isLoading, isError, refetch };
};

export default useUser;
