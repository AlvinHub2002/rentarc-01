import React from 'react';
import LottiePlayer from 'react-lottie-player';
import './AboutUs.css';
import a from '../AboutUs/a.jpg'
import b from "../AboutUs/b.jpg"
import c from "../AboutUs/c.jpg"
import d from "../AboutUs/d.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'LLoy Sibi',
      role: 'CEO',
      photo: a, // Replace with the actual image filename or URL
      animation: 'john-doe-animation.json', // Replace with the actual animation JSON file
      linkedin: 'https://www.linkedin.com/in/johndoe',
      instagram: 'https://www.instagram.com/johndoe',
      github: 'https://www.github.com/johndoe',
    },
    {
      name: 'ALVIN VARGHESE',
      role: 'CTO',
      photo: b, // Replace with the actual image filename or URL
      animation: 'jane-smith-animation.json', // Replace with the actual animation JSON file
      linkedin: 'https://www.linkedin.com/in/alvin-varghese-9529b4211/',
      instagram: 'https://www.instagram.com/alvinvargheseavm/',
      github: 'https://github.com/AlvinHub2002',
    },
    {
      name: 'AJO THOMAS',
      role: 'Marketing Director',
      photo: c, // Replace with the actual image filename or URL
      animation: 'mike-johnson-animation.json', // Replace with the actual animation JSON file
      linkedin: 'https://www.linkedin.com/in/ajo-thomas-28ba51220/',
      instagram: 'https://www.instagram.com/jo_thomz._/',
      github: 'https://github.com/ajothomas07',
    },
    {
      name: 'AADIT V BIJU ',
      role: 'Designer',
      photo: d, // Replace with the actual image filename or URL
      animation: 'emily-davis-animation.json', // Replace with the actual animation JSON file
      linkedin: 'https://www.linkedin.com/in/emilydavis',
      instagram: 'https://www.instagram.com/emilydavis',
      github: 'https://www.github.com/emilydavis',
    },
  ];

  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <div className="team-members-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <div className="member-info">
              <div className='member-photo-container'>
                <img className="member-photo" src={member.photo} alt={member.name} />
              </div>
              <h3 className="member-name">{member.name}</h3>
              <h4 className="member-role">{member.role}</h4>
              <div className="member-connections">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            <div className="animation-container">
              <LottiePlayer
                loop
                autoplay
                style={{ width: '200px', height: '200px' }}
                src={`./animations/${member.animation}`} // Path to the animation JSON file
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;