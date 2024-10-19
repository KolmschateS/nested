import React from 'react';

import Link from 'next/link';

export default function About() {
  const birthDate = new Date(2000, 6, 3); // Month is 0-indexed
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className="flex flex-col gap-3 max-w-2xl mx-auto p-6 text-neutral-200">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-2">
        Hello, I'm Sebastiaan Kolmschate, a {age} years old student at Windesheim University of Applied Sciences.
      </p>
      <p>
        I have experience in full-stack software development, with a current specialization in machine learning and its applications in software solutions.
      </p>
      <p>
        Use the <Link href="/contact" className="underline">contact form</Link> to get in touch with me.
      </p>
    </div>
  );
}
