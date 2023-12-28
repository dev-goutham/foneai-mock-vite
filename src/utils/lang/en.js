const overview = {
  botName: 'Bot Name',
  botDescription: 'Bot Description',
  botLanguage: 'Bot Language',
  botTimezone: 'Bot Timezone',
  botAccent: 'Bot Accent',
  botVoice: 'Bot Voice',
  botUpdateSuccess: 'Bot updated successfully',
  english: 'English',
  spanish: 'Spanish',
  american: 'American',
  british: 'British',
  australian: 'Australian',
  latam: 'Latin American',
  castilian: 'Castilian',
  male: 'Male',
  female: 'Female',
};

const headerData = {
  poweredBy: 'powered by',
  bots: 'Bots',
  overview: 'Overview',
  intents: 'Intents',
  entities: 'Entities',
  flow: 'Flow',
  logout: 'Logout',
  train: 'Train',
  users: 'Users',
  campaigns: 'Campaigns',
  appearance: 'Appearance',
  webhooks: 'Webhooks',
  rules: 'Rules',
};
const langOptions = {
  language: 'Language',
  chooseLanguage: 'Choose Language',
  english: 'English',
  spanish: 'Spanish',
  ok: 'OK',
  langChangeSuccess: 'Language changed successfully',
};

const login = {
  loginToYourAccount: 'Log in to your account',
  toBuildCoolVoiceBots: 'to build cool voicebots ✌️',
  username: 'Username',
  password: 'Password',
  login: 'Login',
};

const fabButtons = {
  update: 'Update',
  next: 'Next',
  trainBot: 'Train Bot',
  publishBot: 'Publish Bot',
  training: 'Training',
};

const bots = {
  createBot: 'Create Bot',
  creatingBot: 'Creating Bot ...',
};

const intents = {
  createIntent: 'Create Intent',
  updateIntent: 'Update Intent',
  intentName: 'Intent Name',
  intentDescription: 'Intent Description',
  intentType: 'Intent Type',
  flowing: 'Flowing',
  ebbing: 'Ebbing',
  ebbShift: 'Shift',
  ebbAction: 'Action',
  goToPrevNode: 'Go to Previous Node',
  stayOnNode: 'Stay on Node',
  doNothing: 'Do Nothing',
  trainingExamples: 'Training Examples',
  minTrainingExamplesWarning:
    'Please enter at least 2 training examples for each intent',
  botTrainingInProgress: 'Bot training is in progress',
  botTrainingAlertWarning1:
    'Do not close this window / refresh / navigate away until the training is complete.',
  botTrainingAlertWarning2: 'Training will take a few minutes to complete.',
  deleteIntent: 'Delete Intent',
  notAllowed: 'Not Allowed',
  notAllowedMessage:
    'Intent is being used elsewhere. Please remove the connections.',
  cancel: 'Cancel',
  minTrainingBotsWarning: 'You need atleast two intents to train the bot',
  nonFlowingIntent: 'Non-Flowing Intent',
  selectAction: 'Select Action',
  enterIntentName: 'Enter Intent Name',
};

const fallback = {
  configureFallback: 'Configure Fallback',
  fallbackMessageType: 'Fallback Message Type',
  fallbackLimit: 'Fallback Limit',
  defaultFallbackActionType: 'Default Fallback Action Type',
  addFallbackMessage: 'Add Fallback Message',
  addFallbackAction: 'Add Fallback Action',
};

const menuOptions = {
  playAudio: 'Play Audio',
  speakText: 'Speak Text',
  processSpeech: 'Process Speech',
  transferCall: 'Transfer Call',
  hangupCall: 'Hangup Call',
};

const uploadAudioOptions = {
  uploadAudio: 'Upload Audio',
  uploading: 'Uploading ...',
  uploadFileThatAre: 'Upload file that are',
  uniqueName: 'Unique Name(not already in the list)',
  lessThan2MB: 'Less than 2MB',
  samplingRate: '8 kHz Sampling Rate, 16 bit PCM, Mono',
  ethicalContent: 'Ethical Content',
};

