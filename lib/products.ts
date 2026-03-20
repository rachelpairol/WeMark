import type { Product } from "@/components/cart-context"

export const products: Product[] = [
  {
    id: "mom-shadow-box",
    name: "MOM I Love You Shadow Box",
    price: 65,
    image: "/images/mom-shadow-box-roses.jpeg",
    category: "Mother's Day",
    description:
      "Beautiful handcrafted shadow box featuring 'MOM I Love You' with pink, coral, and brown paper roses arranged in a heart shape, adorned with white lily flowers. Comes in elegant gift box with red satin ribbon.",
  },
  {
    id: "mom-shadow-box-lighted",
    name: "MOM Shadow Box with LED Lights",
    price: 85,
    image: "/images/1-mom-shadow-box-roses.jpg",
    category: "Mother's Day",
    description:
      "Premium MOM shadow box with built-in LED lights that illuminate the paper roses beautifully. Features the same stunning design with an added magical glow. Includes gift box packaging.",
  },
  {
    id: "valentines-couples-box",
    name: "Valentine's Day Couples Photo Box",
    price: 95,
    image: "/images/IMG_2875.jpg",
    category: "Valentine's Day",
    description:
      "Personalized Valentine's Day shadow box featuring your photos arranged in a heart of red paper roses. Includes custom text, couple names, and decorative golden butterfly. Perfect for celebrating your love story.",
  },
  {
    id: "custom-anniversary-box",
    name: "Custom Anniversary Shadow Box",
    price: 89,
    image: "/images/2-Frase.jpg",
    category: "Anniversary",
    description:
      "Celebrate your special milestone with this customizable anniversary shadow box. Features paper roses in your choice of colors, personalized text, and elegant white lily accents.",
  },
  {
    id: "birthday-celebration-box",
    name: "Birthday Celebration Shadow Box",
    price: 75,
    image: "/images/3-IMG_2883 (1).jpg",
    category: "Birthday",
    description:
      "Make birthdays extra special with this handcrafted shadow box. Features colorful paper roses, custom birthday message, and comes beautifully packaged in a gift box with ribbon.",
  },
  {
    id: "graduation-achievement-box",
    name: "Graduation Achievement Box",
    price: 79,
    image: "/images/4-IMG_2883.jpg",
    category: "Graduation",
    description:
      "Honor their achievement with this elegant graduation shadow box. Customizable with graduate's name, school colors, and inspirational message.",
  },
]

export const categories = ["All", "Mother's Day", "Valentine's Day", "Anniversary", "Birthday", "Graduation"]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products
  return products.filter((p) => p.category === category)
}
