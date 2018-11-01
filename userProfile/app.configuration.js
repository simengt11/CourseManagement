window.g_Config = {
    appName: "Ams.webapp",
    templates: {
        home: "/SiteAssets/templates/home.html",
        user: "/SiteAssets/templates/user/user.list.html"
    },
    baseSharedUrl: "/SiteAssets/shared",
    Web: {
        Lists: {
            Workflow: {
                name: "Workflow", title: "Workflow",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    Active: { fieldName: "Active", fieldType: "Boolean" },
                    ApplyTo: { fieldName: "ApplyTo", fieldType: "Text" }
                }
            },
            ConfigureProcessStep: {
                name: "ConfigureProcessStep", title: "ConfigureProcessStep",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    WorkflowInstanceName: { fieldName: "WorkflowInstanceName", fieldType: "Lookup" },
                    WorklowStarted: { fieldName: "WorklowStarted", fieldType: "Boolean" },
                    NextStep: { fieldName: "NextStep", fieldType: "Lookup" },
                    StatusStepCompleted: { fieldName: "StatusStepCompleted", fieldType: "Text" },
                    ActiveTerminate: { fieldName: "ActiveTerminate", fieldType: "Boolean" },
                    ActiveReject: { fieldName: "ActiveReject", fieldType: "Boolean" },
                    ActiveReAssign: { fieldName: "ActiveReAssign", fieldType: "Boolean" },
                    //ActiveSave: { fieldName: "ActiveSave", fieldType: "Boolean" },
                    AssignedTo: { fieldName: "AssignedTo", fieldType: "User" },
                    //EmailTemplateCode: { fieldName: "EmailTemplateCode", fieldType: "Text" },
                    EmailTmpCodeApproval: { fieldName: "EmailTmpCodeApproval", fieldType: "Text" },
                    EmailTmpCodeReject: { fieldName: "EmailTmpCodeReject", fieldType: "Text" },
                    EmailTmpCodeTerminate: { fieldName: "EmailTmpCodeTerminate", fieldType: "Text" },
                    EmailTmpCodeReAssign: { fieldName: "EmailTmpCodeReAssign", fieldType: "Text" },
                    AssignedToByExpressionEvaluator: { fieldName: "AssignedToByExpressionEvaluator", fieldType: "Text" },
                    PeriodDayNumber: { fieldName: "PeriodDayNumber", fieldType: "Number" },
                }
            },
            WorkflowProcessing: {
                name: "WorkflowProcessing", title: "WorkflowProcessing",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },//step name
                    WorkflowInstanceName: { fieldName: "WorkflowInstanceName", fieldType: "Text" },
                    ApplyTo: { fieldName: "ApplyTo", fieldType: "Text" },
                    ItemId: { fieldName: "ItemId", fieldType: "Text" },
                    WorklowStarted: { fieldName: "WorklowStarted", fieldType: "Boolean" },
                    NextStep: { fieldName: "NextStep", fieldType: "Text" },
                    StepIndex: { fieldName: "StepIndex", fieldType: "Number" },
                    StatusStepCompleted: { fieldName: "StatusStepCompleted", fieldType: "Text" },
                    ActiveTerminate: { fieldName: "ActiveTerminate", fieldType: "Boolean" },
                    ActiveReject: { fieldName: "ActiveReject", fieldType: "Boolean" },
                    //ActiveSave: { fieldName: "ActiveSave", fieldType: "Boolean" },
                    ActiveReAssign: { fieldName: "ActiveReAssign", fieldType: "Boolean" },
                    AssignedTo: { fieldName: "AssignedTo", fieldType: "User" },
                    //EmailTemplateCode: { fieldName: "EmailTemplateCode", fieldType: "Text" },
                    EmailTmpCodeApproval: { fieldName: "EmailTmpCodeApproval", fieldType: "Text" },
                    EmailTmpCodeReject: { fieldName: "EmailTmpCodeReject", fieldType: "Text" },
                    EmailTmpCodeTerminate: { fieldName: "EmailTmpCodeTerminate", fieldType: "Text" },
                    EmailTmpCodeReAssign: { fieldName: "EmailTmpCodeReAssign", fieldType: "Text" },
                    //ExtendCcUsers: { fieldName: "ExtendCcUsers", fieldType: "MultiUser" },
                    PeriodDayNumber: { fieldName: "PeriodDayNumber", fieldType: "Number" },
                }
            },
            WorkflowHistory: {
                name: "WorkflowHistory", title: "WorkflowHistory",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },//action
                    Step: { fieldName: "Step", fieldType: "Text" },
                    ItemId: { fieldName: "ItemId", fieldType: "Text" },
                    Author: { fieldName: "Author", fieldType: "User" },
                    Creator: { fieldName: "Creator", fieldType: "User" },
                    ListName: { fieldName: "ListName", fieldType: "Text" },
                    Comment: { fieldName: "Comment", fieldType: "Text" },
                    SubmittedDate: { fieldName: "SubmittedDate", fieldType: "DateTime" },
                }
            },

            User: {
                name: "", title: "{8668709e-7547-416d-8a8f-d0ee4b41a866}", guid: "{8668709e-7547-416d-8a8f-d0ee4b41a866}",
                name: "", title: "{43fd626e-852f-43c4-9bf1-0391a944f060}", guid: "{43fd626e-852f-43c4-9bf1-0391a944f060}",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    EMail: { fieldName: "EMail", fieldType: "Text" },
                    Name: { fieldName: "Name", fieldType: "Text" },
                    Department: { fieldName: "Department", fieldName: "Text" },
                }
            },
            EmailTemplate: {
                name: "EmailTemplate", title: "EmailTemplate",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    Subject: { fieldName: "Subject", fieldType: "Text" },
                    Body: { fieldName: "Body", fieldType: "Text" },
                    ExtendCcUsers: { fieldName: "ExtendCcUsers", fieldType: "MultiUser" },
                }
            },
            EmailHistory: {
                name: "EmailHistory", title: "EmailHistory",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },//subject
                    //Subject: { fieldName: "Subject", fieldType: "Text" },
                    Body: { fieldName: "Body", fieldType: "Text" },
                    ToUsers: { fieldName: "ToUsers", fieldType: "MultiUser" },
                    CcUsers: { fieldName: "CcUsers", fieldType: "MultiUser" },
                }
            },
            Tasks: {
                name: "Tasks", title: "Tasks",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    ItemId: { fieldName: "ItemId", fieldType: "Text" },
                    ItemNo: { fieldName: "ItemNo", fieldType: "Text" },
                    AssignedTo: { fieldName: "AssignedTo", fieldType: "User" },
                    ListName: { fieldName: "ListName", fieldType: "Text" },
                    Checkmark: { fieldName: "Checkmark", fieldType: "CalBoolean" },
                    StartDate: { fieldName: "StartDate", fieldType: "DateTime" },
                    CompletedDate: { fieldName: "CompletedDate", fieldType: "DateTime" },
                    CompletedBy: { fieldName: "CompletedBy", fieldType: "DateTime" },
                    Body: { fieldName: "Body", fieldType: "Text" },
                    DueDate: { fieldName: "DueDate", fieldType: "DueDate" },
                    Action: { fieldName: "Action", fieldType: "HyperLink" },
                    Status: { fieldName: "Status", fieldType: "Text" },
                    Author: { fieldName: "Author", fieldType: "User" },
                    ItemMetadata: { fieldName: "ItemMetadata", fieldType: "Text" },
                }
            },
            Assets: {
                name: "Assets", title: "Assets",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    InActive: { fieldName: "InActive", fieldType: "Boolean" },
                    Location: { fieldName: "Location", fieldType: "Text" },
                    ItemStatus: { fieldName: "ItemStatus", fieldType: "Text" },
                    ItemName: { fieldName: "ItemName", fieldType: "Text" },
                    ComputerName: { fieldName: "ComputerName", fieldType: "Text" },
                    RegisterDate: { fieldName: "RegisterDate", fieldType: "DateTime" },
                    SerialNumber: { fieldName: "SerialNumber", fieldType: "Text" },
                    WarantyDate: { fieldName: "WarantyDate", fieldType: "DateTime" },
                    EmployeeCode: { fieldName: "EmployeeCode", fieldType: "Text" },
                    VendorCode: { fieldName: "VendorCode", fieldType: "Text" },
                    POCode: { fieldName: "POCode", fieldType: "Text" },
                    PRCode: { fieldName: "PRCode", fieldType: "Text" },
                    AssetType: { fieldName: "AssetType", fieldType: "Lookup" },
                    Classification: { fieldName: "Classification", fieldType: "Lookup" },
                    Manufacturer: { fieldName: "Manufacturer", fieldType: "Lookup" },
                    AvailableQuantity: { fieldName: "AvailableQuantity", fieldType: "Number" },
                    PurchasedQuantity: { fieldName: "PurchasedQuantity", fieldType: "Number" }
                }
            },
            AssetRequest: {
                name: "AssetRequest", title: "AssetRequest",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    ItemStatus: { fieldName: "ItemStatus", fieldType: "Text" },
                    Step: { fieldName: "Step", fieldType: "Text" },
                    PendingAt: { fieldName: "PendingAt", fieldType: "User" },
                    Author: { fieldName: "Author", fieldType: "User" },
                    Editor: { fieldName: "Editor", fieldType: "User" },
                    Creator: { fieldName: "Creator", fieldType: "User" },
                    Receiver: { fieldName: "Receiver", fieldType: "User" },
                    RequestDate: { fieldName: "RequestDate", fieldType: "DateTime" },
                    EmployeeCode: { fieldName: "EmployeeCode", fieldType: "Text" },
                    WorkflowName: { fieldName: "WorkflowName", fieldType: "Text" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    JobTitle: { fieldName: "JobTitle", fieldType: "Text" },
                    Location: { fieldName: "Location", fieldType: "Text" },
                    Note: { fieldName: "Note", fieldType: "Text" }
                },
                linkList: "/sitepages/ar/search.aspx",
                linkEdit: "/sitepages/ar/form.aspx"
            },
            AssetPreparation: {
                name: "AssetPreparation", title: "AssetPreparation",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    ItemStatus: { fieldName: "ItemStatus", fieldType: "Text" },
                    Step: { fieldName: "Step", fieldType: "Text" },
                    PendingAt: { fieldName: "PendingAt", fieldType: "User" },
                    Creator: { fieldName: "Creator", fieldType: "User" },
                    Receiver: { fieldName: "Receiver", fieldType: "User" },
                    RequestDate: { fieldName: "RequestDate", fieldType: "DateTime" },
                    RelatedARCode: { fieldName: "RelatedARCode", fieldType: "Text" },
                    AssetRequestId: { fieldName: "AssetRequestId", fieldType: "Text" },
                    EmployeeCode: { fieldName: "EmployeeCode", fieldType: "Text" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    JobTitle: { fieldName: "JobTitle", fieldType: "Text" },
                    Location: { fieldName: "Location", fieldType: "Text" },
                    //Note: { fieldName: "Note", fieldType: "Text" }
                },
                linkList: "/sitepages/ap/search.aspx",
                linkEdit: "/sitepages/ap/form.aspx"
            },
            AssetPreparationDetail: {
                name: "AssetPreparationDetail", title: "AssetPreparationDetail",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Code: { fieldName: "Title", fieldType: "Text" },
                    AssetCode: { fieldName: "AssetCode", fieldType: "Lookup" },
                    AssetType: { fieldName: "AssetType", fieldType: "Lookup" },
                    Quantity: { fieldName: "Quantity", fieldType: "Number" },
                    RelatedId: { fieldName: "RelatedId", fieldType: "Number" }
                }
            },
            AssetDeployment: {
                name: "AssetDeployment", title: "AssetDeployment",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    ItemStatus: { fieldName: "ItemStatus", fieldType: "Text" },
                    Step: { fieldName: "Step", fieldType: "Text" },
                    AssignedTo: { fieldName: "AssignedTo", fieldType: "User" },
                    Creator: { fieldName: "Creator", fieldType: "User" },
                    Receiver: { fieldName: "Receiver", fieldType: "User" },
                    RequestDate: { fieldName: "RequestDate", fieldType: "DateTime" },
                    RelatedARCode: { fieldName: "RelatedARCode", fieldType: "Text" },
                    AssetRequestId: { fieldName: "AssetRequestId", fieldType: "Text" },
                    EmployeeCode: { fieldName: "EmployeeCode", fieldType: "Text" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    JobTitle: { fieldName: "JobTitle", fieldType: "Text" }
                    //Note: { fieldName: "Note", fieldType: "Text" }
                },
                linkList: "/sitepages/ad/search.aspx",
                linkEdit: "/sitepages/ad/form.aspx"
            },
            AssetDeploymentDetail: {
                name: "AssetDeploymentDetail", title: "AssetDeploymentDetail",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Code: { fieldName: "Title", fieldType: "Text" },
                    AssetCode: { fieldName: "AssetCode", fieldType: "Lookup" },
                    AssetType: { fieldName: "AssetType", fieldType: "Lookup" },
                    Quantity: { fieldName: "Quantity", fieldType: "Number" },
                    RelatedId: { fieldName: "RelatedId", fieldType: "Number" }
                }
            },
            AssetType: {
                name: "AssetType", title: "AssetType",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Code: { fieldName: "Title", fieldType: "Text" },
                    IsTool: { fieldName: "IsTool", fieldType: "Boolean" },
                    InActive: { fieldName: "InActive", fieldType: "Boolean" }
                }
            },
            Employee: {
                name: "Employee", title: "Employee",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Code: { fieldName: "Title", fieldType: "Text" },
                    FullName: { fieldName: "FullName", fieldType: "Text" },
                    AccountName: { fieldName: "AccountName", fieldType: "User" },
                    JobTitle: { fieldName: "JobTitle", fieldType: "Text" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    Location: { fieldName: "Location", fieldType: "Text" },
                    InActive: { fieldName: "InActive", fieldType: "Boolean" }
                }
            },
            AssetRequestDetail: {
                name: "AssetRequestDetail", title: "AssetRequestDetail",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Code: { fieldName: "Title", fieldType: "Text" },
                    RelatedARCode: { fieldName: "RelatedARCode", fieldType: "Text" },
                    AssetType: { fieldName: "AssetType", fieldType: "Lookup" },
                    Quantity: { fieldName: "Quantity", fieldType: "Number" },
                    RelatedId: { fieldName: "RelatedId", fieldType: "Number" }
                }
            },
            RunningNumberOfAR: {
                name: "RunningNumberOfAR", title: "RunningNumberOfAR",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Year: { fieldName: "Year", fieldType: "Number" },
                    Count: { fieldName: "Count", fieldType: "Number" }
                }
            },
            RunningNumberOfAP: {
                name: "RunningNumberOfAP", title: "RunningNumberOfAP",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Year: { fieldName: "Year", fieldType: "Number" },
                    Count: { fieldName: "Count", fieldType: "Number" }
                }
            },
            RunningNumberOfAD: {
                name: "RunningNumberOfAD", title: "RunningNumberOfAD",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Year: { fieldName: "Year", fieldType: "Number" },
                    Count: { fieldName: "Count", fieldType: "Number" }
                }
            },
            AssetPlanning: {
                name: "AssetPlanning", title: "AssetPlanning",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Counter" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    PendingAt: { fieldName: "PendingAt", fieldType: "User" },
                    Author: { fieldName: "Author", fieldType: "User" },
                    Editor: { fieldName: "Editor", fieldType: "User" },
                    Creator: { fieldName: "Creator", fieldType: "User" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    Status: { fieldName: "Status", fieldType: "Text" } 
                }
            },
            UserProfile: {
                name: "UserProfile", title: "UserProfile",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Text" },
                    AccountName: { fieldName: "AccountName", fieldType: "Text" },
                    Department: { fieldName: "Department", fieldType: "Text" },
                    Division: { fieldName: "Division", fieldType: "Text" },
                    Office: { fieldName: "Office", fieldType: "Text" },
                    JobTitle: { fieldName: "JobTitle", fieldType: "Text" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    User: { fieldName: "User", fieldType: "User" },
                    LineManager: { fieldName: "LineManager", fieldType: "User" }
                }
            },
            Location: {
                name: "Location", title: "Location",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Text" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    Code: { fieldName: "Code", fieldType: "Text" }
                }
            },
            ITHelpDesk: {
                name: "ITHelpDesk", title: "ITHelpDesk",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Text" },
                    Location: { fieldName: "Location", fieldType: "Lookup" },
                    User: { fieldName: "User", fieldType: "User" }
                }
            },
            Division: {
                name: "Division", title: "Division",
                fields: {
                    ID: { fieldName: "ID", fieldType: "Text" },
                    Title: { fieldName: "Title", fieldType: "Text" },
                    Code: { fieldName: "Code", fieldType: "Text" },
                    Active: { fieldName: "Active", fieldType: "Boolean" },
                }
            }
        },
    },
    regionSetting: {
        formatDateMMDDYY: "mm/dd/yy",
        formatDateDDMMYY: "dd/mm/yy",
        formatDateDDMMYYYY: "dd/MM/yyyy",
        formatDateMMDDYYYY: "MM/dd/yyyy",
        formatDateMMDDYYYYMoment: "MM/DD/YYYY",
        formatDateDDMMYYYYMoment: "DD/MM/YYYY",
        formatDateYYYYMMDDMoment: "YYYY-MM-DD",
        timeZone: null,
    },
    enums: {
        statusEnumSystem: {
            rejected: "Rejected", draft: "Draft", completed: "Completed", terminated: "Terminated", inProgress: "InProgress"
        },
        statusInProcessing:
            [
                "Rejected", "InProgress"
            ],
        sitePagesEnum: {
            assetRequestForm: "/sitepages/ar/form.aspx",
            assetPreparationForm: "/sitepages/ap/form.aspx",
            assetDeploymentForm: "/sitepages/ad/form.aspx",
            startNewWorkflow: "/sitepages/workflow/startworkflow.aspx",
            actionWorkflow: "/sitepages/workflow/actionworkflow.aspx"
        },

        actionsEnum: {
            actionEdit: "Edit", actionView: "View", actionDelete: "Delete", actionNew: "New"
        },

        workflowAction: {
            submitted: "Submitted", reSubmitted: "Re-submitted", approved: "Approved", rejected: "Rejected", terminated: "Terminated",
            reAssigned: "Re-assigned"
        },

        taskStatusEnum: {
            completed: "Completed", inProgress: "In Progress", notStarted: "Not Started"
        }
    },
    fileTypeExcel: ["xlsx", "xls"]
}
window.getUrl = function (template) {
    var url = template;
    if (typeof (_spPageContextInfo) !== "undefined" && _spPageContextInfo.webAbsoluteUrl) {
        url = _spPageContextInfo.webAbsoluteUrl + template;
    }
    return url;
}