const modalOptions = {
  addNode: 'Add Node',
  updateNode: 'Update Node',
  deleteNode: 'Delete Node',
  selectedAudioFiles: 'Selected Audio Files',
  minAudioFiles: 'Minimum of 1 audiofile is required',
  maxAudioFiles: 'Maximum of 5 audiofiles are allowed',
  selectedIntents: 'Selected Intents',
  minIntents: 'Minimum of 2 intents are required',
  atleastOneFlowingIntent: 'Atleast one flowing intent is required',
  flowingIntents: 'Flowing Intents',
  ebbingIntents: 'Ebbing Intents',
  transferContext: 'Context',
  transferExtension: 'Extension',
  characterCount: 'Character Count',
};

const rules = {
  createRule: 'Create Rule',
  rules: 'Rules',
  updateRule: 'Update Rule',
  deleteRule: 'Delete Rule',
  entityName: 'Entity Name',
  roleName: 'Role Name',
  groupName: 'Group Name',
};

const entities = {
  entities: 'Entities',
  roles: 'Roles',
  groups: 'Groups',
  builtIn: 'Built-in',
  createEntity: 'Create Entity',
  createRoles: 'Create Roles',
  createGroup: 'Create Group',
  save: 'Save',
};

const webhooks = {
  webhooks: 'Webhooks',
  createWebhook: 'Create Webhook',
  type: 'Type',
  timeout: 'Timeout',
  seconds: 'Seconds',
  description: 'Description',
  key: 'Key',
  value: 'Value',
  addTo: 'Add to',
  deleteWebhook: 'Delete Webhook',
  updateWebhook: 'Update Webhook',
  noAuthMessage:
    'No authentication required. This webhook will be called without any authentication.',
  success: 'Success',
  warning: 'Warning',
  info: 'Info',
  error: 'Error',
  normal: 'Normal',
  buttons: 'Buttons',
  subtext: 'Subtext',
  headers: 'Headers',
  enterWebhookName: 'Enter Webhook Name',
};

const trainNavigation = {
  settings: 'Settings',
};

const settings = {
  speechRecognitionSettings: 'Speech Recognition Settings',
  endpointing: 'Endpointing',
  milliseconds: 'ms',
  addWord: 'Add word',
  actionType: 'Action Type',
  interruptableRecognition: 'Interruptable Recognition',
  submit: 'Submit',
  recognitionDelay: 'Recognition Delay',
  boostWords: 'Boost words',
  addWords: 'Add words',
  updateFallbackMessage: 'Update Fallback',
};

const users = {
  createUser: 'Create User',
  username: 'Username',
  fullname: 'Full Name',
  organization: 'Organization',
  usage: 'Usage',
  usedUtilization: 'Used Utilization',
  allocatedUtilization: 'Allocated Utilization',
  allocatedNextCycle: 'Allocated Minutes for the next billing cycle',
  billingReviewsOn: `Billing Renews on`,
  actions: ' ',
  firstname: 'First Name',
  lastname: 'Last Name',
  organizationRole: 'Organization Role',
  email: 'Email',
  passoword: 'Password',
  confirmPassword: 'Confirm Password',
  minutesEachBillingCycle: 'Minutes each billing cycle',
  minutes: 'Minutes',
  billingRenewsOn: 'Billing Renews on',
  ofEveryMonth: 'of every month',
  defaultProfileLanguage: 'Default Profile Language',
  updateUser: 'Update User',
  expiryDate: 'Valid until',
  frequency: 'Billing Frequency',
  minutesAllocated: 'Minutes Allocated',
  billings: 'Billings',
  preferences: 'Preferences',
  billingType: 'Billing Type',
  nonRecurring: 'Non-Recurring',
  recurring: 'Recurring',
  back: 'Back',
};

const campaigns = {
  campaignId: 'Campaign Id',
  createCampaign: 'Create Campaign',
  delete: 'Delete',
  botToBeLinked: 'Bot to be linked',
  create: 'Create',
  deleteCampaign: 'Delete Campaign',
  campaignName: 'Campaign Name',
  copied: 'COPIED',
  copy: 'COPY',
};

const appearance = {
  logo: 'Logo',
  colors: 'Colors',
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Teritary',
  typeography: 'Typeography',
  heading: 'Heading',
  body: 'Body',
  links: 'Links',
  buttons: 'Buttons',
  clickHereToDropAFileOrUpload: 'Click here or drop a file to upload',
  rounded: 'Rounded',
  rectangle: 'Rectangle',
  favicon: 'Favicon',
  title: 'Title',
  ctxt: '(CTA buttons, Highlighted buttons, selected page numbers, highlighted texts)',
};

