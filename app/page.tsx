import Image from "next/image";
import AcmeLogo from "@/app/ui/acme-logo";
import { lusitana } from "@/app/ui/fonts";
import "./style.css"

import Link from "next/link";
import JobListCard from "@/components/job-list-card";

export default function Page() {
	return (
		<>
			<header>
				<nav>
					<Link href="#"><h3>EdenJobs</h3></Link>
					<ul>
						<li><button id="jobs">Jobs</button></li>
						<li><button id="recruiter">Recruiter</button></li>
						<li><button id="resources">Resources</button></li>
						<li><button id="training">Training</button></li>
						<li><Link href="/login" id="login">Login</Link></li>
						<li>
							<button id="post-job">
								Post a Job <i className="fas fa-arrow-right"></i>
							</button>
						</li>
					</ul>
					<i className="fas fa-bars"></i>
				</nav>
				<section className="hero">
					<h1>The Quickest way to get Hired!</h1>
					<p>
						Join our 200k affiliates for Great Opportunities. Receive your top new
						matches directly in your inbox
					</p>
					<div className="search-box">
						<i className="fas fa-search"></i>
						<input
							type="search"
							name="search"
							id="search"
							placeholder="What kind of job are you looking for?"
						/>
						<button id="search-btn">Search</button>
					</div>
					<div className="filter-box">
						<b>Filter</b>
						<div className="filters">
							<label htmlFor="location">Location</label>
							<div className="check">
								<div className="mark"></div>
								<input type="checkbox" name="location" id="location" />
							</div>
							<label htmlFor="remote">Remote</label>
							<div className="check">
								<div className="mark"></div>
								<input type="checkbox" name="remote" id="remote" />
							</div>
							<label htmlFor="onsite">On-Site</label>
							<div className="check">
								<div className="mark"></div>
								<input type="checkbox" name="onsite" id="onsite" />
							</div>
						</div>
					</div>
					<Link href="#" id="signup">FInd a Job</Link>
				</section>
			</header>
			<main>
				<strong>About Us</strong>
				<br />
				<section className="about">
					<img className="" src="/images/pexels-andrea-piacquadio-3755440.jpg" alt="about" />
					<div>
						<h2>We are a leading worldwide online recruitment marketplace</h2>
						<p>
							Our vision is to help businesses get the right fit for the roles
							they want to fill and help individuals worldwide connect to the
							right job that fits their life goals. We bring benefits to competent
							job seekers, start-ups, and establishments.
						</p>
						<Link href="#" id="get-started">Get Started</Link>
					</div>
				</section>
				<br /><br />
				<strong>How It Works</strong>
				<section className="action">
					<div className="main-action">
						<button id="recruiter-btn" className="active">I am a recruiter</button>
						<button id="worker-btn">I am looking for a job</button>
					</div>
					<h2>Getting started is easy</h2>
					<p>
						Create a profile and we’ll match you with the best candidates that
						meet your company's standards
					</p>
					<div className="preview">
						<div className="how-card">
							<img src="/images/Rectangle 11.png" alt="" />
							<h2>01</h2>
							<b>Register and Login</b>
							<p>
								Create an account and access your saved settings on any device.
							</p>
						</div>
						<div className="how-card">
							<img src="/images/Rectangle 11.png" alt="" />
							<h2>02</h2>
							<b>Fill in your company data</b>
							<p>Fill in your company data and access your saved information</p>
						</div>
						<div className="how-card">
							<img src="/images/Rectangle 11.png" alt="" />
							<h2>03</h2>
							<b>Vet applications</b>
							<p>Vet applications that has been submitted and access them</p>
						</div>
						<div className="how-card">
							<img src="/images/Rectangle 11.png" alt="" />
							<h2>04</h2>
							<b>Find your match</b>
							<p>Find a complete match to the search you made ...</p>
						</div>
					</div>
					<Link href="#" id="signup">Sign up now</Link>
				</section>
				<br />
				<br />
				<section className="recent">
					<strong>Recent Jobs</strong>
					<br />
					<div className=" md:grid md:grid-cols-[repeat(2,1fr)] items-center gap-10 mx-0 my-[50px]">
						{[...Array(11)].map(e => (<JobListCard key={e} />))}
					</div>
				</section>
			</main>
			<footer>
				<h3>EdenJobs</h3>
				<h2>Don't miss any job interview invite</h2>
				<p>
					Get job notifications anytime, anywhere. Download the scout4job app now.
				</p>
				<div className="input">
					<i className="fas fa-envelope"></i>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="yours@example.com"
					/>
					<button id="join">Subscribe</button>
				</div>
				<div className="footer-bottom">
					<Link href="#"><i className="fab fa-linkedin"></i></Link>
					<Link href="#"><i className="fab fa-instagram"></i></Link>
					<Link href="#"><i className="fab fa-facebook"></i></Link>
				</div>
				<small>&copy;EdenJobs 2023. All rights reserved</small>
			</footer>
		</>
	);
}
