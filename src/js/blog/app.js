import Post from '../post'
import template from '../template'

export default class App {
    constructor(postsDIV, formDOMElement, formElementSearch) {
        this.formElementSearch = formElementSearch
        this.postsDIV = postsDIV
        this.formDOMElement = formDOMElement
        this.baseURL = "http://localhost:3000"
    }

    async createPost(newPost) {
        let response = await fetch(`${this.baseURL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })

        let data = await response.json()
        return new Post(data.id, data.title, data.author, data.region, data.country, data.category, data.info)
    }

    createFormListener() {
        this.formDOMElement.addEventListener("submit", async event => {
            event.preventDefault()

            let formData = new FormData(event.target)

            await this.createPost(Object.fromEntries(formData))
            console.log(JSON.stringify(Object.fromEntries(formData)))
            this.showPosts()

            this.formDOMElement.querySelectorAll("input, textarea").forEach(input => input.value = "")
        })
    }

    async showPosts() {
        let response = await fetch(`${this.baseURL}/posts`)
        let data = await response.json()

        data = data.map(post => new Post(post.id, post.title, post.author, post.region, post.country, post.category, post.info)).reverse()

        let info = ""
        data.forEach(post => info += template(post))
        this.postsDIV.innerHTML = info

    }

    async showPostsRegion(region) {

        this.hideForm()

        let response = await fetch(`${this.baseURL}/posts?region=` + region)
        let data = await response.json()

        data = data.map(post => new Post(post.id, post.title, post.author, post.region, post.country, post.category, post.info)).reverse()

        let info = ""
        data.forEach(post => info += template(post), function() {if(true){document.getElementById("posts").className ='red'}})
        this.postsDIV.innerHTML = info

    }

    createRemoveListener() {
        this.postsDIV.addEventListener("click", event => {
            if (event.target.dataset.id !== "undefined") { // remove button
                fetch(`${this.baseURL}/posts/${event.target.dataset.id}`, {
                    method: "DELETE"
                }).then(_ => this.showPosts())
            }
        })
    }

    search() {
        this.formElementSearch.addEventListener("submit", async event => {
            event.preventDefault()
            let formData = new FormData(event.target)
            await console.log(JSON.stringify(Object.fromEntries(formData)))
            let response = await fetch(`${this.baseURL}/posts?q=` + Object.fromEntries(formData).search, {
                method: "GET"
            })
            let data = await response.json()
            data = data.map(post => new Post(post.id, post.title, post.author, post.region, post.country, post.category, post.info))
            let info = ""
            data.forEach(post => info += template(post))
            this.postsDIV.innerHTML = info
        })
    }

    showForm() {
        document.getElementById("addArticleForm").className = "show"
    }

    hideForm() {
        document.getElementById("addArticleForm").className = "hidden"
    }

    showSearch() {
        document.getElementById("searchForm").className = "show"
    }

    hideSearch() {
        document.getElementById("searchForm").className = "hidden"
    }

    run() {
        this.createFormListener()
        this.createRemoveListener()
        this.search()
    }

}
