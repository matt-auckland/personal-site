const tags = {
  ebook: 'eBook',
  audio: 'Audio Book',
  libraryLoan: 'Library Loan',
  reading: 'Reading',
  complete: 'Complete',
  didntFinish: "Didn't Finish",
  reread: "Re-read",

}

const bookList = [
  {
    title: "The Art of Getting Money",
    authours: "P. T. Barnum",
    post: null,
    rating: 4,
    tags: [
      tags.ebook,
      tags.reading,
    ],
    startDate: new Date("2022/3/24"),
    endDate: null,
  },
  {
    title: "Can't Hurt Me",
    authours: "David Goggins",
    post: null,
    rating: 4,
    tags: [
      tags.ebook,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/2/10"),
    endDate: new Date("2022/3/24"),
  },
  {
    title: "Atomic Habits",
    authours: "James Clear",
    post: null,
    rating: null,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.reading
    ],
    startDate: new Date("2022/3/10"),
    endDate: null,
  },
  {
    title: "Sleep",
    authours: "Nick Littlehales",
    post: null,
    rating: 4,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/2/8"),
    endDate: new Date("2022/2/28"),
  },
  {
    title: "The End is Near",
    authours: "Dan Carlin",
    post: "",
    rating: 5,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/2/15"),
    endDate: new Date("2022/3/1")
  },
  {
    title: "Powers and Thrones",
    authours: "Dan Jones",
    post: null,
    rating: null,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.reading
    ],
    startDate: new Date("2022/3/1"),
    endDate: ""
  },
  {
    title: "Discipline Equals Freedom",
    authours: "Jocko Willink",
    post: null,
    rating: null,
    tags: [
      tags.ebook,
      tags.libraryLoan,
      tags.didntFinish
    ],
    startDate: new Date("2022/3/1"),
    endDate: ""
  },
  {
    title: "The 4 Disciplines of Execution",
    authours: "Chris McChesney, Sean Covey, Jim Huling",
    post: null,
    rating: 4,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.didntFinish
    ],
    startDate: new Date("2022/1/25"),
    endDate: new Date("2022/2/15")
  },
  {
    title: "Solo Training",
    authours: "Loren W. Christensen",
    post: null,
    rating: 3,
    tags: [
      tags.ebook,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/2/18"),
    endDate: new Date("2022/2/24")
  },
  {
    title: "Stretching Anatomy",
    authours: "Arnold G. Nelson, Jouko J. Kokkonen",
    post: null,
    rating: 3,
    tags: [
      tags.ebook,
      tags.libraryLoan,
      tags.didntFinish
    ],
    startDate: new Date("2022/1/10"),
    endDate: new Date("2022/1/31")
  },
  {
    title: "The Barefoot Investor",
    authours: "Scott Pape",
    post: null,
    rating: 4,
    tags: [
      tags.ebook,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/1/11"),
    endDate: new Date("2022/1/16")
  },
  {
    title: "Deep Work",
    authours: "Cal R. Proby, Thorben Newport",
    post: null,
    rating: 2,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/1/17"),
    endDate: new Date("2022/1/19")
  },
  {
    title: "Richest Man in Babylon",
    authours: "George Clason",
    post: null,
    rating: 5,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2022/1/8"),
    endDate: new Date("2022/1/9")
  },
  {
    title: "Ultralearning",
    authours: "Scott Young",
    post: null,
    rating: 5,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.complete
    ],
    startDate: new Date("2021/12/18"),
    endDate: new Date("2022/1/8")
  },
  {
    title: "Man's Search for Meaning",
    authours: "Viktor E. Frankl",
    post: null,
    rating: 4,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.didntFinish
    ],
    startDate: new Date("2021/12/18"),
    endDate: new Date("2022/1/6")
  },
  {
    title: "The Lean Startup",
    authours: "Eric Ries",
    post: null,
    rating: 5,
    tags: [
      tags.audio,
      tags.libraryLoan,
      tags.didntFinish
    ],
    startDate: new Date("2021/11/19"),
    endDate: new Date("2021/12/10")
  }
];

// Group books by month (or currently reading)
const groupedBookList = bookList.reduce((accum, book) => {
  if (book.tags.includes(tags.reading)) {
    book.dateLabel = "Currently Reading";
    accum["Currently Reading"].push(book);
    return accum;
  }

  if (!book.endDate && !book.startDate) {
    return accum;
  }
  // books will be grouped by month
  let sortingDate = book.endDate || book.startDate

  // Get month year string
  const dateLabel = sortingDate.toLocaleDateString('en-NZ', {
    month: 'long',
    year: 'numeric',
  });

  book.dateLabel = dateLabel;

  if (!accum[dateLabel]) accum[dateLabel] = [];

  accum[dateLabel].push(book);
  return accum;
}, { "Currently Reading": [] });


// convert to array of arrays
const groupedBooklistArray = Object.values(groupedBookList);
// Sort by month
const sortedBookList = groupedBooklistArray.sort((bookListA, bookListB) => {
  if (bookListA.dateLabel = "Currently Reading") return bookListA;
  if (bookListB.dateLabel = "Currently Reading") return bookListB;

  let aDate = bookListA[0].endDate || bookListA[0].startDate;
  let bDate = bookListB[0].endDate || bookListB[0].startDate;

  aDate = new Date(aDate);
  bDate = new Date(bDate);

  return (aDate - bDate) * -1;
}).map(bookList => bookList.sort((bookA, bookB) => {
  // Kick books that I didn't finish to the bottom of the list
  if (bookA.tags.includes(tags.didntFinish)) {
    if (!bookB.tags.includes(tags.didntFinish)) {
      return 1;
    }
  } else if (bookB.tags.includes(tags.didntFinish)) {
    return -1
  }
  return 0;
}));

module.exports = sortedBookList
