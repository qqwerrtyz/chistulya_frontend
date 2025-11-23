import icons from "../../../../../public/icons/icons"
import styles from "./../Profile.module.css"
import Item from "./item/Item"
export default function UserData() {
    const itemData = [
        {   
            name: "password",
            icon: icons.lockData,
            title: "Пароль",
            dropDown: true,
            link: false
        },

        {   
            name: "mail",
            icon: icons.mailData,
            title: "Почта",
            dropDown: true,
            link: false
        },

        {
            name: "qr",
            icon: icons.qrData,
            title: "QR",
            dropDown: true,
            link: false
        },

        {
            name: "support",
            icon: icons.supportData,
            title: "Поддержка",
            dropDown: false,
            link: true
        },

        {
            name: "exit",
            icon: icons.exitData,
            title: "Выход",
            dropDown: false,
            link: true
        }
    ]

    return (
        <div className={styles.userDataWrapper}>
            <div className={styles.userData}>
                
                {
                    itemData.map((item, index) => {
                        return (
                            <Item 
                                name={item.name}
                                icon={item.icon}
                                title={item.title}
                                dropDown={item.dropDown}
                                link={item.link}   
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}