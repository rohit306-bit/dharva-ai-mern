import React from 'react';
import { useForm } from '../../hooks';
import { contactAPI } from '../../utils/api';

const ContactModal = ({ isOpen, onClose }) => {
  const { values, errors, isSubmitting, isSuccess, handleChange, handleSubmit, reset } = useForm(
    { name: '', email: '', company: '', role: '', message: '', type: 'contact' },
    async (data) => {
      await contactAPI.submit(data);
    }
  );

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>&times;</button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: '#fff', marginBottom: '.5rem' }}>
              You're In!
            </h3>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>
              Thanks for reaching out. Our team will be in touch within 24 hours.
            </p>
            <button className="btn btn-primary" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <>
            <h3>Get Started with Dharva AI</h3>
            <p>Fill out the form below and our team will get back to you within 24 hours.</p>

            {errors.general && (
              <div style={{
                background: 'rgba(244,63,94,.1)',
                border: '1px solid rgba(244,63,94,.2)',
                borderRadius: '8px',
                padding: '.75rem 1rem',
                marginBottom: '1rem',
                fontSize: '.85rem',
                color: 'var(--rose)',
              }}>
                {errors.general}
              </div>
            )}

            <div onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text" name="name" required
                    value={values.name} onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email" name="email" required
                    value={values.email} onChange={handleChange}
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text" name="company"
                    value={values.company} onChange={handleChange}
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="form-group">
                  <label>Inquiry Type</label>
                  <select name="type" value={values.type} onChange={handleChange}>
                    <option value="contact">General Inquiry</option>
                    <option value="demo-request">Request a Demo</option>
                    <option value="enterprise-inquiry">Enterprise Sales</option>
                    <option value="waitlist">Join Waitlist</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us about your use case..."
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
