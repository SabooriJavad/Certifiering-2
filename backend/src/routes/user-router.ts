import { Request, Response, Router } from 'express';
import { UserModel } from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRouter = Router();


userRouter.post('/register', async (req: Request, res: Response,) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
          

             res.status(400).send('Username,password and email required');
        }
        
        const user = await UserModel.findOne({ $or:[{username},{email}] });
        if (user) {
            res.status(400).send('User exists');
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
        if (saltRounds < 12) {
            throw new Error('password must be at least 12 for security reasons');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await UserModel.create({ username, password: hashedPassword,email });
        res.status(201).send('User created');

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).send('Server error during registration');
    }
});


userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        const user = await UserModel.findOne({ username });

        if (!user) {
            res.status(400).send('Invalid user');

        }
        const validPassword = await bcrypt.compare(password, user.password as string);
        if (!validPassword) {
            res.status(400).send('Invalid user');

        }

        const userId = user._id?.toString();
        
        const token = jwt.sign(
            { username, userId },
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'}
        );
        res.send({token});
    } catch (error) {
        console.error('Login error',error),
        res.status(500).send('Server error during login');
    }
});

