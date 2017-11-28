var fitrepFormat = `
{
  "rowContents": [[1,2,3,4], [5,6,7,8,9],  [10, 11, 12, 13, 14, 15],  [16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27], [28], [29], [30, 31, 32], [33], [34], [35], [36], [37], [38], [39], [40], [41], [42, 43, 44], [45, 46], [47]],
  "blocks" : {
    "1": {
      "number": 1,
      "type": "textbox",
      "colWidth": 6,
      "description": "Name (Last, First MI Suffix)",
      "labels": null,
      "keys": ["Name"]
    },
    "2": {
      "number": 2,
      "type": "textbox",
      "colWidth": 2,
      "description": "Grade/Rate",
      "labels": null,
      "keys": ["Rate"]
    },
    "3": {
      "number": 3,
      "type": "textbox",
      "colWidth": 2,
      "description": "Desig",
      "labels": null,
      "keys": ["Desig"]
    },
    "4": {
      "number": 4,
      "type": "textbox",
      "colWidth": 2,
      "description": "SSN",
      "labels": null,
      "keys": ["SSN"]
    },
    "5": {
      "number": 5,
      "type": "radio",
      "colWidth": 3,
      "description": null,
      "labels": ["ACT", "FTS", "INACT", "AT/ADSW/256"],
      "keys": ["Active", "TAR", "Inactive", "ATADWS"]
    },
    "6": {
      "number": 6,
      "type": "textbox",
      "colWidth": 2,
      "description": "UIC",
      "labels": null,
      "keys": ["UIC"]
    },
    "7": {
      "number": 7,
      "type": "textbox",
      "colWidth": 3,
      "description": "Ship/Station",
      "labels": null,
      "keys": ["ShipStation"]
    },
    "8": {
      "number": 8,
      "type": "selection",
      "colWidth": 2,
      "description": "Promotion Status",
      "labels": ["REGULAR", "FROCKED", "SELECTED", "SPOT"],
      "keys": ["PromotionStatus"]
    },
    "9": {
      "number": 9,
      "type": "textbox",
      "colWidth": 2,
      "description": "Date Reported",
      "labels": null,
      "keys": ["DateReported"]
    }, 
    "10": {
      "number": 10,
      "type": "checkbox",
      "colWidth": 2,
      "description": "Occasion for Report",
      "labels": ["Periodic"],
      "keys": ["Periodic"]
    }, 
    "11": {
      "number": 11,
      "type": "checkbox",
      "colWidth": 2,
      "description": "larr",
      "labels": ["Detachment of Individual"],
      "keys": ["DetInd"]
    },
    "12": {
      "number": 12,
      "type": "checkbox",
      "colWidth": 2,
      "description": "larr",
      "labels": ["Detachment of Reporting Senior"],
      "keys": ["?"]
    }, 
    "13": {
      "number": 13,
      "type": "checkbox",
      "colWidth": 2,
      "description": "larr",
      "labels": ["Special"],
      "keys": ["Special"]
    }, 
    "14": {
      "number": 14,
      "type": "textbox",
      "colWidth": 2,
      "description": "Period of Report",
      "labels": "From",
      "placeholder": "YYYY-MM-DD",
      "keys": ["FromDate"]
    }, 
    "15": {
      "number": 15,
      "type": "textbox",
      "colWidth": 2,
      "description": "larr",
      "labels": "To",
      "placeholder": "YYYY-MM-DD",
      "keys": ["ToDate"]
    }, 
    "16": {
      "number": 16,
      "type": "checkbox",
      "colWidth": 2,
      "description": null,
      "labels": ["Not Observed Report"],
      "keys": ["NOB"]
    }, 
    "17": {
      "number": 17,
      "type": "checkbox",
      "colWidth": 2,
      "description": "Type of Report",
      "labels": ["Regular"],
      "keys": ["Regular"]
    }, 
    "18": {
      "number": 18,
      "type": "checkbox",
      "colWidth": 2,
      "description": "larr",
      "labels": ["Concurrent"],
      "keys": ["Concurrent"]
    }, 
    "19": {
      "number": 19,
      "type": "checkbox",
      "colWidth": 2,
      "description": "larr",
      "labels": ["Ops Cdr"],
      "keys": ["OpsCdr"]
    }, 
    "20": {
      "number": 20,
      "type": "textbox",
      "colWidth": 2,
      "description": "Physical Readiness",
      "labels": null,
      "keys": ["PhysicalReadiness"]
    }, 
    "21": {
      "number": 21,
      "type": "selection",
      "colWidth": 2,
      "description": "Billet Subcategory (if any)",
      "labels": ["N/A", "BASIC", "APPROVED", "INDIV AUG"],
      "keys": ["BilletSubcat"]
    }, 
    "22": {
      "number": 22,
      "type": "textbox",
      "colWidth": 2,
      "description": "Reporting Senior (Last, FI MI)",
      "labels": null,
      "keys": ["ReportingSenior"]
    }, 
    "23": {
      "number": 23,
      "type": "textbox",
      "colWidth": 2,
      "description": "Grade",
      "labels": null,
      "keys": ["RSGrade"]
    }, 
    "24": {
      "number": 24,
      "type": "textbox",
      "colWidth": 2,
      "description": "Desig",
      "labels": null,
      "keys": ["RSDesig"]
    }, 
    "25": {
      "number": 25,
      "type": "textbox",
      "colWidth": 2,
      "description": "Title",
      "labels": null,
      "keys": ["RSTitle"]
    }, 
    "26": {
      "number": 26,
      "type": "textbox",
      "colWidth": 2,
      "description": "UIC",
      "labels": null,
      "keys": ["RSUIC"]
    }, 
    "27": {
      "number": 27,
      "type": "textbox",
      "colWidth": 2,
      "description": "SSN",
      "labels": null,
      "keys": ["RSSSN"]
    }, 
    "28": {
      "number": 28,
      "type": "textarea",
      "colWidth": 12,
      "description": "Command employment and command achievements.",
      "labels": null,
      "keys": ["Achievements"]
    }, 
    "29": {
      "number": 29,
      "type": "textbox",
      "colWidth": 12,
      "description": "Primary/Collateral/Watchstanding duties. (Enter primary duty abbreviation in box.)",
      "labels": null,
      "keys": ["PrimaryDuty", "Duties"]
    }, 
    "30": {
      "number": 30,
      "type": "textbox",
      "colWidth": 2,
      "description": "For Mid-term Counseling Use - Date Counseled",
      "labels": null,
      "keys": ["DateCounseled"]
    }, 
    "31": {
      "number": 31,
      "type": "textbox",
      "colWidth": 2,
      "description": "Counseler",
      "labels": null,
      "keys": ["Counselor"]
    }, 
    "32": {
      "number": 32,
      "type": "none",
      "colWidth": 2,
      "description": "Signature of Individual Counseled",
      "labels": null,
      "keys": null
    }, 
    "33": {
      "number": 33,
      "type": "radio",
      "colWidth": 12,
      "description": "PROFESSIONAL EXPERTISE: Professional Knowledge proficiency, and qualifications.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["PROF"]
    }, 
    "34": {
      "number": 34,
      "type": "radio",
      "colWidth": 12,
      "description": "COMMAND OR ORGANIZATIONAL CLIMATE/EQUAL OPPORTUNITY:",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["EO"]
    }, 
    "35": {
      "number": 35,
      "type": "radio",
      "colWidth": 12,
      "description": "MILITARY BEARING CHARACTER: Appearance, conduct, physical fitness, adherence to Navy Core Values.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["MIL"]
    }, 
    "36": {
      "number": 36,
      "type": "radio",
      "colWidth": 12,
      "description": "TEAMWORK: Contributions towards team building and team results.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["TEAM"]
    }, 
    "37": {
      "number": 37,
      "type": "radio",
      "colWidth": 12,
      "description": "MISSION ACCOMPLISHMENT AND INITIATIVE: Taking initiative, planning/prioritizing, achieving mission.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["MIS"]
    }, 
    "38": {
      "number": 38,
      "type": "radio",
      "colWidth": 12,
      "description": "LEADERSHIP: Organizing, motivating and developing others to accomplish goals.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["LEAD"]
    }, 
    "39": {
      "number": 39,
      "type": "radio",
      "colWidth": 12,
      "description": "TACTICAL PERFORMANCE: (Warfare qualified officers only) Basic and tactical employment of weapons systems.",
      "labels": ["NOB","1", "2", "3", "4", "5"],
      "keys": ["TAC"]
    }, 
    "40": {
      "number": 40,
      "type": "textbox",
      "colWidth": 12,
      "description": "I recommend screening this individual for next career milestone(s) as follows: (maximum of two) Recommendations may be for competitive schools or duty assignments such as: LCPO, DEPT CPO, SEA, CMC, CWO, LDO, Dept Head, XO, OIC, CO, Major Command, War College, PG School.",
      "labels": ["A", "B"],
      "keys": ["RecommendA", "RecommendB"]
    }, 
    "41": {
      "number": 41,
      "type": "textarea",
      "colWidth": 12,
      "description": "COMMENTS ON PERFORMANCE. * All 1.0 marks , three 2.0 marks, and 2.0 marks in Block 34 must be specifically substantiated in comments. Comments must be verifiable. Font must be 10 or 12 pitch (10 to 12 point) only. Use upper and lower case",
      "labels": null,
      "keys": ["Comments"]
    }, 
    "42": {
      "number": 42,
      "type": "radio",
      "colWidth": 4,
      "description": "Promotion Recommendation - INDIVIDUAL",
      "labels": ["NOB", "Significant Problems", "Progressing", "Promotable", "Must Promote", "Early Promote"],
      "keys": ["PromotionRecom"]
    }, 
    "43": {
      "number": 43,
      "type": "radio",
      "colWidth": 4,
      "description": "Promotion Recommendation - SUMMARY",
      "labels": ["NOB", "Significant Problems", "Progressing", "Promotable", "Must Promote", "Early Promote"],
      "disabled": true,
      "keys": ["SummarySP", "SummaryProg", "SummaryProm", "SummaryMP", "SummaryEP"]
    }, 
    "44": {
      "number": 44,
      "type": "textarea",
      "colWidth": 4,
      "description": "Reporting Senior Address",
      "labels": null,
      "keys": ["RSAddress"]
    }, 
    "45": {
      "number": 45,
      "type": "none",
      "colWidth": 6,
      "description": "Signature of Reporting Senior",
      "labels": null,
      "keys": null
    }, 
    "46": {
      "number": 46,
      "type": "radio",
      "colWidth": 6,
      "description": "Signature of individual evaluated.  I have seen this report, been apprised of my performance, and understand my right to make a statement.",
      "labels": ["I intend to submit a statement.", "I do not intend to submit a statement."],
      "keys": ["StatementYes", "StatementNo"]
    }, 
    "47": {
      "number": 47,
      "type": "textbox",
      "colWidth": 12,
      "description": "Typed name, grade, command, UIC, and signature of Regular Reporting Senior on Concurrent Report",
      "labels": null,
      "keys": ["RSInfo"]
    }
  }
}
`;