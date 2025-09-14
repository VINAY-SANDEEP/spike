/*
Engineering College Website - Single-file React app (App.jsx)

This file contains a React application with Tailwind CSS classes.
It demonstrates a modern, responsive engineering college website with:
- Sticky navbar with dropdowns and mobile menu
- Hero section with animated gradient background and CTA
- Departments grid with icons and department pages modal
- Faculty directory with search & filter
- Events list with "See More" modal and registration mock
- Placements section with SVG stats and recruiters carousel
- Student Life, Library search, Bus Details filter, Admissions form
- Student Portal mock login (roll number) and dashboard card
- About & Contact with Google Maps iframe and chatbot placeholder
- Light/Dark theme switcher (class-based)

NOTES: This is a single-file demo. For a production app, split into components and use routing (React Router) and APIs.

Tailwind setup (brief):
1. Create React app (Vite recommended):
   npm create vite@latest college-site -- --template react
   cd college-site
2. Install Tailwind:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
3. tailwind.config.cjs: set content to ['./index.html','./src/**/

import React, { useEffect, useState } from 'react';

const sampleDepartments = [
  { id: 'cse', name: 'Computer Science & Eng (CSE)', icon: '💻', desc: 'AI, Systems, Software Engineering' },
  { id: 'ece', name: 'Electronics & Comm (ECE)', icon: '📡', desc: 'VLSI, Embedded Systems, Communications' },
  { id: 'mech', name: 'Mechanical', icon: '⚙️', desc: 'Thermal, Design, Manufacturing' },
  { id: 'civil', name: 'Civil', icon: '🏗️', desc: 'Structures, Geotech, Env. Eng' },
  { id: 'aiml', name: 'AIML', icon: '🤖', desc: 'Machine Learning, Data Science' },
  { id: 'chem', name: 'Chemical', icon: '⚗️', desc: 'Process, Materials' },
];

