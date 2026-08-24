import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ============================================
// ICON IMPORTS
// ============================================

// Navigation & Actions
import { 
  callOutline, 
  menuOutline, 
  playCircleOutline, 
  arrowForwardOutline, 
  chevronBackOutline,
  chevronForwardOutline,
  chatbubbleOutline,
  sendOutline,
  arrowDownOutline,
  gridOutline,
  calendarOutline,
  closeOutline,
  handLeftOutline,
  eyeOutline
} from 'ionicons/icons';

// Services
import { 
  businessOutline, 
  peopleOutline, 
  bedOutline, 
  videocamOutline,
  musicalNotesOutline,
  wifiOutline,
  megaphoneOutline,
  carOutline,
  constructOutline,
  swapHorizontalOutline
} from 'ionicons/icons';

// Features & Info
import { 
  cubeOutline, 
  locationOutline, 
  mailOutline,
  shieldCheckmarkOutline,
  timeOutline,
  headsetOutline,
  heartOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  closeCircle,
  alertCircleOutline,
  homeOutline,
  resizeOutline,
  optionsOutline,
  hardwareChipOutline,
  cloudOutline,
  documentTextOutline,
  rocketOutline,
  medalOutline,
  informationCircleOutline,
  helpCircleOutline,
  phonePortraitOutline,
  navigateOutline,
  mapOutline,
  pinOutline,
  keyOutline,
  lockClosedOutline,
  shieldOutline
} from 'ionicons/icons';

// Social Media
import { 
  logoFacebook,
  logoInstagram,
  logoWhatsapp,
  logoYoutube
} from 'ionicons/icons';

// Other - Filled Versions
import { 
  playCircle,
  calculatorOutline,
  personOutline,
  calendar,
  star,
  shieldCheckmark,
  videocam,
  call,
  mail,
  wifi,
  home,
  business,
  time,
  location,
  construct,
  car,
  musicalNotes,
  megaphone,
  chatbubblesOutline,
  checkbox,
  checkboxOutline,
  add,
  remove,
  chevronDownOutline,
  chevronUpOutline,
  alertCircle,
  trashOutline,
  settingsOutline,
  refreshOutline,
  downloadOutline,
  arrowUpOutline,
  cloudUploadOutline,
  cloudDownloadOutline
} from 'ionicons/icons';

// Register all icons
addIcons({
  // ============================================
  // NAVIGATION & ACTIONS
  // ============================================
  'call-outline': callOutline,
  'menu-outline': menuOutline,
  'play-circle-outline': playCircleOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'chevron-back-outline': chevronBackOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'chatbubble-outline': chatbubbleOutline,
  'send-outline': sendOutline,
  'arrow-down-outline': arrowDownOutline,
  'grid-outline': gridOutline,
  'calendar-outline': calendarOutline,
  'close-outline': closeOutline,
  'hand-left-outline': handLeftOutline,
  'eye-outline': eyeOutline,
  
  // ============================================
  // SERVICES
  // ============================================
  'business-outline': businessOutline,
  'people-outline': peopleOutline,
  'bed-outline': bedOutline,
  'videocam-outline': videocamOutline,
  'musical-notes-outline': musicalNotesOutline,
  'wifi-outline': wifiOutline,
  'megaphone-outline': megaphoneOutline,
  'car-outline': carOutline,
  'construct-outline': constructOutline,
  'swap-horizontal-outline': swapHorizontalOutline,
  
  // ============================================
  // FEATURES & INFO
  // ============================================
  'cube-outline': cubeOutline,
  'location-outline': locationOutline,
  'mail-outline': mailOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'time-outline': timeOutline,
  'headset-outline': headsetOutline,
  'heart-outline': heartOutline,
  'checkmark-circle': checkmarkCircle,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'close-circle': closeCircle,
  'alert-circle-outline': alertCircleOutline,
  'home-outline': homeOutline,
  'resize-outline': resizeOutline,
  'options-outline': optionsOutline,
  'hardware-chip-outline': hardwareChipOutline,
  'cloud-outline': cloudOutline,
  'document-text-outline': documentTextOutline,
  'rocket-outline': rocketOutline,
  'medal-outline': medalOutline,
  'information-circle-outline': informationCircleOutline,
  'help-circle-outline': helpCircleOutline,
  'phone-portrait-outline': phonePortraitOutline,
  'navigate-outline': navigateOutline,
  'map-outline': mapOutline,
  'pin-outline': pinOutline,
  'key-outline': keyOutline,
  'lock-closed-outline': lockClosedOutline,
  'shield-outline': shieldOutline,
  
  // ============================================
  // SOCIAL MEDIA
  // ============================================
  'logo-facebook': logoFacebook,
  'logo-instagram': logoInstagram,
  'logo-whatsapp': logoWhatsapp,
  'logo-youtube': logoYoutube,
  
  // ============================================
  // OTHER - FILLED VERSIONS
  // ============================================
  'play-circle': playCircle,
  'calculator-outline': calculatorOutline,
  'person-outline': personOutline,
  'calendar': calendar,
  'star': star,
  'shield-checkmark': shieldCheckmark,
  'videocam': videocam,
  'call': call,
  'mail': mail,
  'wifi': wifi,
  'home': home,
  'business': business,
  'time': time,
  'location': location,
  'construct': construct,
  'car': car,
  'musical-notes': musicalNotes,
  'megaphone': megaphone,
  'chatbubbles-outline': chatbubblesOutline,
  'checkbox': checkbox,
  'checkbox-outline': checkboxOutline,
  'add': add,
  'remove': remove,
  'chevron-down-outline': chevronDownOutline,
  'chevron-up-outline': chevronUpOutline,
  'alert-circle': alertCircle,
  'trash-outline': trashOutline,
  'settings-outline': settingsOutline,
  'refresh-outline': refreshOutline,
  'download-outline': downloadOutline,
  'arrow-up-outline': arrowUpOutline,
  'cloud-upload-outline': cloudUploadOutline,
  'cloud-download-outline': cloudDownloadOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});