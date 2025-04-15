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
import useMenu from "../hooks/useMenu";

export const categoryCoverMap = {
    pizza: PizzaCover,
    dessert: DessertCover,
    salad: SaladCover,
    soup: SoupCover,
    // add more as needed
  };
const Menu = () => {
    const [menu, loading] = useMenu();
    const uniqueCategories = [...new Set(menu.map(item => item.category))];
    console.log(categoryCoverMap);

    return (
        <div>
            <Helmet>
                <title>Menu</title>
            </Helmet>
            <Cover img={MenuCover} tittle="Our Menu" description="This is the menu description." />
            <SectionTittle heading="Today's Offer" subheading="Don't miss" />
            {
                uniqueCategories.map((category) => {
                    const categoryItems = menu.filter(item => item.category === category);
                    return (
                        <div key={category}>
                            <Cover img={categoryCoverMap[category] || MenuCover} tittle={category} description={`Delicious ${category} options available!`} />
                            <CategoryMenu category={category} items={categoryItems} />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Menu;