export const EMAIL_TEMPLATE_OPTIONS = [
  {
    label: "Request Approval Success",
    value: "requestApprovalSuccess",
    desc: "This template is used when a user's approval request is approved by a supervisor.",
    email_variables: [
      "name",
      "senderUserName",
      "requestId",
      "email",
      "supervisorId",
    ],
  },
  {
    label: "Reject Approval Request",
    value: "Rejected",
    desc: "This template is used when a user's approval request is rejected by a supervisor.",
    email_variables: [
      "name",
      "senderUserName",
      "requestId",
      "email",
      "supervisorId",
    ],
  },
  {
    label: "Request For Approval",
    value: "requestForApproval",
    desc: "This template is used when a user submits a new approval request for changes.",
    email_variables: [
      "name",
      "senderUserName",
      "requestId",
      "email",
      "supervisorId",
    ],
  },
  {
    label: "Contact Enquiry",
    value: "contactEnquiry",
    desc: "This template is used when a user submits a contact enquiry.",
    email_variables: ["name", "email"],
  },
  {
    label: "Property Enquiry",
    value: "propertyEnquiry",
    desc: "This template is used when a user submits a property enquiry.",
    email_variables: ["name", "email", "propertyName"],
  },
];
