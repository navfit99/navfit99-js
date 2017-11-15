var fileUUIDKey = 'uuid';

var backendBaseURL = 'http://localhost:8000';
var backendFileHandler = '/file';
var backendFileUUIDKey = 'fileUUID';


var backendEditHandler = '/edit';
var editScopeKey = 'editScope';
var editOpKey = 'editOp';
var newDataKey = 'navfitNewData';

var folderNameKey = 'FolderName';
var folderIDKey = 'FolderID';
var folderParentKey = 'Parent';

var reportIDKey = 'ReportID';
var reportParentIDKey = "Parent";
var reportNameKey = 'Name';
var reportRateKey = "Rate";
var reportDesigKey = "Desig";
var reportSSNKey = "SSN";





var blankFolderString = '{"TAR":false,"SummaryMP":"","Regular":false,"Concurrent":false,"Periodic":false,"SeniorRaterDate":null,"StatementNo":false,"ShipStation":"","Name":null,"RaterDate":null,"OpsCdr":false,"AutoSummary":true,"BilletSubcat":"","StatementYes":false,"Special":false,"SummaryEP":"","NOB":false,"RSDesig":"","DetInd":false,"Duties":"","RSTitle":"","Rate":"","RSSSN":null,"EO":null,"PromotionRecom":null,"UIC":"","RSInfo":"","RetentionNo":false,"MIL":null,"Active":false,"Achievements":"","MIS":null,"RecommendA":"","FromDate":null,"RecommendB":"","Qualifications":"","Rater":"","ReportingSenior":"","Parent":0,"DateReported":null,"SummaryProm":"","FolderID":null,"FolderName":"new folder", "SummarySP":"","SummaryProg":"","RSAddress":"","SeniorRater":"","ATADSW":false,"PhysicalReadiness":"","DateCounseled":"","PromotionStatus":"","Inactive":false,"UserComments":null,"RSUIC":"","Comments":"","RSGrade":"","QUAL":null,"CommentsPitch":"","SSN":null,"Frocking":false,"RetentionYes":false,"PA":null,"PrimaryDuty":"","TAC":null,"ToDate":null,"TEAM":null,"PROF":null,"Desig":"","Counseler":"","LEAD":null}';

var blankReportString = '{"TAR": false,"SummaryMP": "1","Regular": false,"Concurrent": false,"ReportID": null,"Periodic": false,"SeniorRaterDate": null,"StatementNo": false,"ShipStation": "","Name": null,"RaterDate": null,"OpsCdr": false,"BilletSubcat": "","StatementYes": false,"Special": false,"SummaryEP": "0","NOB": false,"RSDesig": "","DetInd": false,"Duties": "","RSTitle": "","Rate": null,"RSSSN": null,"EO": null,"PromotionRecom": 0,"UIC": "","RSInfo": "","RetentionNo": false,"MIL": null,"Active": false,"Achievements": "","MIS": null,"RecommendA": "","FromDate": null,"RecommendB": "","Qualifications": null,"Rater": null,"ReportingSenior": "","Parent": null,"DateReported": null,"SummaryProm": "0","SummarySP": "0","SummaryProg": "0","RSAddress": "","SeniorRater": null,"ATADSW": false,"PhysicalReadiness": "","DateCounseled": "","PromotionStatus": "","Inactive": false,"ReportType": "FitRep","Password": null,"UserComments": null,"RSUIC": "","Comments": "","RSGrade": "","QUAL": null,"CommentsPitch": "10 POINT","SSN": null,"Frocking": false,"RetentionYes": false,"PA": null,"PrimaryDuty": "","TAC": null,"ToDate": null,"TEAM": null,"PROF": null,"Desig": "","Counseler": "","LEAD": null}';

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var EditScopeEnum = {
	navfit : 1,
	folder : 2,
	report : 3
}

var EditOpEnum = {
	new : 1,
	update : 2,
	delete : 3
}