"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Locale = "en" | "es"

export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.how": "How It Works",
    "nav.reviews": "Reviews",

    // Hero
    "hero.badge": "Handcrafted with Love",
    "hero.title.1": "Gifts That Tell ",
    "hero.title.2": "Your Story",
    "hero.description": "Each WeMark shadow box is a handcrafted masterpiece, made with love using delicate paper roses and personalized details. Perfect for every special occasion.",
    "hero.cta.shop": "Customize Yours",
    "hero.cta.about": "Our Story",

    // Features
    "features.title": "Why Choose WeMark",
    "features.subtitle": "We pour love into every creation, ensuring each shadow box is a one-of-a-kind treasure.",
    "features.handcrafted.title": "Handcrafted",
    "features.handcrafted.desc": "Every piece is carefully crafted by hand with attention to every petal and detail.",
    "features.personalized.title": "Personalized",
    "features.personalized.desc": "Custom names, messages, photos, and colors to make your gift truly unique.",
    "features.giftReady.title": "Gift Ready",
    "features.giftReady.desc": "Beautifully packaged in elegant white boxes with satin ribbon, ready to gift.",
    "features.premium.title": "Premium Quality",
    "features.premium.desc": "Made with premium materials for a lasting keepsake your loved ones will treasure.",

    // Featured Products
    "featured.title": "Featured Creations",
    "featured.subtitle": "Discover our most loved handcrafted shadow boxes.",
    "featured.viewAll": "View All",

    // CTA
    "cta.title": "Have a Custom Idea?",
    "cta.description": "We love bringing your vision to life. Whether it's a custom color palette, special occasion, or unique design, we'll create something truly special for you.",
    "cta.button": "Get in Touch",

    // Product Card
    "product.addToCart": "Add to Cart",

    // Shop Page
    "shop.title": "Our Collection",
    "shop.subtitle": "Browse our handcrafted shadow boxes, each made with love for your special moments.",
    "shop.noProducts": "No products found in this category.",
    "shop.all": "All",

    // Product Detail
    "productDetail.backToShop": "Back to Shop",
    "productDetail.personalization": "Personalization (optional)",
    "productDetail.personalizationPlaceholder": "Add names, date, or custom message...",
    "productDetail.personalizationHint": "Tell us how you'd like to personalize this piece.",
    "productDetail.addedToCart": "Added to Cart",
    "productDetail.details": "Details",
    "productDetail.detail1": "Handcrafted with premium paper roses",
    "productDetail.detail2": "Presented in an elegant white gift box with satin ribbon",
    "productDetail.detail3": "Customizable with your personal message",
    "productDetail.detail4": "Approximate size: 10\" x 10\" shadow box",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty.title": "Your Cart is Empty",
    "cart.empty.description": "Discover our beautiful handcrafted shadow boxes and find the perfect gift.",
    "cart.empty.cta": "Browse Collection",
    "cart.items": "items in your cart",
    "cart.item": "item in your cart",
    "cart.orderSummary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.shippingFree": "Free",
    "cart.total": "Total",
    "cart.freeShippingHint": "more for free shipping!",
    "cart.addMore": "Add",
    "cart.proceedToCheckout": "Proceed to Checkout",
    "cart.continueShopping": "Continue Shopping",
    "cart.personalization": "Personalization:",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.backToCart": "Back to Cart",
    "checkout.contactInfo": "Contact Information",
    "checkout.firstName": "First Name",
    "checkout.lastName": "Last Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone",
    "checkout.shippingAddress": "Shipping Address",
    "checkout.streetAddress": "Street Address",
    "checkout.apt": "Apt, Suite, etc. (optional)",
    "checkout.city": "City",
    "checkout.state": "State",
    "checkout.zip": "ZIP Code",
    "checkout.country": "Country",
    "checkout.paymentInfo": "Payment Information",
    "checkout.cardNumber": "Card Number",
    "checkout.expiry": "Expiration Date",
    "checkout.cvc": "CVC",
    "checkout.paymentSecure": "Your payment information is secure and encrypted.",
    "checkout.placeOrder": "Place Order",
    "checkout.processing": "Processing...",
    "checkout.orderConfirmed": "Order Confirmed!",
    "checkout.orderConfirmedDesc": "Thank you for your order. We'll start handcrafting your piece with love. You'll receive a confirmation email shortly.",
    "checkout.qty": "Qty:",

    // About
    "about.title": "Made Just For You",
    "about.p1": "At WeMark, every shadow box is a labor of love. We believe that the best gifts are the ones made by hand, with care and intention. Each paper rose is delicately crafted, each message thoughtfully placed, to create a keepsake that captures your most precious moments.",
    "about.p2": "What started as a passion project has grown into a mission: to help people express their love through beautiful, personalized art pieces that stand the test of time.",
    "about.valuesTitle": "Our Values",
    "about.value1.title": "Crafted with Love",
    "about.value1.desc": "Every petal, every detail is made by hand with genuine care and attention. No two pieces are exactly alike.",
    "about.value2.title": "Uniquely Personal",
    "about.value2.desc": "We work with you to customize every aspect -- names, colors, messages, and photos to make your gift truly one-of-a-kind.",
    "about.value3.title": "Celebrating Connection",
    "about.value3.desc": "Our mission is to strengthen the bonds between people through meaningful, heartfelt gifts they'll treasure forever.",
    "about.ctaTitle": "Ready to Create Something Special?",
    "about.ctaDesc": "Browse our collection or reach out for a custom creation.",
    "about.shopNow": "Shop Now",
    "about.contactUs": "Contact Us",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have a custom idea, a question, or just want to say hello? We'd love to hear from you.",
    "contact.formTitle": "Send us a Message",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "Custom order inquiry",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell us about your vision...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message Sent!",
    "contact.sentDesc": "Thank you for reaching out. We'll get back to you within 24 hours.",
    "contact.sendAnother": "Send Another Message",
    "contact.infoTitle": "Contact Information",
    "contact.location": "Location",
    "contact.followUs": "Follow Us",
    "contact.customOrders": "Custom Orders",
    "contact.customOrdersDesc": "Looking for something specific? We love custom projects! Share your vision and we'll work together to create something truly special. Custom orders typically take 5-7 business days.",

    // Footer
    "footer.desc": "Handcrafted with love. Each piece tells a unique story, made just for you and your loved ones.",
    "footer.quickLinks": "Quick Links",
    "footer.shopAll": "Shop All",
    "footer.aboutUs": "About Us",
    "footer.contact": "Contact",
    "footer.categories": "Categories",
    "footer.getInTouch": "Get in Touch",
    "footer.rights": "WeMark. All rights reserved. Made with love.",

    // Categories
    "category.Mother's Day": "Mother's Day",
    "category.Valentine's Day": "Valentine's Day",
    "category.Anniversary": "Anniversary",
    "category.Birthday": "Birthday",
    "category.Graduation": "Graduation",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.shop": "Tienda",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.how": "Cómo funciona",
    "nav.reviews": "Reseñas",

    // Hero
    "hero.badge": "Hecho a Mano con Amor",
    "hero.title.1": "Regalos Que Cuentan ",
    "hero.title.2": "Tu Historia",
    "hero.description": "Cada shadow box de WeMark es una obra maestra hecha a mano, elaborada con amor usando delicadas rosas de papel y detalles personalizados. Perfecto para cada ocasi\u00f3n especial.",
    "hero.cta.shop": "Personaliza el tuyo",
    "hero.cta.about": "Nuestra Historia",

    // Features
    "features.title": "Por Qu\u00e9 Elegir WeMark",
    "features.subtitle": "Ponemos amor en cada creaci\u00f3n, asegurando que cada shadow box sea un tesoro \u00fanico.",
    "features.handcrafted.title": "Hecho a Mano",
    "features.handcrafted.desc": "Cada pieza est\u00e1 cuidadosamente elaborada a mano con atenci\u00f3n a cada p\u00e9talo y detalle.",
    "features.personalized.title": "Personalizado",
    "features.personalized.desc": "Nombres, mensajes, fotos y colores personalizados para hacer tu regalo \u00fanico.",
    "features.giftReady.title": "Listo para Regalar",
    "features.giftReady.desc": "Bellamente empaquetado en elegantes cajas blancas con cinta de sat\u00e9n, listo para regalar.",
    "features.premium.title": "Calidad Premium",
    "features.premium.desc": "Hecho con materiales premium para un recuerdo duradero que tus seres queridos atesorar\u00e1n.",

    // Featured Products
    "featured.title": "Creaciones Destacadas",
    "featured.subtitle": "Descubre nuestras shadow boxes hechas a mano m\u00e1s queridas.",
    "featured.viewAll": "Ver Todo",

    // CTA
    "cta.title": "\u00bfTienes una Idea Personalizada?",
    "cta.description": "Nos encanta dar vida a tu visi\u00f3n. Ya sea una paleta de colores personalizada, una ocasi\u00f3n especial o un dise\u00f1o \u00fanico, crearemos algo verdaderamente especial para ti.",
    "cta.button": "Cont\u00e1ctanos",

    // Product Card
    "product.addToCart": "Agregar al Carrito",

    // Shop Page
    "shop.title": "Nuestra Colecci\u00f3n",
    "shop.subtitle": "Explora nuestras shadow boxes hechas a mano, cada una elaborada con amor para tus momentos especiales.",
    "shop.noProducts": "No se encontraron productos en esta categor\u00eda.",
    "shop.all": "Todos",

    // Product Detail
    "productDetail.backToShop": "Volver a la Tienda",
    "productDetail.personalization": "Personalizaci\u00f3n (opcional)",
    "productDetail.personalizationPlaceholder": "Agrega nombres, fecha o mensaje personalizado...",
    "productDetail.personalizationHint": "Cu\u00e9ntanos c\u00f3mo te gustar\u00eda personalizar esta pieza.",
    "productDetail.addedToCart": "Agregado al Carrito",
    "productDetail.details": "Detalles",
    "productDetail.detail1": "Hecho a mano con rosas de papel premium",
    "productDetail.detail2": "Presentado en una elegante caja de regalo blanca con cinta de sat\u00e9n",
    "productDetail.detail3": "Personalizable con tu mensaje personal",
    "productDetail.detail4": "Tama\u00f1o aproximado: 25cm x 25cm shadow box",

    // Cart
    "cart.title": "Carrito de Compras",
    "cart.empty.title": "Tu Carrito Est\u00e1 Vac\u00edo",
    "cart.empty.description": "Descubre nuestras hermosas shadow boxes hechas a mano y encuentra el regalo perfecto.",
    "cart.empty.cta": "Explorar Colecci\u00f3n",
    "cart.items": "art\u00edculos en tu carrito",
    "cart.item": "art\u00edculo en tu carrito",
    "cart.orderSummary": "Resumen del Pedido",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Env\u00edo",
    "cart.shippingFree": "Gratis",
    "cart.total": "Total",
    "cart.freeShippingHint": "m\u00e1s para env\u00edo gratis!",
    "cart.addMore": "Agrega",
    "cart.proceedToCheckout": "Proceder al Pago",
    "cart.continueShopping": "Seguir Comprando",
    "cart.personalization": "Personalizaci\u00f3n:",

    // Checkout
    "checkout.title": "Pago",
    "checkout.backToCart": "Volver al Carrito",
    "checkout.contactInfo": "Informaci\u00f3n de Contacto",
    "checkout.firstName": "Nombre",
    "checkout.lastName": "Apellido",
    "checkout.email": "Correo Electr\u00f3nico",
    "checkout.phone": "Tel\u00e9fono",
    "checkout.shippingAddress": "Direcci\u00f3n de Env\u00edo",
    "checkout.streetAddress": "Direcci\u00f3n",
    "checkout.apt": "Apto, Suite, etc. (opcional)",
    "checkout.city": "Ciudad",
    "checkout.state": "Estado",
    "checkout.zip": "C\u00f3digo Postal",
    "checkout.country": "Pa\u00eds",
    "checkout.paymentInfo": "Informaci\u00f3n de Pago",
    "checkout.cardNumber": "N\u00famero de Tarjeta",
    "checkout.expiry": "Fecha de Vencimiento",
    "checkout.cvc": "CVC",
    "checkout.paymentSecure": "Tu informaci\u00f3n de pago est\u00e1 segura y encriptada.",
    "checkout.placeOrder": "Realizar Pedido",
    "checkout.processing": "Procesando...",
    "checkout.orderConfirmed": "\u00a1Pedido Confirmado!",
    "checkout.orderConfirmedDesc": "Gracias por tu pedido. Comenzaremos a elaborar tu pieza con amor. Recibir\u00e1s un correo de confirmaci\u00f3n en breve.",
    "checkout.qty": "Cant:",

    // About
    "about.title": "Hecho Solo Para Ti",
    "about.p1": "En WeMark, cada shadow box es un trabajo de amor. Creemos que los mejores regalos son los hechos a mano, con cuidado e intenci\u00f3n. Cada rosa de papel est\u00e1 delicadamente elaborada, cada mensaje cuidadosamente colocado, para crear un recuerdo que capture tus momentos m\u00e1s preciados.",
    "about.p2": "Lo que comenz\u00f3 como un proyecto de pasi\u00f3n ha crecido hasta convertirse en una misi\u00f3n: ayudar a las personas a expresar su amor a trav\u00e9s de hermosas piezas de arte personalizadas que resisten el paso del tiempo.",
    "about.valuesTitle": "Nuestros Valores",
    "about.value1.title": "Hecho con Amor",
    "about.value1.desc": "Cada p\u00e9talo, cada detalle est\u00e1 hecho a mano con genuino cuidado y atenci\u00f3n. No hay dos piezas exactamente iguales.",
    "about.value2.title": "\u00danicamente Personal",
    "about.value2.desc": "Trabajamos contigo para personalizar cada aspecto -- nombres, colores, mensajes y fotos para hacer tu regalo verdaderamente \u00fanico.",
    "about.value3.title": "Celebrando la Conexi\u00f3n",
    "about.value3.desc": "Nuestra misi\u00f3n es fortalecer los lazos entre las personas a trav\u00e9s de regalos significativos y sinceros que atesorar\u00e1n por siempre.",
    "about.ctaTitle": "\u00bfListo para Crear Algo Especial?",
    "about.ctaDesc": "Explora nuestra colecci\u00f3n o cont\u00e1ctanos para una creaci\u00f3n personalizada.",
    "about.shopNow": "Comprar Ahora",
    "about.contactUs": "Cont\u00e1ctanos",

    // Contact
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "\u00bfTienes una idea personalizada, una pregunta o simplemente quieres saludar? Nos encantar\u00eda saber de ti.",
    "contact.formTitle": "Env\u00edanos un Mensaje",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre",
    "contact.email": "Correo",
    "contact.emailPlaceholder": "tu@correo.com",
    "contact.subject": "Asunto",
    "contact.subjectPlaceholder": "Consulta de pedido personalizado",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cu\u00e9ntanos sobre tu visi\u00f3n...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.sent": "\u00a1Mensaje Enviado!",
    "contact.sentDesc": "Gracias por contactarnos. Te responderemos en un plazo de 24 horas.",
    "contact.sendAnother": "Enviar Otro Mensaje",
    "contact.infoTitle": "Informaci\u00f3n de Contacto",
    "contact.location": "Ubicaci\u00f3n",
    "contact.followUs": "S\u00edguenos",
    "contact.customOrders": "Pedidos Personalizados",
    "contact.customOrdersDesc": "\u00bfBuscas algo espec\u00edfico? \u00a1Nos encantan los proyectos personalizados! Comparte tu visi\u00f3n y trabajaremos juntos para crear algo verdaderamente especial. Los pedidos personalizados suelen tardar de 5 a 7 d\u00edas h\u00e1biles.",

    // Footer
    "footer.desc": "Hecho a mano con amor. Cada pieza cuenta una historia \u00fanica, hecha solo para ti y tus seres queridos.",
    "footer.quickLinks": "Enlaces R\u00e1pidos",
    "footer.shopAll": "Ver Todo",
    "footer.aboutUs": "Nosotros",
    "footer.contact": "Contacto",
    "footer.categories": "Categor\u00edas",
    "footer.getInTouch": "Cont\u00e1ctanos",
    "footer.rights": "WeMark. Todos los derechos reservados. Hecho con amor.",

    // Categories
    "category.Mother's Day": "D\u00eda de la Madre",
    "category.Valentine's Day": "San Valent\u00edn",
    "category.Anniversary": "Aniversario",
    "category.Birthday": "Cumplea\u00f1os",
    "category.Graduation": "Graduaci\u00f3n",
  },
} as const

type TranslationKey = keyof typeof translations.en

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
