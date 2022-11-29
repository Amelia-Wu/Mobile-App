package com.locationList.controller;


import com.locationList.domain.LocationList;
import com.locationList.mapper.LocationMapper;
import com.responseResult.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/locationList")
public class LocationListController {

    @Autowired
    public LocationMapper locationMapper;

    @PostMapping("/addNewLocation")
    @ResponseBody
    public ResponseResult addNewLocation(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        String locationName = params.get("locationName").toString();
        String locationAddress = params.get("locationAddress").toString();

        LocationList location = locationMapper.findLocation(groupNumber,locationName,locationAddress);
        ResponseResult responseResult = null;

        if(location == null){
            String username = params.get("username").toString();
            String locationTag = params.get("locationTag").toString();
            String comments = params.get("comments").toString();
            String photos = params.get("photos").toString();
            String longitude = params.get("longitude").toString();
            String latitude = params.get("latitude").toString();

            int count = locationMapper.insertLocation(groupNumber, locationName, locationAddress, username, locationTag, comments, photos,longitude,latitude);

            LocationList newLocation = new LocationList(groupNumber, locationName, locationAddress, username, locationTag, comments, photos,longitude,latitude);
            if(count != 0){
                responseResult = new ResponseResult(0, "add location successfully",newLocation);
            }else{
                responseResult = new ResponseResult(1, "failed to add location",0);
            }

        }else {
            responseResult = new ResponseResult(1, "location existed",0);
        }
        return responseResult;
    }

    @PostMapping("/addNewComments")
    @ResponseBody
    public ResponseResult addNewComments(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        String locationName = params.get("locationName").toString();
        String locationAddress = params.get("locationAddress").toString();

        LocationList location = locationMapper.findLocation(groupNumber,locationName,locationAddress);
        ResponseResult responseResult = null;

        if(location != null){
            String addComments = params.get("comments").toString();

            String currentComments = locationMapper.findComments(groupNumber, locationName, locationAddress);

            String newComments = currentComments + addComments;

            int update = locationMapper.updateComments(groupNumber, locationName, locationAddress, newComments);

            if(update != 0){
                responseResult = new ResponseResult(0, "add comments successfully",newComments);
            }else{
                responseResult = new ResponseResult(1, "failed to add comments",0);
            }

        }else {
            responseResult = new ResponseResult(1, "location does not existed",0);
        }
        return responseResult;
    }

    @PostMapping("/addNewPhotos")
    @ResponseBody
    public ResponseResult addNewPhotos(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        String locationName = params.get("locationName").toString();
        String locationAddress = params.get("locationAddress").toString();

        LocationList location = locationMapper.findLocation(groupNumber,locationName,locationAddress);
        ResponseResult responseResult = null;

        if(location != null){
            String addPhotos = params.get("photos").toString();

            String currentPhotos = locationMapper.findPhotos(groupNumber, locationName, locationAddress);

            String newPhotos = currentPhotos + addPhotos;

            int update = locationMapper.updatePhotos(groupNumber, locationName, locationAddress, newPhotos);

            if(update != 0){
                responseResult = new ResponseResult(0, "add comments successfully",newPhotos);
            }else{
                responseResult = new ResponseResult(1, "failed to add comments",0);
            }

        }else {
            responseResult = new ResponseResult(1, "location does not existed",0);
        }
        return responseResult;
    }

    @PostMapping("/showLocationList")
    @ResponseBody
    public ResponseResult showLocationList(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());

        int locationNumber = locationMapper.findLocationNumber(groupNumber);

        ArrayList<HashMap> allLocation = new ArrayList<HashMap>();

        ResponseResult responseResult = null;

        if (locationNumber != 0){
            for(int i = 0; i < locationNumber; i++){
                LocationList oneLocation = locationMapper.findOneLocation(groupNumber, i,i+1);
                String locationName = oneLocation.getLocationName();
                String locationAddress = oneLocation.getLocationAddress();
                String username = oneLocation.getUsername();
                String locationTag = oneLocation.getLocationTag();
                String comments = oneLocation.getComments();
                String photos = oneLocation.getPhotos();
                String longitude = oneLocation.getLongitude();
                String latitude = oneLocation.getLatitude();

                HashMap hashMap = new HashMap();
                hashMap.put("groupNumber",groupNumber);
                hashMap.put("locationName",locationName);
                hashMap.put("locationAddress",locationAddress);
                hashMap.put("username",username);
                hashMap.put("locationTag",locationTag);
                hashMap.put("comments",comments);
                hashMap.put("photos",photos);
                hashMap.put("longitude",longitude);
                hashMap.put("latitude",latitude);

                allLocation.add(hashMap);

            }
            responseResult = new ResponseResult(0, "show location list successfully",allLocation);
        }else{
            responseResult = new ResponseResult(1, "location list is null",0);
        }

        return responseResult;
    }

    @PostMapping("/deleteLocation")
    @ResponseBody
    public ResponseResult deleteLocation(@RequestBody Map params){
        int groupNumber = Integer.parseInt(params.get("groupNumber").toString());
        String locationName = params.get("locationName").toString();
        String locationAddress = params.get("locationAddress").toString();
        String username = params.get("username").toString();

        LocationList userLocation = locationMapper.findUserLocation(groupNumber,locationName,locationAddress,username);
        ResponseResult responseResult = null;

        if(userLocation != null){
            int deleteUserLocation = locationMapper.deleteUserLocation(groupNumber,locationName,locationAddress,username);
            if(deleteUserLocation != 0){
                responseResult = new ResponseResult(0, "delete location successfully",0);
            }else {
                responseResult = new ResponseResult(1, "failed to delete location",0);
            }

        }else{
            responseResult = new ResponseResult(1, "do not have this location",0);
        }

        return responseResult;
    }
}
