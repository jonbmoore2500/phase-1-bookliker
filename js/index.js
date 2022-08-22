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
    <ul id='${bookObj.title}Users'>
    </ul>
    <button type='button' id='likeBtn'>Like this book!</button>
    `
    bookObj.users.forEach(user => {
        console.log(user.username)
        let li = document.createElement('li')
        li.textContent = `${user.username}`
        let userList = document.getElementById(`${bookObj.title}Users`)
        userList.appendChild(li)
    })
    let likeButton = document.getElementById('likeBtn')
    likeButton.addEventListener('click', () => {
        // create PATCH json obj
        let patchUsersJson = {"users": [...bookObj.users, {"id": 11, "username": "jonmoore"}]}
        // fetch POST
        fetch(`http://localhost:3000/books/${bookObj.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchUsersJson)
        })
        .then(resp => resp.json())
        .then(updatedBook => {
            listDeets(updatedBook)
        })
        // rerun listDeets with returned data from fetch
        
    })
}