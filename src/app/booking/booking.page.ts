// booking.page.ts - Complete with proper initialization and Standalone Imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Import ONLY the standalone Ionic components used in the booking page
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonInput, IonSelect, IonSelectOption, IonTextarea, IonItem, 
  IonLabel, IonList, IonIcon, IonGrid, IonRow, IonCol 
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
    // Add all Ionic components here
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonInput, IonSelect, IonSelectOption, IonTextarea, IonItem, 
    IonLabel, IonList, IonIcon, IonGrid, IonRow, IonCol
  ]
})
export class BookingPage implements OnInit, AfterViewInit {
  
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

  // Particles for background effect
  particles: number[] = [];

  // Loading state
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set min date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Generate particles
    this.particles = Array(20).fill(0);
    
    // Show loading for a moment then hide
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  ngAfterViewInit() {
    // Trigger scroll animations after view is ready
    setTimeout(() => {
      this.checkScrollAnimations();
    }, 500);
  }

  // ============================================
  // SCROLL HANDLER FOR ANIMATIONS
  // ============================================
  
  onScroll(event: any) {
    this.checkScrollAnimations();
  }

  checkScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-child');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || 0;

    scrollElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const scrollPosition = rect.top + scrollY;
      const offset = 150;

      if (scrollY + windowHeight - offset > scrollPosition) {
        el.classList.add('visible');
      }
    });
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

  toggleMenu() {
    console.log('Menu toggled');
    // Implement mobile menu logic here
  }
}