const bookList = [
  {
    title: "Atomic Habits",
    authours: "James Clear",
    post: null,
    rating: null,
    tags: [
      "Audio Book",
      "Library Loan",
      "Reading"
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
      "Audio Book",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Reading"
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
      "eBook",
      "Library Loan",
      "Didn't Finish"
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
      "Audio Book",
      "Library Loan",
      "Didn't Finish"
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
      "eBook",
      "Library Loan",
      "Complete"
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
      "eBook",
      "Library Loan",
      "Didn't Finish"
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
      "eBook",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Complete"
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
      "Audio Book",
      "Library Loan",
      "Didn't Finish"
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
      "Audio Book",
      "Library Loan",
      "Didn't Finish"
    ],
    startDate: new Date("2021/11/19"),
    endDate: new Date("2021/12/10")
  }
];

const groupedBookList = bookList.reduce((accum, book) => {
  if(!book.endDate && !book.startDate){
    return accum;
  } 
  // books will be grouped by month
  let sortingDate = book.endDate|| book.startDate

  // Get month year string
  const dateLabel =  sortingDate.toLocaleDateString('en-NZ', {
    month: 'long',
    year: 'numeric',
  });

  book.dateLabel = dateLabel;

  if (!accum[dateLabel]) accum[dateLabel] = [];

  accum[dateLabel].push(book);
  return accum;
}, {});

// convert to array of arrays
const groupedBooklistArray = Object.values(groupedBookList);

const sortedBookList = groupedBooklistArray.sort((a,b) => {
  let aDate = a[0].endDate || a[0].startDate;
  let bDate = b[0].endDate || b[0].startDate;
  
  aDate = new Date(aDate);
  bDate = new Date(bDate);
  
  return (aDate - bDate) * -1;
})

module.exports = sortedBookList
