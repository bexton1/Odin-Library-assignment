// class function

class Books {
  title;
  author;
  pages;
  read;
  
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}
}

  
  // creates new object from form data and pushes to array
  function addBookToLibrary(title, author, pages, read) {
    const newBook = new Books(title, author, pages, read)
    myLibrary.push(newBook)
  
  }
  const book1 = new Books('Lord of the Rings', 'J.R.R. Tolkien', '295', 'not read ')
  const book2 = new Books('Harry Potter', 'Philosophers Stone', '300', 'read')


//Library array
  const myLibrary = [book1, book2]
  
  const bookContainer = document.querySelector('.container')
  const table = document.querySelector('.table')
  const form = document.querySelector('.form')
  const newBook = document.querySelector('.new-book')
  const titles = document.querySelector('#titles')
  const authors = document.querySelector('#authors')
  const pagess = document.querySelector('#pagess')
  const reads = document.querySelector('#reads')
  const toggleForm = document.querySelector('.toggle-form')

  

  

 function RevealForm() {
  const toggleForm = document.querySelector('.toggle-form')
  // reveal form and change button text
   toggleForm.addEventListener('click', () => {
    form.classList.toggle('active')
    if(!form.classList.contains('active')) {
        toggleForm.innerHTML = 'Add Book'
    } else toggleForm.innerHTML = 'Hide Form'
   })
  }

   // submit form to table
  form.addEventListener('submit', (e) => {
    
      e.preventDefault()

   const titleValue = titles.value.trim();
  const authorValue = authors.value.trim();
  const pagesValue = pagess.value.trim();
  const readValue = document.querySelector('input[name="read"]:checked')?.value || '';// Dynamically get the selected value of the radio buttons at the time of form submission
  
 
   
  if(titleValue && authorValue && pagesValue && readValue) {
  addBookToLibrary(titleValue, authorValue, pagesValue, readValue)
  renderTable()
  RevealForm()


    // Clear form fields after submission
      titles.value = '';
      authors.value = '';
      pagess.value = '';
      document.querySelectorAll('input[name="read"]').forEach((radio) => (radio.checked = false)); 
      console.log(myLibrary)

   } else {
    alert('Please complete all fields')
   }   
  })

// render html
  function renderTable() {
    
    table.innerHTML =
    `<tr>
      <th>Title</th>
      <th>Author</th>
      <th>Pages</th>
      <th>Read</th>
      <th> <button class="toggle-form">Add Book</button></th>
    </tr>`
     let tableContent = ``;
     myLibrary.forEach((book, index) => {
      tableContent +=
       ` <tr style="background-color:${index % 2 === 0 ? 'white':'rgba(0, 0, 0, 0.1)'}">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td><input data-cb=${index} class="check-box" type="checkbox" ${book.read === 'read' ? 'checked' : ''}></td> 
          <td><button  data-id=${index} class="spliceLibrary">Delete</button></td>
        </tr>`
      })
    table.innerHTML += tableContent
   
    // change value of read in myLibrary array based on checkbox value
    const checkBox = document.querySelectorAll('.check-box')
      checkBox.forEach((box) => {
       box.addEventListener('click', (e)=> {
       const checkData = e.target.dataset.cb
        if (box.checked) {
        myLibrary[checkData].read = 'read'
       }
        else {
          myLibrary[checkData].read = 'not read'
       }
        renderTable()
       
       })
      })
      // delete table row
    const deleteButtons = document.querySelectorAll('.spliceLibrary')
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) =>{
        const dataId = e.target.dataset.id
        myLibrary.splice(dataId, 1)
        renderTable()
        RevealForm()
      }) 
  })
 }

renderTable();
RevealForm()