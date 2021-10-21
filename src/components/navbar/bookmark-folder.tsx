import styles from "./bookmark-folder.module.scss";
import React, { useState, useEffect } from "react";
import BackgroundIconButton from "../ui-elements/buttons/background-button";
import { BACKGROUND_ICON_BUTTON_SIZE } from "../../types/constants/component_constants";
import { Folder } from "@material-ui/icons";
import { Bookmark, BookmarkFolderType } from "../../types/types/components/navbar/navbar";

const BookmarkFolder = ({ bookmarks }: BookmarkFolderType) => {
  const toggleFolder = () => {};

  const renderBookmarks = (bookmarks: Bookmark[]) => {
    
    return bookmarks.map((bookmark, index) => (
      <div key={index}>
        {bookmark.id}
      </div>
    ));
  }

  return (
    <div className={styles.container}>
      <BackgroundIconButton
        onClick={toggleFolder}
        className={styles.vert_bar_button}
      >
        <Folder className={styles.folder} />
      </BackgroundIconButton>
      <>
        {renderBookmarks(bookmarks)}
      </>
    </div>
  );
};

export default BookmarkFolder;
