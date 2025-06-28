import  {connectDB }  from '@/lib/db';
import { User } from '@/lib/models/user'; 
import bcrypt from 'bcryptjs';
import {  NextRequest, NextResponse } from 'next/server'; 

export async  function POST(request: NextRequest) {
    try {
        const { name, email, password } =  await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await connectDB();
        

        const existingUser = await  User.findOne({ email }); 
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' } , { status: 400 });
        }
        const salt= await bcrypt.genSalt(10); // Generate a salt for hashing

        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name:name ,
            email:email,
            password: hashedPassword,// as i want the database to store the hashed password
        });

        await newUser.save();

        return NextResponse.json({ message: 'Signup successful' }, { status: 200 });
    } catch (error: unknown) {
        if (typeof error === 'string') {
            return NextResponse.json({ error: error }, { status: 500 });
        }
        console.error("Error during signup:", error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
        
    }


}
