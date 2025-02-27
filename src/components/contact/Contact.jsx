import React, { useState } from 'react';
import './Contact.scss';
import { Button } from '@mui/material';
import customSnackBar from '../snackbar/CustomSnackBar';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return customSnackBar('Please fill all the fields');
        }
        customSnackBar('Message sent successfully');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    }

    return (
        <div className="contact">
            <h2 className='section-title'>Contact Us</h2>
            <div className="divider"></div>
            <form action="" className="contact-form row m-0" onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <input
                        type="text"
                        placeholder='Enter Your Name...'
                        className='mb-3'
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder='Enter Your Email...'
                        className='mb-3'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Enter Subject...'
                        className='mb-3'
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        required
                    />
                </div>
                <div className='col-md-6 mb-3'>
                    <textarea
                        name=""
                        id=""
                        rows={6}
                        placeholder='Enter Your Message...'
                        value={formData.message}
                        onChange={e => setFormData({
                            ...formData, message: e
                                .target.value
                        })}
                        required
                    >
                    </textarea>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <Button type='submit'>
                        Send Message
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Contact;