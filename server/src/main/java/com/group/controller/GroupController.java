package com.group.controller;

import com.group.Mapper.AddGroupMapper;
import com.group.Mapper.AllGroupMapper;
import com.group.domain.Group;
import com.login.Mapper.UserMapper;
import com.responseResult.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    public AllGroupMapper allGroupMapper;
    @Autowired
    public AddGroupMapper addGroupMapper;
    @Autowired
    public UserMapper userMapper;

    @PostMapping("/createGroup")
    @ResponseBody
    public ResponseResult createGroup(@RequestBody Map params){
       //获取groupname和grouppin
        String groupName =  params.get("groupName").toString();
        int groupPin =  Integer.parseInt(params.get("groupPin").toString());
        //前端还要在返回一个groupManager
        String groupManager = params.get("groupManager").toString();
        //产生六位的随机数
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmssSS");
        Long formDate = Long.parseLong(sdf.format(date));
        Random random = new Random(formDate);
        int groupNumber = random.nextInt(899999)+100000;

        SimpleDateFormat sdateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//这里传入字符串格式后将按照此格式进行格式化，字符串中y、M、H、m、s分别是时间英文首字母，是不能变的，其他字符可以改变。
        // 4-2:创建一个Date时间对象：
        Date dateformatnew = new Date();//创建 Date对象并将它传入format方法：
        // 4-3：使用format(Date date)对日期进行格式化,需要传入一个Date时间对象：
        String createTime = sdateformat.format(dateformatnew);

        int result = allGroupMapper.insertOne(groupNumber,groupName,groupPin,groupManager,createTime);
        int count = addGroupMapper.insertOne(groupNumber,groupManager);
        if(result!=0 && count !=0){
            return new ResponseResult(0,"create group successfully",0);
        }else{
            return new ResponseResult(1,"failed to create group",0);
        }
    }

    @PostMapping("/addGroup")
    @ResponseBody
    public ResponseResult addGroup(@RequestBody Map params){
        //获取groupname和grouppin
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        int groupPin =  Integer.parseInt(params.get("groupPin").toString());
        //查一下有没有这个组
        Group group = allGroupMapper.findOneGroup(groupNumber,groupPin);
        //如果有这个组
        System.out.println(group);
        if(group!= null){
            //获取一下当前这个人是谁
            String groupMember = params.get("groupMember").toString();
            int result = addGroupMapper.insertOne(groupNumber,groupMember);
            if(result!=0){
                return new ResponseResult(0,"added successfully",0);
            }else{
                return new ResponseResult(1,"failed to add",0);
            }
        }else{
            return null;
        }

    }

    @PostMapping("/changeGroupName")
    @ResponseBody
    public ResponseResult changeGroupName(@RequestBody Map params){
        String groupName = params.get("groupName").toString();
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        int count = allGroupMapper.updateGroupName(groupNumber,groupName);
        ResponseResult responseResult = null;
        if(count!=0){
            responseResult = new ResponseResult(0,"change group name successfully",0);
        }else{
            responseResult = new ResponseResult(1,"failed to change group name",0);
        }
        return responseResult;
    }

    @PostMapping("/changeGroupPin")
    @ResponseBody
    public ResponseResult changeGroupPin(@RequestBody Map params){
        int currentGroupPin = Integer.parseInt(params.get("currentGroupPin").toString());
        int newGroupPin = Integer.parseInt(params.get("newGroupPin").toString());
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        //查查current pin输得对不对
        Group group = allGroupMapper.findOneGroup(groupNumber,currentGroupPin);
        ResponseResult responseResult = null;
        if(group==null){
            responseResult = new ResponseResult(1,"change pin failed, current pin is not correct!",null);
        }else{
            int count = allGroupMapper.updateGroupPin(groupNumber,newGroupPin);
            if(count!=0){
                responseResult = new ResponseResult(0,"change group pin successfully",0);
            }else{
                responseResult = new ResponseResult(1,"failed to change group pin",0);
            }
        }
        return responseResult;
    }

    @PostMapping("/kickOneMemberOut")
    @ResponseBody
    public ResponseResult kickOneMemberOut(@RequestBody Map params){
        String groupMember = params.get("groupMember").toString();
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        int count = addGroupMapper.deleteOneMember(groupNumber,groupMember);
        ResponseResult responseResult = null;
        if(count!=0){
            responseResult = new ResponseResult(0,"kick him out successfully",0);
        }else{
            responseResult = new ResponseResult(1,"failed to kick him out!",0);
        }
        return responseResult;

    }

    @PostMapping("/selfLeaving")
    @ResponseBody
    public ResponseResult selfLeaving(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        String groupMember = params.get("groupMember").toString();
        int count = addGroupMapper.deleteOneMember(groupNumber,groupMember);
        ResponseResult responseResult = null;
        if(count!=0){
            responseResult = new ResponseResult(0,"leave group "+groupNumber+" successfully",0);
        }else{
            responseResult = new ResponseResult(1,"failed to leave group "+groupNumber+"!",0);
        }
        return responseResult;
    }

    @PostMapping("/getAllMembersName")
    @ResponseBody
    public ResponseResult getAllMembersName(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        ResponseResult responseResult = null;
        List<String> memberNameList = addGroupMapper.findAllMembersName(groupNumber);
        ArrayList<HashMap> finalList = new ArrayList<HashMap>();
        for(String username:memberNameList){
            String nickname = userMapper.findNickName(username);
            HashMap hashMap = new HashMap();
            hashMap.put("username",username);
            hashMap.put("nickname",nickname);
            finalList.add(hashMap);
        }
        responseResult = new ResponseResult(0,"get all successfully",finalList);
        return responseResult;
    }

    @PostMapping("/getOneMemberAllGroupNames")
    @ResponseBody
    public ResponseResult getOneMemberAllGroupNames(@RequestBody Map params){
        String groupMember = params.get("groupMember").toString();
        List<Integer> groupNumberList = addGroupMapper.findAllGroupNumber(groupMember);
        ArrayList<HashMap> finalList = new ArrayList<HashMap>();
        ResponseResult responseResult = null;
        for(int groupNumber:groupNumberList){
            String groupName = allGroupMapper.findGroupName(groupNumber);
            HashMap hashMap = new HashMap();
            hashMap.put("groupNumber",groupNumber);
            hashMap.put("groupName",groupName);
            finalList.add(hashMap);
        }
        responseResult = new ResponseResult(0,"get all group name and ID successfully!",finalList);
        return responseResult;
    }
}
