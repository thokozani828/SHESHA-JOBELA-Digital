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
    RouterModule  // IMPORTANT: Add this for routerLink to work
  ]
})
export class HomePage implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('videoTrack') videoTrack!: ElementRef<HTMLDivElement>;
  
  currentVideoSlide: number = 0;
  totalVideoSlides: number = 5;
  slideWidth: number = 0;
  autoplayInterval: any;
  particles: number[] = [];

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

  // Video Modal Properties
  showVideoModal: boolean = false;
  selectedVideo: any = null;

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

  bookingInfo = [
    { title: 'Quick Response', description: 'We respond to all inquiries within 24 hours' },
    { title: 'Free Consultation', description: 'Initial assessment and quote at no cost' },
    { title: 'Flexible Scheduling', description: 'We work around your availability' },
    { title: 'Quality Guaranteed', description: '100% satisfaction guarantee on all services' }
  ];

  videos = [
    {
      title: '🏠 Residential CCTV Installation',
      description: 'Complete home security system with 8 cameras and 24/7 monitoring.',
      poster: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '03:45',
      tags: [{ name: 'CCTV', route: 'cctv' }, { name: 'Security', route: 'cctv' }, { name: 'Installation', route: 'cctv' }]
    },
    {
      title: '🚗 Vehicle Sound System Installation',
      description: 'Premium audio upgrade with subwoofer and amplifier installation.',
      poster: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '02:30',
      tags: [{ name: 'Car Audio', route: 'vehicle-sound' }, { name: 'Sound System', route: 'vehicle-sound' }, { name: 'Upgrade', route: 'vehicle-sound' }]
    },
    {
      title: '📶 Commercial WiFi Network Setup',
      description: 'Full coverage mesh WiFi installation for office building.',
      poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85f2e3?w=800&q=80',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '04:15',
      tags: [{ name: 'WiFi', route: 'wifi' }, { name: 'Network', route: 'wifi' }, { name: 'Commercial', route: 'wifi' }]
    },
    {
      title: '🎤 Event Sound Equipment Hire',
      description: 'Professional sound system for wedding and corporate events.',
      poster: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '03:20',
      tags: [{ name: 'Event Sound', route: 'event-sound' }, { name: 'Hire', route: 'event-sound' }, { name: 'Equipment', route: 'event-sound' }]
    },
    {
      title: '🚚 Transportation & Logistics',
      description: 'Reliable vehicle rental and goods transportation services.',
      poster: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '05:00',
      tags: [{ name: 'Transport', route: 'transportation' }, { name: 'Logistics', route: 'transportation' }, { name: 'Rental', route: 'transportation' }]
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

  // Estimator Properties
  propertyType: string = 'residential';
  numberOfCameras: number = 4;
  propertySize: number = 200;
  additionalServices = {
    nvr: false,
    monitoring: false,
    remoteAccess: false
  };

  // Booking Properties
  bookingData = {
    name: '',
    phone: '',
    email: '',
    location: '',
    service: '',
    date: '',
    message: ''
  };

  // Pricing Constants
  private readonly PRICES = {
    residential: {
      basePerCamera: 1200,
      sizeMultiplier: 0.5
    },
    commercial: {
      basePerCamera: 1800,
      sizeMultiplier: 0.8
    }
  };

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
      
      // Check for scrollTo query param
      const urlTree = this.router.parseUrl(event.urlAfterRedirects);
      const scrollTo = urlTree.queryParams['scrollTo'];
      if (scrollTo === 'book') {
        setTimeout(() => {
          const element = document.getElementById('book');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
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
    if (url.includes('/estimator')) return 'estimator';
    if (url.includes('/booking')) return 'booking';
    if (url.includes('/contact')) return 'contact';
    return 'home';
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
  // VIDEO MODAL METHODS
  // ============================================
  
  playFeaturedVideo() {
    const video = document.querySelector('.featured-video-wrapper video') as HTMLVideoElement;
    if (video) {
      const overlay = document.querySelector('.featured-video-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.display = 'none';
      }
      video.play();
    }
  }

  openVideoModal(index: number) {
    this.selectedVideo = this.videos[index];
    this.showVideoModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal() {
    this.showVideoModal = false;
    this.selectedVideo = null;
    document.body.style.overflow = '';
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() {
    this.currentPage = 'home';
    this.router.navigate(['/home']);
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

  navigateToServices() {
    this.currentPage = 'services';
    this.router.navigate(['/services']);
  }

  navigateToEstimator() {
    this.currentPage = 'estimator';
    this.router.navigate(['/estimator']);
  }

  navigateToContact() {
    this.currentPage = 'contact';
    this.router.navigate(['/contact']);
  }

  navigateToBook() {
    this.currentPage = 'booking';
    
    // Check if we're on the home page
    if (this.router.url === '/home' || this.router.url === '/') {
      const bookingSection = document.getElementById('book');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.router.navigate(['/booking']);
      }
    } else {
      this.router.navigate(['/booking']);
    }
  }

  navigateToBookSection() {
    const bookingSection = document.getElementById('book');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/booking']);
    }
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
  }

  // ============================================
  // BOOKING SUBMISSION
  // ============================================
  
  submitBooking() {
    console.log('Booking Data:', this.bookingData);
    alert('Thank you for your booking request! We will contact you within 24 hours.');
    
    this.bookingData = {
      name: '',
      phone: '',
      email: '',
      location: '',
      service: '',
      date: '',
      message: ''
    };
  }

  // ============================================
  // ESTIMATOR METHODS
  // ============================================
  
  adjustCameras(amount: number) {
    this.numberOfCameras = Math.max(1, Math.min(16, this.numberOfCameras + amount));
  }

  get baseCost(): number {
    const price = this.propertyType === 'residential' 
      ? this.PRICES.residential 
      : this.PRICES.commercial;
    
    const cameraCost = price.basePerCamera * this.numberOfCameras;
    const sizeCost = this.propertySize * price.sizeMultiplier;
    return Math.round(cameraCost + sizeCost);
  }

  get estimatedCost(): number {
    let total = this.baseCost;
    
    if (this.additionalServices.nvr) total += 2500;
    if (this.additionalServices.monitoring) total += 1500;
    if (this.additionalServices.remoteAccess) total += 800;
    
    return Math.round(total * 1.15);
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

  scrollLeft() {
    this.currentVideoSlide = Math.max(0, this.currentVideoSlide - 1);
    this.updateSlidePosition();
    this.resetAutoplay();
  }

  scrollRight() {
    this.currentVideoSlide = Math.min(this.totalVideoSlides - 1, this.currentVideoSlide + 1);
    this.updateSlidePosition();
    this.resetAutoplay();
  }

  goToVideoSlide(index: number) {
    this.currentVideoSlide = index;
    this.updateSlidePosition();
    this.resetAutoplay();
  }

  updateSlidePosition() {
    if (this.videoTrack) {
      const offset = -this.currentVideoSlide * this.slideWidth;
      this.videoTrack.nativeElement.style.transform = `translateX(${offset}px)`;
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

  playVideo(index: number) {
    const slides = this.videoTrack.nativeElement.querySelectorAll('.video-slide');
    const video = slides[index]?.querySelector('video');
    if (video) {
      const overlay = slides[index]?.querySelector('.video-play-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.display = 'none';
      }
      video.play();
    }
  }

  toggleMenu() {
    console.log('Menu toggled');
    // Implement mobile menu logic here
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