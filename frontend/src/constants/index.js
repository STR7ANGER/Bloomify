import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import seasonal from "../assets/about/seasonal.png";
import indoor from "../assets/about/indoor.png";
import tools from "../assets/about/tools.jpg";
import nutrition from "../assets/about/nutrition.png";
import art from "../assets/about/art.jpg";

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
