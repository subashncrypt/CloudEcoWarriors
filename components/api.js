const express = require("express");
const router = express.Router();
const users = require('../components/users');

// Get Users
router.get('/users', (req,res) => {
    try{
        if (users.length === 0) {
            return res.status(404).json({
                message: 'Users not found',
                success: false
            });
        } else {
            return res.status(200).json({
                message : "Users Retrieved",
                success : true,
                users : users
            })
        }
    } catch(err){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
})

// Add User
router.post('/adduser',(req,res) => {
    const newUser = req.body;
    try{
        const checkEmail = "email" in newUser;
        const checkFName = "firstName" in newUser;
        const checkBody = checkEmail && checkFName;
        if(checkBody && newUser["email"].length > 0 && newUser["firstName"].length > 0) {
            if(users.length === 0) {
                newUser["id"] = "tut5u" + (users.length + 1);
                users.push(newUser);
                return res.status(200).json({
                    message: 'User added',
                    success: true
                });
            } else {
                const userExist = users.find((user) => user["email"] === newUser["email"]);
                if (userExist === undefined || userExist === null) {
                    newUser["id"] = "t" + (users.length + 1);
                    users.push(newUser);
                    return res.status(200).json({
                        message: 'User added',
                        success: true
                    });
                } else {
                    return res.status(404).json({
                        message: 'User exists',
                        success: false
                    });
                }
            }
        } else {
            return res.status(400).json({
                message: 'Bad request',
                success: false
            });
        }
    }catch(err){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
})

// Update User
router.put('/updateuser/:id', (req,res) => {
    const userId = req.params.id;
    const update = req.body;
    try {
        const checkEmailId = "email" in update;
        const checkFirstName = "firstName" in update;
        const checkBody = checkEmailId && checkFirstName;
        if(checkBody && update["email"].length > 0 && update["firstName"].length > 0 && users.length > 0){
            const userIndex = users.findIndex((user) => user["id"] === userId);
            if(userIndex >= 0) {
                update["id"] = userId;
                users[userIndex] = update;
                return res.status(200).json({
                    message: 'User updated',
                    success: true
                });
            }
            else {
                return res.status(404).json({
                    message: 'User not found',
                    success: false
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Bad request',
                success: false
            });
        }
    }catch(err){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
})

// Get User
router.get('/user/:id', (req,res) => {
    const userId = req.params.id;
    try{
        if (users.length === 0) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        } else {
            const user = users.find((user) => user["id"] === userId);
        if (user === undefined || user === null) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        } else {
            return res.status(200).json({
                success : true,
                users : user
            })
        }}
        
    } catch(err){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
})
module.exports = router
