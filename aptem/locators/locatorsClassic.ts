const locatorsClassic = {
  authPage: {
    inputLogin: '//input[@name="userNameOrEmail"]',
    inputPassword: '//input[@name="password"]',
    buttonSignIn: '//input[@value="Sign in"]',
  },
  learnersPage: {
    emailSearch: '//input[@id="Email" and @name="Email"]',
    searchButton: '//input[@value="Search"]',
    foundLearnerLinkToProfile: '//div[@id="UsersGrid"]/table//',
    // foundLearnerLinkToProfile: '//div[@id="UsersGrid"]/table//td[5]',
  },
  learnerProfile: {
    stopButton: '//a[text()="stop"]',
    applyButton: '//span/a[text()="apply"]',
    // programTypeSelect: 'span[role="option"]',
    // programSelect: 'span[role="presentation"] >> text=select',
    applyProgramForm: {
      programTypeListOpen: '(//div[@class="program-details-container"]//span)[1]',
      programTypeList: '(//ul[@class="k-list k-reset"])[1]',
      programTypeOnboarding: '(//li[text()="Onboarding"])[1]',
      programTypeDelivery: '(//li[text()="Delivery"])[1]',
      // programSearchInput: '((//input[@class="k-input"])[1]',
      programSearchInput: 'input[role="textbox"]',

      programList: '(//ul[@class="k-list k-reset"])[2]',
      programListItem: '((//li[@class="k-item"])[2]',
      programListItemOpen: '(//span[contains(@class,"k-dropdown-wrap k-state-default")])[3]',
      programStatusOpen: '(//input[@name="avaliablePrograms"])[2]',
      programStatusList: '//div[@id="apply-program-container"]//tr[3]/td/span',
      programStatusOnboarding: '(//ul[@class="k-list k-reset"])[3]/li[text()="Onboarding"]',

      saveButton: '//input[@value="Save"]',
      cancelButton: '//input[@data-bind="click: enrollPrograms"]/following-sibling::input[1]',
    },
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
    yesButton: '//input[@value="Yes"]',
    programNameInput: '//input[@name="name"]',
    programDescriptionTextArea: '//textarea[@name="Program.Description"]',
    createButton: '//li[@role="menuitem"]/span[text()="Create"]',
    selectDelivery: '//li[@role="menuitem"]/span[text()="Delivery"]',
    selectOnboarding: '//li[@role="menuitem"]/span[text()="Onboarding"]',
    confirmYes: '//td/input[@type="button"and@value="Yes"]',
  },
};

export { locatorsClassic };
