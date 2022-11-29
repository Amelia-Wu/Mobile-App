package com.login.Mapper;

import com.login.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
//@Repository
public interface UserMapper {
    @Select("select * from user")
    public List<User> findAll();

    @Select("select * from user where username=#{username} and password=#{password}")
    public User findOne(String username,String password);

    @Select("select * from user where username=#{username}")
    public User findOneByName(String username);

    @Insert("insert into user values(#{username},#{nickname},#{password})")
    public int insertOne(String username,String nickname,String password);

    @Update("UPDATE user set password=#{password} where username=#{username}")
    public int changePassword(String username,String password);

    @Update("UPDATE user set nickname=#{nickname} where username=#{username}")
    public int changeNickname(String username,String nickname);

    @Select("SELECT nickname from user where username=#{username}")
    public String findNickName(String username);

}
