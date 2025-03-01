class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(req, res) {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Check if user already exists
            const existingUser = await this.userModel.find({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const newUser = await this.userModel.save({ username, email, password });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default UserController;