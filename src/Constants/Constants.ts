import { Step } from 'react-joyride';
import data from '~/../appSettings.json';

export const DEFAULT_PICTURE_PLACEHOLDER = '/build/img/picture_placeholder.svg';
export const DEFAULT_IMAGE_THUMBNAIL = '/build/img/no_image_placeholder.svg';
export const NO_IMAGE_PLACEHOLDER = '/build/img/picture_placeholder.svg';
export const ELEGANT_TEMPLATE_PREVIEW = '/build/img/elegant preview@2x.png';
export const FASHION_TEMPLATE_PREVIEW = '/build/img/fashion preview@2x.png';
export const PLAYFUL_TEMPLATE_PREVIEW = '/build/img/playful preview@2x.png';
export const SCIENTIFIC_TEMPLATE_PREVIEW =
  '/build/img/scientific preview@2x.png';
export const WEB_VIEWER_STYLE_PREVIEW =
  '/build/img/browser-frame-transparent.png';
export const WEB_VIEWER_NO_SOCIAL_STYLE_PREVIEW =
  '/build/img/browser-no-icons-frame-transparent.png';
export const LOGIN_PAGE_ART = '/build/img/18.svg';
export const RESET_PASSWORD_PAGE_ART = '/build/img/19.svg';
export const REGISTER_PAGE_ART = '/build/img/16.svg';
export const REGISTER_FREELANCES_ART = '/build/img/palette-solid.svg';
export const REGISTER_CONTENT_OWNERS_ART = '/build/img/suse-brands.svg';
export const DEFAULT_WV_LOGO = `${data.stg.digitalPcServiceUrl}}/Content/Reptile-logo-teal.svg`;
export const DEFAULT_ADD_ICON = '/build/img/plus-48.png';
export const DEFAULT_R_LOGO = '/build/img/R_logo.png';
export const DEFAULT_REPTILE_LOGO = '/build/img/logo.png';
export const DEFAULT_WHITE_REPTILE_LOGO = '/build/img/logo-white.svg';
export const APP_SPLASH_SCREEN = '/build/img/splash_screen.png';
export const APP_MAIN_AREA = '/build/img/main_area.png';
export const APP_SETTINGS_AREA = '/build/img/settings_area.png';
export const APP_SEARCH_AREA = '/build/img/search_area.png';
export const APP_BOOKMARK_AREA = '/build/img/bookmark_area.png';
export const PHONE_BORDER = '/build/img/phone-border.png';

export const BUILTIN_FONTS: Reptile.Models.FontName[] = [
  { name: "'Andada Pro', serif", displayName: 'Andada Pro' },
  { name: "'Archivo', sans-serif", displayName: 'Archivo' },
  { name: "'EB Garamond', serif", displayName: 'EB Garamond' },
  { name: "'Epilogue', sans-serif", displayName: 'Epilogue' },
  { name: "'Inter', sans-serif", displayName: 'Inter' },
  { name: "'JetBrains Mono', monospace", displayName: 'JetBrains Mono' },
  { name: "'Lato', sans-serif", displayName: 'Lato' },
  { name: "'Lora', serif", displayName: 'Lora' },
  { name: "'Merriweather', serif", displayName: 'Merriweather' },
  { name: "'Montserrat', sans-serif", displayName: 'Montserrat' },
  { name: "'Nunito', sans-serif", displayName: 'Nunito' },
  { name: "'Open Sans', sans-serif", displayName: 'Open Sans' },
  { name: "'Oswald', sans-serif", displayName: 'Oswald' },
  { name: "'Playfair Display', serif", displayName: 'Playfair Display' },
  { name: "'Poppins', sans-serif", displayName: 'Poppins' },
  { name: "'Raleway', sans-serif", displayName: 'Raleway' },
  { name: "'Roboto', sans-serif", displayName: 'Roboto' },
  { name: "'Sora', sans-serif", displayName: 'Sora' },
  { name: "'Source Serif Pro', serif", displayName: 'Source Serif Pro' },
  { name: "'Work Sans', sans-serif", displayName: 'Work Sans' },
];

export const CURRENCY_SYMBOLS = {
  gbp: '£',
  eur: '€',
  usd: '$',
};

export const CURRENCY_SYMBOLS_REVERSE = {
  '£': 'gbp',
  '€': 'eur',
  $: 'usd',
};

export const PAYMENT_TYPES = {
  SINGLE: 'payment',
  RECURRING: 'subscription',
};

export const RECURRING_PAYMENT_TYPES = {
  MONTHLY: 'month',
  YEARLY: 'year',
};
export const CONTENT_TYPES = {
  HTML: 1,
  PDF: 2,
  MIXED: 3,
};

export const CONTENT_TYPE_NAMES = {
  HTML: 'HTML',
  PDF: 'PDF',
  MIXED: 'MIXED',
};

export const PARSING_PROCESS_TYPES = {
  PDF: 'Pdf',
  ZIP: 'Zip',
  PDF_ZIP_BOX_LINKS: 'PdfZipBoxLinks',
  MIXED: 'Mixed',
};

export const URL_VALID_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const ENTITY_TYPES = {
  AbsoluteRoot: 0,
  Publisher: 1,
  Publication: 2,
  Issue: 3,
  Section: 4,
  Article: 5,
  Page: 6,
  Image: 7,
  Template: 8,
  Prototype: 9,
  BuildSetting: 10,
};

export const EXPANDABLE_ENTITIES = [
  ENTITY_TYPES.Publication,
  ENTITY_TYPES.Publisher,
  ENTITY_TYPES.Section,
  ENTITY_TYPES.Issue,
];

export const LINKABLE_ENTITIES = [
  ENTITY_TYPES.Section,
  ENTITY_TYPES.Issue,
  ENTITY_TYPES.Article,
];

export const PROJECT_TYPE = {
  APP: 1,
  WEB: 2,
};

export const STREAM_TYPES = {
  Web: 1,
  App: 2,
};

export const LINK_TYPES = {
  Email: 1,
  Url: 2,
  PrintPage: 3,
};

export const CARD_STATUS = {
  NOT_PUBLISHED: 0,
  PUBLISHED: 1,
  SCHEDULED: 2,
};

