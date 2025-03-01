class UserModel {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        // Logic to save the user to the database
    }

    static find(email) {
        // Logic to find a user by email in the database
    }
}

module.exports = UserModel;