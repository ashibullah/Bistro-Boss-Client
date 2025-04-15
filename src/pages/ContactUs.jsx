import React from 'react';
import Cover from '../Components/Shared/Cover';
import SectionTittle from '../Components/Shared/SectionTittle';

const ContactUs = () => {
    return (
        <div>
            <Cover img={'src/assets/contact/banner.jpg'} tittle={'Contact Us'} description={'This is the contact us section where you can reach out to us.'} />
            <SectionTittle heading="Get In Touch" subheading="Contact Us" />
        </div>
    );
};

export default ContactUs;