declare namespace Reptile.Props {
  export type AccountProps = BaseProps;

  export type AccountBillingProps = BaseProps & {
    editBoltOns(): void;
    billingHistoryNavigate(): void;
    sendEmail(): void;
  };

  export type AccountsContentProps = React.PropsWithChildren<
    BaseProps & {
      sortAccountsBy(sortByValue: string, order: string): void;
    }
  >;

  export type AccountsContentRowProps = BaseProps & {
    user: AccountUserProps;
    roles?: { value: string; label: string }[];
    organizations?: { value?: string; label: string }[];
    onEditDisplay: (id: string) => void;
    onDeleteDisplay: (id: string) => void;
    onResetDisplay: (id: string) => void;
    onOpenSubscriptionModal: (id: string) => void;
  };

  export type AccountsFooterProps = React.PropsWithChildren<BaseProps>;

  export type AccountsEditModalProps = React.PropsWithChildren<
    BaseProps & {
      user?: Reptile.Service.User;
      roles?: { value: string; label: string }[];
      organizations?: { value?: string; label: string }[];
      modalTitle: string;
      actionEnabled: 'pending' | 'error' | 'initial' | 'done';
      currentUserId?: string;
      userId?: string;
      selectedRole(selected: { value: string; label: string }[]): void;
      selectedOrganization(selected: { value: string; label: string }[]): void;
      handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onCancelClick: () => void;
      onActionClick: () => void;
    }
  >;

  export type SubscriptionDetailsModalProps = React.PropsWithChildren<
    BaseProps & {
      userId?: string;
      superUser: boolean;
      subscriptionsList: Reptile.Service.SubscriptionDetailsByUserIdModel[] | undefined;
      subscriptionAPIstatus: Reptile.Models.State;
      planPriceList: Reptile.Models.PlansByCurrency;
      onCancelClick: () => void;
      onSaveSubscriptionDetails: (boltOnData: Reptile.Models.UpdateBoltOns | null, gracePeriod: Reptile.Models.UpdateGracePeriod | null) => Promise<void>;
    }
  >;

  export type AccountsPaginationProps = {
    controller: Reptile.Controllers.IAccountsController;
  };

  export type AddScreenModalProps = BaseProps & {
    onCancelClick: () => void;
    onSaveClick: () => void;
    onNameChange: (newName: string) => void;
    name: string;
    title: string;
    actionEnabled: boolean;
  };

  export type AppMenuActionsProps = BaseProps & {
    disabled?: boolean;
    onSave(): void;
    onReset(): void;
    onModalChange(): void;
  };

