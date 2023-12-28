// convert the ./en.js file to es.js English to Spanish as a whole

const overview = {
  botName: 'Nombre del Bot',
  botDescription: 'Descripción del Bot',
  botLanguage: 'Idioma del Bot',
  botTimezone: 'Zona horaria del Bot',
  botAccent: 'Acento del Bot',
  botVoice: 'Voz del Bot',
  botUpdateSuccess: 'Bot actualizado con éxito',
  english: 'Inglés',
  spanish: 'Español',
  american: 'Americano',
  british: 'Británico',
  australian: 'Australiano',
  latam: 'Latinoamericano',
  castilian: 'Castellano',
  male: 'Masculino',
  female: 'Femenino',
};

const headerData = {
  poweredBy: 'Desarrollado por',
  bots: 'Bots',
  overview: 'Resumen',
  train: 'Entrenar',
  intents: 'Intenciones',
  entities: 'Entidades',
  flow: 'Flujo',
  logout: 'Cerrar sesión',
  users: 'Usuarios',
  campaigns: 'Campañas',
  appearance: 'Apariencia',
  webhooks: 'Webhooks',
  rules: 'Reglas',
};
const langOptions = {
  language: 'Idioma',
  chooseLanguage: 'Elige el idioma',
  english: 'Inglés',
  spanish: 'Español',
  ok: 'OK',
  langChangeSuccess: 'Idioma cambiado con éxito',
};

const login = {
  loginToYourAccount: 'Inicia sesión en tu cuenta',
  toBuildCoolVoiceBots: 'para construir bots de voz geniales ✌️',
  username: 'Nombre de usuario',
  password: 'Contraseña',
  login: 'Iniciar sesión',
};

const fabButtons = {
  update: 'Actualizar',
  next: 'Siguiente',
  trainBot: 'Entrenar Bot',
  publishBot: 'Publicar Bot',
  training: 'Capacitación',
};

const bots = {
  createBot: 'Crear Bot',
  creatingBot: 'Creando Bot ...',
};

const intents = {
  createIntent: 'Crear Intención',
  updateIntent: 'Actualizar Intención',
  intentName: 'Nombre de la Intención',
  intentDescription: 'Descripción de la Intención',
  intentType: 'Tipo de Intención',
  flowing: 'Fluyendo',
  ebbing: 'No fluyendo',
  ebbShift: 'Cambio de flujo',
  ebbAction: 'Acción de flujo',
  goToPrevNode: 'Ir al nodo anterior',
  stayOnNode: 'Permanecer en el nodo',
  doNothing: 'No hacer nada',
  trainingExamples: 'Ejemplos de entrenamiento',
  minTrainingExamplesWarning:
    'Se requieren al menos 2 ejemplos de entrenamiento',
  botTrainingInProgress: 'Entrenamiento del bot en curso',
  botTrainingAlertWarning1:
    'El entrenamiento del bot puede tardar unos minutos en completarse.',
  botTrainingAlertWarning2:
    'No cierre esta ventana / actualice / navegue hasta que se complete el entrenamiento.',
  deleteIntent: 'Eliminar intención',
  notAllowed: 'No permitido',
  notAllowedMessage:
    'La intención se está utilizando en otros lugares. Por favor retire las conexiones.',
  cancel: 'Cancelar',
  minTrainingBotsWarning:
    'Necesitas al menos dos intentos para entrenar al robot.',
  nonFlowingIntent: 'Intención que no fluye',
  selectAction: 'Seleccione la acción',
  enterIntentName: 'Ingrese el nombre de la intención',
};

const fallback = {
  configureFallback: 'Configurar Fallback',
  fallbackMessageType: 'Tipo de mensaje de fallback',
  fallbackLimit: 'Límite de fallback',
  defaultFallbackActionType: 'Tipo de acción de fallback predeterminado',
  addFallbackMessage: 'Agregar mensaje de fallback',
  addFallbackAction: 'Agregar acción de fallback',
  actionType: 'Tipo de acción',
};

const menuOptions = {
  playAudio: 'Reproducir audio',
  speakText: 'Hablar texto',
  processSpeech: 'Procesar discurso',
  transferCall: 'Transferir llamada',
  hangupCall: 'Colgar llamada',
};

const uploadAudioOptions = {
  uploadAudio: 'Subir audio',
  uploading: 'Subiendo ...',
  uploadFileThatAre: 'Subir archivo que son',
  uniqueName: 'Nombre único (que no esté ya en la lista)',
  lessThan2MB: 'Menos de 2 MB',
  samplingRate: 'Tasa de muestreo de 8 kHz, 16 bits PCM, mono',
  ethicalContent: 'Contenido ético',
};

