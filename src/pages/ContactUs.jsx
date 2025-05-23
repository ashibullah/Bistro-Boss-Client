import React from 'react';
import Cover from '../Components/Shared/Cover';
import SectionTittle from '../Components/Shared/SectionTittle';
import contactBanner from '../assets/contact/banner.jpg';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div>
            <Cover img={contactBanner} tittle={'Contact Us'} description={'Feel free to reach out to us for any inquiries or assistance'} />
            <SectionTittle heading="Get In Touch" subheading="Contact Us" />
            
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Restaurant Info */}
                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 10:00 AM - 10:00 PM</p>
                            <p className="text-gray-600">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Location</h3>
                            <p className="text-gray-600">123 Dining Street</p>
                            <p className="text-gray-600">Foodville, FL 12345</p>
                            <p className="text-gray-600">Phone: (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                {/* Developer Info */}
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Developer Information</h2>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Developed by Ashib Ullah</h3>
                        <p className="text-gray-600 mb-4">Full Stack Developer | MERN Stack Specialist</p>
                        
                        <div className="flex justify-center gap-6 mb-6">
                            <a href="https://github.com/ashibullah" 
                               className="text-2xl text-gray-700 hover:text-orange-500 transition-colors"
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/ashibullah" 
                               className="text-2xl text-gray-700 hover:text-orange-500 transition-colors"
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:ashibullah.dev@gmail.com" 
                               className="text-2xl text-gray-700 hover:text-orange-500 transition-colors">
                                <FaEnvelope />
                            </a>
                        </div>

                        <div className="prose max-w-none text-gray-600">
                            <p className="mb-4">
                                Thank you for visiting Bistro Boss! This project was developed with passion using the MERN stack 
                                (MongoDB, Express.js, React.js, Node.js) along with modern technologies like Tailwind CSS and 
                                Firebase Authentication.
                            </p>
                            <p>
                                Feel free to reach out if you have any questions about the project or would like to 
                                collaborate on future developments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;