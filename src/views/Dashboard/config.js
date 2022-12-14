const config = {
  key: "internalId",
  type: "members",
  textOnEmpty: "No Data To Show...",
  pagination: {
    val: false,
  },
  search: {
    active: true,
    placeholder: "Search Members...",
    pagination: {
      val: false,
      count: 10,
    },
  },
  error: false,
  parentBackground: "#ffffff",
  childBackground: "#E0E0E0",
  collapse: {
    val: false,
    name: "employeeId",
  },
  filter: {
    val: false,
    name: "dataType",
    showEmpty: true,
    hideAll: true,
    heading: "Pending Tasks",
    default: "Admin",
  },
  extraRows: 4,
  height: "32em",
  columns: {
    internalId: {
      display: "Id",
      show: false,
      search: true,
      required: true,
      order: true,
    },
    tpaClaimId: {
      display: "Tpa Claim Id",
      show: false,
      search: true,
      required: true,
      order: true,
      // width :"1em"
    },
    status: {
      display: "Status",
      show: true,
      search: false,
      required: true,
      order: true,
      width: "7em",
      style: {
        color: {
          Paid: "#2DB98A",
          // Endorsement: "#2DB98A",
          Intimate: "#EA8C4C",
          "Data Uploaded": "#EA8C4C",
          "Data Verified": "#EA8C4C",
          "File Received": "#EA8C4C",
          "File Received Insurer": "#EA8C4C",
          "Insurer Processing": "#EA8C4C",
          Deficiency: "#EA8C4C",
          Approved: "#EA8C4C",
          Declined: "#B1413F",
          Cancelled: "#B1413F",
        },
        background: {
          Paid: "#FFFFFF",
          // Endorsement: "#2DB98A",
          Intimate: "#FFFFFF",
          "Data Uploaded": "#FFFFFF",
          "Data Verified": "#FFFFFF",
          "File Received": "#FFFFFF",
          "File Received Insurer": "#FFFFFF",
          "Insurer Processing": "#FFFFFF",
          Deficiency: "#FFFFFF",
          Approved: "#FFFFFF",
          Declined: "#FFFFFF",
          Cancelled: "#FFFFFF",
        },
      },
    },
    primaryMember: {
      display: "Primary Member",
      show: false,
      search: false,
      required: true,
      order: true,
    },
    patientName: {
      display: "Patient Name",
      show: true,
      search: false,
      required: false,
      order: true,
      sort: true,
      width: "12em",
    },
    relationship: {
      display: "Relationship",
      show: false,
      search: true,
      required: true,
      order: true,
    },
    employeeId: {
      display: "Employee Id",
      show: true,
      search: true,
      required: true,
      sort: true,
      order: true,
    },
    hospitalName: {
      display: "Hospital Name",
      show: false,
      search: true,
      required: true,
      order: true,
      width: "20em",
    },
    claimAmount: {
      display: "Claim Amount",
      show: true,
      search: true,
      required: true,
      order: true,
      sort: true,
      format: true,
    },
    deduction: {
      display: "Deduction",
      show: false,
      search: true,
      required: true,
      order: true,
      format: true,
      width: "8em",
    },
    amountPaid: {
      display: "Amount Paid",
      show: false,
      search: true,
      required: true,
      order: true,
      format: true,
      width: "8em",
    },
    claimRegisteredDate: {
      display: "Registered Date",
      show: true,
      search: false,
      required: true,
      order: true,
      sort: true,
      // convertDate: true,
      width: "8em",
    },
    paymentDate: {
      display: "Payment Date",
      show: false,
      search: false,
      required: true,
      order: true,
    },
    deductionReason: {
      display: "Deduction Reason",
      show: true,
      search: false,
      required: true,
      order: true,
      // format: true,
      width: "25em",
      hoverExpand: true,
    },
    settlementType: {
      display: "Settlement Type",
      show: true,
      search: false,
      required: true,
      sort: true,
      order: true,
      width: "7em",
    },
    diseaseCategory: {
      display: "Disease Category",
      show: true,
      search: false,
      required: true,
      order: true,
      width: "15em",
    },
  },
  buttons: [
    {
      name: "",
      link: undefined,
      function: "",
      conditionals: "true",
      icon: {
        type: "edit",
        color: "primary",
        hover: "#E0E0E0",
      },
    },

    {
      name: "",
      link: "",
      function: "",
      conditionals: "true",
      // JSON.parse(sessionStorage.getItem("user")).userType !== "ADMIN"
      //   ? "true"
      //   : "false",
      icon: {
        type: "view",
        color: "primary",
        hover: "#E0E0E0",
      },
    },
  ],
  childExclusionButtons: ["Delete Data"],
};

export default config;
