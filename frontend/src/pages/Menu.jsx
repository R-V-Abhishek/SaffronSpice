import {React, useState} from "react";
import "./Menu.css";


// Importing images for vegetarian dishes
import VegetableBiryani from "../assets/Images/vegetableBiriyani.png";
import PalakPaneer from "../assets/Images/PalakPaneer.png";
import PaneerButterMasala from "../assets/Images/PaneerButterMasala.png";
import AlooGobi from "../assets/Images/AlooGobi.png";
import BainganBharta from "../assets/Images/BainganBharta.png";
import VegetablePulao from "../assets/Images/VegetablePulao.png";
import DalTadka from "../assets/Images/DalTadka.png";
import VegKoftaCurry from "../assets/Images/VegKoftaCurry.png";
import JeeraRice from "../assets/Images/JeeraRice.png";
import VegetableKurma from "../assets/Images/VegetableKurma.png";
import ChanaMasala from "../assets/Images/ChanaMasala.png";

// Non-Vegetarian imports
import ChickenTikka from "../assets/Images/ChickenTikka.png";
import MuttonKorma from "../assets/Images/MuttonKorma.png";
import ChickenBiryani from "../assets/Images/ChickenBiryani.png";
import FishCurry from "../assets/Images/FishCurry.png";
import KeemaMatar from "../assets/Images/KeemaMatar.png";
import ChickenCurry from "../assets/Images/ChickenCurry.png";
import SeekhKebab from "../assets/Images/SeekhKebab.png";
import ChickenMasala from "../assets/Images/ChickenMasala.png";
import LambShank from "../assets/Images/LambShank.png";
import ButterChicken from "../assets/Images/ButterChicken.png";
import TandooriChicken from "../assets/Images/TandooriChicken.png";
import GoanFishCurry from "../assets/Images/GoanFishCurry.png";
import PrawnMasala from "../assets/Images/PrawnMasala.png";
import LambRoganJosh from "../assets/Images/LambRoganJosh.png";

// Chinese imports
import ChineseFriedRice from "../assets/Images/ChineseFriedRice.png";
import VegChowmein from "../assets/Images/VegChowmein.png";
import VegManchurian from "../assets/Images/VegManchurian.png";
import ChickenChowmein from "../assets/Images/ChickenChowmein.png";
import SpringRolls from "../assets/Images/SpringRolls.png";
import KungPaoChicken from "../assets/Images/KungPaoChicken.png";
import SweetAndSourChicken from "../assets/Images/SweetAndSourChicken.png";
import HakkaNoodles from "../assets/Images/HakkaNoodles.png";

