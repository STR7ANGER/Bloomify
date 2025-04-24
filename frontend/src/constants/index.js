import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import seasonal from "../assets/about/seasonal.png";
import indoor from "../assets/about/indoor.png";
import tools from "../assets/about/tools.jpg";
import nutrition from "../assets/about/nutrition.png";
import art from "../assets/about/art.jpg";
import img1 from "../assets/products/seasonal/anthurium1.jpg.avif";
import img2 from "../assets/products/2.png";
import img3 from "../assets/products/3.png";
import img4 from "../assets/products/4.png";
import img5 from "../assets/products/5.png";
import img6 from "../assets/products/6.png";
import img7 from "../assets/products/7.png";
import img8 from "../assets/products/8.png";
import sheers from "../assets/products/tools/sheers.png";
import mister from "../assets/products/tools/mister.png";
import wateringCan from "../assets/products/tools/watering-can.png";
import trowel from "../assets/products/tools/trowel.png";
import weeding from "../assets/products/tools/weeding.png";
import fertSpreader from "../assets/products/tools/fert-spreader.png";
import gloves from "../assets/products/tools/gloves.png";
import moisterMeter from "../assets/products/tools/moisture-meter.png";
import { TbGardenCartFilled } from "react-icons/tb";
import { GiFlowerPot } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa6";
import { GiVineFlower } from "react-icons/gi";
import { GiPorcelainVase } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { BsCart2 } from "react-icons/bs";
import Simmi from "../assets/profile/Akashdeep_Kaur.jpg"
import Aditya from "../assets/profile/Aditya_Maurya.jpg"


export const socials = [
  {
    id: "0",
    comapny: "Instagram",
    Icon: FaInstagram,
    url: "https://www.instagram.com/",
  },
  {
    id: "1",
    comapny: "Facebook",
    Icon: FaFacebook,
    url: "https://www.facebook.com/",
  },
  {
    id: "2",
    comapny: "Twitter",
    Icon: FaXTwitter,
    url: "https://x.com/",
  },
];

export const contentData = [
  {
    id: "1",
    title: "Seasonal Flowers",
    description:
      "Seasonal flowers bloom during specific times of the year, adapting to temperature and climate changes. These flowers are popular for their vibrant colors and fresh fragrances, making them ideal for gifting and decoration. Examples include tulips and daffodils in spring, sunflowers in summer, chrysanthemums in autumn, and poinsettias in winter. Seasonal flowers are often more affordable and eco-friendly as they require less artificial cultivation.",
    image: seasonal,
  },
  {
    id: "2",
    title: "Indoor Flowers",
    description:
      "Indoor flowers are specially cultivated to thrive in controlled environments such as homes and offices. They require minimal sunlight and can purify indoor air, adding a touch of natural beauty to any space. Common varieties include orchids, peace lilies, and African violets. These plants are ideal for enhancing aesthetics, reducing stress, and improving air quality while requiring minimal maintenance compared to outdoor plants.",
    image: indoor,
  },
  {
    id: "3",
    title: "Tools",
    description:
      "Gardening tools are essential for planting, maintaining, and harvesting flowers and plants. They range from basic hand tools such as shovels and trowels to specialized equipment like pruners and watering cans. Proper tools can help gardeners save time and effort, ensuring that plants receive the care they need to thrive. Quality tools are durable, ergonomic, and designed for specific tasks, making gardening more enjoyable and efficient.",
    image: tools,
  },
  {
    id: "4",
    title: "Plant Nutrition",
    description:
      "Plant nutrition is essential for healthy growth and blooming. Flowers require a balanced diet of macronutrients like nitrogen, phosphorus, and potassium, as well as micronutrients like iron, magnesium, and calcium. Fertilizers and supplements can provide these nutrients to plants, promoting strong roots, lush foliage, and vibrant flowers. Organic and synthetic fertilizers are available in various forms, including granules, liquids, and spikes, each with unique benefits and applications.",
    image: nutrition,
  },
  {
    id: "5",
    title: "Art & Pottery",
    description:
      "Art and pottery add beauty and personality to gardens and homes. Decorative items like sculptures, fountains, and wind chimes can enhance outdoor spaces, creating a sense of tranquility and harmony. Planters, vases, and containers are essential for displaying flowers and plants, providing a functional and aesthetic solution for gardening. Artistic pieces can be made from various materials like clay, metal, and glass, each offering unique textures and designs.",
    image: art,
  },
];

export const aboutUs = [
  {
    id: "1",
    pfp: Aditya,
    who: "Aditya Maurya",
    work: "Member",
  },
  {
    id: "2",
    pfp: "",
    who: "Arkadip Das",
    work: "Member",
  },
  {
    id: "3",
    pfp: Simmi,
    who: "Akashdeep Kaur",
    work: "Member",
  },
];

