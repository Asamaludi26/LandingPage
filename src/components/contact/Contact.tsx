import React, { useState } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'name': return value.trim() ? '' : 'Name is required.';
            case 'email': return /\S+@\S+\.\S+/.test(value) ? '' : 'Please enter a valid email.';
            case 'message': return value.trim() ? '' : 'Message cannot be empty.';
            default: return '';
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
        if (errors[name as keyof typeof errors]) {
             setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nameError = validateField('name', formState.name);
        const emailError = validateField('email', formState.email);
        const messageError = validateField('message', formState.message);
        if (nameError || emailError || messageError) {
            setErrors({ name: nameError, email: emailError, message: messageError });
            return;
        }

        setSubmissionStatus('submitting');
        setTimeout(() => {
            setSubmissionStatus('success');
            setFormState({ name: '', email: '', message: '' });
             setTimeout(() => setSubmissionStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <AnimatedSection id="contact" className="py-20 sm:py-24 bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 reveal">Become a Rider</h3>
                    <p className="text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto reveal" style={{ transitionDelay: '150ms' }}>Ready to ride with us? Reach out and become part of the family.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-2xl reveal" style={{ transitionDelay: '300ms' }}>
                     <div aria-live="polite" role="status">
                        {submissionStatus === 'success' && (
                            <div className="text-center p-8 bg-green-900/50 border border-green-500 rounded-lg mb-6">
                                <h4 className="text-2xl font-bold text-green-300">Message Sent!</h4>
                                <p className="text-gray-300 mt-2">Thanks for reaching out. We'll get back to you soon. Ride safe!</p>
                            </div>
                        )}
                    </div>
                    {submissionStatus !== 'success' && (
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input type="text" name="name" id="name" required value={formState.name} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`} />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input type="email" name="email" id="email" required value={formState.email} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`} />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea name="message" id="message" rows={4} required value={formState.message} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Contact;