const modalOptions = {
  addNode: 'Agregar nodo',
  updateNode: 'Actualizar nodo',
  deleteNode: 'Eliminar nodo',
  uploadAudio: 'Subir audio',
  selectedAudioFiles: 'Archivos de audio seleccionados',
  minAudioFiles: 'Se requiere un mínimo de 1 archivo de audio',
  maxAudioFiles: 'Se permite un máximo de 5 archivos de audio',
  selectedIntents: 'Intenciones seleccionadas',
  minIntents: 'Se requiere un mínimo de 1 intención',
  atleastOneFlowingIntent: 'Se requiere al menos 1 intención fluyendo',
  flowingIntents: 'Intenciones fluyendo',
  ebbingIntents: 'Intenciones no fluyendo',
  transferContext: 'Contexto de transferencia',
  transferExtension: 'Extensión de transferencia',
  characterCount: 'Número de letras',
};

const rules = {
  createRule: 'Crear regla',
  rules: 'Reglas',
  updateRule: 'Actualizar regla',
  deleteRule: 'Eliminar regla',
  entityName: 'Nombre de la entidad',
  roleName: 'Nombre del rol',
  groupName: 'Nombre del grupo',
};

const entities = {
  entities: 'Entidades',
  roles: 'Roles',
  groups: 'Grupos',
  builtIn: 'Incorporado',
  createEntity: 'Crear entidad',
  createRoles: 'Crear roles',
  createGroup: 'Crear grupo',
  save: 'Salvar',
};

const webhooks = {
  webhooks: 'Webhooks',
  createWebhook: 'Crear Webhook',
  type: 'Tipo',
  timeout: 'Tiempo de espera',
  seconds: 'segundos',
  description: 'Descripción',
  key: 'Clave',
  value: 'Valor',
  addTo: 'Añadir a',
  deleteWebhook: 'Eliminar Webhook',
  updateWebhook: 'Actualizar Webhook',
  noAuthMessage:
    'Esta solicitud no utiliza ninguna autorización. Aprender más acerca de',
  headers: 'encabezados',
  enterWebhookName: 'Ingrese el nombre del webhook',
};

const trainNavigation = {
  settings: 'Configuraciones',
};

const settings = {
  speechRecognitionSettings: 'Configuración de reconocimiento de voz',
  endpointing: 'Endpointing',
  milliseconds: 'ms',
  addWord: 'Agregar palabra',
  interruptableRecognition: 'Reconocimiento interrumpible',
  submit: 'Entregar',
  recognitionDelay: 'Retraso de reconocimiento',
  boostWords: 'Impulsar palabras',
  addWords: 'Agregar palabras',
  updateFallbackMessage: 'Actualizar Fallback',
};

const users = {
  createUser: 'Crear usuario',
  username: 'Nombre de usuario',
  fullname: 'Nombre completo',
  organization: 'Organización',
  usage: 'Uso',
  usedUtilization: 'Utilización utilizada',
  allocatedUtilization: 'Utilización asignada',
  allocatedNextCycle: 'Minutos asignados para el próximo ciclo de facturación',
  billingReviewsOn: `Las revisiones de facturación se renuevan el`,
  actions: ' ',
  firstname: 'Nombre de pila',
  lastname: 'Apellido',
  organizationRole: 'Rol de la organización',
  email: 'Correo electrónico',
  passoword: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  minutesEachBillingCycle: 'Minutos cada ciclo de facturación',
  minutes: 'Minutos',
  billingRenewsOn: 'La facturación se renueva el',
  ofEveryMonth: 'de cada mes',
  defaultProfileLanguage: 'Idioma de perfil predeterminado',
  updateUser: 'Actualizar usuario',
  minutesAllocated: 'Minutos asignados',
  billings: 'Facturación',
  preferences: 'Preferencias',
  billingType: 'Tipo de facturación',
  nonRecurring: 'No recurrente',
  recurring: 'Recurrente',
  expiryDate: 'Fecha de caducidad',
  back: 'Espalda',
};

const campaigns = {
  campaignId: 'ID de campaña',
  createCampaign: 'Crear campaña',
  delete: 'Eliminar',
  botToBeLinked: 'Bot a vincular',
  create: 'Crear',
  deleteCampaign: 'Eliminar campaña',
  campaignName: 'Nombre de campaña',
  copy: 'COPIAR',
  copied: 'COPIADO',
};

