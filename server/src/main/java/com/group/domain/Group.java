package com.group.domain;

public class Group {

    private String groupName;
    private int groupPin;
    private int groupNumber;
    private String groupManager;
    private String createTime;

    public Group(String groupName, int groupPin, int groupNumber, String groupManager, String createTime) {
        this.groupName = groupName;
        this.groupPin = groupPin;
        this.groupNumber = groupNumber;
        this.groupManager = groupManager;
        this.createTime = createTime;
    }

    public Group(){

    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Group{" +
                "groupName='" + groupName + '\'' +
                ", groupPin=" + groupPin +
                ", groupNumber=" + groupNumber +
                ", groupManager='" + groupManager + '\'' +
                ", createTime='" + createTime + '\'' +
                '}';
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getGroupPin() {
        return groupPin;
    }

    public void setGroupPin(int groupPin) {
        this.groupPin = groupPin;
    }

    public int getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getGroupManager() {
        return groupManager;
    }

    public void setGroupManager(String groupManager) {
        this.groupManager = groupManager;
    }
}