const sampleFaculty = [
 { id: 1, name: 'Dr. M. Sreenivasa Reddy', dept: 'General', title: 'Principal', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/1.jpg' },
{ id: 2, name: 'Dr. A. Vanathi', dept: 'CSE', title: 'Associate Professor & HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/2.jpg' },
{ id: 3, name: 'Dr. M.V. Rajesh', dept: 'CSE', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/3.jpg' },
{ id: 4, name: 'Dr. Pritam Kumar Das', dept: 'ECE', title: 'Associate Professor', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/4.jpg' },
{ id: 5, name: 'Dr. R. Giriprasad', dept: 'IT', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/5.jpg' },
{ id: 6, name: 'Dr. Selvamalar Nagarajan', dept: 'H&BS', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/6.jpg' },
{ id: 7, name: 'Dr. N. Visalakshi', dept: 'H&BS', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/7.jpg' },
{ id: 8, name: 'Dr. B Krishna Kanth', dept: 'Mining Engineering', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/8.jpg' },
{ id: 9, name: 'Dr. Srinivasa Rao Veeranki', dept: 'EEE', title: 'HOD', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/9.jpg' },
{ id: 10, name: 'Dr. G. Suresh', dept: 'CSE', title: 'Professor', spec: '', photo: 'https://aec.edu.in/Staff_Directory/staff_image/10.jpg' }

];

const sampleEvents = [
  {
    id: 'e1',
    title: 'Poster Presentation',
    date: '2025-09-16',
    short: 'Platform for students to showcase innovative ideas in Computer Science & Engineering',
    details: 'Encourages creativity, knowledge sharing, and interactive learning. Venue: Room no: 102 Bill Gates Bhavan, First Floor Seminar Hall. Organisers: Dr. A. Phani Sridhar and T. Satya Kumari.'
  },
  {
    id: 'e2',
    title: 'Code Reto',
    date: '2025-09-10 to 2025-09-15',
    short: 'Offline coding competition with two rounds testing problem-solving skills',
    details: 'Participants can code in C, C++, Python, or Java. Venue: Room No: 021, Bill Gates Bhavan, Ground Floor. Organisers: U. V. Ramesh, Dr. K. Naga Raju, M. Srinu.'
  },
  {
    id: 'e3',
    title: 'Web diseno',
    date: '2025-09-10 to 2025-09-15',
    short: 'Web designing competition creating a 5+ page content-centric website',
    details: 'Focuses on creativity and technical skills. Venue: Room no: 102 Bill Gates Bhavan, First Floor Seminar Hall. Organisers: Student Coordinators K. Tanoo Sree, V. Siri Chakra, N. Gowri Pravallika.'
  },
  {
    id: 'e4',
    title: 'Technical Quiz',
    date: '2025-10-12 to 2025-10-15',
    short: 'Multi-round technical quiz testing knowledge and logical thinking',
    details: 'Includes elimination, objective, and coding challenges. Venue: Room no: 227 Bill Gates Bhavan, First Floor Seminar Hall. Organisers: Mr. P. Anil Kumar and others from Andhra University.'
  },
  {
    id: 'e6',
    title: 'Tech Talk',
    date: '2025-09-09 to 2025-09-15',
    short: 'Presentations on emerging IT technologies or innovative IT solutions',
    details: 'Includes business models, IoT solutions, and software prototypes. Venue: Room no: 113 Bill Gates Bhavan, First Floor Seminar Hall. Organisers: Dr. V. V. Vaitheswaran and others.'
  },
  {
    id: 'e7',
    title: 'Paper Presentation',
    date: '2025-09-10 to 2025-09-15',
    short: 'Formal event showcasing research, ideas, or innovations',
    details: 'Venue: Room No: 125, Bill Gates Bhavan First Floor R & D. Organisers: R. Padmasri, Mrs. K. Vydehi.'
  },
  {
    id: 'e9',
    title: 'Aldeathon',
    date: '2025-09-01 to 2025-09-15',
    short: 'Presentation of Ideas of Change and working models',
    details: 'Venue: Visvesvaraya Bhavan, Room No: 228 (Second Floor). Organisers: Mrs. K. Kavya Ramya Sree and multiple coordinators.'
  },
  {
    id: 'e10',
    title: 'AI SPARKS QUIZ',
    date: '2025-09-10 to 2025-09-15',
    short: 'Quiz testing knowledge in AI, ML, Data Science, and emerging tech',
    details: 'Venue: Visvesvaraya Bhavan (Computer Lab 1 & 3, Ground Floor). Organisers: Roshan Prasad, V Appalakonda.'
  },
  {
    id: 'e11',
    title: 'MedhaManthan',
    date: '2025-09-01 to 2025-09-15',
    short: 'Flagship hackathon to transform ideas into working prototypes',
    details: 'Themes include AI bots, digital resumes, campus tools, accessibility solutions. Venue: Visweswaraya Bhavan. Organisers: Dr. Maganti Venkatesh and others.'
  },
];

const samplePlacements = {
  "stats": {
    "highest": 30,
    "average": 7.1,
    "placedPercent": 90,
    "totalPlaced": 2800,
    "companiesVisited": 220,
    "medianPackage": 6.0,
    "lowestPackage": 3.5,
    "internshipPercent": 75,
    "highestInternshipStipend": 1.2
  },
  "topRecruiters": [
    "INCREFF","Dmart","ASBL (Ashoka Builders)","Infosys","Sandhya Aqua","VSTAR","HSBC Technology India","Quest Global","The Indian Cements","ComTec Information Systems","ZF Rane Automotive","Praxsol Engineering Pvt Ltd","Aditya Degree College","Sharda Motors Industries","SuryaTech Solutions","Clove Technologies","Ninjacart","7.ai","Northern Arc","Dunboxed Solution Pvt. Ltd","DigitalTrust","Milekal","NCR ATLEOS","Deloitte USI | Cyber Gurukul","Prescience Decision Solutions","TCS NQT","Verizon","HPE (Hewlett Packard Enterprises)","Pennant","Verity Knowledge Solutions","Hitachi Industrial Equipment Systems Co., Ltd","Heritage","UiPath","KYB Motorcycle India Pvt Ltd","GE Vernova (Meridium Labs)","DAISEKI Co., Ltd","Akrivia HCM","Credera(TA Digital)","Tapplent","Servicenow","TCS Pega","HP (Hewlett Packard)","SOTI","Apxor","JMC Co., Ltd","Godrej Jersey","Hitachi KE Systems, Ltd","TOYOTA Connected Corporation","SANSYU","DeltaX","ADTEC Plasma","Darwinbox","Iquadra","Tejas Networks","Zopsmart","Walmart"

  ]

}

const sampleClubs = [
  { id:'webapps', name:'WebApps Club', badge:'💻'},
{ id:'automobile', name:'Automobile Club', badge:'🚗'},
{ id:'events', name:'Events Club', badge:'🎉'},
{ id:'robotics', name:'Robotics Club', badge:'🤖'},
{ id:'media', name:'Media Club', badge:'🎥'},
{ id:'cultural', name:'Cultural Club', badge:'🎭'},
{ id:'photography', name:'Photography Club', badge:'📸'},
{ id:'dance', name:'Dance Club', badge:'💃'},
{ id:'coding', name:'Coding Club', badge:'👨‍💻'},
{ id:'debating', name:'Debating Club', badge:'🗣️'},
{ id:'gaming', name:'Gaming Club', badge:'🎮'},
{ id:'entrepreneurship', name:'Entrepreneurship Club', badge:'💼'},
{ id:'aiml', name:'AI & ML Club', badge:'🧠'},
{ id:'drama', name:'Drama Club', badge:'🎬'},
{ id:'music', name:'Music Club', badge:'🎶'},

]

const App = () => {
  // Theme
  const [dark, setDark] = useState(() => false);
  useEffect(()=>{
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  },[dark]);

  // Mobile menu
  const [openMenu, setOpenMenu] = useState(false);
  // Dept modal
  const [activeDept, setActiveDept] = useState(null);
  // Faculty filter
  const [facultyQuery, setFacultyQuery] = useState('');
  const [facultyDept, setFacultyDept] = useState('all');
  // Events
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Bus filter
  const [routeFilter, setRouteFilter] = useState('');
  const buses = [
    {id:1, route:'VIRAVA', time:'18 min', status:'On Time'},
  {id:2, route:'YANAM', time:'35 min', status:'On Time'},
  {id:3, route:'MACHAVARAM', time:'35 min', status:'On Time'},
  {id:4, route:'RAMAVARAM RAYAVARAM', time:'50 min', status:'On Time'},
  {id:5, route:'PEDDAPURAM', time:'32 min', status:'On Time'},
  {id:6, route:'JAGGAMPETA', time:'24 min', status:'On Time'},
  {id:7, route:'DHARMAVARAM', time:'30 min', status:'On Time'},
  {id:8, route:'RAMANAKKAPETA NAGULAPALLI', time:'40 min', status:'On Time'},
  {id:9, route:'UPPADA', time:'--', status:'On Time'},
  ];

  // Student portal mock
  const [roll, setRoll] = useState('');
  const [student, setStudent] = useState(null);
  function loginWithRoll(e){
    e.preventDefault();
    // mock: return sample student
    setStudent({roll, name:'Vishnu S', branch:'CSE', cgpa:8.7, attendance:'92%'});
  }

  // Simple animated gradient style
  const gradientBg = "bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 dark:from-slate-800 dark:via-slate-700 dark:to-indigo-900";

  // Filtered faculty list
  const filteredFaculty = sampleFaculty.filter(f=>
    (facultyDept==='all' || f.dept===facultyDept) &&
    (f.name.toLowerCase().includes(facultyQuery.toLowerCase()) || f.spec.toLowerCase().includes(facultyQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen font-inter bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300`}> 
      {/* Sticky navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a className="flex items-center gap-3" href="#home">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">E</div>
                <div className="hidden sm:block">
                  <div className="font-semibold">Aditya University </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Shaping Future Engineers</div>
                </div>
              </a>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#departments" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition">Departments</a>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-300 transition">Academics ▾</button>
                <div className="absolute left-0 mt-3 w-48 rounded-lg shadow-lg bg-white dark:bg-slate-800 p-3 opacity-0 group-hover:opacity-100 invisible group-hover:visible transform -translate-y-1 group-hover:translate-y-0 transition-all">
                  <a className="block py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700" href="#courses">Courses</a>
                  <a className="block py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700" href="#library">Library</a>
                  <a className="block py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700" href="#placements">Placements</a>
                </div>
              </div>
              <a href="#events" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition">Events</a>
              <a href="#student-life" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition">Student Life</a>
              <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={()=>setDark(d=>!d)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition" aria-label="toggle theme">
                {dark ? '🌙' : '☀️'}
              </button>
              <a href="#admissions" className="hidden sm:inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:scale-[1.02] transition transform">Admissions</a>

              <button className="md:hidden p-2 rounded-md" onClick={()=>setOpenMenu(o=>!o)} aria-label="open menu">☰</button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {openMenu && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="px-4 py-3 flex flex-col gap-2">
              <a href="#departments">Departments</a>
              <a href="#courses">Courses</a>
              <a href="#events">Events</a>
              <a href="#placements">Placements</a>
              <a href="#student-life">Student Life</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main id="home">
        <section className={`relative overflow-hidden ${gradientBg} text-white py-20`}>
          <div className="absolute inset-0 opacity-30 animate-blob mix-blend-multiply" style={{filter:'blur(60px)'}}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow">Aditya University</h1>
                <p className="mt-4 text-lg sm:text-xl opacity-90 max-w-xl">Aditya University is a state-private university located in Surampalem, Kakinada district, Andhra Pradesh. It was formed under the Andhra Pradesh Private Universities Act, 2016, and evolved from the well-established Aditya Engineering College.</p>
                <div className="mt-6 flex gap-3">
                  <a href="#admissions" className="px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold shadow hover:scale-[1.03] transition">Apply Now</a>
                  <a href="#departments" className="px-6 py-3 rounded-lg bg-white/20 border border-white/30 hover:bg-white/30 transition">Explore Departments</a>
                </div>

                <div className="mt-6 flex gap-3 text-sm opacity-90">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-md">🎓 10+ Programs</div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-md">🏢 Industry Partnerships</div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl p-4 bg-white/20 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
                  <img src="https://i.ytimg.com/vi/OQ3uTuvBVD8/maxresdefault.jpg" alt="campus" className="w-full rounded-xl object-cover h-64 sm:h-80" />
                </div>
                <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">A+</div>
                  <div>
                    <div className="text-sm font-semibold text-indigo-500">Ranked Top 50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* decorative svg waves */}
          <svg className="absolute right-0 bottom-0 w-96 opacity-30" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 C150 200 350 0 600 100 L600 200 L0 200 Z" fill="rgba(255,255,255,0.08)" />
          </svg>
        </section>

        {/* Quick links */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    <a
      href="#admissions"
      className="p-5 rounded-2xl bg-gradient-to-tr from-blue-500/90 to-cyan-400/80 text-white font-semibold shadow-lg 
                 backdrop-blur-lg border border-white/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
    >
      Admissions
    </a>
    <a
      href="#courses"
      className="p-5 rounded-2xl bg-gradient-to-tr from-pink-500/90 to-rose-400/80 text-white font-semibold shadow-lg 
                 backdrop-blur-lg border border-white/20 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
    >
      Courses
    </a>
    <a
      href="#events"
      className="p-5 rounded-2xl bg-gradient-to-tr from-green-500/90 to-emerald-400/80 text-white font-semibold shadow-lg 
                 backdrop-blur-lg border border-white/20 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
    >
      Events
    </a>
    <a
      href="#contact"
      className="p-5 rounded-2xl bg-gradient-to-tr from-purple-500/90 to-indigo-400/80 text-white font-semibold shadow-lg 
                 backdrop-blur-lg border border-white/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
    >
      Contact
    </a>
  </div>
</section>


        {/* Departments */}
        <section id="departments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Departments & Courses</h2>
            <a href="#courses" className="text-sm text-indigo-600">View All Courses →</a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDepartments.map(d=> (
              <article key={d.id} className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 shadow hover:scale-[1.02] transition cursor-pointer" onClick={()=>setActiveDept(d)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-2xl">{d.icon}</div>
                  <div>
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">{d.desc}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">Curriculum, labs, faculty profiles & research projects available.</div>
              </article>
            ))}
          </div>

          {/* Dept modal */}
          {activeDept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/40" onClick={()=>setActiveDept(null)}></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-3xl shadow-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{activeDept.name}</h3>
                  <button onClick={()=>setActiveDept(null)} className="px-3 py-1 rounded-md">Close</button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Curriculum</h4>
                    <ul className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      <li>Core Courses</li>
                      <li>Electives</li>
                      <li>Labs & Practicals</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Labs & Research</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Modern labs, project grants, and collaborations with industry partners.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Faculty */}
        <section id="faculty" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Faculty Directory</h2>
            <div className="flex items-center gap-2">
              <select value={facultyDept} onChange={e=>setFacultyDept(e.target.value)} className="px-3 py-2 rounded-md bg-white dark:bg-slate-800">
                <option value="all">All</option>
                {sampleDepartments.map(d=> <option key={d.id} value={d.id}>{d.name.split(' ')[0]}</option>)}
              </select>
              <input placeholder="Search faculty or specialization" value={facultyQuery} onChange={e=>setFacultyQuery(e.target.value)} className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map(f=> (
              <div key={f.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow hover:scale-[1.02] transition">
                <div className="flex items-center gap-3">
                  <img src={f.photo} alt={f.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">{f.title} • {f.spec}</div>
                    <div className="text-xs text-slate-400 mt-1">Dept: {f.dept.toUpperCase()}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Profile</button>
                  <button className="px-3 py-1 rounded border">Message</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Events & Announcements</h2>
            <a href="#" className="text-sm text-indigo-600">See More →</a>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleEvents.map(ev=> (
              <article key={ev.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow hover:scale-[1.02] transition">
                <div className="text-sm font-semibold">{ev.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-300">{ev.date}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{ev.short}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=>setSelectedEvent(ev)} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">See More</button>
                  <button className="px-3 py-1 rounded border text-sm">Register</button>
                </div>
              </article>
            ))}
          </div>

          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/40" onClick={()=>setSelectedEvent(null)}></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                  <button onClick={()=>setSelectedEvent(null)} className="px-3 py-1 rounded-md">Close</button>
                </div>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  <p><strong>Date:</strong> {selectedEvent.date}</p>
                  <p className="mt-2">{selectedEvent.details}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 rounded bg-indigo-600 text-white">Register</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Placements */}
        <section id="placements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Placements & Careers</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Placement Stats</h3>
              <div className="mt-4">
                {/* simple SVG chart */}
                <svg viewBox="0 0 100 60" className="w-full h-32">
                  <rect x="5" y={60 - samplePlacements.stats.placedPercent*0.5} width="20" height={samplePlacements.stats.placedPercent*0.5} rx="2" />
                  <rect x="40" y={60 - samplePlacements.stats.average*5} width="20" height={samplePlacements.stats.average*5} rx="2" />
                  <rect x="75" y={60 - samplePlacements.stats.highest*2} width="20" height={samplePlacements.stats.highest*2} rx="2" />
                </svg>
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">Average CTC: {samplePlacements.stats.average} LPA</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Highest: {samplePlacements.stats.highest} LPA</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Placed: {samplePlacements.stats.placedPercent}%</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow col-span-2">
              <h3 className="font-semibold">Top Recruiters</h3>
              <div className="mt-4 flex gap-4 overflow-x-auto py-2">
                {samplePlacements.topRecruiters.map((r,i)=> (
                  <div key={i} className="min-w-[160px] p-4 rounded-lg bg-white/30 dark:bg-slate-700 flex items-center justify-center">{r}</div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Alumni Success Stories</h4>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/20">“The college prepared me well for industry roles.” — Alumnus</div>
                  <div className="p-4 rounded-lg bg-white/20">“Great mentorship and project exposure.” — Alumnus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Life */}
        <section id="student-life" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Student Life</h2>
            <a className="text-sm text-indigo-600" href="#clubs">Clubs & Societies →</a>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Clubs & Societies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {sampleClubs.map(c=> (
                  <div key={c.id} className="px-3 py-2 rounded-full bg-white/10">{c.badge} {c.name}</div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Upcoming Activities</h3>
              <ul className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <li>Robotics Workshop — Register</li>
                <li>Cultural Night — Sign Up</li>
                <li>Drone Competition — Apply</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Gallery</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN142xhWxYgKH2Sy6KIJxMn9pKnDBavcRN2A&s" className="w-full h-24 object-cover rounded" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIPgYrutbIwy2m-8dhqDrQbLQgo8tCirQVbg&s" className="w-full h-24 object-cover rounded" /> 
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M-2tccyWhe9NqZhLs8PagdSkrx7rIcq1IZfH-P8ezV9SGhEBRzC-7ynNgKisxVX-yQk&usqp=CAU" className="w-full h-24 object-cover rounded" /> 
                <img src="https://aec.edu.in/images/gallery/VEDA5.JPG" className="w-full h-24 object-cover rounded" /> 
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_fA6Ww1OUzPOfC3Zyn0yiwOWhwOZOjv5hg&s" className="w-full h-24 object-cover rounded" /> 
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyvK9Chx3bMmcsulVDwqa0O8Q1NPTo9_wcw&s" className="w-full h-24 object-cover rounded" /> 
                <img src="https://media.licdn.com/dms/image/v2/D4D22AQG4pi2litTblw/feedshare-shrink_800/B4DZiIOinUHsAg-/0/1754632172550?e=2147483647&v=beta&t=WUG1n6sFHQmC5VkN1vAJjbahe5yUkdQNqCUYMERXF9A" className="w-full h-24 object-cover rounded" /> 
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M-2tccyWhe9NqZhLs8PagdSkrx7rIcq1IZfH-P8ezV9SGhEBRzC-7ynNgKisxVX-yQk&usqp=CAU" className="w-full h-24 object-cover rounded" /> 
              </div>
            </div>
          </div>
        </section>

        {/* Library & Resources */}
        <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Library & Resources</h2>
            <a className="text-sm text-indigo-600" href="#">Digital Library →</a>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow md:col-span-2">
              <h3 className="font-semibold">Search E-Resources</h3>
              <div className="mt-3 flex gap-2">
                <input className="flex-1 px-3 py-2 rounded-md bg-white dark:bg-slate-700" placeholder="Search books, journals, notes" />
                <button className="px-4 py-2 rounded bg-indigo-600 text-white">Search</button>
              </div>

              <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">Downloadable syllabus, notes, and past papers are available for registered students.</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Popular Resources</h3>
              <ul className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <li>Data Structures Notes</li>
                <li>Signals & Systems Past Papers</li>
                <li>AI Lab Manuals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bus Details */}
        <section id="bus-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Bus Details</h2>
            <div className="text-sm text-slate-500">Filter by route</div>
          </div>

          <div className="mt-4 flex gap-3 items-center">
            <input placeholder="Route (A1, B4...)" value={routeFilter} onChange={e=>setRouteFilter(e.target.value)} className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
            <button className="px-3 py-2 rounded bg-indigo-600 text-white">Filter</button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {buses.filter(b=> routeFilter? b.route.toLowerCase().includes(routeFilter.toLowerCase()): true).map(b=> (
              <div key={b.id} className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                <div className="font-semibold">Route {b.route}</div>
                <div className="text-sm">Time: {b.time}</div>
                <div className="text-sm">Status: {b.status}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Admissions */}
        <section id="admissions" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Admissions</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Apply online in a few steps. Scholarships available for meritorious students.</p>

          <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e)=>{e.preventDefault(); alert('Application submitted (mock)')}}>
            <input required placeholder="Full name" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
            <input required placeholder="Email" type="email" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
            <select className="px-3 py-2 rounded-md bg-white dark:bg-slate-800">
              <option>Choose Program</option>
              <option>B.Tech CSE</option>
              <option>B.Tech ECE</option>
            </select>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Submit Application</button>
              <button type="button" className="px-4 py-2 rounded border">Download Brochure</button>
            </div>
          </form>
        </section>

        {/* Student Portal */}
        <section id="student-portal" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Student Portal</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Login with your roll number to access dashboard.</p>

          {!student ? (
            <form className="mt-4 flex gap-2" onSubmit={loginWithRoll}>
              <input value={roll} onChange={e=>setRoll(e.target.value)} placeholder="Roll number" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
              <button className="px-4 py-2 rounded bg-indigo-600 text-white">Login</button>
            </form>
          ) : (
            <div className="mt-4 p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
              <div className="font-semibold">{student.name} ({student.roll})</div>
              <div className="text-sm">Branch: {student.branch}</div>
              <div className="text-sm">CGPA: {student.cgpa}</div>
              <div className="text-sm">Attendance: {student.attendance}</div>
            </div>
          )}
        </section>

        {/* About & Contact */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">About Us</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Founded with a vision to empower engineers with future-ready skills, Evoke Engineering blends academic rigour with industry exposure.</p>

              <h4 className="mt-4 font-semibold">Vision</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">To be a centre of excellence in engineering education.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="font-semibold">Contact</h3>
              <form className="mt-3 grid grid-cols-1 gap-3" onSubmit={(e)=>{e.preventDefault(); alert('Message sent (mock)')}}>
                <input placeholder="Your name" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
                <input placeholder="Email" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
                <textarea placeholder="Message" className="px-3 py-2 rounded-md bg-white dark:bg-slate-800" />
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded bg-indigo-600 text-white">Send</button>
                  <button type="button" className="px-4 py-2 rounded border">Chatbot</button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6">
            <iframe title="campus map" className="w-full h-64 rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019135679586!2d144.963058115904!3d-37.81410797975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f7b6b7%3A0x5045675218ce540!2sEngineering%20Campus!5e0!3m2!1sen!2sus!4v1588888888888!5m2!1sen!2sus" />
          </div>
        </section>

        <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <div className="font-semibold">Evoke Engineering</div>
              <div className="text-sm text-slate-500">© 2025. All rights reserved.</div>
            </div>
            <div className="text-sm text-slate-500">Made with ❤️ for students</div>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default App;
