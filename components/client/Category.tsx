import Image from "next/image";
import Link from "next/link";

export interface TypeClientCategory{
    img:string,
    title:string,
    description?:string,
    numberOfItems:number,
    id?:string
}

export default function Category({img,title,description,numberOfItems}:TypeClientCategory){
    return(
        <Link 
            className="
                h-max flex justify-between items-center p-3 py-4
                border border-gray-300 mx-auto my-4 rounded-xl max-w-xs
            "
            href={"/drinks/"}
        >
            <Image
                src={img}
                alt={"title"}
                height={60}
                width={60}
                className="rounded-full h-16 w-16"
            />
            <div className="w-full ml-3">
                <div style={{maxWidth:"220px"}}>
                    <p className="text-indigo-700 text-lg">{title}</p>
                    <p className="text-gray-500 text-sm">{description}</p>
                </div>
            </div>
            <p className="font-medium text-lg text-gray-600 mx-2">
                {numberOfItems}
            </p>
        </Link>
    );
}