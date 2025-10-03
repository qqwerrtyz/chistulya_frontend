import Image from "next/image"
import styles from "./IconHeader.module.css"
export default function IconHeader({alt, className, src, onClick}) {
    return (
        
        <div 
            className={styles.iconWrapper} 
            style={{backgroundColor: alt === "activeBurger" && "#fff"}}
            onClick={onClick}
        >
            <Image alt={alt} className={className} src={src}/>
        </div>
    )
}