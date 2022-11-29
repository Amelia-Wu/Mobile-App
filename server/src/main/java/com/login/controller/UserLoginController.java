package com.login.controller;
import com.group.Mapper.AddGroupMapper;
import com.group.Mapper.AllGroupMapper;
import com.group.domain.Group;
import com.login.Mapper.UserMapper;
import com.login.domain.User;
import com.responseResult.ResponseResult;
import com.utils.Utils;
import com.vote.Mapper.VoteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserLoginController {

    @Autowired
    public UserMapper userMapper;

    @Autowired
    public AddGroupMapper addGroupMapper;

    @Autowired
    public AllGroupMapper allGroupMapper;

    @Autowired
    public VoteMapper voteMapper;

   @GetMapping("/login")
   public String loginGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        String username= request.getParameter("username");
//        String password = request.getParameter("password");
//        User user = userMapper.findOne(username,password);
//        ResponseResult responseResult = null;
//        if(user!=null){
//            responseResult = new ResponseResult(0,"login successfully",user);
//            return responseResult;
//        }else{
//            responseResult = new ResponseResult(1,"login failed",null);
//            return responseResult;
//        }
       return "111";

   }

    @PostMapping("/login")
    @ResponseBody
    public ResponseResult loginPost(@RequestBody Map params) throws IOException{
        String username =  params.get("username").toString();
        String password =  params.get("password").toString();
        User user = userMapper.findOne(username,password);
        ResponseResult responseResult = null;
        if(user!=null){
            String nickname = user.getNickname();
//            responseResult = new ResponseResult(0,"login successfully",user);
            List<Integer> list = addGroupMapper.findAllGroupNumber(username);
            //不在任何一个组里
            System.out.println(list.size());
            if(list.size() == 0){
                HashMap hashMap = new HashMap();
                hashMap.put("groupName","None");
                hashMap.put("ifManager",false);
                hashMap.put("nickname",nickname);
                hashMap.put("username",username);
                responseResult = new ResponseResult(2,"not at any groups",hashMap);
            }else{
                System.out.println("list size!=0");
                Group group = allGroupMapper.findLatestCreatedGroup(username);

                System.out.println(group);
                //如果是某个组的manager
                if(group!=null){
                    String groupName = group.getGroupName();
                    int groupNumber = group.getGroupNumber();
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String currentTime = sdf.format(date);
                    responseResult =Utils.managerLoginLogics(username,nickname,voteMapper,groupName,groupNumber,currentTime);
                    System.out.println(responseResult);
                    //不是manager
                }
                //如果不是任意一个组的manager，就是普通member
                else{
                    Boolean flag = false;
                    int groupNumber=0;
                    //personGroupNumber是该成员所在的某个组
                    List<Integer> groupNumberList = allGroupMapper.findLatestAddedGroupNumber();
                    for(int allNumber:groupNumberList){
                        //allNumber是由创建时间决定的排序组号
                        //获取到所有的groupNumber，按最近的时间排序
                        for(int personGroupNumber:list){
                            //找到了最近加入的那个组的组号
                            if(personGroupNumber==allNumber){
                                groupNumber = allNumber;
                                flag=true;
                                break;
                            }
                        }
                        if(flag){
                            break;
                        }
                    }
                    //找到了对应的groupNumber
                    String groupName = allGroupMapper.findGroupName(groupNumber);
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String currentTime = sdf.format(date);
                    responseResult = Utils.memberLoginLogics(username,nickname,voteMapper,groupName,groupNumber,currentTime);
                }
            }
            return responseResult;
        }else{
            responseResult = new ResponseResult(1,"login failed",null);
            return responseResult;
        }
    }

    @PostMapping("/changePassword")
    @ResponseBody
    public ResponseResult changePassword(@RequestBody Map params){
        String username = params.get("username").toString();
        String currentPassword = params.get("currentPassword").toString();
        String newPassword = params.get("newPassword").toString();
        User user = userMapper.findOne(username,currentPassword);
        ResponseResult responseResult= null;
        //如果这个用户输入的正确
        if(user!= null){
            int result = userMapper.changePassword(username,newPassword);
            if(result!=0){
                responseResult = new ResponseResult(0,"change password successfully",0);

            }else{
                responseResult = new ResponseResult(1,"failed to change password",0);
            }
        }else{
            responseResult = new ResponseResult(1,"username and password do not match correctly");
        }
        return  responseResult;

    }

    @PostMapping("/changeNickname")
    @ResponseBody
    public ResponseResult changeNickname(@RequestBody Map params){
        String username= params.get("username").toString();
        String nickname = params.get("nickname").toString();
        int result = userMapper.changeNickname(username,nickname);
        ResponseResult responseResult = null;
        if(result!=0){
            responseResult = new ResponseResult(0,"change nickname successfully",0);
        }else{
            responseResult = new ResponseResult(1,"failed to change nickname",0);
        }
        return responseResult;
    }

}
