import styles from './additional-weather-info.module.scss';
import { ReactComponent as Air } from '../../assets/icons/svg/air.svg';
import { ReactComponent as WaterDrop } from '../../assets/icons/svg/waterdrop.svg';
import { ReactComponent as Umbrella } from '../../assets/icons/svg/umbrella.svg';


type AdditionWeatherInfoType = {
  rh: string,
  windDir: string,
  windSpeed: string,
  gustSpeed: string,
  rainfall: string,
  rhUnit: string,
  windSpeedUnit: string,
  rainfallUnit: string,
}


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