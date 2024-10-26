import React from 'react';
import { X } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-custom-bg min-h-screen text-white p-8 mb-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About MyActivities</h1>

        <section className="mb-12">
          <p className="mb-4">
            In <em>Technics and Civilization</em> (1934), technology historian Lewis Mumford argues that the clock, rather than the steam engine, is the piece of technology that enabled the industrial age. The steam engine was merely the latest new power tool in a long lineage of power tools; the clock, on the other hand, created a new mental model for time that allowed for wider synchronization of human behavior. The clock started to center daily human life around the rules of strict machines, rather than the flexibility and variation of the natural world.
          </p>
          <p className="mb-4">
            One may view this strictness as limiting. However, I've always struggled with managing my time, and the clock, a tool to monitor the fleeting moments of my day, has allowed me to spend my time more meaningfully. Rather than a chain, for me it has been a key to escape wasted hours and a compass through life.
          </p>
          <p className="mb-4">
            <strong>MyActivities</strong> is a way to harness this power of the clock, realizing an idea that I've had for a while.
          </p>
          <p>
            By helping to record and visualize how I spend my day, maybe I can make my days more well spent.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">About the Process</h2>
          <p className="mb-4">I had a pretty clear vision for my app from the beginning:</p>
          <div className="mb-6">
            <img src="/images/Sketch.jpg" alt="App vision sketch" className="w-full" />
          </div>
          <div className="mb-6">
            <img src="/images/Mockup.jpg" alt="App mockup" className="w-full" />
          </div>
          <p className="mb-4">
            For this reason, besides small changes in the UI, most of my vision stayed the same.
          </p>
          <p className="mb-4">
            In incorporating Claude AI into my workflow, the biggest takeaway for me was the immense power of the model, for better or for worse.
          </p>
          <p className="mb-4">
            Coming from no experience using React to using it for this app, did I truly understand everything I was putting into the code? No. Did I learn some things merely from the exposure and implementation of Claude's responses? Definitely. Given more time, could I learn more from analyzing what I made with the help of Claude? Maybe.
          </p>
          <p className="mb-4">
            But for the future, I just wonder if I am missing out on gaining a more foundational understanding of these programming languages by using the crutch that is AI.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <p className="mb-4">
              Due to the deadline I did not have time to implement the calendar view function that I had designed. Head over to Figma to see what it was!)
          </p>
          <p className="mb-4">
          I also would have liked to fix a lot of small things with the UI, such as the tab rendering, the interactions, adding a maximized detail view of the activity card when clicked, and the overall layout.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;