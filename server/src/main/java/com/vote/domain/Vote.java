package com.vote.domain;

import java.util.Date;

public class Vote {
    private int groupNumber;
    private String activityName;
    private String locationName;
    private String locationAddress;
    private String locationTag;
    private String comments;
    private String photos;
    private String longitude;
    private String latitude;
    private String voteStartTime;
    private String voteOverTime;
    private int numberOfVotes;


    public Vote() {
    }

    public String getLocationTag() {
        return locationTag;
    }

    public void setLocationTag(String locationTag) {
        this.locationTag = locationTag;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public String getVoteStartTime() {
        return voteStartTime;
    }

    public void setVoteStartTime(String voteStartTime) {
        this.voteStartTime = voteStartTime;
    }

    public String getVoteOverTime() {
        return voteOverTime;
    }

    public void setVoteOverTime(String voteOverTime) {
        this.voteOverTime = voteOverTime;
    }

    public int getNumberOfVotes() {
        return numberOfVotes;
    }

    public void setNumberOfVotes(int numberOfVotes) {
        this.numberOfVotes = numberOfVotes;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Vote(int groupNumber, String activityName, String locationName, String locationAddress, String locationTag, String comments, String photos, String longitude, String latitude, String voteStartTime, String voteOverTime, int numberOfVotes) {
        this.groupNumber = groupNumber;
        this.activityName = activityName;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.locationTag = locationTag;
        this.comments = comments;
        this.photos = photos;
        this.longitude = longitude;
        this.latitude = latitude;
        this.voteStartTime = voteStartTime;
        this.voteOverTime = voteOverTime;
        this.numberOfVotes = numberOfVotes;
    }

    @Override
    public String toString() {
        return "Vote{" +
                "groupNumber=" + groupNumber +
                ", activityName='" + activityName + '\'' +
                ", locationName='" + locationName + '\'' +
                ", locationAddress='" + locationAddress + '\'' +
                ", locationTag='" + locationTag + '\'' +
                ", comments='" + comments + '\'' +
                ", photos='" + photos + '\'' +
                ", longitude='" + longitude + '\'' +
                ", latitude='" + latitude + '\'' +
                ", voteStartTime='" + voteStartTime + '\'' +
                ", voteOverTime='" + voteOverTime + '\'' +
                ", numberOfVotes=" + numberOfVotes +
                '}';
    }
}

