import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from '../helper/helper';
import { getUserDetail } from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        // if (!query) return;

        const fetchData = async() => {
            try {
                setData(prev => ({...prev, isLoading: true }));

                //get the useremail from the Token and de-structure it in an email variable.
                const { email } = !query ? await getUserDetail() : "";

                // const { email } = !query ? await getUser() : '';
                const { data, status } = !query ? await axios.get(`/api/user/${email}`) : await axios.get(`/api/${query}`);


                if (status === 201) {
                    setData(prev => ({...prev, isLoading: false }));
                    setData(prev => ({...prev, apiData: data, status: status }));
                }

                setData(prev => ({...prev, isLoading: false }));
            } catch (error) {
                setData(prev => ({...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}