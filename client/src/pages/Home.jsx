import React from 'react';

const Home = () => {
  console.log('Rendering Home');
  return (
    <section className="bg-light">
      <div className="container py-5 py-lg-0 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-4 fw-extrabold">
            Welcome to Gym Management System.
          </h1>
          <p className="mt-4 fs-4">
            Manage gym members, trainers, fitness classes, schedules, attendance, and payments with ease.
          </p>
          <div className="mt-4 d-flex flex-wrap justify-content-center gap-4">
            <a
              href="/dashboard"
              className="btn btn-danger text-white px-4 py-2 shadow-sm hover:bg-danger focus:outline-none focus:ring active:bg-danger"
            >
             Go To Dashboard
            </a>
            <a
              href="/about"
              className="btn btn-outline-danger text-danger px-4 py-2 shadow-sm hover-text-danger focus:outline-none focus:ring active:text-danger"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
