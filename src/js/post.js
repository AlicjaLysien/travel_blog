export default class Post {
    constructor(id, title, author, region, country, category, info) {
        this._id = id
        this._title = title
        this._author = author
        this._region = region
        this._country = country
        this._category = category
        this._info = info
    }

    get id() { return this._id }
    get title() { return this._title }
    get author() { return this._author }
    get region() { return this._region}
    get country() {return this._country}
    get category() { return this._category}
    get info() { return this._info }
}