const appearance = {
  colors: 'Colores',
  primary: 'Primario',
  secondary: 'Secundario',
  tertiary: 'Terciario',
  typeography: 'Tipografía',
  heading: 'Encabezamiento',
  body: 'Cuerpo',
  links: 'Enlaces',
  buttons: 'Botones',
  logo: 'Logo',
  clickHereToDropAFileOrUpload:
    'Haga clic aquí para soltar un archivo o cargar',
  rounded: 'Redondeado',
  rectangle: 'Rectángulo',
  favicon: 'Favicon',
  title: 'Título',
  ctxt: '(Botones CTA, botones resaltados, números de página seleccionados, textos resaltados)',
  success: 'Éxito',
  warning: 'Advertencia',
  error: 'Error',
  info: 'Información',
  normal: 'Normal',
  subtext: 'Subtexto',
};

const deleteAlert = {
  deleteAlertMessage: '¿Está seguro? No puedes deshacer esta acción después.',
};

const profile = {
  profile: 'Perfil',
  helpAndSupport: 'Ayuda y soporte',
  logout: 'Cerrar sesión',
  darkmode: 'Modo oscuro',
  lightmode: 'Modo de luz',
  role: 'Papel',
  email: 'Correo electrónico',
  verify: 'Verificar e-mail',
  changePassword: 'Cambia la contraseña',
  updateProfile: 'Actualización del perfil',
  changeEmail: 'Cambiar e-mail',
  changeLanguage: 'Cambiar idioma',
  frequency: 'Frecuencia de facturación',
};

const forgotPassword = {
  forgotPassword: '¿Olvidaste tu contraseña?',
  sendResetLink: 'Enviar enlace de restablecimiento',
};

const resetPassword = {
  resetPassword: 'Restablecer la contraseña',
  reset: 'Restablecer',
  newPassword: 'Nueva contraseña',
  confirmNewPassword: 'Confirmar nueva contraseña',
};

const setup = {
  apiKey: 'Clave API',
  show: 'Espectáculo',
  copy: 'Copiar',
  copied: 'Copiado',
  regenerate: 'Regenerar',
  regenerated: 'Regenerado',
  hide: 'Esconder',
  setup: 'Configuración',
  allowAccessFrom: 'Permitir el acceso desde',
  getStarted: 'Empezar',
  downloadClient: 'Descargar cliente',
  anywhere: 'En cualquier lugar',
  custom: 'Costumbre',
  architecture: 'Arquitectura',
  integration: 'Integración de Asterisk',
  save: 'Guardar',
  docs: 'Docs',
};

const serverMessages = {
  USER_NOT_FOUND: 'Usuario no encontrado',
  INCORRECT_PASSWORD: 'Contraseña incorrecta',
  USER_DISABLED: 'El usuario está deshabilitado',
  USER_CREATION_FAILED: 'No se pudo crear el usuario',
  USER_CREATION_SUCCESS: 'Usuario creado con éxito',
  UNAUTHORIZED: 'No autorizado',
  TARGET_USERNAME_EMPTY: 'El nombre de usuario de destino está vacío',
  BILLING_NOT_FOUND: 'Facturación no encontrada',
  USER_DISABLED_SUCCESS: 'Usuario deshabilitado exitosamente',
  USERNAME_EMPTY: 'Se requiere nombre de usuario',
  USERNAME_WRONG_FORMAT: 'Nombre de usuario no válido',
  USERNAME_WRONG_LENGTH: 'Nombre de usuario no válido',
  USERNAME_EXISTS: 'Nombre de usuario ya está en uso',
  EMAIL_EMPTY: 'correo electronico es requerido',
  EMAIL_WRONG_FORMAT: 'Email inválido',
  ROLE_EMPTY: 'Se requiere rol',
  ROLE_WRONG_FORMAT: 'Rol no válido',
  FIRST_NAME_EMPTY: 'Se requiere el primer nombre',
  LAST_NAME_EMPTY: 'El apellido es obligatorio',
  PASSWORD_EMPTY: 'se requiere contraseña',
  PASSWORD_WRONG_LENGTH: 'La contraseña debe tener entre 8 y 20 caracteres',
  PASSWORD_WRONG_FORMAT: 'Contraseña invalida',
  PASSWORD_MISSMATCH: 'Las contraseñas no coinciden',
  BOTNAME_EMPTY: 'El nombre del bot es obligatorio',
  BILLING_TYPE_EMPTY: 'Se requiere tipo de facturación',
  LANGUAGE_INVALID: 'El idioma debe ser inglés o español.',
  BILLING_TYPE_INVALID:
    'El tipo de facturación debe ser recurrente o no recurrente.',
  MINUTES_ALLOCATED_INVALID:
    'Los minutos asignados son necesarios para la facturación recurrente',
  MINUTES_EACH_CYCLE_INVALID:
    'Se requieren minutos por ciclo para la facturación no recurrente',
};

const es = {
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
  ...forgotPassword,
  ...resetPassword,
  ...setup,
  ...serverMessages,
};

export default es;
