import '../css/style.css';
// import { v4 as uuidv4 } from 'uuid';
import Post from './post'
import template from './template'

let newPost = {
    title: "Prvni",
    author: "Zdenek",
    content: "iandjsnsnds"
}

//createPost().then(post => console.log(post))

let posts = document.querySelector('#posts')

document.querySelector('form').addEventListener("submit", async event => {
    event.preventDefault()

    let formData = new FormData(event.target)

    let post = await createPost(Object.fromEntries(formData))
    console.log(post)

    // col-md-3 mt-2
    let postCol = document.createElement('div')
    postCol.classList.add('col-md-3')
    postCol.classList.add('mt-2')

    postCol.innerHTML = template(post)

    posts.appendChild(postCol)
})


// async/await funkce
async function createPost(newPost) {
    let response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })

    let data = await response.json()
    return new Post(data.id, data.title, data.author, data.animal, data.city, data.telephone, data.info)
}