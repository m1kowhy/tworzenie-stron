function sortByYear(book1, book2) {
  if (book1.releaseYear < book2.releaseYear) {
    return -1
  } else if (book1.releaseYear > book2.releaseYear) {
    return 1
  } else {
    return 0
  }
}

const books = [
  { title: "Book A", authorName: "Author One", releaseYear: 2001 },
  { title: "Book B", authorName: "Author Two", releaseYear: 1998 },
  { title: "Book C", authorName: "Author Three", releaseYear: 2010 }
]

const filteredBooks = books.filter(b => b.releaseYear > 1999)

filteredBooks.sort(sortByYear)

