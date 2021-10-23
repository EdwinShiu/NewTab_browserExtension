import styles from "./bookmark-folder.module.scss";
import React, { useState, useEffect } from "react";
import BackgroundIconButton from "../ui-elements/buttons/background-button";
import { BACKGROUND_ICON_BUTTON_SIZE, BOOKMARK_SIZE } from "../../types/constants/component_constants";
import { Folder } from "@material-ui/icons";
import { Bookmark, BookmarkFolderType } from "../../types/types/components/navbar/navbar";

const BookmarkFolder = ({ bookmarks }: BookmarkFolderType) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };
  
  // TODO: Make favicon available
  const renderFavIcon = (url: string | undefined) => {
    return (
      <a href={url}>
        <button
          className={styles.bookmark_button}
        >
          <div className={styles.bookmark}></div>
        </button>
      </a>
    )
  }

  const renderBookmarks = (bookmarks: Bookmark[]) => {
    return bookmarks.map((bookmark, index) => (
      <div
        key={index}
        className={styles.bookmark_container}
        style={{
          height: `${BOOKMARK_SIZE}rem`,
          width: `${BOOKMARK_SIZE}rem`,
        }}
      >
        {renderFavIcon(bookmark.url)}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <BackgroundIconButton onClick={toggleFolder} className={styles.vert_bar_button}>
        <Folder className={styles.folder} />
      </BackgroundIconButton>
      <div
        className={styles.bookmarks_container}
        style={{
          maxHeight: isOpen ? `${BOOKMARK_SIZE * bookmarks.length}rem` : '0',
        }}
      >
        {renderBookmarks(bookmarks)}
      </div>
    </div>
  );
};

export default BookmarkFolder;