export const THEME_FILTERS = {
  BOTH: 'both',
  TEXT: 'text',
  IMAGE: 'image',
};

export const POSITION = {
  BEFORE: 'BEFORE',
  AFTER: 'AFTER',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const IMAGE_POSITION = {
  BEFORE: 'BEFORE',
  AFTER: 'AFTER',
  ALTERNATE: 'ALTERNATE',
};

export const WIDGET_TYPES = {
  //===== WEB =====

  //GENERIC
  BLOCK: 'block',
  BUTTON_CONTENT: 'button-content',
  CONTACT_FORM: 'contact-form',
  CONTAINER_CONTENT: 'container-content',
  COVER: 'cover-content',
  FULL_WIDTH_IMAGE: 'full-width-image',
  HTML_CONTAINER: 'html',
  IMAGE: 'image',
  LABEL_CONTENT: 'label-content',
  LONG_TEXT: 'long-text',
  MULTI_COLUMN: 'multi-column',
  PAGE_NAVIGATION: 'page-navigation',
  RICH_TEXT: 'rich-text',
  SIMPLE_FOOTER: 'simple-footer',
  SIMPLE_HEADER: 'simple-header',
  TEXT: 'text',
  TEXT_AREA: 'text-area',
  TEXT_FIELD: 'text-field',

  //MIXED
  ARTICLE_COLLECTION: 'article-collection',
  COVER_COLLECTION: 'cover-collection',
  FULL_WIDTH_COVER_DETAILS: 'full-width-cover-details',
  FULL_WIDTH_COVER_TEXT_OVER: 'full-width-cover-text-over',
  SECTION_CONTENT_COLLECTION: 'section-content-collection',
  SINGLE_COLUMN_SECTION_TEXT: 'single-column-section-text',
  TOP_STORY: 'top-story',
  TWO_COLUMN_FULL_COVER_TEXT_OVER: 'two-column-full-cover-text-over',
  TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON:
    'two-column-full-cover-text-over-with-button',
  TWO_COLUMN_SECTION_CONTENT_COLLECTION:
    'two-column-section-content-collection',
  TWO_COLUMN_SECTION_TEXT: 'two-column-section-text',

  //HTML
  HTML_ARTICLE_COLLECTION: 'html-article-collection',
  HTML_ARTICLE_COVER: 'html-article-cover',
  HTML_COVER_COLLECTION: 'html-cover-collection',
  HTML_FULL_WIDTH_COVER_TEXT_OVER: 'html-full-width-cover-text-over',
  HTML_SECTION_CONTENT_COLLECTION: 'html-section-content-collection',
  HTML_SINGLE_COLUMN_SECTION_TEXT: 'html-single-column-section-text',
  HTML_TOP_STORY: 'html-top-story',
  HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER: 'html-two-column-full-cover-text-over',
  HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON:
    'html-two-column-full-cover-text-over-with-button',
  HTML_TWO_COLUMN_SECTION_CONTENT_COLLECTION:
    'html-two-column-section-content-collection',
  HTML_TWO_COLUMN_SECTION_TEXT: 'html-two-column-section-text',
  HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON_FOR_SECTION:
    'html-two-column-full-cover-text-over-with-button-for-section',

  //PDF
  PDF_COVER_COLLECTION: 'pdf-cover-collection',
  PDF_FULL_WIDTH_COVER_DETAILS: 'pdf-full-width-cover-details',
  PDF_FULL_WIDTH_COVER_TEXT_OVER: 'pdf-full-width-cover-text-over',
  PDF_TWO_COLUMN_FULL_COVER_TEXT_OVER: 'pdf-two-column-full-cover-text-over',
  PDF_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON:
    'pdf-two-column-full-cover-text-over-with-button',

  //===== APP =====

  //GENERIC
  APP_BUTTON: 'app-button',
  APP_IMAGE: 'app-image',
  APP_RICH_TEXT: 'app-rich-text',
  APP_FULL_WIDTH_IMAGE: 'app-full-width-image',
  APP_CONTAINER_CONTENT: 'app-container-content',
  APP_CIRCLE_IMAGE: 'app-circle-image',
  APP_SMALL_IMAGE: 'app-small-image',

  //MIXED
  APP_ARTICLE_CAROUSEL: 'app-article-carousel',
  APP_ARTICLE_CAROUSEL_SIMPLE: 'app-article-carousel-simple',
  APP_ARTICLE_COLLECTION: 'app-article-collection',
  APP_ARTICLE_COLLECTION_TWO_ITEMS: 'app-article-collection-two-items',
  APP_ARTICLE_COLLECTION_COLUMN: 'app-article-collection-column',
  APP_TOP_STORY: 'app-top-story',
  APP_SECTION_CAROUSEL: 'app-section-carousel',

  //HTML
  APP_HTML_ARTICLE_COLLECTION: 'app-html-article-collection',
  APP_HTML_ARTICLE_COLLECTION_TWO_ITEMS:
    'app-html-article-collection-two-items',
  APP_HTML_ARTICLE_COLLECTION_COLUMN: 'app-html-article-collection-column',
  APP_HTML_ARTICLE_COVER: 'app-html-article-cover',
  APP_HTML_TOP_STORY: 'app-html-top-story',

  //PDF
};

export const WIDGET_FRIENDLY_NAMES = [
  //===== WEB =====

  //GENERIC
  { type: WIDGET_TYPES.BLOCK, name: 'Block' },
  { type: WIDGET_TYPES.BUTTON_CONTENT, name: 'Button content' },
  { type: WIDGET_TYPES.CONTACT_FORM, name: 'Contact form' },
  { type: WIDGET_TYPES.CONTAINER_CONTENT, name: 'Container content' },
  { type: WIDGET_TYPES.COVER, name: 'Cover content' },
  { type: WIDGET_TYPES.FULL_WIDTH_IMAGE, name: 'Full width image' },
  { type: WIDGET_TYPES.HTML_CONTAINER, name: 'HTML' },
  { type: WIDGET_TYPES.IMAGE, name: 'Image' },
  { type: WIDGET_TYPES.LABEL_CONTENT, name: 'Label content' },
  { type: WIDGET_TYPES.LONG_TEXT, name: 'Long text' },
  { type: WIDGET_TYPES.MULTI_COLUMN, name: 'Multi column' },
  { type: WIDGET_TYPES.PAGE_NAVIGATION, name: 'Navigation' },
  { type: WIDGET_TYPES.RICH_TEXT, name: 'Rich text' },
  { type: WIDGET_TYPES.TEXT, name: 'Text' },
  { type: WIDGET_TYPES.SIMPLE_FOOTER, name: 'Footer' },
  { type: WIDGET_TYPES.SIMPLE_HEADER, name: 'Header' },
  { type: WIDGET_TYPES.TEXT_AREA, name: 'Text area' },
  { type: WIDGET_TYPES.TEXT_FIELD, name: 'Text field' },

  //MIXED
  { type: WIDGET_TYPES.ARTICLE_COLLECTION, name: 'Article collection' },
  { type: WIDGET_TYPES.COVER_COLLECTION, name: 'Covers collection' },
  { type: WIDGET_TYPES.FULL_WIDTH_COVER_DETAILS, name: 'Latest Issue' },
  { type: WIDGET_TYPES.FULL_WIDTH_COVER_TEXT_OVER, name: 'Full width' },
  { type: WIDGET_TYPES.SECTION_CONTENT_COLLECTION, name: 'Three column' },
  {
    type: WIDGET_TYPES.SINGLE_COLUMN_SECTION_TEXT,
    name: 'Single column text',
  },
  { type: WIDGET_TYPES.TOP_STORY, name: 'Top story' },
  { type: WIDGET_TYPES.TWO_COLUMN_FULL_COVER_TEXT_OVER, name: 'Two covers' },
  {
    type: WIDGET_TYPES.TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON,
    name: 'Two covers with button',
  },
  {
    type: WIDGET_TYPES.TWO_COLUMN_SECTION_CONTENT_COLLECTION,
    name: 'Two column',
  },
  { type: WIDGET_TYPES.TWO_COLUMN_SECTION_TEXT, name: 'Two column text' },

  //HTML
  {
    type: WIDGET_TYPES.HTML_ARTICLE_COLLECTION,
    name: 'HTML article collection',
  },
  { type: WIDGET_TYPES.HTML_ARTICLE_COVER, name: 'Article cover' },
  {
    type: WIDGET_TYPES.HTML_COVER_COLLECTION,
    name: 'HTML covers collection',
  },
  {
    type: WIDGET_TYPES.HTML_FULL_WIDTH_COVER_TEXT_OVER,
    name: 'HTML full width',
  },
  {
    type: WIDGET_TYPES.HTML_SECTION_CONTENT_COLLECTION,
    name: 'HTML three column',
  },
  {
    type: WIDGET_TYPES.HTML_SINGLE_COLUMN_SECTION_TEXT,
    name: 'HTML single column text',
  },
  { type: WIDGET_TYPES.HTML_TOP_STORY, name: 'HTML top story' },
  {
    type: WIDGET_TYPES.HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER,
    name: 'HTML two covers',
  },
  {
    type: WIDGET_TYPES.HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON,
    name: 'HTML two covers with button',
  },
  {
    type: WIDGET_TYPES.HTML_TWO_COLUMN_SECTION_CONTENT_COLLECTION,
    name: 'HTML two column',
  },
  {
    type: WIDGET_TYPES.HTML_TWO_COLUMN_SECTION_TEXT,
    name: 'HTML two column text',
  },
  {
    type:
      WIDGET_TYPES.HTML_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON_FOR_SECTION,
    name: 'Two covers with button sections',
  },

  //PDF
  { type: WIDGET_TYPES.PDF_COVER_COLLECTION, name: 'PDF covers collection' },
  {
    type: WIDGET_TYPES.PDF_FULL_WIDTH_COVER_DETAILS,
    name: 'PDF latest issue',
  },
  {
    type: WIDGET_TYPES.PDF_FULL_WIDTH_COVER_TEXT_OVER,
    name: 'PDF full width',
  },
  {
    type: WIDGET_TYPES.PDF_TWO_COLUMN_FULL_COVER_TEXT_OVER,
    name: 'PDF two covers',
  },
  {
    type: WIDGET_TYPES.PDF_TWO_COLUMN_FULL_COVER_TEXT_OVER_WITH_BUTTON,
    name: 'PDF two covers with button',
  },

  //===== APP =====

  //GENERIC
  { type: WIDGET_TYPES.APP_RICH_TEXT, name: 'Rich text' },
  { type: WIDGET_TYPES.APP_IMAGE, name: 'Image' },
  { type: WIDGET_TYPES.APP_BUTTON, name: 'Button' },

  //MIXED
  { type: WIDGET_TYPES.APP_TOP_STORY, name: 'Top story' },
  { type: WIDGET_TYPES.APP_ARTICLE_COLLECTION, name: 'Large image list' },
  {
    type: WIDGET_TYPES.APP_ARTICLE_COLLECTION_COLUMN,
    name: 'Small image list',
  },
  {
    type: WIDGET_TYPES.APP_ARTICLE_COLLECTION_TWO_ITEMS,
    name: 'Two images list',
  },
  {
    type: WIDGET_TYPES.APP_ARTICLE_CAROUSEL_SIMPLE,
    name: 'Large image carousel',
  },
  { type: WIDGET_TYPES.APP_ARTICLE_CAROUSEL, name: 'Small image carousel' },
  { type: WIDGET_TYPES.APP_SECTION_CAROUSEL, name: 'Section carousel' },

  //HTML
  {
    type: WIDGET_TYPES.APP_HTML_ARTICLE_COLLECTION,
    name: 'HTML article collection',
  },
  {
    type: WIDGET_TYPES.APP_HTML_ARTICLE_COLLECTION_TWO_ITEMS,
    name: 'HTML article collection two items',
  },
  {
    type: WIDGET_TYPES.APP_HTML_ARTICLE_COLLECTION_COLUMN,
    name: 'HTML article collection column',
  },
  { type: WIDGET_TYPES.APP_HTML_ARTICLE_COVER, name: 'Article cover' },
  { type: WIDGET_TYPES.APP_HTML_TOP_STORY, name: 'HTML top story' },

  //PDF
];

export const MESSAGES = {
  //ERRORS
  ERROR_API_FETCH: {
    message: 'There was a problem fetching data from API!',
    type: 'error',
  },
  ERROR_CREATING_NEW_RECORD: {
    message: 'There was a problem creating a new record!',
    type: 'error',
  },
  ERROR_RETRIEVING_FLAT_PLAN: {
    message:
      'We have encountered an error, while trying to retrieve your flat plan tabs.',
    type: 'error',
  },
  ERROR_RETRIEVING_DATA: {
    message:
      'We have encountered an error, while trying to retrieve your data.',
    type: 'error',
  },
  ERROR_STYLES_SAVE: {
    message: 'Advanced styles failed to save. Check the styles are correct.',
    type: 'error',
  },
  ERROR_SAVE_CHANGES: {
    message: 'There was an error while trying to save changes.',
    type: 'error',
  },
  ERROR_BOLTONCOUNT_CHANGES: {
    message: 'There was an error while trying to save project count.',
    type: 'error',
  },
  ERROR_GRACEPERIOD_CHANGES: {
    message: 'There was an error while trying to save grace period.',
    type: 'error',
  },
  ERROR_SAVING_DATA: {
    message: 'There was a problem saving your data.',
    type: 'error',
  },
  ERROR_SAVING_DATA_CHECK_SETTINGS: {
    message:
      'There was a problem saving your data. Please check the settings tab.',
    type: 'error',
  },
  ERROR_SUBSCRIPTION_ACCOUNTS: {
    message:
      'You have maxed out the accounts you can add, please upgrade subscription to add more',
    type: 'error',
  },
  ERROR_LOADING_PUBLISH_FORM: {
    message: 'There was a problem with loading the publish form.',
    type: 'error',
  },
  ERROR_NO_THEME_WAS_DEFINED: {
    message:
      'No theme was associated with this Issue. 1. Go to themes, create a new theme, associate it with publication and save it. 2. Navigate to the "Publish" step, select the theme just created and click "Save draft" button.',
    type: 'error',
  },
  ERROR_NOT_ABLE_TO_DELETE_LINK: {
    message: 'There was a problem deleting your link!',
    type: 'error',
  },
  ERROR_NOT_ABLE_TO_DELETE_TEMPLATE: {
    message: 'There was a problem deleting your template!',
    type: 'error',
  },
  ERROR_NOT_ABLE_TO_DELETE_THEME: {
    message: 'There was a problem deleting your theme!',
    type: 'error',
  },
  ERROR_NOT_ABLE_TO_DELETE_FONT: {
    message: 'There was a problem deleting your font!',
    type: 'error',
  },
  ERROR_LIGATURE_DUPLICATE: {
    message:
      'There was a duplicate ligature key found! Please use unique keys.',
    type: 'error',
  },
  ERROR_LIGATURE_NO_KEY_OR_VALUE: {
    message: 'Please verify that non of the fields is left empty.',
    type: 'error',
  },
  ERROR_DUPLICATE_ENTITY_NAME: {
    message: 'Please verify that the Name field is unique.',
    type: 'error',
  },
  ERROR_DUPLICATE_DOMAIN: {
    message: 'This domain already exists.',
    type: 'error',
  },
  ERROR_PASSWORD_RESET: {
    message: 'The password reset email was not sent.',
    type: 'error',
  },
  ERROR_EMAIL_CONFIRMATION_RESEND: {
    message: 'The email confirmation email was not sent',
    type: 'error',
  },
  ERROR_EMAIL: {
    message: 'This email address is already signed up.',
    type: 'error',
  },
  ERROR_USER_CHANGE_STATUS: {
    message: 'User status has not been updated.',
    type: 'error',
  },
  ERROR_FETCH_DATA: {
    message: 'There was a problem fetching the data.',
    type: 'error',
  },
  ERROR_BUILD: { message: 'The build process has failed.', type: 'error' },
  ERROR_RELEASE: { message: 'The release process has failed.', type: 'error' },
  ERROR_IMAGE_DELETE: {
    message: 'There was a problem deleting your image.',
    type: 'error',
  },
  ERROR_IMAGE_UPLOAD: {
    message: 'There was a problem uploading your image.',
    type: 'error',
  },
  ERROR_FILE_UPLOAD: {
    message: 'There was a problem uploading your file.',
    type: 'error',
  },
  ERROR_FONT_DELETE: {
    message: 'There was a problem deleting your font.',
    type: 'error',
  },
  ERROR_FONT_SAVE: {
    message: 'There was a problem saving your font.',
    type: 'error',
  },
  ERROR_ACCOUNT_DELETE: {
    message: 'There was a problem deleting your account.',
    type: 'error',
  },
  ERROR_ORGANIZATION_DELETE: {
    message: 'There was a problem deleting your organization.',
    type: 'error',
  },
  ERROR_PAYMENT: {
    message: 'There was a problem processing your payment.',
    type: 'error',
  },
  ERROR_RESET_PASSWORD: {
    message: 'There was a problem resetting your password.',
    type: 'error',
  },
  ERROR_REGISTERING: {
    mesage: 'There was an error registering your account, please try again',
    type: 'error',
  },
  ERROR_INVALID_FILE: {
    message: 'Invalid file format.',
    type: 'error',
  },
  ERROR_INCOMPLETE_CARD_NUMBER: {
    message: 'Please enter your full card number',
    type: 'error',
  },
  ERROR_INVALID_CARD_NUMBER: {
    message: 'Card number is invalid.',
    type: 'error',
  },
  ERROR_INCOMPLETE_EXPIRY: {
    message: 'Please enter expiry date',
    type: 'error',
  },
  ERROR_INVALID_EXPIRY_YEAR: {
    message: 'Invalid year',
    type: 'error',
  },
  ERROR_INVALID_EXPIRY_MONTH: {
    message: 'Invalid month',
    type: 'error',
  },
  ERROR_INVALID_EXPIRY : {
    message: 'Expiry date is invalid.',
    type: 'error',
  },
  ERROR_INCOMPLETE_CVC: {
    message: 'Please enter CVC',
    type: 'error',
  },
  ERROR_INVALID_CVC: {
    message: 'CVC is invalid.',
    type: 'error',
  },
  //WARNINGS
  WARNING_RETRIEVING_NEW_DATA: {
    message:
      'There was a problem retrieving the new data. Please refresh the page to see the latest content.',
    type: 'warning',
  },
  WARNING_TEMPLATE_IMPORT: {
    message:
      'No exported Template found, please use the Export functionality first.',
    type: 'warning',
  },
  WARNING_DESIGN_CHANGE: {
    message:
      'Your design changes wont be applied until you click the "Save" button.',
    type: 'warning',
  },

  //INFOS
  INFO_NO_FLAT_PLAN_DATA: {
    message:
      "No flat plan data found. Please click the 'Reset structure' button.",
    type: 'info',
  },
  INFO_NOT_IMPLEMENTED: {
    message: 'This functionality is not yet implemented',
    headerText: 'Info',
    type: 'info',
  },
  INFO_END_OF_CONTENT: {
    message: 'You have reached the end. Please go back to the Content tab.',
    headerText: 'Info',
    type: 'info',
  },

  //SUCCESS
  SUCCESS_SAVED_CHANGES: {
    message: 'Changes saved successfully.',
    type: 'success',
  },
  SUCCESS_ADDED_USER: {
    message: 'Email link sent to set up password.',
    type: 'success',
  },
  SUCCESS_PAGE_REPLACED: {
    message:
      "You've successfully started the page replace process, you can continue with your work until we replace your page.",
    type: 'success',
    headerText: 'Process started successfully.',
  },
  SUCCESS_PAYMENT: {
    message: 'Your Payment was successful.',
    type: 'success',
  },
  SUCCESS_PINCODE_COPIED: {
    message: 'Pincode copied.',
    type: 'success',
  },
  SUCCESS_DRAFT_RESET: {
    message: 'Draft was successfully reset.',
    type: 'success',
  },
  SUCCESS_DRAFT_SAVED: {
    message: 'Draft was saved successfully.',
    type: 'success',
  },
  SUCCESS_PRESET_PUBLISHED: {
    message: 'The Preset template has been published successfully.',
    type: 'success',
  },
  SUCCESS_ARTICLE_PUBLISHED: {
    message: 'Article published successfully.',
    type: 'success',
  },
  SUCCESS_ARTICLE_UNPUBLISHED: {
    message: 'Article unpublished successfully.',
    type: 'success',
  },
  SUCCESS_LIGATURE_CREATED: {
    message: 'A new word has been added to your dictionary successfully.',
    type: 'success',
  },
  SUCCESS_PASSWORD_REST: {
    message: 'Password reset email sent.',
    type: 'success',
  },
  SUCCESS_SAVE_APP: {
    message: 'App template has saved successfully!',
    type: 'success',
  },
  SUCCESS_STYLE_ADDED: {
    message: 'New style added.',
    type: 'success',
  },
  SUCCESS_STYLES_SAVED: {
    message: 'Advanced styles saved.',
    type: 'success',
  },
  SUCCESS_EMAIL_CONFIRMATION_RESEND: {
    message: 'Email confirmation email sent.',
    type: 'success',
  },
  SUCCESS_USER_CHANGE_STATUS: {
    message: 'User status has been updated.',
    type: 'success',
  },
  SUCCESS_BUILD: {
    message: 'The build process has started.',
    type: 'success',
  },
  SUCCESS_RELEASE: {
    message: 'The release process has started.',
    type: 'success',
  },
  SUCCESS_TEMPLATE_CREATE: {
    message: 'Template has been successfully created.',
    type: 'success',
  },
  SUCCESS_TEMPLATE_DELETE: {
    message: 'Template has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_TEMPLATE_IMPORT: {
    message: 'Template has been successfully imported.',
    type: 'success',
  },
  SUCCESS_TEMPLATE_EXPORT: {
    message: 'Template has been successfully exported.',
    type: 'success',
  },
  SUCCESS_IMAGE_DELETE: {
    message: 'The image has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_FONT_DELETE: {
    message: 'The font has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_FONT_SAVE: {
    message: 'The font has been saved successfully.',
    type: 'success',
  },
  SUCCESS_ACCOUNT_DELETE: {
    message: 'Account has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_THEME_DELETE: {
    message: 'Theme has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_ORGANIZATION_DELETE: {
    message: 'Organization has been successfully deleted.',
    type: 'success',
  },
  SUCCESS_BOLTONCOUNT_SAVED: {
    message: 'Project Count for subscription has been updated successfully.',
    type: 'success',
  },
  SUCCESS_GRACEPERIOD_SAVED: {
    message: 'Grace period for subscription has been updated successfully.',
    type: 'success',
  },
  //CONFIRMATIONS
  CONFIRMATION_TEMPLATE_PRESET_DELETE: {
    message:
      "Once deleting a Template Preset, there won't be a way to restore it back. Are you sure you want to proceed?",
    type: 'confirmation',
  },
  CONFIRMATION_DRAFT_TEMPLATE_PRESET_RESET: {
    message:
      'The Draft template preset will reset and you will loose all you current changes, unless you decide not to save the changes. Are you sure you want to proceed?',
    type: 'confirmation',
  },
  CONFIRMATION_TEMPLATE_CLEAN: {
    message:
      'All the widgets from the the Template will be removed and you will loose all you current changes, unless you decide not to save the changes. Are you sure you want to proceed?',
    type: 'confirmation',
  },
  CONFIRMATION_IMPORT_TEMPLATE_PRESET: {
    message:
      'By importing a Template preset, you are going to override your current changes. Are you sure you want to proceed?',
    type: 'confirmation',
  },
  CONFIRMATION_EXPORT_TEMPLATE_PRESET: {
    message:
      'By exporting a Template preset you will be able to import the current configuration onto a different Template preset. Are you sure you want to proceed?',
    type: 'confirmation',
  },
  CONFIRMATION_DELETE_IMAGE: {
    message:
      "Once deleting the image, there won't be a way to restore it back. Are you sure you want to proceed?",
    type: 'confirmation',
  },
  CONFIRMATION_DELETE_FONT: {
    message:
      "Once deleting the font, there won't be a way to restore it back. Are you sure you want to proceed?",
    type: 'confirmation',
  },
};

export const FONTS_URL =
  'https://fonts.googleapis.com/css?family=Asap|Patrick+Hand|Libre+Franklin|Lato|Lora|Montserrat|Noto+Sans|Nunito|Open+Sans|Oswald|PT+Sans|Playfair+Display|Raleway|Roboto|Roboto+Slab|Slabo+27px|Source+Sans+Pro|Source+Serif+Pro|Cabin&display=swap';
export const FONTS_URL2 =
  'https://fonts.googleapis.com/css2?family=Andada+Pro&family=Archivo:wght@100&family=EB+Garamond&family=Epilogue:wght@100&family=Inter:wght@100&family=JetBrains+Mono:wght@100&family=Lato:wght@100&family=Lora&family=Merriweather:wght@300&family=Montserrat:wght@100&family=Nunito:wght@200&family=Open+Sans:wght@300&family=Oswald:wght@200&family=Playfair+Display&family=Poppins:wght@100&family=Raleway:wght@100&family=Roboto:wght@100&family=Sora:wght@100&family=Source+Serif+Pro:wght@200&family=Work+Sans:wght@100&display=swap';

export const FONTS = [
  //{ key: "'Abril Fatface', cursive", value: 'Noto Sans' },
  { key: "'Andada Pro', serif", value: 'Andada Pro' },
  { key: "'Archivo', sans-serif", value: 'Archivo' },
  //{ key: "'Asap', sans-serif", value: 'Asap' },
  { key: "'EB Garamond', serif", value: 'EB Garamond' },
  { key: "'Epilogue', sans-serif", value: 'Epilogue' },
  { key: "'Inter', sans-serif", value: 'Inter' },
  { key: "'JetBrains Mono', monospace", value: 'JetBrains Mono' },
  { key: "'Lato', sans-serif", value: 'Lato' },
  //{ key: "'Libre Franklin', sans-serif", value: 'Libre Franklin' },
  { key: "'Lora', serif", value: 'Lora' },
  { key: "'Merriweather', serif", value: 'Merriweather' },
  { key: "'Montserrat', sans-serif", value: 'Montserrat' },
  //{ key: "'Noto Sans', sans-serif", value: 'Noto Sans' },
  { key: "'Nunito', sans-serif", value: 'Nunito' },
  { key: "'Open Sans', sans-serif", value: 'Open Sans' },
  { key: "'Oswald', sans-serif", value: 'Oswald' },
  //{ key: "'PT Sans', sans-serif", value: 'PT Sans' },
  //{ key: "'Patrick Hand', cursive", value: 'Patrick Hand' },
  { key: "'Playfair Display', serif", value: 'Playfair Display' },
  { key: "'Poppins', sans-serif", value: 'Poppins' },
  { key: "'Raleway', sans-serif", value: 'Raleway' },
  //{ key: "'Roboto Slab', serif", value: 'Roboto Slab' },
  { key: "'Roboto', sans-serif", value: 'Roboto' },
  //{ key: "'Slabo 27px', serif", value: 'Slabo' },
  { key: "'Sora', sans-serif", value: 'Sora' },
  //{ key: "'Source Sans Pro', sans-serif", value: 'Source Sans' },
  { key: "'Source Serif Pro', serif", value: 'Source Serif Pro' },
  { key: "'Work Sans', sans-serif", value: 'Work Sans' },
  // { key: '"Arial Black", Gadget, sans-serif', value: 'Arial Black' },
  // { key: '"Courier New", Courier, monospace', value: 'Courier New' },
  // { key: '"Lucida Console", Monaco, monospace', value: 'Lucida' },
  // { key: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', value: 'Lucida Sans Unicode' },
  // { key: '"Palatino Linotype", "Book Antiqua", Palatino, serif', value: 'Palatino Linotype' },
  // { key: '"Times New Roman", Times, serif', value: 'Times New Roman' },
  // { key: '"Trebuchet MS", Helvetica, sans-serif', value: 'Trebuchet MS' },
  // { key: 'Arial, Helvetica, sans-serif', value: 'Arial' },
  // { key: 'Georgia, serif', value: 'Georgia' },
  // { key: 'Impact, Charcoal, sans-serif', value: 'Impact' },
  // { key: 'Tahoma, Geneva, sans-serif', value: 'Tahoma' },
  // { key: 'Verdana, Geneva, sans-serif', value: 'Verdana' },
];

export const FONT_SIZES = [
  { key: '12px', value: '12' },
  { key: '14px', value: '14' },
  { key: '18px', value: '18' },
  { key: '24px', value: '24' },
  { key: '36px', value: '36' },
];

export const TAGS = [
  { id: 'dae3a7ef-dcef-4c94-8269-e5ee07828dc1', name: 'Featured' },
  { id: 'c8dcd7b5-6e78-4833-9ab2-28522f311a4a', name: 'Advertisement' },
  { id: '6580bfa1-52f7-4152-8e6e-234748f3cc98', name: 'Custom 1' },
  { id: 'a8550b41-632e-4afd-9bd8-3474e207c5d1', name: 'Custom 2' },
];

export const DEFAULT_IMAGE_STYLES = {
  float: 'none',
  width: '100%',
  margin: '0px',
  padding: '0px',
};

export const DEFAULT_TEXT_STYLES = {
  backgroundColor: 'unset',
  fontSize: 'unset',
  fontFamily: 'unset',
  display: 'block',
  color: 'unset',
  fontWeight: 'unset',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'unset',
  padding: '0px',
};

export const APP_DEFAULT_SCREEN_STYLES = {
  logo: '',
  primaryColor: '#29363D',
  secondaryColor: '#2CA7D4',
};

export const APP_SCREEN_TYPES = {
  SPLASH_SCREEN: 'app-splash-screen',
  HOME_SCREEN: 'app-home-screen',
  SETTINGS_SCREEN: 'app-settings-screen',
  HELP_SCREEN: 'app-help-screen',
  SEARCH_SCREEN: 'app-search-screen',
  BOOKMARKS_SCREEN: 'app-bookmarks-screen',
};

export const WEB_SCREEN_TYPES = {
  HOME_SCREEN: 'web-home-screen',
  AUTHENTICATION_SCREEN: 'web-authentication-screen',
};

export const SCREEN_FRIENDLY_NAMES = [
  //APP
  { type: APP_SCREEN_TYPES.SPLASH_SCREEN, name: 'Splash screen' },
  { type: APP_SCREEN_TYPES.HOME_SCREEN, name: 'Home screen' },
  { type: APP_SCREEN_TYPES.SETTINGS_SCREEN, name: 'Settings screen' },
  { type: APP_SCREEN_TYPES.HELP_SCREEN, name: 'Help screen' },
  { type: APP_SCREEN_TYPES.SEARCH_SCREEN, name: 'Search screen' },
  { type: APP_SCREEN_TYPES.BOOKMARKS_SCREEN, name: 'Bookmarks screen' },

  //WEB
  { type: WEB_SCREEN_TYPES.HOME_SCREEN, name: 'Home screen' },
  {
    type: WEB_SCREEN_TYPES.AUTHENTICATION_SCREEN,
    name: 'Authentication screen',
  },
];

export const TOOLTIP_PLACEMENT = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM_START: 'bottomStart',
  BOTTOM_END: 'bottomEnd',
  TOP_START: 'topStart',
  TOP_END: 'topEnd',
  LEFT_START: 'leftStart',
  LEFT_END: 'leftEnd',
  RIGHT_START: 'rightStart',
  RIGHT_END: 'rightEnd',
};

