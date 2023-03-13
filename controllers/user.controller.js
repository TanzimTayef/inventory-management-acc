const { singupService, findUserByEmailService } = require("../services/user.services");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.singup = async (req, res) => {
  try {
    const user = await singupService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't signed user!",
      error: error.message,
    });
  }
};

/**
 * 1. Check if Email and Password are given.
 * 2. Load user with eamil.
 * 3. if not user > send res
 * 4.compare passwor
 * 5. if password not crrect send res
 * 6. check if user active
 * 6. if not active send res
 * 8. generate a token
 * 9. send user and token
 */

exports.login = async(req, res) => {
    try{

        const {email, password} = req.body;
        if(!email || !password){
          return res.status(401).json({
            status: "fail",
            error: "Please provide your credentials"
          })
        }

        const user = await findUserByEmailService(email);

        if(!user){
          return res.status(401).json({
            status: "fail",
             error: "No user foud, Please singup"
          })
        }

        const isPasswordValid =  user.comparePassword(password, user.password);

        if(!isPasswordValid){
          return  res.status(403).json({
            status: "fail",
            error: "Password not correct!"
          })
        } 

        if(user.status != "active"){
          return res.status(401).json({
            status: "fail",
            error: "Your accont is not active yet."
          })
        }

  const token = generateToken(user);



  const {password:pwd, ...others} = user.toObject();
      

       res.status(200).json({
        status: "success",
        message: "Successfully login", 
        data:{others,token}
       })
    }catch(error) {
      res.status(500).json({
        status: "fail", 
        message: "Couldn't not login",
        error: error.message
      })
    }
}


exports.getMe = async (req, res) => {
  try{
   
    const user = await findUserByEmailService(req.user?.email)

    res.status(200).json({
      status: "success",
      data: user
    })

  }catch(error){
    res.status(500).json({
      status: "fail",
      message: "Couldn't not get me",
      error: error.message
    })
  }
}
