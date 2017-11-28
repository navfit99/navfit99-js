var reportBlkKeys = [
	'Name',
	'Rate',
	'Desig',
	'SSN',
	null, //Service type
	'UIC',
	'ShipStation',
	'PromotionStatus',
	'DateReported',
	'Periodic',
	'DetInd',
	'?',
	'Special',
	'FromDate',
	'ToDate',
	'NOB',
	'Regular',
	'Concurrent',
	'OpsCdr',
	'PhysicalReadiness',
	'BilletSubcat',
	'ReportingSenior',
	'RSGrade',
	'RSDesig',
	'RSTitle',
	'RSUIC',
	'RSSSN',
	'Achievements',
	null,
	'DateCounseled',
	'Counselor',
	null, //Sig of indiv counseled
	'PROF',
	'EO',
	'MIL',
	'TEAM',
	'MIS',
	'LEAD',
	'TAC',
	null, //Recommend screening for A B
	'Comments',
	'PromotionRecom',
	null, //Summary promotion
	'RSAddress',
	null, //Sig of reporting senior
	null, //Sig and Submit statement YES/NO
	'RSInfo'
];

//Individual service type
var reportBlk5Keys = [
	'Active',
	'TAR',
	'Inactive',
	'ATADSW'
];

//Pri/collateral duties
var reportBlk29Keys = [
	'PrimaryDuty',
	'Duties'
];

//Recommend for next career milestone
var reportBlk40Keys = [
	'RecommendA',
	'RecommendB'
];

//Summary numbers
var reportBlk43Keys = [
	'SummarySP',
	'SummaryProg',
	'SummaryProm',
	'SummaryMP',
	'SummaryEP'
];

//Signature of individual evaluated plus check whether statementd
var reportBlk46Keys = [
	'StatementYes',
	'StatementNo'
];

var reportBlkInputClass = 'report-input-element'; //hardcoded, only for reference

var reportTypeKey = 'ReportType'; //FitRep, Eval, Chief