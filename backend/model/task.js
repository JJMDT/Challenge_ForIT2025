class Task {
    constructor(title, description, completed = false) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = new Date();
    }
}

module.exports = Task;