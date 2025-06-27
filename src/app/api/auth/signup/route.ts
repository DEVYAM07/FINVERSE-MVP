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
  console.error("Signup API Error:", error);
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}


}