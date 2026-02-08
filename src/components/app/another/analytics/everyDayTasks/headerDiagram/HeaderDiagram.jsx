import Image from "next/image"
import styles from "./../EveryDayTask.module.css"
import { useState } from "react";
import icons from "../../../../../../icons/icons";
export default function HeaderDiagram({
    renderEveryDayTaskResult,
    data7Days,
    selectCategory,
    namesTimeInterval,
    selectIndexNameTimeInterval,
     setSelectIndexNameTimeInterval,
     selectTimesInterval,
     setSelectTimesInterval 
}) {
    


    function handleRefLeft() {
        if (selectIndexNameTimeInterval > 0 ) {
            // Создаем переменную, в которую мы будем записывать новый индекс 
            // который обновляется при клике на кнопку
            const newIndex = selectIndexNameTimeInterval - 1;
            // Здесь мы обновляем состоение, записав новый индекс
            setSelectIndexNameTimeInterval(newIndex);
            // Здесь мы обновляем состание записав значение подкатегории
            // "first", "two". "three", "four"
            setSelectTimesInterval(namesTimeInterval[newIndex]);

            
        }
    }

    function handleRefRight() {
        
        if (selectIndexNameTimeInterval < namesTimeInterval.length -1 ) {
            // Создаем переменную, в которую мы будем записывать новый индекс 
            // который обновляется при клике на кнопку
            const newIndex = selectIndexNameTimeInterval + 1;
            // Здесь мы обновляем состоение, записав новый индекс
            setSelectIndexNameTimeInterval(newIndex);
            // Здесь мы обновляем состание записав значение подкатегории
            // "first", "two". "three", "four"
            setSelectTimesInterval(namesTimeInterval[newIndex]);

            
        }
    }


    return (
        <div className={styles.everyDayTaskBodyHeader}>
            <div className={styles.everyDayTaskBodyTitleWrapper}>
                <span className={styles.everyDayTaskBodyTitle} onClick={() => console.log(selectIndexNameTimeInterval)}>
                    {renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).date}
                </span>
            </div>

            <div className={styles.everyDayTaskBodyGoAndBack}>
                <div
                    className={styles.everyDayTaskBodyArrow}
                    onClick={() => handleRefLeft()}
                >   
                    {
                        selectIndexNameTimeInterval === 0 ? (

                            <Image src={icons.arrowLeftWhite}/>
                        ) : (
                            <Image src={icons.arrowLeftBlue}/>
                            
                        )       
                    }
                </div>

                <div
                    className={styles.everyDayTaskBodyArrow}
                    onClick={() => handleRefRight()}
                >

                    {
                        selectIndexNameTimeInterval === namesTimeInterval.length -1 ? (

                            <Image src={icons.arrowRightWhite}/>

                        ) : (
                            <Image src={icons.arrowRightBlue}/>                                            
                        )       
                    }
                </div>
            </div>
        </div>
    )
}