import styles from "./../../../Notifications.module.css"
export default function GeneralParamsDropDown({data}) {
    return (
        <div className={styles.generalParamsDropdownWrapper}>
            <div className={styles.generalParamsDropdown}>
                {
                    Object.keys(data).map((item, index) => {
                        return (
                            <span className={styles.generalParamValue}>
                                {data[item]}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}