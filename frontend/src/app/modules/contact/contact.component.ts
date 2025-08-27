import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService, ContactForm } from '../../core/services/api.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    SectionTitleComponent
  ],
  template: `
    <div class="contact">
      <div class="container">
        <!-- Contact Header -->
        <section class="contact-header">
          <app-section-title
            title="Contact Me"
            subtitle="Have a project in mind? Let's work together to bring your ideas to life."
          ></app-section-title>
        </section>

        <div class="contact__content">
          <!-- Contact Form -->
          <div class="contact-form">
            <div class="contact-form__container">
              <h3 class="contact-form__title">Send Me a Message</h3>
              
              <form 
                #contactForm="ngForm" 
                (ngSubmit)="onSubmit(contactForm)"
                class="contact-form__form"
                novalidate
                [class.contact-form__form--submitting]="isSubmitting"
              >
                <div class="form-group">
                  <label for="name" class="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-input"
                    [(ngModel)]="formData.name"
                    #nameField="ngModel"
                    required
                    minlength="2"
                    [class.form-input--error]="nameField.invalid && nameField.touched"
                  />
                  <div 
                    *ngIf="nameField.invalid && nameField.touched" 
                    class="form-error"
                  >
                    <span *ngIf="nameField.errors?.['required']">Name is required</span>
                    <span *ngIf="nameField.errors?.['minlength']">Name must be at least 2 characters</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-input"
                    [(ngModel)]="formData.email"
                    #emailField="ngModel"
                    required
                    email
                    [class.form-input--error]="emailField.invalid && emailField.touched"
                  />
                  <div 
                    *ngIf="emailField.invalid && emailField.touched" 
                    class="form-error"
                  >
                    <span *ngIf="emailField.errors?.['required']">Email is required</span>
                    <span *ngIf="emailField.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    class="form-textarea"
                    rows="6"
                    [(ngModel)]="formData.message"
                    #messageField="ngModel"
                    required
                    minlength="10"
                    [class.form-input--error]="messageField.invalid && messageField.touched"
                  ></textarea>
                  <div 
                    *ngIf="messageField.invalid && messageField.touched" 
                    class="form-error"
                  >
                    <span *ngIf="messageField.errors?.['required']">Message is required</span>
                    <span *ngIf="messageField.errors?.['minlength']">Message must be at least 10 characters</span>
                  </div>
                </div>



                <div class="form-actions">
                  <app-button
                    type="submit"
                    variant="primary"
                    size="lg"
                    [loading]="isSubmitting"
                    [disabled]="contactForm.invalid || isSubmitting"
                    [fullWidth]="true"
                  >
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </app-button>
                </div>
              </form>

              <!-- Success Message -->
              <div *ngIf="showSuccessMessage" class="form-message form-message--success">
                <i class="fas fa-check-circle"></i>
                <div class="form-message__content">
                  <h4>Message Sent Successfully!</h4>
                  <p>{{ successMessage }}</p>
                  <p class="form-message__note">
                    <i class="fas fa-envelope"></i>
                    You should receive a confirmation email shortly.
                  </p>
                </div>
              </div>

              <!-- Error Message -->
              <div *ngIf="showErrorMessage" class="form-message form-message--error">
                <i class="fas fa-exclamation-circle"></i>
                <div class="form-message__content">
                  <h4>Message Not Sent</h4>
                  <p>{{ errorMessage }}</p>
                  <p class="form-message__note">
                    <i class="fas fa-info-circle"></i>
                                         Please try again or contact me directly at mahamedhany8&#64;gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="contact-info__container">
              <h3 class="contact-info__title">Get in Touch</h3>
              <p class="contact-info__description">
                I'm always interested in new opportunities and collaborations. 
                Feel free to reach out through any of these channels.
              </p>

              <div class="contact-info__items">
                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-info__details">
                    <h4>Email</h4>
                    <a href="mailto:mahamedhany8&#64;gmail.com">mahamedhany8&#64;gmail.com</a>
                  </div>
                </div>

                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="contact-info__details">
                    <h4>Location</h4>
                    <span>Cairo, Egypt</span>
                  </div>
                </div>

                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="contact-info__details">
                    <h4>Response Time</h4>
                    <span>Within 24 hours</span>
                  </div>
                </div>
              </div>

              <div class="contact-info__social">
                <h4 class="contact-info__social-title">Follow Me</h4>
                <div class="contact-info__social-links">
                  <a 
                    *ngFor="let social of socialLinks" 
                    [href]="social.url"
                    target="_blank"
                    class="contact-info__social-link"
                    [attr.aria-label]="social.name"
                  >
                    <i [class]="social.icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formData: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';

  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/mohany6', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mohamed-hany', icon: 'fab fa-linkedin' },
    { name: 'Email', url: 'mailto:mahamedhany8&#64;gmail.com', icon: 'fas fa-envelope' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Reset messages when component loads
    this.resetMessages();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.resetMessages();

    this.apiService.submitContactForm(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccessMessage = true;
          this.successMessage = response.message || 'Thank you for your message! I will get back to you soon.';
          this.resetForm();
        } else {
          this.showErrorMessage = true;
          this.errorMessage = response.message || 'Something went wrong. Please try again.';
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Contact form error:', error);
        this.showErrorMessage = true;
        this.errorMessage = error.message || 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }

  private resetMessages(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
