package com.utils;

import com.responseResult.ResponseResult;
import com.vote.Mapper.VoteMapper;
import com.vote.domain.Vote;

import java.util.HashMap;

public class Utils {
    public static ResponseResult managerLoginLogics(String username,String nickname,VoteMapper voteMapper,String groupName, int groupNumber, String currentTime){
        ResponseResult responseResult=null;
        Vote vote = voteMapper.findHasCurrentVote(currentTime,groupNumber);
        String activityName = null;
        //如果当前时间不存在投票,current没有
        HashMap hashMap = null;
        if(vote == null){
            activityName = "None";
            Vote previousVote = voteMapper.findPreviousVote(currentTime,groupNumber);
            String previousLocationName = null;
            //如果不存在上一次的vote信息,以前没有
            if(previousVote==null){
                hashMap = new HashMap();
                hashMap.put("ifManager",true);
                hashMap.put("currentActivityName","None");
                hashMap.put("groupName",groupName);
                hashMap.put("nickname",nickname);
                hashMap.put("username",username);
                hashMap.put("groupNumber",groupNumber);
                //两个都没有，只显示一个current为none，不显示last
                responseResult = new ResponseResult(3,"manager,no current,no previous",hashMap);
                //以前有
            }
            else{
                previousLocationName = previousVote.getLocationName();
                hashMap = new HashMap();
                hashMap.put("ifManager",true);
                hashMap.put("currentActivityName","None");
                hashMap.put("groupName",groupName);
                hashMap.put("previousLocationName",previousLocationName);
                hashMap.put("nickname",nickname);
                hashMap.put("username",username);
                hashMap.put("groupNumber",groupNumber);
                responseResult = new ResponseResult(4,"manager, no current,has previous",hashMap);
            }

        }
        //current有
        else{
            //如果存在投票就把名字打出来
            activityName = vote.getActivityName();
            String voteOverTime = vote.getVoteOverTime();
            hashMap = new HashMap();
            hashMap.put("ifManager",true);
            hashMap.put("currentActivityName",activityName);
            hashMap.put("voteOverTime",voteOverTime);
            hashMap.put("groupName",groupName);
            hashMap.put("nickname",nickname);
            hashMap.put("username",username);
            hashMap.put("groupNumber",groupNumber);
            responseResult = new ResponseResult(5,"manager, has current,no previous",hashMap);
        }
        return responseResult;
    }

    public static ResponseResult memberLoginLogics(String username,String nickname,VoteMapper voteMapper,String groupName, int groupNumber, String currentTime){
        ResponseResult responseResult=null;
        Vote vote = voteMapper.findHasCurrentVote(currentTime,groupNumber);
        String activityName = null;
        //如果当前时间不存在投票,current没有
        HashMap hashMap = null;
        if(vote == null){
            activityName = "None";
            Vote previousVote = voteMapper.findPreviousVote(currentTime,groupNumber);
            String previousLocationName = null;
            //如果不存在上一次的vote信息,以前没有
            if(previousVote==null){
                hashMap = new HashMap();
                hashMap.put("ifManager",false);
                hashMap.put("currentActivityName","None");
                hashMap.put("groupName",groupName);
                hashMap.put("nickname",nickname);
                hashMap.put("username",username);
                hashMap.put("groupNumber",groupNumber);
                //两个都没有，只显示一个current为none，不显示last
                responseResult = new ResponseResult(6,"member,no current,no previous",hashMap);
                //以前有
            }
            else{
                previousLocationName = previousVote.getLocationName();
                hashMap = new HashMap();
                hashMap.put("ifManager",true);
                hashMap.put("currentActivityName","None");
                hashMap.put("groupName",groupName);
                hashMap.put("previousLocationName",previousLocationName);
                hashMap.put("nickname",nickname);
                hashMap.put("username",username);
                hashMap.put("groupNumber",groupNumber);
                responseResult = new ResponseResult(7,"member, no current,has previous",hashMap);
            }

        }
        //current有
        else{
            //如果存在投票就把名字打出来
            activityName = vote.getActivityName();
            String voteOverTime = vote.getVoteOverTime();
            hashMap = new HashMap();
            hashMap.put("ifManager",true);
            hashMap.put("currentActivityName",activityName);
            hashMap.put("voteOverTime",voteOverTime);
            hashMap.put("groupName",groupName);
            hashMap.put("nickname",nickname);
            hashMap.put("username",username);
            hashMap.put("groupNumber",groupNumber);
            responseResult = new ResponseResult(8,"member, has current,no previous",hashMap);
        }
        return responseResult;
    }
}
