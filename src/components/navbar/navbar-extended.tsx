import { Bookmark } from '../../types/types/components/navbar/navbar';
import styles from './navbar-extended.module.scss';
import { Folder } from '@material-ui/icons';
import { ReactNode } from 'react';
import { getBookmarkOnly } from '../../utils/bookmarkNode';

const NavbarExtended = ({bookmarkFolders}: {bookmarkFolders: Bookmark[]}) => {


  const renderBookmarks = (bookmarkFolder: Bookmark) => {
    return getBookmarkOnly(bookmarkFolder).map((bookmark, index) => {
      return (
        <div
          key={index}
          className={styles.bookmark_container}
        >
          <div className={styles.bookmark_favicon}></div>
          <div className={styles.bookmark_title}><span>{bookmark.title}</span></div>
        </div>
      );
    })
  }

  const renderFolders = (bookmarkFolders: Bookmark[]) => {
    return bookmarkFolders.map((bookmarkFolder, index): ReactNode => {
      return (
        <div
          key={index}
          className={styles.container}
        >
          <div
            className={styles.folder_container}
          >
            <Folder 
              className={styles.folder_icon}
            />
            <span>{bookmarkFolder.title}</span>
          </div>
          <div
            className={styles.bookmarks_container}
          >
            {renderBookmarks(bookmarkFolder)}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {renderFolders(bookmarkFolders)}
    </>
  );
}

export default NavbarExtended;