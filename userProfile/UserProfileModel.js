﻿function UserProfileModel(obj) {
    BaseModel.call(this);
    this.AccountName = "";
    this.JobTitle= "";
    this.Department= "";
    this.Division= "";
    this.Office= "";
    this.LineManager= null;
    this.User= null;
    if (obj != undefined) {
        this.ID = util.getNumber(obj.ID);
        this.Title = util.getString(obj.Title);

        this.LineManager = new UserModel(!util.isEmpty(obj.LineManager) ? obj.LineManager : { ID: util.getNumber(obj.LineManagerId)});
        this.User = new UserModel(!util.isEmpty(obj.User) ? obj.User : { ID: util.getNumber(obj.UserId) });

        this.AccountName = util.getString(obj.AccountName);
        this.JobTitle = util.getString(obj.JobTitle);
        this.Department = util.getString(obj.Department);
        this.Division = util.getString(obj.Division);
        this.Office = util.getString(obj.Office);



    }
};
UserProfileModel.constructor = UserProfileModel;