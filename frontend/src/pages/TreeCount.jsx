import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageWithCircles from "../components/TreeCountImage";
import axios from "axios"

const TreeCount = () => {
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = useState();
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [density,setDensity] = useState();
    const [forestCover,setForestCover] = useState();
    const imageAngle = 120;
    const height = 100;
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageBase64 = await convertFileToBase64(file);
                setImage(imageBase64)
                setFile(URL.createObjectURL(e.target.files[0]));
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };
    const ImageArea = (imageAngle,height) =>{
        const angleInRadians = imageAngle * Math.PI / 180;
        const tanValue = Math.tan(angleInRadians);
        const sideLength = 2*height*tanValue;
        const area = sideLength*sideLength;
        return area/1000000;
    }
    const ForestDensity = (treePerKM2)=>{
        if(treePerKM2<=500){
            return "Open Forest"
        }
        if(treePerKM2>500 && treePerKM2<=1000){
            return "Moderately Dense Forest"
        }
        if(treePerKM2>1000){
            return "Very Dense Forest"
        }
    }
    const handleUpload = async () => {
        try {
            const result = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/tree-detection-qefdf/1",
                params: {
                    api_key: "3spAUiG1PYta5VlmXNmr"
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            setCoordinates(result.data.predictions)
            const imageArea = ImageArea(imageAngle,height);
            console.log(imageArea);
            const treePerKM2 = result.data.predictions.length/imageArea;
            console.log(treePerKM2);
            const forestdensity = ForestDensity(treePerKM2);
            setDensity(treePerKM2);
            setForestCover(forestdensity);
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
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div>
                    {image && <img src={file} style={{ height: "400px", width: "400px" }} alt="uploaded Image" />}
                    <h3>Input Image</h3>
                </div>
                <div>
                    {coordinates && <ImageWithCircles style={{ height: "400px", width: "400px" }} imageUrl={file} circleCoordinates={coordinates} />}
                    <h3>Output Image</h3>
                </div>
            </div>
            {coordinates && <div>
                <h3>Number of Trees : {coordinates.length}</h3>
                <h3>Trees per km² : {density}</h3>
                <h3>Forest Cover : {forestCover}</h3>
            </div>}

        </div>
    )
}

export default TreeCount;