package com.group.Mapper;

import com.group.domain.Group;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
//@Repository
public interface AllGroupMapper {
    @Select("SELECT groupNumber from allGroup order by createTime desc;")
    public List<Integer> findLatestAddedGroupNumber();

    @Select("SELECT groupManager from allGroup where groupNumber=#{groupNumber}")
    public String findGroupManager(int groupNumber);

    @Select("SELECT * FROM allGroup where groupManager=#{groupManager} order by createTime desc limit 0,1")
    public Group findLatestCreatedGroup(String groupManager);

//    @Select("SELECT * FROM allGroup order by createTime desc limit 0,1")

    @Select("SELECT groupName from allGroup where groupNumber=#{groupNumber}")
    public String findGroupName(int groupNumber);

    @Select("select * from allGroup where groupNumber=#{groupNumber} and groupPin=#{groupPin}")
    public Group findOneGroup(int groupNumber,int groupPin);

    @Insert("insert into allGroup values(#{groupNumber},#{groupName},#{groupPin},#{groupManager},#{createTime})")
    public int insertOne(int groupNumber, String groupName, int groupPin, String groupManager, String createTime);

    @Update("update allGroup set groupName=#{groupName} where groupNumber=#{groupNumber}")
    public int updateGroupName(int groupNumber,String groupName);

    @Update("update allGroup set groupPin=#{groupPin} where groupNumber=#{groupNumber}")
    public int updateGroupPin(int groupNumber,int groupPin);
//
//    @Select("select * from user where username=#{username}")
//    public User findOneByName(String username);
//
//    @Insert("insert into user values(#{username},#{nickname},#{password})")
//    public int insertOne(String username,String nickname,String password);
}
