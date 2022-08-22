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
    <ul id='${bookObj.id}Users'>
    </ul>
    <button type='button' id='likeBtn'></button>
    `
    bookObj.users.forEach(user => {
        console.log(user.username)
        let li = document.createElement('li')
        li.textContent = `${user.username}`
        let userList = document.getElementById(`${bookObj.id}Users`)
        console.log('userlist', userList)
        userList.appendChild(li)
    })
    let likeUnlike = document.getElementById('likeBtn')
    console.log('test', bookObj.users.find(user => user.username === 'jonmoore'))
    if (bookObj.users.find(user => user.username === 'jonmoore') === undefined) {
        likeUnlike.innerText = 'Like'
        addLiker(bookObj)
    } else {
        likeUnlike.innerText = 'Unlike'
        addUnliker(bookObj)
    }
}

function addLiker(bookObj) {
    console.log('liker')
    let likeButton = document.getElementById('likeBtn')
    likeButton.addEventListener('click', () => {
        let patchUsersJson = {"users": [...bookObj.users, {"id": 11, "username": "jonmoore"}]}
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
    })
}
function addUnliker(bookObj) {
    console.log('unliker')
    let likeButton = document.getElementById('likeBtn')
    likeButton.addEventListener('click', () => {
        let deleteArr = bookObj.users.slice(0, bookObj.users.length-1)
        let deleteUsersJson = {"users": [...deleteArr]}
        fetch(`http://localhost:3000/books/${bookObj.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteUsersJson)
        })
        .then(resp => resp.json())
        .then(updatedBook => {
            listDeets(updatedBook)
        })   
    })
}