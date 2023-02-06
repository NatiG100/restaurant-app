import Category from "../../../components/client/Category";

export default function Foods(){
    return(
        <div>
            <Category title="All" img="/dessert.jpg" numberOfItems={44}/>
            <Category title="Desert" img="/dinner.jpg" numberOfItems={44} description="this is a long description of whatever the user enters in the media"/>
            <Category title="Pizza" img="/bf.jpg" numberOfItems={44} description="this is a long description of whatever the user enters in the media"/>
            <Category title="Burger" img="/dessert.jpg" numberOfItems={44} description="this is a long description of whatever the user enters in the media"/>
            <Category title="Snack" img="/dinner.jpg" numberOfItems={44} description="this is a long description of whatever the user enters in the media"/>
            <Category title="Vegan" img="/dessert.jpg" numberOfItems={44} description="this is a long description of whatever the user enters in the media"/>
        </div>
    );
};