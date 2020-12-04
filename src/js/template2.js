export default (post) => {
    let template2 = `
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${post.title} (${post.country})</h4>
                    <h5 class="card-subtitle mb-2 text-muted">Author: ${post.author}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Category: ${post.category}</h6>
                    <p class="card-text">${post.info}</p>
                    <a href="javascript:;" data-id="${post.id}" class="btn btn-danger">Remove</a>
                </div>
            </div>
        </div>
    `
    return template2
}





