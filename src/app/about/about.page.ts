import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent, IonHeader, IonToolbar, IonIcon, IonButton
  ]
})
export class AboutPage implements OnInit {

  // Mobile menu state
  mobileMenuOpen: boolean = false;

  // Stats
  stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '24/7', label: 'Support' },
    { value: '100%', label: 'Satisfaction' }
  ];

  // Core Values
  coreValues = [
    { icon: 'shield-checkmark-outline', title: 'Integrity', description: 'We are honest and transparent in every interaction.' },
    { icon: 'bulb-outline', title: 'Innovation', description: 'We use the latest technology for smart solutions.' },
    { icon: 'people-outline', title: 'Customer First', description: 'Your satisfaction is our top priority.' },
    { icon: 'medal-outline', title: 'Quality', description: 'We never compromise on the quality of our work.' }
  ];

  // Why Choose Us
  whyChooseUs = [
    { icon: 'pricetag-outline', title: 'Affordable Pricing', description: 'Competitive prices without hidden costs.' },
    { icon: 'flash-outline', title: 'Fast Installation', description: 'Quick turnaround times for all projects.' },
    { icon: 'warranty-outline', title: '12-Month Warranty', description: 'All work is covered by a full warranty.' },
    { icon: 'chatbubbles-outline', title: 'Support', description: 'We offer after-sales support and guidance.' }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

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
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() {
    this.router.navigate(['/home']);
    this.closeMenu();
  }

  navigateToServices() {
    this.router.navigate(['/services']);
    this.closeMenu();
  }

  navigateToBook() {
    this.router.navigate(['/booking']);
    this.closeMenu();
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
    this.closeMenu();
  }

  // Service navigation methods
  navigateToCCTV() {
    this.router.navigate(['/cctv-installation']);
    this.closeMenu();
  }

  navigateToVehicleSound() {
    this.router.navigate(['/vehicle-sound']);
    this.closeMenu();
  }

  navigateToWiFi() {
    this.router.navigate(['/wifi-installation']);
    this.closeMenu();
  }

  navigateToEventSound() {
    this.router.navigate(['/event-sound']);
    this.closeMenu();
  }

  navigateToTransportation() {
    this.router.navigate(['/transportation']);
    this.closeMenu();
  }

  navigateToSystemHire() {
    this.router.navigate(['/system-hire']);
    this.closeMenu();
  }
}