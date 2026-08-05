"use client";

import Link from "next/link";
import Image from "next/image";
import "./ServicesPage.css";
import { FiArrowRight } from "react-icons/fi";

export default function ServicesPage() {
  return (
    <>
      {/* BANNER */}
      <section className="servicespg-banner">
        <div className="servicespg-banner-overlay"></div>

        <div className="servicespg-banner-content">
        <h1>Our Services</h1>

          <div className="servicespg-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <p>Services</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="servicespg-section">

        <div className="servicespg-container">

          {/* TOP HEADING */}
          <div className="servicespg-top">

            <p className="servicespg-small">
    PROFESSIONAL TRUCK SERVICES
  </p>

          <h2 className="servicespg-heading">
    Heavy-Duty Truck Repair & Maintenance Solutions
  </h2>

          
  <p className="servicespg-para">
    Kings Truck Center provides reliable truck repair, diagnostics,
    preventive maintenance, tire services, brake repair, engine work,
    transmission solutions, and roadside support for commercial trucks
    and heavy-duty vehicles. Our experienced mechanics help minimize
    downtime, improve fleet performance, and keep your trucks running
    safely on every mile.
  </p>

          </div>

          {/* SERVICES GRID */}
          <div className="servicespg-grid">

           {/* CARD 1 */}
<div className="servicespg-card">

  <div className="servicespg-imgwrap">
    <Image
      src="/images/wheelalignment_service.png"
      alt="Wheel Alignment"
      width={500}
      height={350}
    />
  </div>

  <div className="servicespg-cardcontent">

    <h3>Wheel Alignment</h3>

    <p>
      Professional truck wheel alignment services designed to improve
      steering accuracy, reduce uneven tire wear, enhance fuel efficiency,
      and provide smoother, safer handling for heavy-duty commercial vehicles.
    </p>

    <Link href="/request-service">
      Request Service
      <FiArrowRight />
    </Link>

  </div>

</div>
{/* HUNTER ALIGNMENT */}
<div className="servicespg-card">

  <div className="servicespg-imgwrap">
    <Image
      src="/images/hunter-alignment-service.png"
      alt="Hunter Alignment"
      width={500}
      height={350}
    />
  </div>

  <div className="servicespg-cardcontent">

    <h3>Hunter Alignment</h3>

    <p>
      Precision Hunter wheel alignment services using advanced laser-guided
      alignment technology to improve steering accuracy, reduce tire wear,
      enhance fuel efficiency, and ensure optimal performance for heavy-duty
      trucks and commercial fleets.
    </p>

    <Link href="/request-service">
      Request Service
      <FiArrowRight />
    </Link>

  </div>

</div>
          <div className="servicespg-card">

  <div className="servicespg-imgwrap">
    <Image
      src="/images/dpf_filters.png"
      alt="DPF Cleaning"
      width={500}
      height={350}
    />
  </div>

  <div className="servicespg-cardcontent">

    <h3>DPF Cleaning</h3>

    <p>
      Professional DPF cleaning services designed to remove soot buildup,
      improve fuel efficiency, restore diesel engine performance, reduce
      harmful emissions, and help prevent costly engine repairs and downtime.
    </p>

    <Link href="/request-service">
      Request Service
      <FiArrowRight />
    </Link>

  </div>

</div>
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/oil_changes.jpeg"
                  alt="Oil Change"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Oil Change</h3>

<p>
  Premium truck oil change and filter replacement services designed to
  protect heavy-duty engines, improve fuel efficiency, reduce wear,
  and maximize long-term vehicle performance for commercial fleets.
</p>

                <Link href="/request-service">
                  Request Service
                    <FiArrowRight />
                </Link>

              </div>

            </div>
            

            {/* CARD 2 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/tires.jpeg"
                  alt="New & Used Tires"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>New & Used Tires</h3>

<p>
  High-quality new and used truck tires with professional installation,
  balancing, rotation, and repair services for enhanced traction,
  durability, road safety, and reliable long-haul performance.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

            {/* CARD 3 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/suspensions.png"
                  alt="Suspension"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Suspension</h3>

<p>
  Complete truck suspension inspection and repair solutions that improve
  ride stability, steering control, load handling, and overall driving
  comfort for heavy-duty commercial vehicles.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

            {/* CARD 4 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/brakes.jpg"
                  alt="Brakes"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Brakes</h3>
<p>
  Professional truck brake repair and maintenance services to ensure
  dependable stopping power, safer driving conditions, reduced wear,
  and maximum braking performance under demanding workloads.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

            {/* CARD 5 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/computer_diagnostics.jpeg"
                  alt="Computer Diagnostic"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Computer Diagnostic</h3>

<p>
  Advanced computerized truck diagnostics that quickly identify engine
  faults, sensor failures, electrical issues, and performance problems
  for fast and accurate repair solutions.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

            {/* CARD 6 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/engines.png"
                  alt="Engine"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Engine</h3>

<p>
  Expert truck engine repair and maintenance services including tune-ups,
  diagnostics, component replacement, and performance optimization to
  improve power, reliability, and fuel efficiency.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

            {/* CARD 7 */}
            <div className="servicespg-card">

              <div className="servicespg-imgwrap">
                <Image
                  src="/images/transmissions.jpg"
                  alt="Transmission"
                  width={500}
                  height={350}
                />
              </div>

              <div className="servicespg-cardcontent">

                <h3>Transmission</h3>

<p>
  Reliable truck transmission repair and maintenance services designed
  to improve gear shifting, drivetrain performance, durability, and
  overall operational efficiency for commercial trucks.
</p>

                <Link href="/request-service">
                  Request Service
                      <FiArrowRight />
                </Link>

              </div>

            </div>

        

          </div>
          

        </div>
        {/* MOVING CALL SECTION */}
<div className="servicespg-marquee-wrap">

  <div className="servicespg-marquee servicespg-marquee-left">
   <div className="servicespg-marquee-track">

 <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
<span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
  <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
<span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
  <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
 <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
  <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>
  <span>24/7 Heavy-Duty Truck Repair <span>*</span></span>

</div>
  </div>

  <div className="servicespg-marquee servicespg-marquee-right">
  <div className="servicespg-marquee-track">

 <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
<span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
  <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
  <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
 <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
<span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
 <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>
 <span>Kings Truck Center • +1 (916)-382-4306 <span>*</span></span>

</div>
  </div>

</div>

      </section>
    </>
  );
}