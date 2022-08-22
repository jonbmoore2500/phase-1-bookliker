document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(data => {
        let titleContainer = document.getElementById('list')
        data.forEach(book => {
            let li = document.createElement('li')
            li.innerText = book.title
            titleContainer.appendChild(li)
        })
    })
});
