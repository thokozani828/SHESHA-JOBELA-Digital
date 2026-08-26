// home.page.ts - Complete with RouterModule Import
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class HomePage implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('videoTrack') videoTrack!: ElementRef<HTMLDivElement>;
  
  currentVideoSlide: number = 0;
  totalVideoSlides: number = 5;
  slideWidth: number = 0;
  autoplayInterval: any;
  particles: number[] = [];
  mobileMenuOpen: boolean = false;

  // Current page tracking for navigation highlighting
  currentPage: string = 'home';

  // WhatsApp number (South African format)
  whatsappNumber: string = '27670680043';
  
  // Pre-filled WhatsApp messages
  whatsappMessages = {
    booking: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20would%20like%20to%20book%20a%20service.%20Please%20assist.',
    inquiry: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    cctv: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20need%20CCTV%20installation%20services.%20Please%20assist.',
    vehicle: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20need%20vehicle%20sound%20system%20installation.%20Please%20assist.',
    wifi: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20need%20WiFi%20installation%20services.%20Please%20assist.',
    event: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20need%20event%20sound%20equipment%20hire.%20Please%20assist.',
    transport: 'Hi%20SHESHA%20%26%20JOBELA%20DIGITAL%2C%20I%20need%20transportation%20services.%20Please%20assist.'
  };

  // Data Arrays for ngFor
  hoursData = [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM', icon: 'calendar-outline' },
    { day: 'Saturday', time: '9:00 AM - 4:00 PM', icon: 'calendar-outline' },
    { day: 'Sunday', time: 'Closed (Emergency Only)', icon: 'calendar-outline' },
    { day: 'Emergency Support', time: '24/7 Available', icon: 'alert-circle-outline' }
  ];

  aboutFeatures = [
    'Professional Installation',
    'Quality Equipment',
    'Warranty & Support',
    'Affordable Pricing'
  ];

  servicesData = [
    {
      title: 'CCTV Installation',
      description: 'Professional security camera installation for homes and businesses with 24/7 monitoring.',
      icon: 'videocam-outline',
      route: 'cctv'
    },
    {
      title: 'Vehicle Sound',
      description: 'Premium sound system installation for your vehicle. Experience crystal clear audio on the road.',
      icon: 'musical-notes-outline',
      route: 'vehicle-sound'
    },
    {
      title: 'WiFi Installation',
      description: 'Reliable WiFi network setup for homes and businesses with full coverage solutions.',
      icon: 'wifi-outline',
      route: 'wifi'
    },
    {
      title: 'Event Sound',
      description: 'Professional sound equipment hire and installation for weddings, parties, and corporate events.',
      icon: 'megaphone-outline',
      route: 'event-sound'
    },
    {
      title: 'Transportation',
      description: 'Reliable vehicle rental and transportation services for goods and passengers across PMB.',
      icon: 'car-outline',
      route: 'transportation'
    },
    {
      title: 'System Hire',
      description: 'Hire professional sound and security systems for your events and installations.',
      icon: 'construct-outline',
      route: 'system-hire'
    }
  ];

  testimonials = [
    { quote: 'The CCTV installation was done professionally and quickly. I feel so much safer now!', author: 'Thandi M.', role: 'Homeowner, PMB' },
    { quote: 'My car sound system sounds incredible! Great service and even better results.', author: 'Sipho K.', role: 'Car Enthusiast' },
    { quote: 'Our office WiFi is now blazing fast. The team was professional and efficient.', author: 'Zanele D.', role: 'Business Owner' }
  ];

  featuresData = [
    { title: 'Smart Solutions', description: 'Innovative technology tailored to your needs', icon: 'shield-checkmark-outline' },
    { title: 'Reliable Service', description: 'Punctual, professional, and trustworthy', icon: 'time-outline' },
    { title: 'Based in PMB', description: 'Local expertise with quality service', icon: 'location-outline' },
    { title: '24/7 Support', description: "We're always here to help", icon: 'headset-outline' }
  ];

  // Flag to prevent multiple animation checks
  private animationCheckTimeout: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.particles = Array.from({ length: 30 }, (_, i) => i);
    
    // Set current page based on URL
    this.currentPage = this.getCurrentPage();
    
    // Listen for navigation events to update current page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPage = this.getCurrentPageFromUrl(event.urlAfterRedirects);
    });
  }

  ngAfterViewInit() {
    this.updateSlideWidth();
    this.startAutoplay();
    window.addEventListener('resize', () => this.updateSlideWidth());
    
    // Check animations after view is fully loaded
    setTimeout(() => {
      this.checkScrollAnimations();
    }, 300);
  }

  // ============================================
  // WHATSAPP METHODS
  // ============================================
  
  getWhatsAppLink(message: string): string {
    return `https://wa.me/${this.whatsappNumber}?text=${message}`;
  }

  openWhatsApp(message: string) {
    window.open(this.getWhatsAppLink(message), '_blank');
  }

  // ============================================
  // CURRENT PAGE TRACKING
  // ============================================
  
  private getCurrentPage(): string {
    return this.getCurrentPageFromUrl(this.router.url);
  }

  private getCurrentPageFromUrl(url: string): string {
    if (url.includes('/home') || url === '/') return 'home';
    if (url.includes('/services')) return 'services';
    if (url.includes('/booking')) return 'booking';
    if (url.includes('/contact')) return 'contact';
    return 'home';
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  
  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  // ============================================
  // SCROLL ANIMATION HANDLER
  // ============================================
  
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const windowHeight = window.innerHeight;

    // Parallax effect on hero
    const heroContent = document.querySelector('.hero-content') as HTMLElement;
    if (heroContent) {
      const offset = scrollTop * 0.3;
      heroContent.style.transform = `translateY(${offset * 0.1}px)`;
    }

    // Use requestAnimationFrame for better performance
    if (!this.animationCheckTimeout) {
      this.animationCheckTimeout = setTimeout(() => {
        this.checkScrollAnimations();
        this.animationCheckTimeout = null;
      }, 50);
    }
  }

  checkScrollAnimations() {
    const windowHeight = window.innerHeight;
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-child');
    
    animateElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < windowHeight - 50 && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() {
    this.currentPage = 'home';
    this.router.navigate(['/home']);
    this.closeMenu();
  }

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

  navigateToService(route: string) {
    const routeMap: { [key: string]: string } = {
      'cctv': '/cctv-installation',
      'vehicle-sound': '/vehicle-sound',
      'wifi': '/wifi-installation',
      'event-sound': '/event-sound',
      'transportation': '/transportation',
      'system-hire': '/system-hire'
    };
    this.router.navigate([routeMap[route] || '/']);
    this.closeMenu();
  }

  // ============================================
  // VIDEO CAROUSEL METHODS
  // ============================================
  
  updateSlideWidth() {
    if (this.videoTrack) {
      const container = this.videoTrack.nativeElement.parentElement;
      if (container) {
        const containerWidth = container.clientWidth - 10;
        if (window.innerWidth > 1024) {
          this.slideWidth = (containerWidth / 3) + 17;
        } else if (window.innerWidth > 768) {
          this.slideWidth = (containerWidth / 2) + 12;
        } else {
          this.slideWidth = containerWidth + 10;
        }
      }
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (this.currentVideoSlide < this.totalVideoSlides - 1) {
        this.currentVideoSlide++;
      } else {
        this.currentVideoSlide = 0;
      }
      this.updateSlidePosition();
    }, 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  updateSlidePosition() {
    if (this.videoTrack) {
      const offset = -this.currentVideoSlide * this.slideWidth;
      this.videoTrack.nativeElement.style.transform = `translateX(${offset}px)`;
    }
  }

  ngOnDestroy() {
    clearInterval(this.autoplayInterval);
    window.removeEventListener('resize', () => this.updateSlideWidth());
    if (this.animationCheckTimeout) {
      clearTimeout(this.animationCheckTimeout);
    }
    document.body.style.overflow = '';
  }
}