import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import seasonal from "../assets/about/seasonal.png";
import indoor from "../assets/about/indoor.png";
import tools from "../assets/about/tools.jpg";
import nutrition from "../assets/about/nutrition.png";
import art from "../assets/about/art.jpg";
import img1 from "../assets/products/1.jpg";
import img2 from "../assets/products/2.png";
import img3 from "../assets/products/3.png";
import img4 from "../assets/products/4.png";
import img5 from "../assets/products/5.png";
import img6 from "../assets/products/6.png";
import img7 from "../assets/products/7.png";
import img8 from "../assets/products/8.png";
import { TbGardenCartFilled } from "react-icons/tb";
import { GiFlowerPot } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa6";
import { GiVineFlower } from "react-icons/gi";
import { GiPorcelainVase } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { BsHeart } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";


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
    pfp: "",
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
    pfp: "",
    who: "Akashdeep Kaur",
    work: "Member",
  },
];

export const topProducts = [
  {
    id: "1",
    image: img1,
    title: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    image: img2,
    title: "Product 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: img3,
    title: "Product 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "4",
    image: img4,
    title: "Product 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "5",
    image: img5,
    title: "Product 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "6",
    image: img6,
    title: "Product 6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "7",
    image: img7,
    title: "Product 7",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "8",
    image: img8,
    title: "Product 8",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const seasonalProducts = [
  {
    id: 1,
    title: "Rose Bouquet",
    image: img1,
    price: "$20",
  },
  {
    id: 2,
    title: "Lily Bunch",
    image: img2,
    price: "$18",
  },
];

export const indoorProducts = [
  {
    id: 3,
    title: "Tulip Vase",
    image: img3,
    price: "$25",
  },
  {
    id: 4,
    title: "Orchid Pot",
    image:  img4,
    price: "$30",
  },
];

export const toolsProducts = [
  {
    id: 5,
    title: "Gardening Kit",
    image: img8,
    price: "$30",
  },
  {
    id: 6,
    title: "Pruning Scissors",
    image: img5,
    price: "$12",
  },
];

export const nutritionProducts = [
  {
    id: 7,
    title: "Plant Fertilizer",
    image: img6,
    price: "$15",
  },
  {
    id: 8,
    title: "Soil Nutrients",
    image: img7,
    price: "$20",
  },
];

export const artProducts = [
  {
    id: 9,
    title: "Ceramic Pot",
    image: img1,
    price: "$10",
  },
  {
    id: 10,
    title: "Handmade Vase",
    image: img2,
    price: "$35",
  },
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
    Icon: BsHeart,
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    id: "2",
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
