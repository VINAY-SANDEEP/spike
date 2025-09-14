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
  { id:1, name:'Dr. Asha Rao', dept:'cse', title:'Associate Professor', spec:'AI & ML', photo:'https://i.pravatar.cc/150?img=11' },
  { id:2, name:'Prof. Ravi Kumar', dept:'ece', title:'Professor', spec:'VLSI', photo:'https://i.pravatar.cc/150?img=12' },
  { id:3, name:'Dr. Meera Iyer', dept:'aiml', title:'Assistant Professor', spec:'NLP', photo:'https://i.pravatar.cc/150?img=13' },
  { id:4, name:'Prof. Suresh N', dept:'mech', title:'Professor', spec:'Thermal', photo:'https://i.pravatar.cc/150?img=14' },
  { id:5, name:'Dr. Kavita P', dept:'civil', title:'Assistant Professor', spec:'Hydrology', photo:'https://i.pravatar.cc/150?img=15' },
];

const sampleEvents = [
  { id: 'e1', title:'HackFest 2025', date: '2025-10-05', short:'48-hour coding marathon', details:'Open to all students. Prizes, internships and mentorships.' },
  { id: 'e2', title:'AI Seminar Series', date: '2025-08-20', short:'Talks by industry leaders', details:'Keynotes, workshops, and networking.' },
  { id: 'e3', title:'TechSymposium', date: '2025-09-30', short:'Research presentations and posters', details:'Students showcase projects and papers.' },
];

const samplePlacements = {
  stats: { highest: 28, average: 6.4, placedPercent: 92 },
  topRecruiters: ['Google', 'Microsoft', 'TCS', 'Amazon', 'Infosys', 'Siemens']
}

const sampleClubs = [
  { id:'tech', name:'Tech Club', badge:'🔧'},
  { id:'robotics', name:'Robotics Club', badge:'🤖'},
  { id:'cultural', name:'Cultural Club', badge:'🎭'},
  { id:'drone', name:'Drone Club', badge:'🛩️'},
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
    {id:1, route:'A1', time:'7:30 AM', status:'On Time'},
    {id:2, route:'B4', time:'7:45 AM', status:'Delayed'},
    {id:3, route:'C2', time:'8:00 AM', status:'On Time'},
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
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow">Shaping Future Engineers</h1>
                <p className="mt-4 text-lg sm:text-xl opacity-90 max-w-xl">A modern engineering college fostering innovation, research, and industry-ready skills. Join a community that learns by doing.</p>
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
                  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=123456" alt="campus" className="w-full rounded-xl object-cover h-64 sm:h-80" />
                </div>
                <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">A+</div>
                  <div>
                    <div className="text-sm font-semibold">Ranked Top 50</div>
                    <div className="text-xs text-slate-700 dark:text-slate-200">Engineering colleges — 2025</div>
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <a href="#admissions" className="p-4 rounded-xl bg-gradient-to-r from-white to-white/30 border border-slate-100 dark:border-slate-800 shadow hover:scale-[1.02] transition">Admissions</a>
            <a href="#courses" className="p-4 rounded-xl bg-gradient-to-r from-white to-white/30 border border-slate-100 dark:border-slate-800 shadow hover:scale-[1.02] transition">Courses</a>
            <a href="#events" className="p-4 rounded-xl bg-gradient-to-r from-white to-white/30 border border-slate-100 dark:border-slate-800 shadow hover:scale-[1.02] transition">Events</a>
            <a href="#contact" className="p-4 rounded-xl bg-gradient-to-r from-white to-white/30 border border-slate-100 dark:border-slate-800 shadow hover:scale-[1.02] transition">Contact</a>
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
                <img src="https://images.unsplash.com/photo-1503437313881-503a91226421?q=80&w=800&auto=format&fit=crop&s=abc" className="w-full h-24 object-cover rounded" />
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop&s=def" className="w-full h-24 object-cover rounded" />
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
