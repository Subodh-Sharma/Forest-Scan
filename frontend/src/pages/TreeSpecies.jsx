import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const TreeCount = () => {
    const navigate = useNavigate();
    const [specie, setSpecie] = useState();
    const [confidence,setConfidence] = useState();
    const [image, setImage] = useState();
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
            setImage(file)
        }
    };
    const handleUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', image);
        try {
            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
            setSpecie(response.data.class)
            let floatNumber = response.data.confidence;
            let truncatedNumber = Math.trunc(floatNumber * 100) / 100;
            setConfidence(truncatedNumber)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <button onClick={() => navigate("/")}>Back To Home</button>
            <div>
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload a file</button>
            </div>
                <div>
                    {file && <img src={file} style={{ height: "300px", width: "300px" }} alt="uploaded Image" />}
                    <h3>Input Image</h3>
                </div>
            {specie && <div>
                <h3>Forest Specie : {specie}</h3>
                <h4>Confidence : {confidence} %</h4>

            </div>}

        </div>
    )
}

export default TreeCount;