export const TOOLTIP_TRIGGERS = {
  CLICK: 'click',
  CONTEXT_MENU: 'contextMenu',
  HOVER: 'hover',
  FOCUS: 'focus',
  ACTIVE: 'active',
  NONE: 'none',
};

export const INDUSTRY_TYPES = {
  TYPE_1: 'Reptile Partners & Agencies',
  TYPE_2: 'Content owners',
};

export const DEVICE_PREVIEWS = {
  NONE: 'none',
  MOBILE_PORTRAIT: 'mobile portrait',
  MOBILE_LANDSCAPE: 'mobile landscape',
  TABLET_PORTRAIT: 'tablet portrait',
  TABLET_LANDSCAPE: 'tablet landscape',
  CUSTOM: 'custom',
};

export const DEVICE_PREVIEW_DIMENSIONS = {
  [DEVICE_PREVIEWS.NONE]: {},
  [DEVICE_PREVIEWS.MOBILE_PORTRAIT]: { width: '414px', height: '763px' },
  [DEVICE_PREVIEWS.MOBILE_LANDSCAPE]: { width: '763px', height: '414px' },
  [DEVICE_PREVIEWS.TABLET_PORTRAIT]: { width: '768px', height: '1024px' },
  [DEVICE_PREVIEWS.TABLET_LANDSCAPE]: { width: '1024px', height: '768px' },
};

