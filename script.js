function createTile(bookmark) {
  const tile = document.createElement("div");
  tile.className = "tile";

  const link = document.createElement("a");
  link.href = bookmark.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const favicon = document.createElement("img");
  const url = new URL(bookmark.url);
  favicon.src = `https://www.google.com/s2/favicons?domain=${url.hostname}`;
  favicon.alt = "favicon";

  const text = document.createElement("span");
  text.textContent = bookmark.title;

  link.appendChild(favicon);
  link.appendChild(text);
  tile.appendChild(link);

  return tile;
}

function traverseBookmarks(bookmarks) {
  const container = document.getElementById("bookmarks-container");

  bookmarks.forEach((bm) => {
    if (bm.url) {
      container.appendChild(createTile(bm));
    }
    if (bm.children) {
      traverseBookmarks(bm.children);
    }
  });
}

chrome.bookmarks.getTree((bookmarkTreeNodes) => {
  traverseBookmarks(bookmarkTreeNodes);
});
