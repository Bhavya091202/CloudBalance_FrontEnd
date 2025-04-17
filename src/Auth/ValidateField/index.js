export const validateField = (name, value) => {
    switch (name) {
      case "arn":
        return /^arn:aws:iam::\d{12}:role\/[A-Za-z0-9-_]+$/.test(value)
          ? ""
          : "Invalid ARN format";
      case "accountId":
        return /^\d{12}$/.test(value)
          ? ""
          : "Account ID must be 12 digits";
      case "name":
        return value.trim() !== "" ? "" : "Name is required";
      default:
        return "";
    }
  };
  