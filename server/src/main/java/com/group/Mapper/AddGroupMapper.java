package com.group.Mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface AddGroupMapper {
    @Insert("insert into manageGroup values(#{groupNumber},#{groupMember})")
    public int insertOne(int groupNumber,String groupMember);

    @Delete("DELETE FROM manageGroup where groupNumber=#{groupNumber} and groupMember=#{groupMember}")
    public int deleteOneMember(int groupNumber,String groupMember);

    @Select("SELECT groupMember FROM manageGroup where groupNumber=#{groupNumber}")
    public List<String> findAllMembersName(int groupNumber);

    @Select("SELECT groupNumber FROM manageGroup where groupMember=#{groupMember}")
    public List<Integer> findAllGroupNumber(String groupMember);

}
