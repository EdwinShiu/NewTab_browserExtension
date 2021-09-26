import styles from './quick-access-button.module.scss';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import { EmailOutlined, ExploreOutlined, FolderOutlined, GTranslateOutlined } from '@material-ui/icons';


/**
 * Four quick access buttons that direct to Google Servicess (i.e. Gmail, Drive, Maps, Translate)
 * 
 */
const QuickAccessButtons = () => {

  return (
    <div className={styles.container}>
      <a href={'https://mail.google.com/'} target='_blank'>
        <BackgroundIconButton
          className={styles.button_container}
        >
          <EmailOutlined 
            className={styles.button_icon}
          />
        </BackgroundIconButton>
      </a>
      <a href={'https://drive.google.com/'} target='_blank'>
        <BackgroundIconButton
          className={styles.button_container}
        >
          <FolderOutlined 
            className={styles.button_icon}
          />
        </BackgroundIconButton>
      </a>
      <a href={'https://maps.google.com/'} target='_blank'>
        <BackgroundIconButton
          className={styles.button_container}
        >
          <ExploreOutlined 
            className={styles.button_icon}
          />
        </BackgroundIconButton>
      </a>
      <a href={'https://translate.google.com/'} target='_blank'>
        <BackgroundIconButton
          className={styles.button_container}
        >
          <GTranslateOutlined 
            className={styles.button_icon}
          />
        </BackgroundIconButton>
      </a>
    </div>
  )

}

export default QuickAccessButtons;