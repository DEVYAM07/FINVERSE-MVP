import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/user'; 
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server'; 
import jwt from 'jsonwebtoken'; 
 
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password );
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      username: user.name,
      email: user.email,
    };
         // create token
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET as string ,{
            expiresIn: '1h', // Token expiration time
        });
        
        const response = NextResponse.json({message:"User logged in successfully"},{status:200});
        response.cookies.set({ 
            name: 'token',
            value: token,
            httpOnly: true, // Make the cookie inaccessible to JavaScript
            sameSite: 'strict', // Prevent CSRF attacks 
            maxAge: 60 * 60, // 1 hour
        } )
        return response; 

    return response;
  } catch (error: unknown) {
   if (typeof error === 'string') {
      return NextResponse.json({ error: error }, { status: 500 });
    }
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}

}

