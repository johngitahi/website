fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://www.goodreads.com/review/list_rss/150253880?shelf=currently-reading"))
  .then(res => res.text())
  .then(str => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/xml");
    const item = doc.querySelector("item");
    const title = item.querySelector("title").textContent;
    const link = item.querySelector("link").textContent;
    document.getElementById("gr_book_title").innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
  });
