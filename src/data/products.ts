export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    details: {
        material: string;
        finish: string;
        dimensions: string;
        authenticity: string;
    };
}

export const products: Product[] = [
    {
        id: "1",
        name: "pipol UNO",
        price: "€ 400",
        description: "Una exploración minimalista de la forma que examina la conexión a través de su postura reflexiva. Cada pieza está hecha y pulida meticulosamente para conseguir este acabado único.",
        image: "/images/pipol1.jpg",
        details: {
            material: "Resina de poliuretano maciza",
            finish: "Pulido a mano con protección UV",
            dimensions: "35cm x 20cm x 15cm",
            authenticity: "Firmada y numerada en la base",
        }
    },
    {
        id: "2",
        name: "pipol DOS",
        price: "€ 450",
        description: "La segunda iteración de la colección pipol. Destaca por unas proporciones equilibradas y un peso visual que ancla cualquier diseño de interior. Arte puro hecho objeto.",
        image: "/images/pipol2.jpg",
        details: {
            material: "Compuesto mineral texturizado",
            finish: "Mate suave al tacto",
            dimensions: "40cm x 22cm x 18cm",
            authenticity: "Certificado de autenticidad impreso",
        }
    },
    {
        id: "3",
        name: "pipol TRES",
        price: "€ 500",
        description: "Capturando la esencia del movimiento en estado estático. Esta escultura representa el equilibrio transitorio de la vida cotidiana y nos invita a reflexionar.",
        image: "/images/pipol3.jpg",
        details: {
            material: "Escayola reforzada y metal",
            finish: "Barniz protector satinado",
            dimensions: "45cm x 25cm x 20cm",
            authenticity: "Certificado sellado y firmado por el artista",
        }
    },
    {
        id: "4",
        name: "pipol CUATRO",
        price: "€ 600",
        description: "Una pieza contemporánea con detalles únicos y una presencia monolítica que atrae todas las miradas. Ideal para coleccionistas y amantes del arte de diseño.",
        image: "/images/pipol4.jpg",
        details: {
            material: "Bronce fundido en frío",
            finish: "Pátina oscura envejecida a mano",
            dimensions: "50cm x 30cm x 25cm",
            authenticity: "Edición limitada, certificado en papel de algodón",
        }
    },
];
