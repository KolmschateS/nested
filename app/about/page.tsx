// components/About.tsx
import React from 'react';

const About: React.FC = () => {
  const birthDate = new Date(2000, 6, 3); // Month is 0-indexed
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-neutral-800 text-neutral-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-2">
        Hello, I'm Sebastiaan Kolmschate, a {age} years old student at Windesheim University of Applied Sciences.
      </p>
      <p>
        I have experience in full-stack software development, with a current specialization in machine learning and its applications in software solutions.
      </p>
    </div>
  );
};

export default About;
