import React, { useState, useEffect } from "react";
import axios from "axios";


export const CheckList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
          .get("http://localhost:3001/check")
          .then((response) => {
            console.log(response, " Group Details")
            setData(response.data);
            setLoading(false); // Set loading to false once data is fetched
          })
          .catch((error) => {
            console.error("Error fetching groups:", error);
            setLoading(false); // Set loading to false in case of error too
          });
    }, []); // Empty dependency array to run the effect only once when component mounts

    return (
        <div>
            <h1>CheckList</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data ? (
                        <p>{data}</p>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            )}
        </div>
    );
};
