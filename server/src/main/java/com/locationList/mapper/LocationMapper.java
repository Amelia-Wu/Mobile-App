package com.locationList.mapper;

import com.locationList.domain.LocationList;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LocationMapper {
    @Select("select * from locationList where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress}")
    public LocationList findLocation(int groupNumber, String locationName, String locationAddress);

    @Insert("insert into locationList values(#{groupNumber},#{locationName},#{locationAddress},#{username},#{locationTag},#{comments},#{photos})")
    public int insertLocation(int groupNumber,String locationName, String locationAddress, String username, String locationTag, String comments, String photos, String longitude, String latitude);

    @Update("update locationList set comments=#{comments} where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress}")
    public int updateComments(int groupNumber, String locationName, String locationAddress, String comments);

    @Select("select comments from locationList where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress}")
    public String findComments(int groupNumber, String locationName, String locationAddress);

    @Update("update locationList set photos=#{photos} where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress}")
    public int updatePhotos(int groupNumber, String locationName, String locationAddress, String photos);

    @Select("select photos from locationList where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress}")
    public String findPhotos(int groupNumber, String locationName, String locationAddress);

    @Select("select count(*) from locationList where groupNumber=#{groupNumber}")
    public int findLocationNumber(int groupNUmber);

    @Select("select * from locationList where groupNumber=#{groupNumber} limit #{x},#{y}")
    public LocationList findOneLocation(int groupNumber, int x, int y);

    @Select("select * from locationList where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress} and username=#{username}")
    public LocationList findUserLocation(int groupNumber, String locationName, String locationAddress, String username);

    @Delete("delete from locationList where groupNumber=#{groupNumber} and locationName=#{locationName} and locationAddress=#{locationAddress} and username=#{username}")
    public int deleteUserLocation(int groupNumber, String locationName, String locationAddress, String username);
}
