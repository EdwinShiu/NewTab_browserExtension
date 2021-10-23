import React, { useState, useEffect, ReactNode } from "react";
import BackgroundIconButton from "../ui-elements/buttons/background-button";
import styles from "./vertical-navbar.module.scss";
import { Menu } from "@material-ui/icons";
import { BACKGROUND_ICON_BUTTON_SIZE } from "../../types/constants/component_constants";
import BookmarkFolder from "./bookmark-folder";
import { Bookmark } from "../../types/types/components/navbar/navbar";
import API from "../../api/api";
import { APIServiceResponse } from "../../types/types/api";
import NavbarExtended from "./navbar-extended";
import { getAllBookmarkFolderOnly, getBookmarkFolderOnly, getBookmarkOnly } from "../../utils/bookmarkNode";
import CustomScrollbars from '../ui-elements/scrollbar/scrollbar';

// dummy data
const TEST = {
  id: "0",
  title: "Test0",
  children: [
    {
      id: "1",
      title: "Test1",
      children: [
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "5",
          title: "Test5 12312 12312 123123123 12312",
        },
        {
          id: "6",
          title: "Test6",
        },
        {
          id: "11",
          title: "Test11",
          children: [
            {
              id: "12",
              title: "Test12",
              children: [
                {
                  id: "15",
                  title: "Test15",
                },
              ]
            },
            {
              id: "13",
              title: "Test13",
            }
          ]
        },
      ]
    },
    {
      id: "2",
      title: "Test2",
      children: [
        {
          id: "7",
          title: "Test7",
        },
        {
          id: "8",
          title: "Test8",
        },
        {
          id: "9",
          title: "Test9",
        },
        {
          id: "10",
          title: "Test10",
        }
      ]
    },
  ]
}


/**
 * This is the vertical navigation bar on the left.
 *
 * @returns a vertical navigation bar
 */
const VerticalNavBar = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [bookmarkTreeRoot, setBookmarkTree] = useState<Bookmark | null>(null);
  // For animation
  const [isNavMenuButtonOpen, setIsNavMenuButtonOpen] = useState<boolean>(false);

  /**
   * This function uses chrome.bookmark and store it into bookmarkTree.
   */
  const getTree = () => {
    try {
      chrome.bookmarks.getTree((treeNode: chrome.bookmarks.BookmarkTreeNode[]) => setBookmarkTree(treeNode[0]));
    } catch (e) {}
  }

  // Fetch bookmarkTree on mount
  useEffect(() => {
    getTree();
  }, []);

  /**
   * This function open/close the vertical navigation bar.
   */
  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setIsNavMenuButtonOpen(!isNavMenuButtonOpen);
  }

  /**
   * This function renders the bookmark folders.
   * 
   * @param bookmarkTreeNode is the root in the bookmark tree
   * @returns BookmarkFolder(s)
   */
  const renderBookmarkFolders = (bookmarkTreeNode: Bookmark | null): ReactNode => {
    if (!bookmarkTreeNode) {
      return null;
    }

    return getBookmarkFolderOnly(bookmarkTreeNode).map((folders, index) => (
      <BookmarkFolder
        key={index}
        bookmarks={getBookmarkOnly(folders)}
      />
    ));
  }

  return (
    <div className={`${styles.container} ${isNavMenuOpen ? styles.open : ""}`}>
      <div className={styles.navbar_main_container_outer}>
        <div className={styles.navbar_main_container}>
          <BackgroundIconButton
            size={BACKGROUND_ICON_BUTTON_SIZE}
            onClick={toggleNavMenu}
            className={styles.nav_button_container}
          >
            <Menu className={`${styles.nav_button} ${isNavMenuButtonOpen ? styles.pressed : ""}`} />
          </BackgroundIconButton>
          <div className={styles.bookmark_folder_container}>
            {renderBookmarkFolders(TEST)}
          </div>
        </div>
      </div>
      <div
        className={styles.navbar_extended_container}
      >
        <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <NavbarExtended 
            bookmarkFolders={getAllBookmarkFolderOnly(TEST)}
          />
        </CustomScrollbars>
      </div>
    </div>
  );
};

export default VerticalNavBar;
