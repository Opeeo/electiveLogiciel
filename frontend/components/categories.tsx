import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { randomInt } from "crypto";
import Image from "next/image";
import { getAllCategories, ICategory } from "../lib/categories";
import styles from "./Categories.module.css";

const data: ICategory[] = getAllCategories();


// get 13 random categories
const randomCategories = () => {
    const categories = data.map(({ id, name, img }) => ({ id, name, img }));
    const randomCategories = [];
    for (let i = 0; i < 13; i++) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        randomCategories.push(categories[randomIndex]);
        categories.splice(randomIndex, 1);
    }
    return randomCategories;
}

const Categories: React.FC<{}> = () => {
    //return a react list of categories typescript
    return (
        <div className={styles.global}>
            {randomCategories().map(({ id, name, img }: ICategory) => (
                <Item className={styles.category}>
                    <div>
                        <div className={styles.image}>
                            <Image src={img} alt={name} width={60} height={60} />
                        </div>
                        <div className={styles.name}>
                            {name}
                        </div>
                    </div>
                </Item>
            )
            )}
        </div>

    )
}

export default Categories;
