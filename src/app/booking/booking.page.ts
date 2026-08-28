// booking.page.ts - Optimized for Speed & Mobile
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Import ONLY the components used in the HTML (Header, Footer, Icons, Buttons)
import { 
  IonContent, IonHeader, IonToolbar, IonButton, IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent, IonHeader, IonToolbar, IonButton, IonIcon
  ]
})
export class BookingPage implements OnInit {
  
  // Booking data model
  bookingData = {
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    location: '',
    message: ''
  };

  // Services list for dropdown
  servicesList = [
    { value: 'cctv-installation', label: 'CCTV Installation' },
    { value: 'vehicle-sound', label: 'Vehicle Sound Systems' },
    { value: 'wifi-installation', label: 'WiFi Installation' },
    { value: 'event-sound', label: 'Event Sound Systems' },
    { value: 'transportation', label: 'Transportation Services' },
    { value: 'system-hire', label: 'System Hire' },
    { value: 'other', label: 'Other - Please specify' }
  ];

  // Service map for WhatsApp messages
  serviceMap: { [key: string]: string } = {
    'cctv-installation': 'CCTV Installation',
    'vehicle-sound': 'Vehicle Sound Systems',
    'wifi-installation': 'WiFi Installation',
    'event-sound': 'Event Sound Systems',
    'transportation': 'Transportation Services',
    'system-hire': 'System Hire',
    'other': 'Other Service'
  };

  // WhatsApp number
  whatsappNumber: string = '27670680043';
  
  // Min date for date picker (today)
  minDate: string = '';
  
  // Submission state
  isSubmitting: boolean = false;

  // Mobile menu state
  mobileMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set min date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  
  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // ============================================
  // FORM SUBMISSION
  // ============================================
  
  submitBooking() {
    this.isSubmitting = true;
    
    // Build the WhatsApp message
    const message = this.buildWhatsAppMessage();
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form after a delay
    setTimeout(() => {
      this.resetForm();
      this.isSubmitting = false;
    }, 2000);
  }

  // ============================================
  // BUILD WHATSAPP MESSAGE
  // ============================================
  
  buildWhatsAppMessage(): string {
    const serviceLabel = this.serviceMap[this.bookingData.service] || this.bookingData.service;
    
    let message = `🔹 *NEW BOOKING REQUEST* 🔹\n\n`;
    message += `👤 *Name:* ${this.bookingData.fullName || 'Not provided'}\n`;
    message += `📞 *Phone:* ${this.bookingData.phone || 'Not provided'}\n`;
    message += `📧 *Email:* ${this.bookingData.email || 'Not provided'}\n`;
    message += `🔧 *Service:* ${serviceLabel}\n`;
    message += `📅 *Date:* ${this.bookingData.date || 'Not specified'}\n`;
    message += `⏰ *Time:* ${this.bookingData.time || 'Not specified'}\n`;
    message += `📍 *Location:* ${this.bookingData.location || 'Not provided'}\n`;
    
    if (this.bookingData.message) {
      message += `\n📝 *Message:*\n${this.bookingData.message}\n`;
    }
    
    message += `\n---\nSent from SHESHA & JOBELA DIGITAL Booking Form`;
    
    return message;
  }

  // ============================================
  // RESET FORM
  // ============================================
  
  resetForm() {
    this.bookingData = {
      fullName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      location: '',
      message: ''
    };
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToServices() {
    this.router.navigate(['/services']);
  }

  navigateToEstimator() {
    this.router.navigate(['/estimator']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToCCTV() {
    this.router.navigate(['/cctv-installation']);
  }

  navigateToVehicleSound() {
    this.router.navigate(['/vehicle-sound']);
  }

  navigateToWiFi() {
    this.router.navigate(['/wifi-installation']);
  }

  navigateToEventSound() {
    this.router.navigate(['/event-sound']);
  }

  navigateToTransportation() {
    this.router.navigate(['/transportation']);
  }

  navigateToSystemHire() {
    this.router.navigate(['/system-hire']);
  }
}