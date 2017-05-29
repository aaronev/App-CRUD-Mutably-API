console.log(`I'm running`)

let id = $(this).parent().attr('id')

$(document).ready(function (){
  $('.saveButton').hide()
  $('.editFileInfo').hide()
  postInfo()
})


$(document).on('click', '.deleteBtn', function() {
  let id = $(this).parent().attr('id')
  deleteBook(id)
})

function addBooks(books) {
  for (let i= 0; i < books.length; i++) {
    let id = `<ul id=${books[i]._id}>`
    let title = `<h2 class="title">${books[i].title}</h2>`
    let image = `<div><img class="image" src="${books[i].image}"></div>`
    let author = `<h3 class="author">${books[i].author}</h3>`
    let date = `<div><h5class="author">${books[i].releaseDate}</h5></div>`
    let editBook =  `<button>Edit</button>`
    let deleteBook =  `<button class="deleteBtn">Delete</button></ul>`
    let buttons = editBook + deleteBook
    $('#listInfo').append(
      id + title + image + author + date + buttons
    )
  }
}

function postInfo() {
  $('#listInfo').empty()
  $.ajax({
    url: 'https://mutably.herokuapp.com/books',
    success: function(result) {
      let books = result.books 
      addBooks(books)
    }
  })
}

function deleteBook(id) {
  console.log(id)
  $.ajax({
    type: "DELETE",
    url: 'https://mutably.herokuapp.com/books/'+id,
    success: function() {
      console.log('it worked')
      postInfo()
    }
  })
}

function addBook() {
  $.ajax({
    type: "POST",
    url: 'https://mutably.herokuapp.com/books',
    data: data,
    success: postInfo()
  })
}

function updateBook(book) {
   $.ajax({
    type: "PUT",
    url: 'https://mutably.herokuapp.com/books/',
    data: book,
    success: postInfo()
  })
}