// Beverages imports
import MangoLassi from "../assets/Images/MangoLassi.png";
import SweetLassi from "../assets/Images/SweetLassi.png";
import MasalaChai from "../assets/Images/MasalaChai.png";
import Lemonade from "../assets/Images/Lemonade.png";
import IcedTea from "../assets/Images/IcedTea.png";
import Coffee from "../assets/Images/Coffee.png";

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    {
      id: 1,
      category: "Vegetarian Dishes",
      items: [
        {
          name: "Vegetable Biryani",
          description: "A fragrant rice dish made with mixed vegetables, saffron, and a blend of aromatic spices.",
          price: "₹200",
          image: VegetableBiryani,
        },
        {
          name: "Palak Paneer",
          description: "A creamy spinach curry with paneer cubes, cooked in a mix of spices.",
          price: "₹220",
          image: PalakPaneer,
        },
        {
          name: "Paneer Butter Masala",
          description: "A creamy tomato-based curry with soft cubes of paneer (Indian cottage cheese).",
          price: "₹210",
          image: PaneerButterMasala,
        },
        {
          name: "Aloo Gobi",
          description: "A hearty dish made with potatoes and cauliflower cooked in aromatic Indian spices.",
          price: "₹180",
          image: AlooGobi,
        },
        {
          name: "Baingan Bharta",
          description: "Smoky mashed eggplant cooked with tomatoes and spices.",
          price: "₹210",
          image: BainganBharta,
        },
        {
          name: "Vegetable Pulao",
          description: "A fragrant rice dish made with assorted vegetables and mild spices.",
          price: "₹150",
          image: VegetablePulao,
        },
        {
          name: "Dal Tadka",
          description: "A traditional yellow lentil dish flavored with cumin, garlic, and ghee.",
          price: "₹130",
          image: DalTadka,
        },
        {
          name: "Vegetable Kofta Curry",
          description: "Deep-fried vegetable dumplings in a rich, flavorful gravy.",
          price: "₹250",
          image: VegKoftaCurry,
        },
        {
          name: "Jeera Rice",
          description: "A simple and aromatic rice dish flavored with cumin seeds.",
          price: "₹100",
          image: JeeraRice,
        },
        {
          name: "Vegetable Kurma",
          description: "A rich, creamy curry made with mixed vegetables and cashew paste.",
          price: "₹240",
          image: VegetableKurma,
        },
        {
          name: "Chana Masala",
          description: "A spicy chickpea curry cooked in tomato gravy with a variety of spices.",
          price: "₹170",
          image: ChanaMasala,
        },
      ],
    },
    {
      id: 2,
      category: "Non-Vegetarian Dishes",
      items: [
        {
          name: "Chicken Tikka",
          description: "Boneless chicken marinated in yogurt and spices, grilled to perfection.",
          price: "₹350",
          image: ChickenTikka,
        },
        {
          name: "Mutton Korma",
          description: "Tender mutton cooked in a rich, creamy, and flavorful gravy.",
          price: "₹450",
          image: MuttonKorma,
        },
        {
          name: "Chicken Biryani",
          description: "Aromatic basmati rice layered with spiced chicken and saffron.",
          price: "₹400",
          image: ChickenBiryani,
        },
        {
          name: "Fish Curry",
          description: "Delicious fish cooked in a spicy and tangy curry.",
          price: "₹380",
          image: FishCurry,
        },
        {
          name: "Keema Matar",
          description: "Minced mutton cooked with peas in a flavorful gravy.",
          price: "₹370",
          image: KeemaMatar,
        },
        {
          name: "Chicken Curry",
          description: "Traditional chicken curry cooked in a blend of spices.",
          price: "₹320",
          image: ChickenCurry,
        },
        {
          name: "Seekh Kebab",
          description: "Minced meat skewers grilled to perfection, served with mint chutney.",
          price: "₹290",
          image: SeekhKebab,
        },
        {
          name: "Chicken Masala",
          description: "Spicy chicken cooked in a tomato-based gravy.",
          price: "₹330",
          image: ChickenMasala,
        },
        {
          name: "Lamb Shank",
          description: "Slow-cooked lamb shank in rich, spiced gravy.",
          price: "₹550",
          image: LambShank,
        },
        {
          name: "Butter Chicken",
          description: "Chicken cooked in a creamy, rich tomato sauce.",
          price: "₹400",
          image: ButterChicken,
        },
      ],
    },
    {
      id: 3,
      category: "Chinese Dishes",
      items: [
        {
          name: "Chinese Fried Rice",
          description: "Stir-fried rice with vegetables and soy sauce.",
          price: "₹200",
          image: ChineseFriedRice,
        },
        {
          name: "Veg Chowmein",
          description: "Stir-fried noodles with mixed vegetables.",
          price: "₹220",
          image: VegChowmein,
        },
        {
          name: "Veg Manchurian",
          description: "Fried vegetable balls in a sweet and spicy sauce.",
          price: "₹230",
          image: VegManchurian,
        },
        {
          name: "Chicken Chowmein",
          description: "Stir-fried noodles with chicken and vegetables.",
          price: "₹250",
          image: ChickenChowmein,
        },
        {
          name: "Spring Rolls",
          description: "Crispy fried rolls filled with vegetables.",
          price: "₹150",
          image: SpringRolls,
        },
        {
          name: "Kung Pao Chicken",
          description: "Spicy chicken with peanuts and vegetables.",
          price: "₹280",
          image: KungPaoChicken,
        },
        {
          name: "Sweet and Sour Chicken",
          description: "Chicken cooked in a sweet and tangy sauce.",
          price: "₹260",
          image: SweetAndSourChicken,
        },
        {
          name: "Hakka Noodles",
          description: "Stir-fried noodles with vegetables and soy sauce.",
          price: "₹240",
          image: HakkaNoodles,
        },
      ],
    },
    {
      id: 4,
      category: "Beverages",
      items: [
        {
          name: "Mango Lassi",
          description: "A sweet yogurt drink flavored with mango.",
          price: "₹120",
          image: MangoLassi,
        },
        {
          name: "Sweet Lassi",
          description: "A sweet yogurt drink with a creamy texture.",
          price: "₹100",
          image: SweetLassi,
        },
        {
          name: "Masala Chai",
          description: "A spiced tea with a blend of aromatic spices.",
          price: "₹60",
          image: MasalaChai,
        },
        {
          name: "Lemonade",
          description: "A refreshing drink made with lemon juice and sugar.",
          price: "₹50",
          image: Lemonade,
        },
        {
          name: "Iced Tea",
          description: "Chilled tea served with lemon and mint.",
          price: "₹80",
          image: IcedTea,
        },
        {
          name: "Coffee",
          description: "A hot cup of freshly brewed coffee.",
          price: "₹90",
          image: Coffee,
        },
      ],
    },
  ];

  const hasSearchResults = menuItems.some(category => 
    category.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="menu">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dish names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Conditional rendering for no results */}
      {searchTerm && !menuItems.some(category => 
        category.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      ) && (
        <div className="no-results">
          <p>No dishes found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Menu Items */}
      {menuItems.map((category) => {
        const filteredItems = category.items.filter(
          (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const itemsToRender = searchTerm ? filteredItems : category.items;

        return (
          <div key={category.id} className="category">
            <h2>{category.category}</h2>
            <div className="menu-items">
              {itemsToRender.map((item, index) => (
                <div key={index} className="menu-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-item-image"
                  />
                  <div className="menu-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;