  export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageClick(page: number): void;
  };

  export type AccountsHeaderProps = BaseProps & {
    subscriptionStatus: Reptile.Models.SubscriptionInfo | undefined;
    trialStatus: boolean;
    totalAccounts: number;
    superUser: boolean;
    onEmailSearch: (event: React.FormEvent<HTMLInputElement>) => void;
    onAddDisplay: () => void;
    onUpgradeModal(): void;
  };

  export type AccountsResetModal = React.PropsWithChildren<
    BaseProps & {
      actionEnabled: 'pending' | 'error' | 'initial' | 'done';
      onCancelClick: () => void;
      onActionClick: () => void;
    }
  >;

  export type AccountsTeamProps = BaseProps & {
    onEmailSearch: (event: React.FormEvent<HTMLInputElement>) => void;
    totalRowCount: number;
    users: {
      id: string;
      email: string;
      userName: string;
      password: any;
      isActive: boolean;
      emailConfirmed: boolean;
      country: string | null;
      firstName: string;
      lastName: string;
      created: string;
      industry: any;
      organizationIds: string[];
      roleIds: string[];
      isPartner: boolean;
      imageUrl: string;
    }[];
    controller: Reptile.Controllers.IAccountsController;
  };

  export type AccountUsersProps = {
    controller: Reptile.Controllers.IAccountsController;
  };
  export type AccountUserProps = {
    id: string;
    email: string;
    userName: string;
    password: any;
    isActive: boolean;
    emailConfirmed: boolean;
    country: string | null;
    firstName: string;
    lastName: string;
    created: string;
    industry: any;
    organizationIds: string[];
    roleIds: string[];
    isPartner: boolean;
    imageUrl: string;
  };

  export type AccountTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type AccountSettingsTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type AccountConfirmationProps = BaseProps;

  export type AccountConfirmationTemplateProps = {
    accountConfirmation: React.ReactNode;
  };

  export type AccountsContentHeaderProps = BaseProps & {
    sortAccountsBy(sortByValue: string, order: string): void;
  };

  export type AddBoltOnsContentProps = {
    boltOns?: number;
    selectedOrg?: string;

    orgs:
      | {
          label: string;
          value?: string | undefined;
        }[]
      | undefined;

    orgIndex?: number;
    handleChange(
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      selectedIndex: number
    ): void;
    handleBoltOns(boltOns: number): void;
    handlePaymentId(id?: string): void;
  };

  export type AddBoltOnsTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type AlignmentPropertyProps = BaseProps;

  export type AndroidFormProps = BaseProps & {
    step: number;
    submit: boolean;
    keyStoreFileUploadInfo?: Models.IAssetUpload;
    android?: {
      androidServiceAccount: string;
      appIdentifier: string;
      keyAlias: string;
      keyPassword: string;
      keyStoreFileName: string;
      keyStorePassword: string;
      serviceAccountJsonBlobURL: string;
    };
    isDisabled: boolean;
    existing: boolean;
    uploadedFiles: any;
    onAction(): void;
    onBackClick(): void;
    onAndroidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileDropped: (file: File | null, name: string) => void;
    navigateToDocs(): void;
    navigateToMail(): void;
  };

  export type AppBuildTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    templates: React.ReactNode;
    sidebarNavigation?: React.ReactNode;
    body: React.ReactNode;
    sidePanel: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type AppTemplateSearchProps = {
    header?: React.ReactNode;
  };

  export type AppTemplateSplashScreenProps = {
    header?: React.ReactNode;
  };

  export type AppTemplateHomeScreenProps = {
    header?: React.ReactNode;
  };

  export type AppTemplateHelpScreenProps = {
    header?: React.ReactNode;
  };

  export type AppTemplateSettingsScreenProps = {
    header?: React.ReactNode;
  };

  type BaseProps = {
    className?: string;
    style?: React.CSSProperties;
  };

  export type BillingHistoryContentProps = BaseProps & {
    amount: number;
    startDate: string;
    endDate: string;
    boltOnCount: number;
    clientsPerBoltOn: number;
    usersPerBoltOn: number;
    organizationName: string;
  };

  export type TextEditorProps = BaseProps & {
    mode?: "content" | 'rich-text';
    isTemplateEditor?: boolean;
    disabled?: boolean;
  };

  export type BillingHistoryTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type BillingSettingsProps = BaseProps & {
    avatarUrl?: string;
  };

  export type BreadcrumbsProps = BaseProps;

  export type ButtonProps = React.PropsWithChildren<
    BaseProps & {
      icon?: React.ReactNode;
      iconPosition?: 'left' | 'right';
      color?: 'primary' | 'gray' | 'error';
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      disabled?: boolean;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      variant?: 'contained' | 'outlined' | 'text' | 'link';
      onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
      onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    }
  >;

  export type CardProps = React.PropsWithChildren<BaseProps> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    selected?: boolean;
  };

  export type CheckboxPropertyProps = BaseProps;

  export type CheckboxProps = BaseProps & {
    active?: boolean;
    size?: 'md' | 'sm';
    onClick?: (e: React.MouseEvent<HTMLDivElement>, active: boolean) => void;
  };

  export type ChipProps = BaseProps & {
    value?: string;
    editable?: boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    onEmptyBlur?: React.FocusEventHandler<HTMLInputElement>;
  };

  export type CircleNumberProps = BaseProps & {
    number?: number;
  };

  export type ClickableIconProps = BaseProps & {
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    disabled?: boolean;
  };

  export type CollapseProps = BaseProps & {
    transitionKey?: string;
    in?: boolean;
    from?: number;
    to?: number;
    children: React.ReactNode;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  };

  export type ColorPickerProps = BaseProps & {
    color: import('color-convert/conversions').HSV;
    alpha: number;
    onColorPick?: (
      newColor: import('color-convert/conversions').HSV,
      alpha: number
    ) => void;
  };

  export type ColorPropertyProps = BaseProps;

  export type ConfirmationSuccessProps = {
    isPartner: boolean;
    isEmailVerified: boolean;
    navigateToLogin: () => void;
    bookAMeeting: () => void;
  };

  export type ContentEntitiesProps = BaseProps & {
    emptyElement?: React.ReactNode;
  };

  export type ContentEntityCardProps = BaseProps & {
    entity: Models.IContentEntity;
    onClick?: (id: string) => void;
    onClickDelete?: (id: string) => void;
    onClickSettings?: (id: string) => void;
  };

  export type ContentImagesProps = BaseProps;

  export type ContentTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    navbarMain: React.ReactNode;
    navbarActions?: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type ContentActionsProps = BaseProps;

  export type ContentSettingsProps = BaseProps;
  export type BuildSettingProps = BaseProps & {
    appName?: string;
    coverImage?: string;
    coverImageUploadInfo?: Models.IAssetUpload;
    status: 'initial' | 'pending' | 'done' | 'error' | undefined;
    app?: Reptile.Service.AppInstaller;
    onEnableBuild: () => boolean;
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileDropped: (file: File | null) => void;
    removeImage: () => void;
    saveApp: () => void;
    createApp: () => void;
  };

  export type BuildAppError = BaseProps & {
    appStatus: {
      error: boolean;
      pending: boolean;
      complete: boolean;
    };
    selectedApp: Reptile.Service.AppInstaller;
  };

  export type BuildAppSettings = BaseProps & {
    selectedApp: Reptile.Service.AppInstaller;
  };

  export type BuildTable = BaseProps & {
    active: number;
    appList?: Reptile.Service.AppInstallerList;
    steps: string[];
    onClick(id: number): void;
  };

  export type ContentStylesProps = BaseProps;
  export type GlobalStyleProps = BaseProps;
  export type ContentTitleProps = BaseProps & {
    title: string;
  };

  export type DividerProps = BaseProps & {
    type?: 'vertical' | 'horizontal';
  };

  export type DraggableItemProps<T> = React.PropsWithChildren<
    BaseProps & {
      disabled?: boolean;
      threshold?: number;
      isMaxHeight?: boolean;
    } & (T extends undefined
        ? Record<string, never>
        : {
            context: T;
          })
  >;

  export type DraggableWidgetsProps = BaseProps & {
    widget: Reptile.Models.IWidget;
    widgets?: Reptile.Service.LayoutWidget[];
    mode: 'drag' | 'edit';
    activeWidget: Reptile.Models.IWidget | undefined;
    registry: Map<string, Reptile.Controllers.WidgetRegistryEntry>;
    idx: number;
    disabled?: boolean;
    onSelect?:
      | ((
          event: React.MouseEvent<HTMLDivElement, MouseEvent>,
          widgetId: string
        ) => void)
      | undefined;
    onDuplicate?:
      | ((
          event: React.MouseEvent<HTMLLIElement, MouseEvent>,
          widgetId: string
        ) => void)
      | undefined;
    onDelete?:
      | ((
          event: React.MouseEvent<HTMLLIElement, MouseEvent>,
          widgetId: string
        ) => void)
      | undefined;
  };

  export type DropdownButtonProps = ButtonProps & {
    label?: string;
    open?: boolean;
    onChange?: (open: boolean) => void;
    dropDirection?: 'up' | 'down';
    offset?: number;
  };

  export type DropdownColorPickerProps = ColorPickerProps & {
    open?: boolean;
    onColorReset: () => void;
    onOpen?: () => void;
    onClose?: () => void;
  };

  export type DropdownPropertyProps = BaseProps;

  export type DropdownInputProps = React.PropsWithChildren<
    BaseProps & {
      name: string;
      label: string;
      value: string;
      selectedIndex?: number;
      disabled?: boolean;
      leftElement?: React.ReactNode;
      onChange?: (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        selectedIndex: number
      ) => void;
    }
  >;

  export type EditAccount = BaseProps & {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    actionEnabled: 'pending' | 'error' | 'initial' | 'done';
    onFirstNameChange: (newName: string) => void;
    onLastNameChange: (newName: string) => void;
    onUsernameChange: (newName: string) => void;
    onEmailChange: (newName: string) => void;
    editDetails(): void;
  };

  export type EditProfile = BaseProps & {
    avatarUrl?: string;
    usersPlan: string;
    modal: boolean;
    usersFreeTrial?: number;
    actionEnabled: 'initial' | 'pending' | 'done' | 'error';
    imageUpload: (file: File | null) => void;
    makePayment(): void;
    handleModal(): void;
  };

  export type EditThemesCard = BaseProps & {
    rules?: Reptile.Models.Rule[];
    ruleId: number;
    filter: string;
    filters: string[];
    filterIndex?: number;
    handleMeasureChange: (
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number
    ) => void;
    handleRuleIndex(i: number): void;
    handleSelectorType(styleType: string): void;
  };

  export type EditThemesConfigurations = BaseProps & {
    selectorType: string;
    styleThemes: Reptile.Controllers.IThemesStylesController;
  };

  export type FAQsProps = BaseProps & {
    FAQs: { question: string; answer: string }[];
  };

  export type FeaturedIconProps = BaseProps & {
    icon: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
    type?:
      | 'light-circle'
      | 'light-circle-outline'
      | 'dark-circle'
      | 'light-square'
      | 'mid-square'
      | 'dark-square';
  };

  export type FinishActionsProps = BaseProps & {
    submit?: boolean;
    isDisabled?: boolean;
    handleActionClick?(): void;
    handleBackClick(): void;
  };

  export type FinishCardProps = BaseProps & {
    title: string;
    button1: { name: string; action(): void };
    button2: { name: string; action(): void, disabled?: boolean };
    status?: { step: number; stage: 'continue' | 'finish' };
    onBackClick?(): void;
  };

  export type FinishContactCardProps = BaseProps & {
    onSelectExisting(): void;
  };

  export type FinishStepsContentProps = React.PropsWithChildren<BaseProps> & {
    title: string;
    navigateToDocs(): void;
    navigateToMail(): void;
  };

  export type FileDropProperty = BaseProps;

  export type FileDropProps = BaseProps & {
    onFileDropped?: (file: File | null) => void;
    hint?: string;
    allowedExtensions?: string;
    disabled?: boolean;
  };

  export type FileUploadProgressProps = BaseProps & {
    fileName: string;
    fileSizeInBytes: number;
    uploadPercentage: number;
  };

  export type FontFamilyPropertyProps = BaseProps;

  export type FontStylePropertyProps = BaseProps;

  export type HeaderProps = BaseProps;

  export type HelpSettingsProps = BaseProps & {
    helpMenu: {
      docs: {
        title: string;
        description: string;
        links: { name: string; src: string }[];
      };
      video: { title: string; description: string; videoId: string };
      chatbot: { title: string; description: string };
      screenContent: {title: string; content: string | string[]};
    };
  };

  export type HelpMenuProps = React.PropsWithChildren<BaseProps> & {
    title: string;
    description: string;
    isActive: boolean;
    onClick?(newName?: string): void;
    type?: "documentation" | "video" | "chatbot";
  };

  export type HexColorInputProps = BaseProps & {
    color: import('color-convert/conversions').HEX;
    alpha?: number;
    onColorChange?: (newColor: import('color-convert/conversions').HEX) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

  export type HuePicker = BaseProps & {
    hue: number;
    onHuePick?: (hue: number) => void;
  };

  export type ImageGallery = BaseProps & {
    images?: string[];
    size?: 'sm' | 'md' | 'lg';
    activeIndex?: number;
    onActiveIndexChange?: (activeIndex: number) => void;
    onInsertImage?: (img: string, caption: string, idx: number) => void;
    onDownloadImage?: (img: string, idx: number) => void;
    onRemoveImage?: (img: string, idx: number) => void;
  };

  export type ImageProps = BaseProps & {
    form?: 'rectangle' | 'circle' | 'rounded';
    height?: string | number;
    width?: string | number;
    onClick?: () => void;
    src?: string;
    loading?: boolean;
  };

  export type InputFieldProps = InputProps & {
    label?: string;
  };

  export type InputPropertyProps = BaseProps;

  export type InputProps = BaseProps & {
    autoFocus?: boolean;
    defaultValue?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    type?: string;
    value?: string;
    editable?: boolean;
    disabled?: boolean;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

  export type InsertableImageProps = BaseProps & {
    image: string;
    active?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onSelect?: (element: HTMLImageElement) => void;
    onInsertImage?: (img: string, caption: string) => void;
    onDownloadImage?: (img: string) => void;
    onRemoveImage?: (img: string) => void;
  };

  export type IOSFormProps = BaseProps & {
    step: number;
    submit: boolean;
    IOS: {
      appIdentifier: string;
      appSpecificId: string;
      apiKey: string;
      apiKeyId: string;
      p12FileName: string;
      p12Password: string;
      provisioningProfile: string;
      pat: string;
      // issuerId: string
      // teamId: string
      // teamName: string
    };
    isDisabled: boolean;
    onAction(): void;
    onBackClick(): void;
    onIOSChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    navigateToDocs(): void;
    navigateToMail(): void;
  };

  export type LinkProps = BaseProps & {
    title: string;
    color?: 'primary';
    border?: 'outlined' | 'default';
    fontWeight?: '500' | 'bold';
    onClick: () => void;
  };

  export type LabeledHexColorInputProps = HexColorInputProps & {
    label?: string;
  };

  export type LabeledRgbColorInputProps = RgbColorInputProps & {
    label?: string;
  };

  export type ListItemProps = BaseProps & {
    header?: boolean;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    text?: string;
    supportingText?: string;
    shortcutText?: string;
    size?: 'sm' | 'lg';
    kind?: 'normal' | 'error' | 'warning' | 'success';
    onClick?: React.MouseEventHandler<HTMLLIElement>;
  };

  export type ListProps = React.PropsWithChildren<BaseProps>;

  export type LoginProps = BaseProps;

  export type LoginTemplateProps = {
    image: React.ReactNode;
    loginForm: React.ReactNode;
  };

  export type MenuProps = BaseProps & {
    anchorEl?: HTMLElement | null;
    anchorOrigin?: {
      vertical: 'top' | 'center' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
    transformOrigin?: {
      vertical: 'top' | 'center' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
    distance?: number;
    maxHeight?: number;
    maxWidth?: number;
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
  };

  export type ModalProps = React.PropsWithChildren<
    BaseProps & {
      visible?: boolean;
      onClose?: () => void;
    }
  >;

  export type ModalActionsProps = React.PropsWithChildren<{
    onCancelClick?: () => void;
    onActionClick?: () => void;
    onDeleteClick?: () => void;
    actionEnabled?: boolean;
    actionName?: string;
    onDelete?: boolean;
    showCancelButton?: boolean;
    actionButtonColor?: 'primary' | 'gray' | 'error';
  }>;

  export type ModalContentContainerProps = React.PropsWithChildren<
    BaseProps & {
      icon: React.ReactNode;
      userInput: string;
      onNameChange: (
        newName: string
      ) => void | React.Dispatch<React.SetStateAction<string>>;
      title: string;
      action: string;
      entityName?: string;
      onFileDropped?: (file: File | null) => void;
      fileUploadInfo?: {
        fileName: string;
        sizeInBytes: number;
        progress: number;
      };
      displayImage?: string;
    }
  >;

  export type ModalContentProps = React.PropsWithChildren<
    BaseProps & {
      children: React.ReactNode;
    }
  >;

  export type ModalFileContentProps = React.PropsWithChildren<{
    onFileDropped?: ((file: File | null) => void) | undefined;
    fileUploadInfo?: Reptile.Models.IAssetUpload;
    displayImage: string;
  }>;

  export type ModalDeleteProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onDeleteClick: () => void;
      entityName: string;
      actionEnabled: 'initial' | 'error' | 'pending' | 'done' | undefined;
      isPublication?: boolean;
    }
  >;

  export type ModalThemeProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onActionClick: () => void;
      actionEnabled: 'initial' | 'error' | 'pending' | 'done' | undefined;
      publicationName?: string | undefined;
      isActive?: boolean;
      publicationId?: string;
    }
  >;

  export type ModalThemeNewStyleProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onActionClick: () => void;
      handleTypeChange:
        | ((
            event: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
          ) => void)
        | undefined;
      handleStyleTypeChange:
        | ((
            event: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
          ) => void)
        | undefined;
      onNameChange: (newName: string) => void;
      onSelectorNameChange: (newName: string) => void;
      name: string;
      selectorName: string;
      styleType: string;
      styleTypes?: string[];
      styleTypeIndex?: number;
      type: string;
      types?: string[];
      typeIndex?: number;
    }
  >;

  export type ModalThemeSettingsProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onActionClick: () => void;
      handleChange:
        | ((
            event: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
          ) => void)
        | undefined;
      onNameChange: (newName: string) => void;
      name: string;
      publication: string;
      publications?: Reptile.Models.IAllPublications[];
      publicationIndex?: number;
      actionEnabled?: 'initial' | 'pending' | 'done' | 'error';
    }
  >;

  export type ModalSaveProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onSaveClick: () => void;
      onNameChange: (newName: string) => void;
      name: string;
    }
  >;

  export type ModalFileSaveProps = React.PropsWithChildren<
    BaseProps & {
      onCancelClick: () => void;
      onSaveClick: () => void;
      onNameChange: (newName: string) => void;
      name: string;
      onFileDropped?: (e: File | null) => void;
      fileUploadInfo?: Reptile.Models.IAssetUpload;
      displayImage: string | null;
      actionEnabled: 'initial' | 'error' | 'pending' | 'done' | undefined;
      editTheme?: Reptile.Controllers.IContentStylesController;
      isPublisher?: boolean;
      fonts?: Reptile.Models.Font[] | undefined;
      currentEntity?: Reptile.Models.IContentEntity;
      handleDeleteFont?: (id: string) => void;
      handleSaveFont?: (fontData: Reptile.Service.Font) => void;
    }
  >;

  export type ModalInputProps = React.PropsWithChildren<{
    userInput: string;
    name?: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>;

  export type ModalTitleProps = React.PropsWithChildren<{
    icon?: React.ReactNode;
    title: string | React.ReactNode;
    iconColor?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
    inline?: boolean;
  }>;

  export type MyAccountContentProps = React.PropsWithChildren<BaseProps>;

  export type NavigationSideItemType = {
    icon: string;
    path: string;
    title?: string;
    cb?: () => void;
  };

  export type NewContentButtonProps = React.PropsWithChildren<
    BaseProps & {
      title: string;
      disabled?: boolean;
    }
  >;

  export type OrganizationProps = {
    organization: Reptile.Models.OrganizationModel;
    handleDelete(id: string): void;
    handleEdit(id: string): void;
  };

  export type OrganizationContentRowProps = BaseProps & {
    organization: { value?: string; label?: string };
    handleDelete(id: string): void;
    handleEdit(id: string): void;
  };

  export type OrganizationContentProps = React.PropsWithChildren<BaseProps>;

  export type OrganizationDeleteModalProps = BaseProps & {
    onCancelClick: () => void;
    onSaveClick: () => void;
    actionEnabled: 'initial' | 'error' | 'pending' | 'done' | undefined;
  };

  export type OrganizationEditModalProps = BaseProps & {
    onCancelClick: () => void;
    onSaveClick: () => void;
    onNameChange: (newName: string) => void;
    name: string;
    title: string;
    actionEnabled: 'initial' | 'error' | 'pending' | 'done' | undefined;
  };

  export type OrganizationHeaderProps = BaseProps & {
    totalOrgs: number;
    modalAdd: () => void;
  };

  export type PageProps = React.PropsWithChildren<
    BaseProps & {
      backgroundColor?: 'default' | 'white';
    }
  >;

  export type PaymentContentProps = {
    selectedPlan?: Reptile.Models.Plan;
    boltOns?: number;
    selectedOrg?: string;

    orgs:
      | {
          label: string;
          value?: string | undefined;
        }[]
      | undefined;

    orgIndex?: number;
    subscriptionStatus: Reptile.Models.State;
    handleChange(
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      selectedIndex: number
    ): void;
    handleBoltOns(boltOns: number): void;
    handlePaymentId(id?: string): void;
  };

  export type PaymentFormProps = BaseProps & {
    boltOns?: number;
    selectedOrg?: string;

    orgs:
      | {
          label: string;
          value?: string | undefined;
        }[]
      | undefined;

    orgIndex?: number;
    subscriptionStatus: Reptile.Models.State;
    handleChange(
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      selectedIndex: number
    ): void;
    handlePaymentId(id?: string): void;
    handleBoltOns(boltOns: number): void;
  };

  export type PaymentTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type PaymentOptionsProps = BaseProps & {
    toggle: boolean;
    handleToggle: () => void;
    handleGBP: () => void;
    handleEUR: () => void;
    handleUSD: () => void;
  };

  export type PaymentPlanProps = BaseProps & {
    price: string;
    toggle: boolean;
    listInfo: string[];
    planInfo: string;
    planType: string;
    handlePayment: () => void;
  };

  export type PickYourPlanPlanProps = BaseProps & {
    basicPrice?: string;
    professionalPrice?: string;
    toggle: boolean;
    currency: string;
    plansList: Reptile.Models.PlansByCurrency;
    handlePayment: (planId: string) => void;
    handleProPayment: () => void;
    handleToggle: () => void;
    handleGBP: () => void;
    handleEUR: () => void;
    handleUSD: () => void;
  };

  export type PlanContentProps = {
    plansList: Reptile.Models.PlansByCurrency;
    toggle: boolean;
    currency: string;
    basicPrice?: string;
    professionalPrice?: string;
    handlePayment(planId: string): void;
    handleBasicPayment(): void;
    handleProPayment(): void;
    handleToggle(): void;
    handleGBP(): void;
    handleEUR(): void;
    handleUSD(): void;
  };

  export type PlanHeaderProps = BaseProps & {
    handlePayment: () => void;
    handlePlans: () => void;
  };

  export type PaymentInfoProps = BaseProps & {
    selectedPlan?: Reptile.Models.Plan;
  };

  export type PlanTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
  };

  export type PortalProps = React.PropsWithChildren<
    BaseProps & {
      active?: boolean;
    }
  >;

  export type ProgressCircleProps = BaseProps & {
    variant?: 'indeterminate' | 'determinate';
    progress?: number;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };

  export type PrototypeProps = BaseProps & {
    pin?: string;
  };

  export type PrototypeTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    content: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type PrototypeMenu = BaseProps & {
    pin: string;
    newAppName?: string;
    newCoverImage: string;
    coverImageUploadInfo?: Models.IAssetUpload;
    status?: Reptile.Models.State;
    app?: Reptile.Service.AppInstaller;
    tabValue: string;
    onFileDropped(file: File | null): void;
    onRemoveFile(): void;
    onSave(): void;
    onBuild(): void;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onEnableBuild(): boolean;
    onTabChange(event: React.SyntheticEvent, newValue: string): void;
  };

  export type ProjectCreateProgressProps = BaseProps & {
    loading?: boolean;
    error?: string;
    onHide?: () => void;
  };

  export type ProjectBoilerplateSelectProps = BaseProps & {
    projectType: 'app' | 'web';
    boilerplates: Models.IBoilerplate[];
    currentTemplates: any;
    selectedBoilerplate?: Models.IBoilerplate | null;
    onBoilerplateSelect?: (boilerplate: Models.IBoilerplate | null) => void;
  };

  export type ProjectNameEditorProps = BaseProps & {
    name: string;
    onNameChange: (name: string) => void;
  };

  export type ProjectWizardProps = BaseProps;

  export type PropertyGroupProps = React.PropsWithChildren<
    BaseProps & {
      label: string;
      widgetId?: string;
      isActive: boolean;
      idx: number;
      currentIdx?: number;
      onIndexClick(index?: number): void;
    }
  >;

  export type PublicationItemProps = BaseProps;

  export type PublishStatusKind = 'live' | 'unpublished';

  export type PublishStatusProps = BaseProps & {
    status: PublishStatusKind;
  };

  export type RegisterProps = BaseProps;

  export type RegisterTemplateProps = {
    header: React.ReactNode;
    registerDescription: React.ReactNode;
    registerCard: React.ReactNode;
  };

  export type RgbColorInputProps = BaseProps & {
    color: import('color-convert/conversions').RGB;
    alpha?: number;
    onColorChange: (color: import('color-convert/conversions').RGB) => void;
    onAlphaChange?: (alpha: number) => void;
  };

  export type ForgetPasswordSuccessProps = BaseProps & {
    navigateToLogin(): void;
  };

  export type ForgetPasswordTemplateProps = {
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
  };

  export type QRCodeProps = BaseProps & {
    value: string;
    src: string;
    height?: number;
    width?: number;
  };

  export type ResetPasswordTemplateProps = {
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
  };

  export type ResetPasswordSuccessProps = BaseProps & {
    navigateToLogin(): void;
  };

  export type SaturationPickerProps = BaseProps & {
    hue: number;
    saturation: number;
    value: number;
    onPick?: (saturation: number, value: number) => void;
  };

  export type StatusLightColorType = 'green' | 'red';
  export type SizeMeasure = 'Unset' | 'px' | '%' | 'pt' | 'em';

  export type SizePropertyProps = BaseProps;

  export type SliderPropertyProps = BaseProps;

  export type SliderProps = BaseProps & {
    minValue?: number;
    maxValue: number;
    value: number;
    onSliderPick?: (value: number) => void;
  };

  export type SpacingPropertyProps = BaseProps;

  export type StatusLightProps = BaseProps & {
    size?: number;
    status: StatusLightColorType;
  };

  export type SettingsMenuTitleProps = BaseProps;

  export type SidebarNavigationProps = BaseProps & {
    selected: 'home' | 'setup' | 'launch';
    onClick: (type: 'home' | 'setup' | 'launch') => void;
  };

  export type StepperProps = BaseProps & {
    activeStates: string[];
    steps: string[];
  };

  export type ShowHidePasswordProps = {
    handleClick: () => void;
    visibility: boolean;
  };

  export type TabProps = BaseProps & {
    label: string;
    selected?: boolean;
    disabled?: boolean;
    bold?: boolean;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      label: string
    ) => void;
    type?: 'default' | 'raised';
  };

  export type TabPanelProps = React.PropsWithChildren<BaseProps>;

  export type TabPanelsProps = React.PropsWithChildren<
    BaseProps & {
      activeIndex: number;
    }
  >;

  export type TabsProps = React.PropsWithChildren<
    BaseProps & {
      onSelect?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        idx: number
      ) => void;
      selectedTabIndex?: number;
      type?: 'default' | 'raised';
    }
  >;

    export type TagProps = BaseProps & {
        label: string;
        size?:
            | 'primary'
            | 'small'
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'extra-small'
            | 'medium'
            | 'large'
            | 'extra-large';
        tagColor?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
        color?: TextColorType;
        type?:
            | 'light-circle'
            | 'light-circle-outline'
            | 'dark-circle'
            | 'light-square'
            | 'mid-square'
            | 'dark-square';
    };

  export type TagsCollectionProps = BaseProps & {
    editable?: boolean;
    disabled?: boolean;
    tags: string[];
    onTagAdd?: (tag: string) => void;
    onTagUpdate?: (index: number, value: string) => void;
    onTagRemove?: (index: number) => void;
  };

  export type TemplateBodyProps = BaseProps;

  export type TemplateBuilderTemplateProps = {
    header: React.ReactNode;
    sideMenu: React.ReactNode;
    treeView: React.ReactNode;
    sidebarNavigation?: React.ReactNode;
    body: React.ReactNode;
    sidePanel: React.ReactNode;
    helpMenu: React.ReactNode;
  };

  export type TemplateBuilderSidePanelProps = BaseProps;

  export type TextAreaProps = BaseProps & {
    defaultValue?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    type?: string;
    value?: string;
    label?: string;
    disabled?: boolean;
  };

  type TextColorType =
    | 'primary'
    | 'black'
    | 'white'
    | 'light-gray'
    | 'gray'
    | 'dark-gray'
    | 'success'
    | 'warning'
    | 'light-error'
    | 'error';

  export type TextEditorSize = 'full' | 'tablet' | 'mobile';

    export type TextProps = BaseProps & {
        children: string;
        color?: TextColorType;
        inline?: boolean;
        maxLength?: number;
        size?:
            | 'primary'
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'extra-small'
            | 'small'
            | 'medium'
            | 'large'
            | 'extra-large';
        weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    };

  export type ThemesFilterProps = BaseProps & {
    filter: string;
    filters: string[];
    filterIndex?: number;
    handleMeasureChange: (
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number
    ) => void;
  };

  export type ThemeStyleDisplayProps = React.PropsWithChildren<
    BaseProps & {
      rules?: Reptile.Models.Rule[];
      selectorType?: string;
      handleSelectorType(e: string): void;
    }
  >;

  export type ThreeDotMenuProps = React.PropsWithChildren<
    BaseProps & {
      title: string;
      open?: boolean;
      dropDirection?: 'up' | 'down';
      offset?: number;
      disabled?: boolean;
      onChange?: (open: boolean) => void;
    }
  >;

  export type ToggleProps = BaseProps & {
    active?: boolean;
    size?: 'md' | 'sm';
    onClick?: (e: React.MouseEvent<HTMLDivElement>, active: boolean) => void;
  };

  export type TogglePropertyProps = BaseProps;

  export type ToolbarCheckboxProps = BaseProps & {
    checked?: boolean;
    icon: React.ReactNode;
    tooltip?: string;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      checked: boolean
    ) => void;
  };

  export type TooltipProps = React.PropsWithChildren<
    BaseProps & {
      title: string;
    }
  >;

  export type TreeNode = {
    id: string;
    label: string;
    icon?: string;
    selectable?: boolean;
    selected: boolean;
    actions: [
      {
        visible: boolean;
        command: (id: string) => void;
        icon: string;
        color: 'primary' | 'gray' | 'error' | 'warning' | 'success';
      }
    ];
    loading?: boolean;
    isActive: boolean;
  };

  export type TreeNodeListProps = React.PropsWithChildren<BaseProps>;

  export type TreeNodeProps = BaseProps & {
    id: string;
    nodeListClassName?: string;
    expanded?: string;
    isExpanded: (id: string) => boolean;
    onClick?: (id: string) => void;
    onDrop?: (id: string) => void;
    getNodeProps: (itemId: string) => Reptile.Props.TreeNode;
    getChildrenIds: (id: string) => string[];
  };

  export type TreeViewProps = BaseProps & {
    title?: string;
    nodeClass?: string;
    nodeListClass?: string;
    titleClassName?: string;
  };

  export type UploadProfileModalProps = BaseProps & {
    imageUpload(file: File | null): void;
    handleModal(): void;
  };

  export type UpgradeAccountModalProps = BaseProps & {
    line1Text: string;
    line2Text: string;
    onUpgradeModal(): void;
    navigateToPlan(): void;
  };

  export type WidgetItemContext = {
    element: React.FunctionComponent;

    kind: string;
  };

  export type WidgetMenuActionsProps = BaseProps;

  export type WidgetMenuItemProps = BaseProps & {
    name: string;
    Icon: React.FunctionComponent<React.SVGProps<React.ReactSVGElement>>;
    widget: React.FunctionComponent | Reptile.Models.WidgetItem;
    kind: string;
  };

  export type WidgetOverlayProps = React.PropsWithChildren<
    BaseProps & {
      id: string;
      disabled?: boolean;
      isTop?: boolean;
      isMaxHeight?: boolean;
      mode?: 'normal' | 'grid';
      selected?: boolean;
      onSelect?: (
        event: React.MouseEvent<HTMLDivElement>,
        widgetId: string
      ) => void;
      onDuplicate?: (
        event: React.MouseEvent<HTMLLIElement>,
        widgetId: string
      ) => void;
      onDelete?: (
        event: React.MouseEvent<HTMLLIElement>,
        widgetId: string
      ) => void;
    }
  >;

  export type WidgetPropertyGeneratorProps = BaseProps & {
    isFromAppBuild?: boolean;
  };

  export type WidgetProps = {
    widget?: Models.IWidget;
  };

  export type AppWidgetProps = {
    widgetData: Models.IWidget;
    widgetHTML: string;
  };

  export type WidgetSkeletonProps = {
    loading?: boolean;
    count?: number;
  };

  export type WidgetStyleContainerProps = React.PropsWithChildren<BaseProps>;

  export type WidgetsCollectionProps = BaseProps;

  export type WizardActionsProps = BaseProps & {
    stepKind?: 'first' | 'last';
    canGoNext?: boolean;
    onBack?: () => void;
    onNext?: () => void;
  };

  export type WysiwygTemplateProps = {
    header: React.ReactNode;
    treeView: React.ReactNode;
    navigationBar: React.ReactNode;
    content: React.ReactNode;
    sidebarTitle: React.ReactNode;
    sidebarTabs: Array<{ title: string; element: React.ReactNode }>;
    sidebarActions: React.ReactNode;
    helpMenu: React.ReactNode;
  };
}
