import React, { ReactChild } from "react";

export type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export type BookmarkFolderType = {
  bookmarks: Bookmark[];
}