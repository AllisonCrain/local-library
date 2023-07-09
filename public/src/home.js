function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total ++;
    }
  });
  return total;
}

function getMostCommonGenres(books) {
  //create an array with most common genres using reduce()
  const result = books.reduce((accum, book) => {
    //get the genre of current book
    const genre = book.genre;
    //get the object in accum that has "name === genre"
    const genreInfo = accum.find((element) => element.name === genre);
    //if an object was not found, create a new one and push it into accum
    if(!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1 
      };
      accum.push(newGenreInfo);
    } else {
      // if object was found, then add 1 to count
      genreInfo.count++;
    }
    return accum;
  }, []);
  //sort the array by count from greatest to least
  result.sort((genreA, genreB)=> genreB.count - genreA.count);

  //limit array to 5
  result.splice(5);
  return result
}

function getMostPopularBooks(books) {
//create a new array of most popular books using map()
const result = books.map((book) => {
  const popularityInfo = {
    name: book.title,
    count: book.borrows.length,
  };
  return popularityInfo;
});
// sort the new array by count: greatest to least
result.sort((titleA, titleB) => titleB.count - titleA.count);
//limit to 5 elements
result.splice(5);
return result;
}

const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

function getMostPopularAuthors(books, authors) {
  //create an array of authors by popularity with map
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book)=> accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };
    return newAuthorInfo;
  });
  //sort the new array by count: greateast to least
  result.sort((authorA, authorB)=> authorB.count - authorA.count);
  //limit array to 5
  result.splice(5);
  return result

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
