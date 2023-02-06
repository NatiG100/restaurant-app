import Image from "next/image";

export interface TypeClientCategory{
    img:string,
    title:string,
    description?:string,
    numberOfItems:number
}

export default function Category({img,title,description,numberOfItems}:TypeClientCategory){
    return(
        <div className="h-max">
            <Image
                src={img}
                alt={"title"}
                height={80}
                width={80}
                className="rounded-full"
            />
            <div>
                <div>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
            </div>
            <p>{numberOfItems}</p>
        </div>
    );
}