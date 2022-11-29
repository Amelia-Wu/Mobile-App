package com.register.controller;

import com.login.Mapper.UserMapper;
import com.login.domain.User;
import com.responseResult.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserRegisterController {

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    @ResponseBody
    public ResponseResult registerPost(HttpServletRequest request, HttpServletResponse response, @RequestBody Map params) throws IOException {
        String username = params.get("username").toString();
        User user = userMapper.findOneByName(username);
        ResponseResult responseResult = null;
        //username existed
        if(user!=null){
            responseResult = new ResponseResult(1,"username existed!",null);
            return responseResult;
        }else{
            String password = params.get("password").toString();
            String nickname = params.get("nickname").toString();
            int count = userMapper.insertOne(username,nickname,password);
            User newRegister = new User(username,nickname,password);
            if(count!=0){
                responseResult = new ResponseResult(0,"register successfully!",newRegister);
                return responseResult;
            }else{
                responseResult = new ResponseResult(1,"register failed!",null);
                return responseResult;
            }
        }
    }
}
