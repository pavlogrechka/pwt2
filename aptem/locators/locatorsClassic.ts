const locatorsClassic = {
  authPage: {
    inputLogin: '//input[@name="userNameOrEmail"]',
    inputPassword: '//input[@name="password"]',
    buttonSignIn: '//input[@value="Sign in"]',
  },
  learnersPage: {
    emailSearch: '//input[@id="Email" and @name="Email"]',
    searchButton: '//input[@value="Search"]',
  },
  learnerProfile: {
    stopButton: '//a[text()="stop"]',
    applyButton: '//span/a[text()="apply"]',
    programTypeSelect: 'span[role="option"]',
    programTypeOnboarding: 'li[role="option"]:has-text("Onboarding")',
    programSelect: 'span[role="presentation"] >> text=select',
  },
  userGroupProfile: {
    uploadUsers: '//span[contains(@class, "upload")]/a[text()="upload users"]',
    uploadCSVdialog: {
      uploadButton: '//input[@value="Upload"]',
      fileUpload: '//input[@type="file"]',
    },
  },

  clientProgram: {
    searchInputName: '//td/input[@id="Name"]',
    searchButton: '//td/input[@value="Search"]',
    resetButton: '//td/input[@value="Reset"]',
    createButton: '//li[@role="menuitem"]/span[text()="Create"]',
    selectDelivery: '//li[@role="menuitem"]/span[text()="Delivery"]',
    selectOnboarding: '//li[@role="menuitem"]/span[text()="Onboarding"]',
    confirmYes: '//td/input[@type="button"and@value="Yes"]',
  },
};

export { locatorsClassic };