export const DEFAULT_LOCALE = 'en-gb';

export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';

export const DECLARATIONS = [
  //make array empty and fill depending on text or image (maybe class etc too)/ there might be a standard for new styles
  {
    type: 'declaration',
    property: 'background-color',
    value: 'unset',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'font-size',
    value: 'unset',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'font-family',
    value: 'unset',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'display',
    value: 'block',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'color',
    value: 'unset',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'font-weight',
    value: 'none',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'font-style',
    value: 'none',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'text-decoration',
    value: 'none',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'text-align',
    value: 'unset',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
  {
    type: 'declaration',
    property: 'padding',
    value: '0px',
    position: {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    },
  },
] as Reptile.Models.RuleDeclaration[];

export const SCREENS = [
  {
    type: 'app-splash-screen',
    name: 'Splash screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
  {
    type: 'app-home-screen',
    name: 'Home screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
  {
    type: 'app-settings-screen',
    name: 'Settings screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
  {
    type: 'app-help-screen',
    name: 'Help screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
  {
    type: 'app-search-screen',
    name: 'Search screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
  {
    type: 'app-bookmarks-screen',
    name: 'Bookmarks screen',
    settings: {
      general: {},
      styles: {
        logo: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
      },
    },
  },
] as Reptile.Service.Screen[];

export const templateSteps = [
  {
    disableBeacon: true,
    placement: 'left-start',
    target: '.rt-template-body',
    content: 'Drag Widgets onto the screen to create your layout',
  },
  {
    disableBeacon: true,
    target: '.save-template',
    content: 'Save your layout as you work.',
  },
  {
    disableBeacon: true,
    placement: 'right-start',
    target: '.rt-tree-view',
    content: 'Connect your widgets to content',
  },
  {
    disableBeacon: true,
    placement: 'bottom',
    target: '.finish-build',
    content:
      'Setup your app designs. Then preview your app and build your files.',
  },
] as Step[];

export const articleSteps = [
  {
    disableBeacon: true,
    placementBeacon: 'top',
    target: '.rt-text-editor',
    content: 'This is the place where you can edit your Article',
  },
  {
    disableBeacon: true,
    placement: 'left',
    target: '.rt-content-settings',
    content: 'Use the settings panel to adjust your Article settings',
  },
  {
    disableBeacon: true,
    placement: 'top-start',
    target: '.add-tag',
    content:
      'By Tagging your content, you will be able to highlight your content in the Template builder',
  },
  {
    disableBeacon: true,
    placement: 'top',
    target: '.save-article',
    content: 'Click Save, once you are done editing your Article',
  },
  {
    disableBeacon: true,
    placement: 'top-start',
    target: '.publish-article',
    content:
      'Once you are done with your Article you can click this button to make it available for your public, or Unpublish to hide it',
  },
] as Step[];

export const ROLES = [
  {
    label: 'Editor',
    value: 'b54e4d52-c488-44d8-97ec-93c830da3be6',
  },
  {
    label: 'Admin',
    value: 'cbc4beed-2740-4754-91e8-a41df74723e5',
  },
  {
    label: 'SuperUser',
    value: 'f98dd25b-cbf9-4939-a644-717ec24c5f66',
  },
];

export const RULE_TEMPLATE = {
  type: 'rule',
  selectors: ['.test'],
  declarations: DECLARATIONS,
  position: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 1,
    },
  },
  visibility: true,
  name: 'test',
  selectorName: 'test',
  selectorType: 'tag',
  styleType: 'text',
} as Reptile.Models.Rule;

export const PLANS = {
  basic: [
    '2 Projects',
    '2 Users',
    'Access the Reptile Community',
    'Submit apps for build',
  ],

  professional: [
    '10 Projects',
    '5 Team members',
    'Flexibly add more as you grow',
    'Access the Reptile Community',
    'Submit apps for build',
  ],
};

export const FAQS = [
  {
    question: 'What does it cost to build an app?',
    answer:
      'Good question, but one cost cannot fit all apps. When you hit Get a Quote we will tell you what your app will cost to build and also what the annual support and maintenance cost will be. We will also give you some feedback if you can save money by changing any aspects of your design. You can create absolutely anything you want, but the closer your app is to existing modules we have created the cheaper it will be.',
  },
  {
    question: 'Why is there a support and maintenance charge?',
    answer: `The support cost covers the services required to run your app. Your app will always call back to the Reptile home for its content and functions. Authentication, security and analytics stats also route through Reptile. The support costs covers hosting and maintaining this middleware.

    The maintenance costs largely covers the routine updates and fixes that are needed to keep your app current with the iOS and Android platforms. You know how your phone, Mac or PC is always installing new updates? The developer platform for apps does the same thing – and Reptile has to keep changing the back-end of your app to match those updates. We will need to re-release your app once or twice each year to apply these platform-enforced updates.`,
  },
  {
    question:
      'Do I need to keep paying a monthly account fee once my app is live?',
    answer:
      'If you only have one app and only need one person to have access to the Reptile CMS, you can downgrade to a free account once your app is launched and only pay your app support and maintenance contract. If you have built your app, or apps, on one of the professional plans you can also reduce the number of team members after launch and switch to the cheapest package.',
  },
  {
    question: 'Can I cancel my contract at any time?',
    answer: `Yes you can cancel with one month’s notice. Invoices are issued on the first of each month in advance. When you cancel the next invoice will be your last. At the end of that month your account will be closed and your app will cease to update.

    As you are the publisher of the app in the stores only you can remove it. If you don’t do so your app may appear to continue to function, but it will not be receiving new data from the Reptile CMS or any integrated services. We recommend you remove it from the stores to avoid a bad experience for your customers.`,
  },
  {
    question: 'Can I change my app once it has been published?',
    answer: `Absolutely. We recommend starting with a simple version of your app and adding to it as you get real-world customer feedback.

    You can use the design and prototype tools in Reptile to add new features and hit Get a Quote again and we will tell you the costs of making the changes. You will only be charged for the additional work.
    
    If your new app becomes more complex and uses more integrated services it may move into a higher monthly support tier, but we will notify you in advance.`,
  },
  {
    question: 'Can I move my app to another provider?',
    answer: `Your app will be built on Reptile using our proprietary code – this cannot be moved and is operated on a software as a service (SAAS) model. You can however share your app designs with another developer and ask them to make a copy of your app. You are the publisher of your app and therefore you own all of the customer interactions with the app.

    So swapping the Reptile app with one built by another developer will not affect your customers and would be a similar experience to them as a normal app upgrade.`,
  },
  {
    question: 'Why am I the publisher of my app and not Reptile?',
    answer: `To have an account on the Apple and the Google Play Android stores requires the app publisher to meet certain legal requirements. You have to pay a small annual fee to them for your store account and you will periodically have to acknowledge changes to their Terms and Conditions. We cannot do this on your behalf.

    If your app takes payments this also enables Apple and Google Play to pay you directly. We do not take any payments on your behalf. We also do not collect end-user data. Transactions between you and the app users are not monitored or recorded by Reptile.`,
  },
];

export const FEATURES = [
  {
    icon: '/build/assets/icons/copy.svg?icon',
    header: 'SAAS Technology',
    about:
      'Software as a Service means that everything we build comes with support and maintenance as part of the package.',
  },
  {
    icon: '/build/assets/icons/cpu.svg?icon',
    header: 'Authentication',
    about:
      'Connecting authentication systems, including Single Sign On, is an example of the integration services we run for clients.',
  },
  {
    icon: '/build/assets/icons/delete.svg?icon',
    header: 'Technical Scoping',
    about:
      'A dedicate technical analyst who will scope the requirements with you',
  },
  {
    icon: '/build/assets/icons/download.svg?icon',
    header: 'After-launch support',
    about: 'We will keep apps up-to-date with the needs of the platforms.',
  },
];

export const WIDGETS = {
    Bookmarks: ["bookmark", "separator"],
    Help: ["text", "separator", "actionbutton", "urlbutton", "navbutton"],
    Search: ["text", "input", "actionbutton", "separator"],
    Settings: ["text", "input", "actionbutton", "urlbutton", "navbutton", "separator", "fontsize"],
};

export const DEFAULT_MASTER_STYLES = {
  general: {
      backgroundColor: "#033F63",
  },
  title: {
      color: "#ffffff",
      fontSize: "16px",
      fontFamily: "'Roboto', sans-serif",
      fontStyle: "normal",
      fontWeight: "unset",
      textDecoration: "unset",
  },
  text: {
      color: "#ffffff",
      fontSize: "14px",
      fontFamily: "'Roboto', sans-serif",
      fontStyle: "normal",
      fontWeight: "unset",
      textDecoration: "unset",
  },
  button: {
      backgroundColor: "#007bff",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "bold",
      fontFamily: "'Roboto', sans-serif",
      textAlign: 'center',
      borderRadius: "5px",
      borderColor: "#007bff",
      borderWidth: "2px",
      width: "50%",
      height: "40px",
      margin: "10px",
      padding: "10px 15px 10px 15px",
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
  },
  image: {
      backgroundColor: "transparent",
      width: "100%",
      height: "100%",
  },
};