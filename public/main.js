console.log(`I'm running`)

$(document).ready(function (){
  $('#updateForm').hide()
  $('.saveButton').hide()
  $('.editFileInfo').hide()
  getAllBooks()
})

$(document).on('click', '.deleteBtn', function() {
  let id = $(this).parent().attr('id')
  deleteBook(id)
})

$(document).on('click', '.addButton', function() {
  addBookToAPI()
})

$(document).on('click', '.editButton', function() {
  $(this).hide()
  let parent = $(this).parent()
  let theInfo = parent.find('.viewSpan').html()
  parent.find('.viewSpan').hide()
  parent.find('.viewEdit').html(theInfo)
  parent.find('.viewEdit').show()
  parent.find('.saveButton').show()

})

$(document).on('click', '.saveButton', function() {
  $(this).hide()
  let parent = $(this).parent()
  $(this).parent().find('.editButton').show()
})

$(document).on('click', '.editingBook', function() {
  let parent = $(this).parent()
  let id = parent.attr('id')
  let title = parent.find('.title').html()
  let image = parent.find('.image').attr('src')
  let author = parent.find('.author').html()
  let releaseDate = parent.find('.releaseDate').html()
  $('.viewEditTitle').html(title)
  $('.viewEditImage').html(image)
  $('.viewEditAuthor').html(author)
  $('.viewEditReleaseDate').html(releaseDate)
  $('#updateForm').show()
})

function addBooks(books) {
  for (let i= 0; i < books.length; i++) {
    let id = `<ul id=${books[i]._id}>`
    let title = `<h2 class="title">${books[i].title}</h2>`
    let image = `<div><img class="image" src="${books[i].image}"></div>`
    let author = `<h3 class="author">${books[i].author}</h3>`
    let date = `<div><h5 class="releaseDate">${books[i].releaseDate}</h5></div>`
    let editBook =  `<button class="editingBook">Edit</button>`
    let deleteBook =  `<button class="deleteBtn">Delete</button></ul>`
    let buttons = editBook + deleteBook
    $('#listInfo').append(
      id + title + image + author + date + buttons
    )
  }
}



function aBook(ttl, img, auth, relDate) {
  let book = {}
  book.title = ttl
  book.image = img
  book.author = auth
  book.releaseDate = relDate 
  return book
}

function getAllBooks() {
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
     getAllBooks()
    }
  })
}

function addBookToAPI() {
  let title = $('#title').val()
  let image = $('#image').val()
  let author = $('#author').val()
  let releaseDate = $('#releaseDate').val()
  if (title || image || author || releaseDate) {
    image = image || 'http://ibs.iscte-iul.pt/en/uploads/files/noimage_2.gif'
    let book = aBook(title, image, author, releaseDate)
    $.ajax({
      type: "POST",
      url: 'https://mutably.herokuapp.com/books',
      data: book,
      success: function(){
        console.log('it worked')
       getAllBooks()
      }
    })
  }
}




// function updateBook(id) {
//   let book = aBook(

//     )
//    $.ajax({
//     type: "PUT",
//     url: 'https://mutably.herokuapp.com/books/'+id,
//     data: book
//     success: function(){
//       console.log('updat Works')
//      getAllBooks()
//     }
//   })
// }