package com.locationList.domain;

public class LocationList {

    private int groupNumber;

    private String locationName;

    private String locationAddress;

    private String username;

    private String locationTag;

    private String comments;

    private String photos;

    private String longitude;

    private String latitude;


    public LocationList(int groupNumber, String locationName, String locationAddress, String username, String locationTag, String comments, String photos, String longitude, String latitude) {
        this.groupNumber = groupNumber;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.username = username;
        this.locationTag = locationTag;
        this.comments = comments;
        this.photos = photos;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public int getGroupNumber(){
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber){
        this.groupNumber = groupNumber;
    }

    public String getLocationName(){
        return locationName;
    }

    public void setLocationName(String locationName){
        this.locationName = locationName;
    }

    public String getLocationAddress(){
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress){
        this.locationAddress = locationAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLocationTag(){
        return locationTag;
    }

    public void setLocationTag(String locationTag){
        this.locationTag = locationTag;
    }

    public String getComments(){
        return comments;
    }

    public void setComments(String comments){
        this.comments = comments;
    }

    public String getPhotos(){
        return photos;
    }

    public void setPhotos(){
        this.photos = photos;
    }

    public String getLongitude(){
        return longitude;
    }

    public void setLongitude(){
        this.longitude = longitude;
    }

    public String getLatitude(){
        return latitude;
    }

    public void setLatitude() {
        this.latitude = latitude;
    }

}
