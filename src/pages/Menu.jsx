import { Helmet } from "react-helmet-async";
import Cover from "../Components/Shared/Cover";
import MenuCover from "../assets/menu/banner3.jpg";
import PizzaCover from "../assets/menu/pizza-bg.jpg";
import DessertCover from "../assets/menu/dessert-bg.jpeg";      
import PopularMenu from "../Components/PopularMenu";
import SaladCover from "../assets/menu/salad-bg.jpg";
import SoupCover from "../assets/menu/soup-bg.jpg";
import SectionTittle from "../Components/Shared/SectionTittle";
import CategoryMenu from "../Components/Shared/CategoryMenu";


const Menu = () => {
    return (
        <div>
            <>
                <Helmet>
                    <title>Menu</title>
                </Helmet>
            </>
            <Cover img={MenuCover} tittle="Our Menu" description="This is the menu description." />
            <SectionTittle heading="Today's Offer" subheading="Don't miss" />
            <CategoryMenu category="offered" />
            <Cover img={PizzaCover} tittle="Pizza" description="Delicious pizza options available!" />
            <CategoryMenu category="pizza" />
            <Cover img={SaladCover} tittle="Salad" description="Fresh and healthy salad options!" />
            <CategoryMenu category="salad" />
            <Cover img={SoupCover} tittle="Soup" description="Warm and comforting soup options!" />
            <CategoryMenu category="soup" />
            
        </div>
    );
};

export default Menu;