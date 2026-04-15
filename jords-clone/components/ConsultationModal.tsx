'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import styles from './ConsultationModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [phone, setPhone]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const hour24Ref = useRef<HTMLSpanElement>(null);
  const min60Ref  = useRef<HTMLSpanElement>(null);

  /* ── Open animation ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.32, ease: 'power2.out' }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { 
          opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.06,
          onComplete: () => {
            // Animate 24 & 60
            const obj24 = { v: 0 };
            const obj60 = { v: 0 };
            gsap.to(obj24, { v: 24, duration: 1.2, ease: 'power2.out', onUpdate: () => { if(hour24Ref.current) hour24Ref.current.innerText = Math.floor(obj24.v).toString(); }});
            gsap.to(obj60, { v: 60, duration: 1.2, ease: 'power2.out', onUpdate: () => { if(min60Ref.current) min60Ref.current.innerText = Math.floor(obj60.v).toString(); }});
          }
        }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Close animation ── */
  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.28, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.06,
      onComplete: () => { onClose(); setSubmitted(false); },
    });
  };

  /* ── Backdrop click ── */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || isSending) return;

    setIsSending(true);

    const templateParams = {
      from_name: name,
      reply_to: email,
      phone_number: phone,
      message: `Consultation request from ${name} (${email}, ${phone})`,
    };

    try {
      const serviceId = "service_kftq76c";
      const templateId = "template_tpur2s9";
      const autoReplyTemplateId = "template_pq76hob";
      const publicKey = "oi7EJD5xnCr1cUTRC";

      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS credentials missing. Check your .env.local file.');
        alert('Form configuration error. Please try again later.');
        setIsSending(false);
        return;
      }

      // 1. Send notification to site owner
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      // 2. Send auto-reply to user (if template ID is configured)
      if (autoReplyTemplateId) {
          try {
            await emailjs.send(
              serviceId,
            autoReplyTemplateId,
            {
              to_name: name,
              to_email: email,
              message: "We've received your inquiry! Our team will review your project details and get back to you within 24 hours.",
            },
            publicKey
          );
          console.log('Auto-reply sent successfully');
        } catch (autoReplyError) {
          // We don't want to show an error to the user if only the auto-reply fails
          console.warn('Auto-reply failed to send:', autoReplyError);
        }
      }

      setSubmitted(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send the request. Please try again or contact us directly.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Book a free consultation"
    >
      <div className={styles.card} ref={cardRef}>

        {/* Close */}
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                <span className={`${styles.badgeText} mono`}>FREE CONSULTATION</span>
              </div>
              <h2 className={styles.title}>
                <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="" className={styles.titleLogo} />
                Let&apos;s talk about<br />your project
              </h2>
              <p className={styles.subtitle}>
                We&apos;ll get back to you within <span ref={hour24Ref}>24</span> hours with a clear plan.
              </p>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={`${styles.field} ${focused === 'name' ? styles.fieldFocused : ''}`}>
                <label className={`${styles.label} mono`} htmlFor="modal-name">YOUR NAME</label>
                <input
                  id="modal-name"
                  type="text"
                  className={styles.input}
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className={`${styles.field} ${focused === 'email' ? styles.fieldFocused : ''}`}>
                <label className={`${styles.label} mono`} htmlFor="modal-email">EMAIL ADDRESS</label>
                <input
                  id="modal-email"
                  type="email"
                  className={styles.input}
                  placeholder="Your Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={`${styles.field} ${focused === 'phone' ? styles.fieldFocused : ''}`}>
                <label className={`${styles.label} mono`} htmlFor="modal-phone">PHONE NUMBER</label>
                <input
                  id="modal-phone"
                  type="tel"
                  className={styles.input}
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  required
                  autoComplete="tel"
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!name || !email || !phone || isSending}
              >
                <span>{isSending ? 'Sending...' : 'Book my free consultation'}</span>
                {!isSending && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>

              <p className={styles.disclaimer}>
                No spam. No pressure. Just a focused <span ref={min60Ref}>60</span>-minute call.
              </p>
            </form>
          </>
        ) : (
          /* Success state */
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>You&apos;re booked in!</h2>
            <p className={styles.successText}>
              Thanks, <strong>{name}</strong>. We&apos;ve received your request and
              will reach out to <strong>{email}</strong> within 24 hours to schedule
              your free call.
            </p>
            <button className={styles.doneBtn} onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
