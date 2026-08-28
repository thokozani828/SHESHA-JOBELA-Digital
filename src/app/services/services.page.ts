// services.page.ts - Optimized for Speed & Mobile Menu
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Import ONLY what is used in the HTML
import { 
  IonContent, IonHeader, IonToolbar, IonIcon, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    IonContent, IonHeader, IonToolbar, IonIcon, IonButton
  ]
})
export class ServicesPage implements OnInit {
  
  // Mobile Menu State
  mobileMenuOpen: boolean = false;

  // Modal state
  showServiceModal: boolean = false;
  selectedService: any = null;

  // Service data with detailed info and images (ALL LOCAL PATHS)
  servicesData = [
    {
      icon: 'videocam-outline',
      title: 'CCTV Installation',
      description: 'Professional security camera installation for homes and businesses. HD quality with remote viewing.',
      detailedDescription: 'We provide comprehensive CCTV installation services tailored to your specific security needs. Our team installs high-definition cameras with remote viewing capabilities, night vision, and motion detection. Whether for home or business, we ensure complete coverage and peace of mind.',
      price: 'R1,500',
      route: 'cctv-installation',
      gradient: 'linear-gradient(135deg, #d4a02b, #e8c34a)',
      badge: 'Most Popular',
      image: 'assets/images/service-cctv.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-cctv-1.jpg', // LOCAL IMAGE
        'assets/images/service-cctv-2.jpg', // LOCAL IMAGE
        'assets/images/service-cctv-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'HD cameras with night vision',
        'Remote viewing via mobile app',
        'Motion detection alerts',
        'Professional installation',
        '24/7 recording capability',
        '12-month warranty'
      ]
    },
    {
      icon: 'musical-notes-outline',
      title: 'Vehicle Sound Systems',
      description: 'Upgrade your ride with premium sound systems. Subwoofers, amplifiers, and complete installations.',
      detailedDescription: 'Transform your driving experience with our premium vehicle sound system installations. We offer complete audio upgrades including subwoofers, amplifiers, component speakers, and sound deadening. Our experts ensure crystal clear audio and powerful bass for any vehicle.',
      price: 'R2,000',
      route: 'vehicle-sound',
      gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)',
      badge: 'Premium',
      image: 'assets/images/service-vehicle-sound.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-vehicle-sound-1.jpg', // LOCAL IMAGE
        'assets/images/service-vehicle-sound-2.jpg', // LOCAL IMAGE
        'assets/images/service-vehicle-sound-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'Premium subwoofer installation',
        'Amplifier setup and tuning',
        'Component speaker systems',
        'Sound deadening options',
        'Bluetooth connectivity',
        'Custom audio tuning'
      ]
    },
    {
      icon: 'wifi-outline',
      title: 'WiFi Installation',
      description: 'Reliable WiFi setup for homes and offices. Mesh networks, extenders, and full coverage solutions.',
      detailedDescription: 'Get reliable, high-speed WiFi coverage throughout your home or office. We install mesh networks, WiFi extenders, and enterprise-grade access points to eliminate dead zones. Our solutions ensure seamless connectivity for all your devices.',
      price: 'R1,200',
      route: 'wifi-installation',
      gradient: 'linear-gradient(135deg, #3498db, #2ecc71)',
      badge: 'Fast & Reliable',
      image: 'assets/images/service-wifi.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-wifi-1.jpg', // LOCAL IMAGE
        'assets/images/service-wifi-2.jpg', // LOCAL IMAGE
        'assets/images/service-wifi-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'Mesh network installation',
        'WiFi extender setup',
        'Enterprise access points',
        'Network optimization',
        'Security configuration',
        'Full coverage guarantee'
      ]
    },
    {
      icon: 'megaphone-outline',
      title: 'Event Sound Systems',
      description: 'Professional sound equipment for events, parties, and gatherings. Clear audio for any occasion.',
      detailedDescription: 'Make your event memorable with our professional sound equipment. We provide high-quality sound systems for weddings, corporate events, parties, and gatherings. Our equipment delivers crystal clear audio that engages your audience.',
      price: 'R2,500',
      route: 'event-sound',
      gradient: 'linear-gradient(135deg, #9b59b6, #e74c3c)',
      badge: 'Event Ready',
      image: 'assets/images/service-event-sound.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-event-sound-1.jpg', // LOCAL IMAGE
        'assets/images/service-event-sound-2.jpg', // LOCAL IMAGE
        'assets/images/service-event-sound-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'Professional PA systems',
        'Wireless microphones',
        'Mixers and controllers',
        'Speaker stands and cables',
        'Sound check and setup',
        'On-site technical support'
      ]
    },
    {
      icon: 'car-outline',
      title: 'Transportation Services',
      description: 'Reliable transport for events, airport transfers, and special occasions. Comfortable and punctual.',
      detailedDescription: 'Experience reliable and comfortable transportation services for all your needs. We provide airport transfers, event transportation, and special occasion rides with professional drivers who prioritize punctuality and safety.',
      price: 'R400/hr',
      route: 'transportation',
      gradient: 'linear-gradient(135deg, #2c3e50, #3498db)',
      badge: 'Reliable',
      image: 'assets/images/service-transport.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-transport-1.jpg', // LOCAL IMAGE
        'assets/images/service-transport-2.jpg', // LOCAL IMAGE
        'assets/images/service-transport-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'Airport transfers',
        'Event transportation',
        'Special occasion rides',
        'Professional drivers',
        'Comfortable vehicles',
        'Punctual service'
      ]
    },
    {
      icon: 'swap-horizontal-outline',
      title: 'System Hire',
      description: 'Hire sound systems, projectors, and equipment for your event or presentation. Flexible rental terms.',
      detailedDescription: 'Need equipment for a short-term project or event? We offer flexible rental solutions for sound systems, projectors, and presentation equipment. Our systems are maintained to the highest standards and delivered with professional setup support.',
      price: 'R800/day',
      route: 'system-hire',
      gradient: 'linear-gradient(135deg, #16a085, #f1c40f)',
      badge: 'Flexible',
      image: 'assets/images/service-system-hire.jpg', // LOCAL IMAGE
      gallery: [
        'assets/images/service-system-hire-1.jpg', // LOCAL IMAGE
        'assets/images/service-system-hire-2.jpg', // LOCAL IMAGE
        'assets/images/service-system-hire-3.jpg'  // LOCAL IMAGE
      ],
      features: [
        'Sound system rental',
        'Projector and screen hire',
        'Presentation equipment',
        'Flexible rental periods',
        'Setup and support',
        'Quality equipment'
      ]
    }
  ];

  featuresData = [
    {
      icon: 'medal-outline',
      title: '10+ Years Experience',
      description: 'Trusted expertise in security, sound, and digital solutions across PMB.'
    },
    {
      icon: 'people-outline',
      title: '500+ Happy Clients',
      description: 'Satisfied customers who trust us for quality and reliability.'
    },
    {
      icon: 'time-outline',
      title: 'Same-Day Service',
      description: 'Quick response and installation to get you up and running fast.'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Quality Guaranteed',
      description: 'All work comes with a service guarantee and after-sales support.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

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
  // SERVICE MODAL METHODS
  // ============================================
  
  openServiceDetails(service: any) {
    this.selectedService = service;
    this.showServiceModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeServiceDetails() {
    this.showServiceModal = false;
    this.selectedService = null;
    document.body.style.overflow = '';
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() { this.router.navigate(['/home']); }
  navigateToServices() { this.router.navigate(['/services']); }
  navigateToEstimator() { this.router.navigate(['/estimator']); }
  navigateToBook() { this.router.navigate(['/booking']); }
  navigateToContact() { this.router.navigate(['/contact']); }
  navigateToCCTV() { this.router.navigate(['/cctv-installation']); }
  navigateToVehicleSound() { this.router.navigate(['/vehicle-sound']); }
  navigateToWiFi() { this.router.navigate(['/wifi-installation']); }
  navigateToEventSound() { this.router.navigate(['/event-sound']); }
  navigateToTransportation() { this.router.navigate(['/transportation']); }
  navigateToSystemHire() { this.router.navigate(['/system-hire']); }

  navigateToService(route: string) {
    const routeMap: { [key: string]: string } = {
      'cctv-installation': '/cctv-installation',
      'vehicle-sound': '/vehicle-sound',
      'wifi-installation': '/wifi-installation',
      'event-sound': '/event-sound',
      'transportation': '/transportation',
      'system-hire': '/system-hire'
    };
    this.router.navigate([routeMap[route] || '/']);
  }
}