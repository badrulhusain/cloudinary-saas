"use client"

import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from'next/navigation'

function VideoUpload() {
    const [file,setFile]= useState<File |null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const router=useRouter();


    // max file size 60mb
    const  MAX_FILE_SIZE=60*1024*1024
   const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!file) return;
    if(file.size>MAX_FILE_SIZE){
        alert("File size exceeds the maximum limit of 60MB.");
        return;
    }
    const formData=new FormData();
    formData.append("file",file);
    formData.append("title",title);
    formData.append("description",description);
    formData.append("originalSize",file.size.toString());

    try{
        setIsUploading(true);
        const response=await axios.post("/api/video-upload",formData,);
        const videoId=response.data.videoId;
        router.push(`/video/${videoId}`);
    }catch(error){
        console.error("Error uploading video:",error);
        // alert("Failed to upload video. Please try again.");
    }finally{
        setIsUploading(false);
    }
   }
  return (
    
    <div>
      
    </div>
  )
}

export default VideoUpload
