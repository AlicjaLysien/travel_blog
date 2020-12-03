import '../css/style.css';
import App from './blog/app'
import Post from "./post";
import template from "./template";

let posts = document.querySelector('#posts')
let formElement = document.querySelectorAll('form')[0]
let formElementSearch = document.querySelectorAll('form')[1]
let app = new App(posts, formElement, formElementSearch)
app.showPosts()
document.getElementById("all").onclick = function() { app.hideForm(), app.hideSearch(), app.showPosts()}
document.getElementById("europe").onclick = function() {app.hideForm(), app.hideSearch(), app.showPostsRegion("Europe")}
document.getElementById("asia").onclick = function() {app.hideForm(), app.hideSearch(), app.showPostsRegion("Asia")}
document.getElementById("africa").onclick = function() {app.hideForm(), app.hideSearch(), app.showPostsRegion("Africa")}
document.getElementById("americas").onclick = function() {app.hideForm(), app.hideSearch(), app.showPostsRegion("Americas")}
document.getElementById("australia").onclick = function() {app.hideForm(), app.hideSearch(), app.showPostsRegion("Australia")}

document.getElementById("addArticle").onclick = function() {app.hideSearch(), app.showForm()}
document.getElementById("search").onclick = function() {app.hideForm(), app.showSearch()}

app.run()