const deleteAlert = {
  deleteAlertMessage: "Are you sure? You can't undo this action afterwards.",
};

const profile = {
  profile: 'Profile',
  helpAndSupport: 'Help & Support',
  darkmode: 'Dark Mode',
  lightmode: 'Light Mode',
  logout: 'Logout',
  role: 'Role',
  verify: 'Verify Email',
  changePassword: 'Change Password',
  updateProfile: 'Update Profile',
  changeEmail: 'Change Email',
  changeLanguage: 'Change Language',
};

const forgotPassowrd = {
  forgotPassword: 'Forgot Password?',
  sendResetLink: 'Send Reset Link',
};

const resetPassword = {
  resetPassword: 'Reset Password',
  reset: 'Reset',
  newPassword: 'New Password',
  confirmNewPassword: 'Confirm New Password',
};

const setup = {
  apiKey: 'API-KEY',
  show: 'Show',
  copy: 'Copy',
  regenerate: 'Regenerate',
  copied: 'Copied',
  hide: 'Hide',
  setup: 'Setup',
  allowAccessFrom: 'Allow access from',
  regenerated: 'Regenerated',
  getStarted: 'Get started',
  downloadClient: 'Download client',
  anywhere: 'Anywhere',
  custom: 'Custom',
  architecture: 'Architecture',
  integration: 'Asterisk Integration',
  save: 'Save',
  docs: 'Docs',
};

const serverMessages = {
  USER_NOT_FOUND: 'User not found',
  INCORRECT_PASSWORD: 'Incorrect password',
  USER_DISABLED: 'User is disabled',
  USER_CREATION_FAILED: 'Failed to create user',
  USER_CREATION_SUCCESS: 'User created successfully',
  UNAUTHORIZED: 'Unauthorized',
  TARGET_USERNAME_EMPTY: 'Target username is empty',
  BILLING_NOT_FOUND: 'Billing not found',
  USER_DISABLED_SUCCESS: 'Successfully disabled user',
  USERNAME_EMPTY: 'Username is required',
  USERNAME_WRONG_FORMAT: 'Invalid username',
  USERNAME_WRONG_LENGTH: 'Username must be 5 to 20 characters long',
  USERNAME_EXISTS: 'Username already in use',
  EMAIL_EMPTY: 'Email is required',
  EMAIL_WRONG_FORMAT: 'Invalid email',
  ROLE_EMPTY: 'Role is required',
  ROLE_WRONG_FORMAT: 'Invalid role',
  FIRST_NAME_EMPTY: 'Firstname is required',
  LAST_NAME_EMPTY: 'Lastname is required',
  PASSWORD_EMPTY: 'Password is required',
  PASSWORD_WRONG_LENGTH: 'Password needs to be 8 to 20 characters long',
  PASSWORD_WRONG_FORMAT: 'Invalid password',
  PASSWORD_MISSMATCH: 'Passwords do not match',
  BOTNAME_EMPTY: 'Botname is required',
  BILLING_TYPE_EMPTY: 'Billing type is required',
  LANGUAGE_INVLID: 'Language must be one of English or Spanish',
  BILLING_TYPE_INVALID:
    'Billing type must be one of recurring or non-recurring',
  MINUTES_ALLOCATED_INVALID:
    'Minutes Allocated is required for recurring billing',
  MINUTES_EACH_CYCLE_INVALID:
    'Minutes Per Cycle is required for non-recurring billing',
};

const en = {
  ...overview,
  ...headerData,
  ...langOptions,
  ...fabButtons,
  ...bots,
  ...intents,
  ...fallback,
  ...menuOptions,
  ...uploadAudioOptions,
  ...modalOptions,
  ...rules,
  ...login,
  ...entities,
  ...webhooks,
  ...trainNavigation,
  ...settings,
  ...users,
  ...campaigns,
  ...appearance,
  ...deleteAlert,
  ...profile,
  ...forgotPassowrd,
  ...resetPassword,
  ...setup,
  ...serverMessages,
};

export default en;
