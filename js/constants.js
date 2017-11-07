var backendBaseURL = 'http://localhost:8000';
var backendFileHandler = '/file';
var fileUUIDKey = 'uuid';

var folderNameKey = 'FolderName';
var folderIDKey = 'FolderID';
var folderParentKey = 'Parent';

var reportIDKey = 'ReportID';
var reportNameKey = 'Name';
var reportRateKey = "Rate";
var reportSSNKey = "SSN";
var reportParentIDKey = "Parent";


var blankFolderString = '{"TAR":false,"SummaryMP":"","Regular":false,"Concurrent":false,"Periodic":false,"SeniorRaterDate":null,"StatementNo":false,"ShipStation":"","Name":null,"RaterDate":null,"OpsCdr":false,"AutoSummary":true,"BilletSubcat":"","StatementYes":false,"Special":false,"SummaryEP":"","NOB":false,"RSDesig":"","DetInd":false,"Duties":"","RSTitle":"","Rate":"","RSSSN":null,"EO":null,"PromotionRecom":null,"UIC":"","RSInfo":"","RetentionNo":false,"MIL":null,"Active":false,"Achievements":"","MIS":null,"RecommendA":"","FromDate":null,"RecommendB":"","Qualifications":"","Rater":"","ReportingSenior":"","Parent":0,"DateReported":null,"SummaryProm":"","FolderID":null,"FolderName":"new folder", "SummarySP":"","SummaryProg":"","RSAddress":"","SeniorRater":"","ATADSW":false,"PhysicalReadiness":"","DateCounseled":"","PromotionStatus":"","Inactive":false,"UserComments":null,"RSUIC":"","Comments":"","RSGrade":"","QUAL":null,"CommentsPitch":"","SSN":null,"Frocking":false,"RetentionYes":false,"PA":null,"PrimaryDuty":"","TAC":null,"ToDate":null,"TEAM":null,"PROF":null,"Desig":"","Counseler":"","LEAD":null}';

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};