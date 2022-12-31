import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export interface TypeSingleImageUpload{
    img:string,
    setImg:(value:string)=>void
}

export default function SingleImageUpload(props:TypeSingleImageUpload){
    const onDrop = useCallback((acceptedFiles:File[])=>{
        const reader = new FileReader();
        reader.onload = () =>{
            props.setImg(reader.result as string);
        }
        reader.readAsDataURL(acceptedFiles[0]);
    },[])
    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
            onDrop,
            accept:{
                'image/png':['.png'],
                'image/gif':['.gif'],
                'image/jpeg':['.jpg','.jpeg']
            },
            maxFiles:1,
        });
    return(
        <div {...getRootProps()} className="w-full h-64 relative">
            <Image
                src={props.img}
                alt="avatar"
                width={400}
                height={400}
                className="absolute w-full h-full top-0 left-0 object-cover"
            />
            <input {...getInputProps()}/>
            <div className="
                absolute top-0 right-0 w-full h-full flex items-center justify-center
            ">
                {
                    !isDragActive?
                        <div className="h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                            <p className="text-xl text-indigo-50 bg-indigo-700/50 px-4 py-2 rounded-full">Drag 'n' drop an image here, or click</p>
                        </div>:
                        <div className="h-full w-full flex items-center justify-center  bg-indigo-700/50 border-2 border-dashed">
                            <p className="text-xl text-indigo-50">drop the image here</p>
                        </div>
                }
            </div>
        </div>
    );
}