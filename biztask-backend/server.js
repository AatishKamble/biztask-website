import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import businessRouter from "./routes/bussiness.route.js";
import userRouter from "./routes/user.route.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import userModel from "./models/user.model.js";
import jwtProvider from "./config/jwtProvider.js";
import "dotenv/config";

const app=express();


const port=process.env.PORT;

app.use(express.json());
app.use(cors());



//setupPassport

app.use(passport.initialize());


//google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: [ 'profile','email' ]
  },async(accessToken, refreshToken, profile, cb)=>{
    try {
        let user = await userModel.findOne({email:profile.emails[0].value});
        if (!user) {
          const newUser = new userModel({
            name:profile.displayName,
            email:profile.emails[0].value,
            password: 'google',
            profileImage:profile.photos[0].value,
        });
        user = await newUser.save();
        }


        const token=jwtProvider.generateToken(user._id);

      
        return cb(null,{user,token});


    } catch (error) {
        return cd(error,null);
    }

  }));


//api endpoints

app.use('/api/user',userRouter);
app.use('/api/images',express.static("uploads"));
app.use('/api/business',businessRouter);


//google auth
app.get('/auth/google',passport.authenticate("google",{scope:[ 'profile','email' ]}));

app.get("/auth/google/callback",passport.authenticate("google",{session:false}),(req,res)=>{
  const { token } = req.user;
  const redirectUrl = `${process.env.FRONT_END_URL}/auth/google/callback?token=${token}`;
  
  res.redirect(redirectUrl);
});





app.get("/",(req,res)=>{

    res.send("API working");
});


app.listen(port,()=>{

    //db connection 
    connectDB();
    console.log(`server listening on http://localhost: ${port}`);
})


