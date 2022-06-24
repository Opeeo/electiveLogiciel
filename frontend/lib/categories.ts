import axios from "axios";

export interface ICategory {
    id: string;
    name: string;
    img: string;
}

var categories: ICategory[] = [
    {
        id: "1",
        name: "Alcohol",
        img: "/images/category_image/alcohol.png"
    },

    {
        id: "2",
        name: "American",
        img: "/images/category_image/american.png"
    },
    {
        id: "3",
        name: "Asian",
        img: "/images/category_image/asian.png"
    },
    {
        id: "4",
        name: "Burger",
        img: "/images/category_image/burger.png"
    },
    {
        id: "5",
        name: "Chinese",
        img: "/images/category_image/chinese.png"
    },
    {
        id: "6",
        name: "Convenience",
        img: "/images/category_image/convenience.png"
    },
    {
        id: "7",
        name: "Deals",
        img: "/images/category_image/deals.png"
    },
    {
        id: "8",
        name: "Fastfood",
        img: "/images/category_image/fastfood.png"
    },
    {
        id: "10",
        name: "Halal",
        img: "/images/category_image/halal.png"
    },
    {
        id: "11",
        name: "Healthy",
        img: "/images/category_image/healthy.png"
    },
    {
        id: "12",
        name: "Italian",
        img: "/images/category_image/italian.png"
    },
    {
        id: "13",
        name: "Japanese",
        img: "/images/category_image/japanese.png"
    },
    {
        id: "14",
        name: "Pizza",
        img: "/images/category_image/pizza.png"
    },
    {
        id: "15",
        name: "Streetfood",
        img: "/images/category_image/streetfood.png"
    },
    {
        id: "16",
        name: "Top Eats",
        img: "/images/category_image/top_eats.png"
    },
    {
        id: "17",
        name: "Grocery",
        img: "/images/category_image/uber_grocery.png"
    },
    {
        id: "18",
        name: "Vietnamese",
        img: "/images/category_image/vietnamese.png"
    }
];


//Get all categories with axios typescript
export function getAllCategories(): ICategory[] {

    return categories
    //return axios.get("/api/categories")
    //    .then(response => response.data);
}

//Get one category with axios typescript
export function getCategoryById(id: string): ICategory | undefined {
    return categories.find(category => category.id === id);
    //return axios.get(`/api/categories/${id}`)
    //    .then(response => response.data);
}

//Delete a category with axios typescript
export function deleteCategoryById(id: string): void {
    categories = categories.filter(category => category.id !== id);
    //axios.delete(`/api/categories/${id}`);
}

//Update a category with axios typescript
export function updateCategoryById(id: string, category: ICategory): void {
    const index = categories.findIndex(c => c.id === id);
    categories[index] = category;
    //axios.put(`/api/categories/${id}`, category);
}

