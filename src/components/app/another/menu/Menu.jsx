import styles from "./Menu.module.css"

// ==========================
// ==========================
// ==========================
// ==========================

// для функционирования этой компоненту нужно передавать:
// 1. Обект  const menuItem = {
    //     itemOne: {
    //         ru: "название первого пункта",
    //         en: "name item one"
    //     },
    //     itemTwo: {
    //         ru: "название второго пункта",
    //         en: "name item two"
    //     },
    // }
// 2. const [isActive, setIsActive] = useState(null) -- для подсветки и выбора активного элемента
// // в эту константу будет записываться itemOne|itemTwo.en

// ==========================
// ==========================
// ==========================


export default function Menu({itemOne, itemTwo, isActive, setIsActive}) {
    const handleItemClick = (item) => {
        console.log(isActive)
        setIsActive(item); // Устанавливаем активный элемент (item.en)
    }
    return (
        <div className={styles.missionHeader}>
            <div 
                className={`${styles.headerItemWrapper} ${isActive === itemOne.en ? styles.menuItemIsActive : ''}`} 
                onClick={() => handleItemClick(itemOne.en)}  // При клике меняем активный элемент
            >
                <span className={styles.headerItem}>{itemOne.ru}</span>
            </div>

            <div 
                className={`${styles.headerItemWrapper} ${isActive === itemTwo.en ? styles.menuItemIsActive : ''}`} 
                onClick={() => handleItemClick(itemTwo.en)}  // При клике меняем активный элемент
            >
                <span className={styles.headerItem}>{itemTwo.ru}</span>
            </div>
        </div>
    )
}