export const topProducts = [
  {
    id: "1",
    image: img1,
    title: "Anthurium",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    image: img2,
    title: "Vase",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: img3,
    title: "Ceramic Pot",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "4",
    image: img4,
    title: "Water Lily",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "5",
    image: img5,
    title: "Vetiver",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "6",
    image: img6,
    title: "Lavender",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "7",
    image: img7,
    title: "Jasmine",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "8",
    image: img8,
    title: "Orchid",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const seasonalProducts = [
  {
    id: 1,
    title: "Rose Bouquet",
    image: img8,
    price: "$20",
  },
  {
    id: 2,
    title: "Lily Bunch",
    image: img2,
    price: "$18",
  },
  {
    id: 17,
    title: "Tulip Charm",
    image: img5,
    price: "$22",
},
{
    id: 18,
    title: "Sunflower Bliss",
    image: img7,
    price: "$19",
},
{
    id: 19,
    title: "Orchid Elegance",
    image: img4,
    price: "$25",
},
{
    id: 20,
    title: "Daisy Delight",
    image: img6,
    price: "$15",
},
{
    id: 21,
    title: "Peony Passion",
    image: img8,
    price: "$30",
},
{
    id: 22,
    title: "Carnation Love",
    image: img3,
    price: "$17",
},
{
    id: 23,
    title: "Lavender Dreams",
    image: img5,
    price: "$21",
},
{
    id: 24,
    title: "Chrysanthemum Glow",
    image: img7,
    price: "$26",
}

];

export const indoorProducts = [
  {
    id: 3,
    title: "Anthurium",
    image: img1,
    price: "$25",
  },
  {
    id: 4,
    title: "Orchid Pot",
    image:  img4,
    price: "$30",
  },
  {
    id: 25,
    title: "Marigold Magic",
    image: img2,
    price: "$16",
},
{
    id: 26,
    title: "Gardenia Grace",
    image: img6,
    price: "$28",
},
{
    id: 27,
    title: "Hydrangea Harmony",
    image: img3,
    price: "$24",
},
{
    id: 28,
    title: "Daffodil Glow",
    image: img8,
    price: "$20",
},
{
    id: 29,
    title: "Magnolia Bliss",
    image: img5,
    price: "$27",
},
{
    id: 30,
    title: "Jasmine Whisper",
    image: img7,
    price: "$18",
},
{
    id: 31,
    title: "Azalea Charm",
    image: img3,
    price: "$23",
},
{
    id: 32,
    title: "Violet Serenity",
    image: img6,
    price: "$22",
}

];

export const toolsProducts = [
  {
    id: 5,
    title: "Sheers",
    image: sheers,
    price: "$30",
  },
  {
    id: 6,
    title: "Garden Gloves",
    image: gloves,
    price: "$12",
  },
  {
    id: 7,
    title: "Plant Mister",
    image: mister,
    price: "$12",
  },
  {
    id: 8,
    title: "Trowel",
    image: trowel,
    price: "$12",
  },
  {
    id: 9,
    title: "Fertilizer Spreader",
    image: fertSpreader,
    price: "$12",
  },
  {
    id: 10,
    title: "Moisture Meter",
    image: moisterMeter,
    price: "$12",
  },
  {
    id: 11,
    title: "Watering Can",
    image: wateringCan,
    price: "$12",
  },
  {
    id: 12,
    title: "Weeding Tool",
    image: weeding,
    price: "$12",
  },
];

export const nutritionProducts = [
  {
    id: 13,
    title: "Plant Fertilizer",
    image: img6,
    price: "$15",
  },
  {
    id: 14,
    title: "Soil Nutrients",
    image: img7,
    price: "$20",
  },
];

export const artProducts = [
  {
    id: 15,
    title: "Ceramic Pot",
    image: img1,
    price: "$10",
  },
  {
    id: 16,
    title: "Handmade Vase",
    image: img2,
    price: "$35",
  },
  {
    id: 33,
    title: "Camellia Radiance",
    image: img8,
    price: "$26",
},
{
    id: 34,
    title: "Hibiscus Glow",
    image: img5,
    price: "$19",
},
{
    id: 35,
    title: "Begonia Bliss",
    image: img3,
    price: "$21",
},
{
    id: 36,
    title: "Bluebell Charm",
    image: img7,
    price: "$17",
},
{
    id: 37,
    title: "Petunia Elegance",
    image: img4,
    price: "$23",
},
{
    id: 38,
    title: "Freesia Fragrance",
    image: img6,
    price: "$25",
},
{
    id: 39,
    title: "Zinnia Zest",
    image: img8,
    price: "$20",
},
{
    id: 40,
    title: "Pansy Delight",
    image: img3,
    price: "$22",
}

];



export const tabs = [
  {
    id: "seasonal",
    label: "Seasonal Flowers",
    Icon: GiVineFlower,
  },
  {
    id: "indoor",
    label: "Indoor Flowers",
    Icon: GiFlowerPot,
  },
  {
    id: "tools",
    label: "Tools",
    Icon: TbGardenCartFilled,
  },
  {
    id: "nutrition",
    label: "Plant Nutrition",
    Icon: FaSeedling,
  },
  {
    id: "art",
    label: "Art & Pottery",
    Icon: GiPorcelainVase,
  },
];

export const navIcons =[
  {
    id: "1",
    Icon: BsCart2,
    label: "Cart",
    path: "/cart",
  },
  {
    id: "2",
    Icon: VscAccount,
    label: "Account",
    path: "/signup",
  },
]
 