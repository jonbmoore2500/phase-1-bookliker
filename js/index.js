document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(data => {
        let titleContainer = document.getElementById('list')
        data.forEach(book => {
            let li = document.createElement('li')
            li.innerText = book.title
            li.addEventListener('click', () => {
                listDeets(book)
            })
            titleContainer.appendChild(li)
        })
    })
});

function listDeets(bookObj) {
    console.log(bookObj)
    let preview = document.getElementById('show-panel')
    preview.innerHTML = `
    <img src='${bookObj.img_url}' alt='${bookObj.title} thumbnail'>
    <h2>${bookObj.title}</h2>
    <h2>${bookObj.subtitle}</h2>
    <h2>${bookObj.author}</h2>
    <p>${bookObj.description}</p>
    `
}