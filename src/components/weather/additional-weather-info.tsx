import styles from './additional-weather-info.module.scss';
import { ReactComponent as Air } from '../../assets/icons/svg/air.svg';
import { ReactComponent as WaterDrop } from '../../assets/icons/svg/waterdrop.svg';
import { ReactComponent as Umbrella } from '../../assets/icons/svg/umbrella.svg';
import { AdditionWeatherInfoType } from '../../types/types/components/weather/weather';


// TODO: wind direction and wind speed
/**
 * This function creates a additional weather info component.
 * 
 * @param param0 is an object of all additional weather info
 * @returns a row of additional weather info
 */
const AdditionWeatherInfo = ({rh, windDir, windSpeed, gustSpeed, rainfall, rhUnit, windSpeedUnit, rainfallUnit}: AdditionWeatherInfoType) => {

  return (
    <div className={styles.container}>
      <div className={`${styles.containers_wrapper}`}>

      </div>
      <div className={styles.additional_info_container}>
        <div className={`${styles.containers_wrapper}`}>
          <Air fill='#EFEFEF' className={styles.icon} />
          <span>{`${gustSpeed ?? '--'} ${windSpeedUnit}`}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.containers_wrapper}`}>
          <WaterDrop fill='#EFEFEF' className={styles.icon} />
          <span>{`${rh ?? '--'} ${rhUnit}`}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.containers_wrapper}`}>
          <Umbrella fill='#EFEFEF' className={styles.icon} />
          <span>{`${rainfall ?? '--'} ${rainfallUnit}`}</span>
        </div>
      </div>
    </div>
  );
}


export default AdditionWeatherInfo;