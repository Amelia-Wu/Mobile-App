package com.vote.Mapper;

import com.vote.domain.Vote;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface VoteMapper {
    @Select("select * from vote where groupNumber=#{groupNumber} and #{currentTime} >voteOverTime order by voteStartTime desc,numberOfVotes desc limit 0,1; ")
    public Vote findPreviousVote(String currentTime,int groupNumber);

    @Select("select * from vote  where #{currentTime}> voteStartTime and #{currentTime}<voteOverTime and groupNumber=#{groupNumber} limit 0,1")
    public Vote findHasCurrentVote(String currentTime,int groupNumber);

    @Select("select * from vote where groupNumber=#{groupNumber} and voteStartTime=#{voteStartTime} order by numberOfVotes desc,locationName asc limit 1;")
    public Vote lastWinningLocation(int groupNumber,String voteStartTime);

    @Select("SELECT * from vote where groupNumber=#{groupNumber} and " +
            "voteStartTime=#{voteStartTime} and locationTag=#{locationTag}")
    public List<Vote> typeFilter(int groupNumber, String voteStartTime,String locationTag);

    @Select("SELECT * from vote where groupNumber=#{groupNumber} and " +
            "voteStartTime=#{voteStartTime} and numberOfVotes>=#{voteLimit}")
    public List<Vote> filter(int groupNumber, String voteStartTime,int voteLimit);

    @Select("SELECT * from vote where groupNumber=#{groupNumber} and " +
            "locationName=#{locationName} and " +
            "locationAddress=#{locationAddress} and " +
            "voteStartTime=#{voteStartTime}")
    public Vote checkIfCanInsert(int groupNumber, String locationName, String locationAddress, String voteStartTime);

    @Insert("INSERT INTO vote values(#{groupNumber}," +
            "#{activityName}," +
            "#{locationName}," +
            "#{locationAddress}," +
            "#{locationTag}," +
            "#{comments}," +
            "#{photos}," +
            "#{longitude}," +
            "#{latitude}," +
            "#{voteStartTime}," +
            "#{voteOverTime}," +
            "#{numberOfVotes})")
    public int insertOne(int groupNumber, String activityName, String locationName, String locationAddress,String locationTag,String comments,String photos,String longitude,String latitude, String voteStartTime, String voteOverTime, int numberOfVotes);

    @Update("UPDATE vote set numberOfVotes=numberOfVotes+1 where groupNumber=#{groupNumber} and " +
            "locationName=#{locationName} and " +
            "locationAddress=#{locationAddress} and " +
            "voteStartTime=#{voteStartTime}")
    public int updateVotes(int groupNumber, String locationName, String locationAddress, String voteStartTime);
}
