/* contact.page.ts - Complete Contact Page with WhatsApp Integration */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class ContactPage implements OnInit, AfterViewInit {
  
  // FAQ Data
  faqs = [
    {
      question: 'How do I get a quote?',
      answer: 'You can get a free quote by filling out our contact form, calling us directly, or sending us an email. We\'ll respond within 24 hours.',
      open: false
    },
    {
      question: 'What services do you offer?',
      answer: 'We offer CCTV installation, vehicle sound systems, WiFi installation, event sound equipment hire, transportation services, and system hire.',
      open: false
    },
    {
      question: 'Do you service all areas?',
      answer: 'We primarily service Pietermaritzburg (PMB) and surrounding areas. Contact us to check if we service your location.',
      open: false
    },
    {
      question: 'How long does installation take?',
      answer: 'Installation times vary depending on the service. CCTV installation takes 2-4 hours, vehicle sound 2-4 hours, and WiFi installation 1-2 hours.',
      open: false
    },
    {
      question: 'Do you offer warranties?',
      answer: 'Yes, all our installations come with a 12-month warranty covering both equipment and labor.',
      open: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, EFT, and mobile payments. Contact us for more details on payment options.',
      open: false
    }
  ];

  // Contact Info Data
  contactInfo = [
    {
      icon: 'call-outline',
      title: 'Phone',
      value: '067 068 0043',
      link: 'tel:0670680043',
      target: '_self',
      sub: 'Mon-Fri: 8AM - 6PM',
      gradient: 'linear-gradient(135deg, #d4a02b, #e8c34a)'
    },
    {
      icon: 'mail-outline',
      title: 'Email',
      value: 'manpzikode@gmail.com',
      link: 'mailto:manpzikode@gmail.com',
      target: '_self',
      sub: 'We respond within 24 hours',
      gradient: 'linear-gradient(135deg, #3498db, #2ecc71)'
    },
    {
      icon: 'location-outline',
      title: 'Location',
      value: 'Based in PMB',
      link: '',
      target: '',
      sub: 'Pietermaritzburg, South Africa',
      gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)'
    },
    {
      icon: 'time-outline',
      title: 'Working Hours',
      value: 'Mon-Fri: 8AM - 6PM',
      link: '',
      target: '',
      sub: 'Sat: 9AM - 4PM | Sun: Closed',
      gradient: 'linear-gradient(135deg, #9b59b6, #e74c3c)'
    }
  ];

  // Contact Form Data
  contactData = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  };

  // WhatsApp number
  whatsappNumber: string = '27670680043';

  // Submission state
  isSubmitting: boolean = false;

  // Loading state
  isLoading: boolean = true;

  // Particles for background effect
  particles: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
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
  
  submitContactForm() {
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
    const serviceMap: { [key: string]: string } = {
      'cctv': 'CCTV Installation',
      'vehicle-sound': 'Vehicle Sound Systems',
      'wifi': 'WiFi Installation',
      'event-sound': 'Event Sound Systems',
      'transportation': 'Transportation Services',
      'system-hire': 'System Hire',
      'general': 'General Inquiry'
    };
    
    const serviceLabel = serviceMap[this.contactData.service] || this.contactData.service || 'Not specified';
    
    let message = `🔹 *NEW CONTACT REQUEST* 🔹\n\n`;
    message += `👤 *Name:* ${this.contactData.name || 'Not provided'}\n`;
    message += `📞 *Phone:* ${this.contactData.phone || 'Not provided'}\n`;
    message += `📧 *Email:* ${this.contactData.email || 'Not provided'}\n`;
    message += `🔧 *Service:* ${serviceLabel}\n`;
    
    if (this.contactData.message) {
      message += `\n📝 *Message:*\n${this.contactData.message}\n`;
    }
    
    message += `\n---\nSent from SHESHA & JOBELA DIGITAL Contact Form`;
    
    return message;
  }

  // ============================================
  // RESET FORM
  // ============================================
  
  resetForm() {
    this.contactData = {
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    };
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================
  
  navigateToHome() {
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
    this.router.navigate(['/services']);
  }

  navigateToEstimator() {
    this.router.navigate(['/estimator']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToBook() {
    this.router.navigate(['/booking']);
  }

  // ============================================
  // UTILITY METHODS
  // ============================================
  
  scrollToForm() {
    const formSection = document.querySelector('.contact-form-wrapper');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  toggleMenu() {
    console.log('Menu toggled');
    // Implement mobile menu logic here
  }
}