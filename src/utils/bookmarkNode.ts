import { Bookmark } from "../types/types/components/navbar/navbar";

  /**
   * This function gets the children of the node.
   * 
   * @param bookmarkTreeNode is the node in the bookmark tree
   * @returns an array of Bookmark which is the child of the node
   */
   const getBookmarkChildren = (bookmarkTreeNode: Bookmark): Bookmark[] => {
    return bookmarkTreeNode.children ?? [];
  }

  /**
   * This function only gets the folder of the folder.
   * 
   * @param bookmarkTreeFolder is the folder in the bookmark tree
   * @returns an array of Bookmark Folder only
   */
   const getBookmarkFolderOnly = (bookmarkTreeFolder: Bookmark): Bookmark[] =>  {
    return getBookmarkChildren(bookmarkTreeFolder).filter(child => child.children !== undefined);
  }

  /**
   * This function gets all folders under this Bookmark.
   * 
   * @param bookmarkTreeFolder is the folder in the bookmark tree
   * @returns an array of Bookmark Folder only
   */
   const getAllBookmarkFolderOnly = (bookmarkTreeFolder: Bookmark | null): Bookmark[] =>  {
    if (bookmarkTreeFolder === null) {
      return [];
    }
    let childFolder: Bookmark[] = getBookmarkChildren(bookmarkTreeFolder).filter(child => child.children !== undefined);
    let result: Bookmark[] = [...childFolder];
    childFolder.forEach(bookmark => {
      result.push(...getAllBookmarkFolderOnly(bookmark));
    })
    return result;
  }

  /**
   * This function only gets the bookmark of the folder.
   * 
   * @param bookmarkTreeFolder is the folder in the bookmark tree
   * @returns an array of Bookmark only
   */
  const getBookmarkOnly = (bookmarkTreeFolder: Bookmark): Bookmark[] =>  {
    return getBookmarkChildren(bookmarkTreeFolder).filter(child => child.children === undefined);
  }

  export {
    getBookmarkChildren,
    getBookmarkFolderOnly,
    getAllBookmarkFolderOnly,
    getBookmarkOnly,
  }