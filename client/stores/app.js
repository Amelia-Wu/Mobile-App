import { makeAutoObservable } from 'mobx';

class AppStore {
    username = '';
    nickname = '';
    isManager = '';
    groupName = '';
    groupNumber = '';
    previousLocationName = '';
    voteStartTime = '';
    voteOverTime = '';
    currLocList = [];
    updateLocList = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUserName(val) {
        this.username = val;
    }

    setIsManager(val) {
        this.isManager = val;
    }

    setCurrentGroupNumber(val) {
        this.currentGroupNumber = val;
    }

    setNickName(val) {
        this.nickname = val;
    }

    getNickName() {
        return this.nickname;
    }

    setIsManager(val) {
        this.isManager = val;
    }

    getIsManager() {
        return this.isManager;
    }

    setGroupName(val) {
        this.groupName = val;
    }

    getGroupName() {
        return this.groupName;
    }

    setGroupNumber(val) {
        this.groupNumber = val;
    }

    getGroupNumber() {
        return this.groupNumber;
    }

    setPreviousLocationName(val) {
        this.previousLocationName = val;
    }

    getPreviousLocationName() {
        return this.previousLocationName;
    }

    setVoteOverTime(val) {
        this.voteOverTime = val;
    }

    getVoteOverTime() {
        return this.voteOverTime;
    }

    setVoteStartTime(val) {
        this.voteStartTime = val;
    }

    setCurrLocList(val) {
        this.currLocList = val;
    }

    setUpdateLocList(val) {
        this.updateLocList = val;
    }
}

export const appStore = new AppStore();