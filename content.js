/*
  Update chapter text, images, events, and officer details in this file.
  The layout and shared components live in app.js and the HTML pages.
*/
window.siteContent = {
  site: {
    shortName: "IEEE SFSU",
    fullName: "IEEE at San Francisco State University",
    tagline: "Advancing technology for humanity through hardware, robotics, and research.",
    email: "sfsu.ieee@gmail.com",
    // No set room or standing meeting time yet — the footer skips these lines while
    // they are commented out. Uncomment (with real values) once they are confirmed.
    // location: "Engineering Building, Room TBD",
    // meetingTime: "Wednesdays at 4:30 PM",
    social: [
      { label: "Instagram", href: "https://www.instagram.com/ieeesfsu/"},
      { label: "LinkedIn", href: "https://www.linkedin.com/company/ieeesfsu" },
      { label: "Discord", href: "https://discord.com/invite/zUatMA5DYS" }
    ],
    footerLinks: [
      { label: "Home", href: "index.html" },
      { label: "About", href: "index.html#about" },
      { label: "Event Calendar", href: "event-calendar.html" },
      { label: "Officers", href: "officers.html" },
      { label: "Support/Donation", href: "support.html" },
      { label: "Opportunities", href: "research.html" }
    ]
  },
  navigation: [
    {
      label: "Home",
      links: [
        { label: "Home", href: "index.html" },
        { label: "Our chapter", href: "index.html#about" },
        { label: "Focus areas", href: "index.html#pillars" },
        { label: "FAQ", href: "index.html#faq" }
      ]
    },
    // Disabled until the officers page has real content — remove `disabled` to re-enable.
    { label: "Officers", href: "officers.html", disabled: true },
    {
      label: "Event Calendar",
      links: [
        { label: "Upcoming Events", href: "event-calendar.html" },
        // Disabled until past-events.html has real chapter history — remove `disabled` to re-enable.
        { label: "Past Events", href: "past-events.html", disabled: true }
      ]
    },
    { label: "Support/Donate", href: "support.html" },
    {
      label: "Opportunities",
      links: [
        { label: "Student Orgs", href: "research.html#student-orgs" },
        { label: "Research Labs", href: "research.html#research-labs" }
      ]
    }
  ],
  aboutCopy:
    "IEEE’s core purpose is to foster technological innovation and excellence for the benefit of humanity. IEEE at SF State is the university’s student chapter of this global organization. In addition to advancing IEEE’s broader mission, our chapter supports students in electrical and computer engineering by fostering community, encouraging collaboration through research and hands-on projects, and building connections between students and the technology industry.",
  heroSlides: (window.sitePictures && window.sitePictures.homepage) || [],
  quickFacts: [
    {
      label: "Weekly rhythm",
      title: "Build lab + chapter meeting",
      description: "Keep one predictable weekly touchpoint for technical work, announcements, and open questions."
    },
    {
      label: "Beginner friendly",
      title: "Open to all skill levels",
      description: "The site language and chapter structure are intentionally welcoming for first-time builders."
    },
    {
      label: "Career growth",
      title: "Industry and alumni connection",
      description: "Guest speakers, resume support, research mixers, and pathways to internships can live here."
    },
    {
      label: "Chapter identity",
      title: "Hardware, robotics, research",
      description: "The design leans into electrical engineering without becoming visually crowded or hard to edit."
    }
  ],
  chapterStats: [
    { value: 40, suffix: "+", label: "active members" },
    { value: 4, suffix: "+", label: "planned events" },
    { value: 200, suffix: "+", label: "alumni connections" },
    { value: 10, suffix: "+", label: "research labs" }
  ],
  pillars: [
    {
      title: "Hardware Systems",
      description: "Create space for circuit analysis, bench skills, PCB fundamentals, and measurement tools.",
      details: ["Prototyping", "PCB basics", "Lab practice"]
    },
    {
      title: "Robotics and Embedded",
      description: "Bridge software and hardware through sensors, control, firmware, and autonomous systems.",
      details: ["Microcontrollers", "Controls", "Integration"]
    },
    {
      title: "Research Culture",
      description: "Support students who want to explore faculty work, present findings, or test original ideas.",
      details: ["Research mixers", "Poster nights", "Peer review"]
    },
    {
      title: "Professional Community",
      description: "Grow confidence through leadership, mentorship, outreach, and real industry conversation.",
      details: ["Networking", "Mentorship", "Leadership"]
    }
  ],
  // Dev note: featureStories feeds the homepage #spotlight-grid section (see index.html).
  // Add { label, title, description, href } objects here to bring that section back.
  featureStories: [],
  eventFilters: ["IEEE", "Solar Regatta", "ASME", "Chomp City", "Research"],
  googleCalendar: {
    apiKey: "",
    calendarId: "",
    maxResults: 6,
    timeZone: "America/Los_Angeles"
  },
  // Dev note: ONE list for every event, past and upcoming — nothing needs to be moved
  // by hand. app.js compares startISO/endISO against the current date on every page
  // load: events that haven't happened yet show on the homepage and event-calendar.html;
  // events that have already ended automatically show up on past-events.html, grouped
  // by academic year (derived from startISO — Aug-Dec counts as that year's fall term,
  // Jan-Jul as the previous year's spring term). startISO/endISO are REQUIRED on every
  // entry — they're the only signal used for that classification, for the "Add to
  // calendar" links, and for the academic-year grouping.
  //
  // Easiest way to add a new event: open admin/add-event.html in a browser, fill out
  // the form, and paste the generated object in here.
  events: [
    {
      slug: "sandisk-workshop",
      title: "SanDisk Workshop",
      category: "IEEE",
      date: "September 14, 2026",
      time: "6:00 PM to 7:30 PM",
      // Local start/end — required. Keep in sync with date/time above.
      startISO: "2026-09-14T18:00:00",
      endISO: "2026-09-14T19:30:00",
      location: "SEIC 401 + Hybrid option",
      description: "Learn what recruiters and engineers actually look for, and get your resume reviewed live by SanDisk professionals.",
      details: "Includes a live resume review, small-group / 1-on-1 resume reviews, and a Q&A with career advice from SanDisk recruiters and engineers.",
      image: "images/sandisk-logo.jpg",
      alt: "SanDisk logo.",
      ctaText: "Event details placeholder",
      registerLink: "#"
    },
    {
      slug: "solar-regatta-general-meeting",
      title: "Solar Regatta General Meeting",
      category: "Solar Regatta",
      date: "September 3, 2026",
      time: "12:30 PM to 3:00 PM",
      // Local start/end — required. Keep in sync with date/time above.
      startISO: "2026-09-03T12:30:00",
      endISO: "2026-09-03T15:00:00",
      location: "SEIC 400",
      description: "An open session for students interested in electrical systems, boat design, and joining the Solar Regatta competition team.",
      details: "Meeting to discuss team building and beginning designs for new systems. Solar Regatta meets every Thursday in SEIC 400 — same time and room each week.",
      image: "images/solar-gators-logo.jpg",
      alt: "Solar Gators logo.",
      discordLink: "https://discord.gg/G2dvwZGfUD"
    }
  ],
  membershipBenefits: [
    {
      title: "Discord is the front door",
      description: "Join the chapter Discord to see announcements, ask questions, and find the next meeting or build night."
    },
    {
      title: "Events make you a member",
      description: "Show up to meetings, workshops, socials, and project sessions. Local involvement is intentionally low-friction."
    },
    {
      title: "No required subscription",
      description: "You do not need paid national IEEE membership to participate in IEEE at SFSU chapter activities."
    },
    {
      title: "National IEEE is optional",
      description: "Students can choose national IEEE membership later if they want extra benefits, publications, or conference resources."
    }
  ],
  joinSteps: [
    {
      step: "1",
      title: "Join the Discord",
      description: "Use this button for your real Discord invite once it is ready. This is the easiest way to follow chapter updates."
    },
    {
      step: "2",
      title: "Attend an event",
      description: "Come to a general meeting, workshop, project night, or partner event. New students can start at any time."
    },
    {
      step: "3",
      title: "Pick your pace",
      description: "You can join casually, help with one project, or grow toward officer work. There is no pressure to know everything."
    },
    {
      step: "4",
      title: "Stay connected",
      description: "Keep checking Discord and the Event Calendar so you do not miss meetings, workshops, and opportunities."
    }
  ],
  supportWays: [
    {
      title: "Donate parts and materials",
      description: "Help students get hands-on experience with boards, sensors, motors, tools, lab supplies, and prototyping materials."
    },
    {
      title: "Sponsor workshops",
      description: "Support food, components, printed materials, guest speaker logistics, or beginner-friendly technical sessions."
    },
    {
      title: "Support student travel",
      description: "Help members attend conferences, competitions, showcases, research events, and professional development programs."
    },
    {
      title: "Mentor or speak",
      description: "Share industry, research, graduate school, or project advice with students exploring engineering pathways."
    }
  ],
  faqItems: [
    {
      question: "Do I need experience before joining?",
      answer: "No. The chapter can support beginners while still making space for advanced projects and leadership."
    },
    {
      question: "Is IEEE only for electrical engineering majors?",
      answer: "No. Students interested in electronics, computing, robotics, research, or related fields can still find a place here."
    },
    {
      question: "Do I need national IEEE membership right away?",
      answer: "No. To join IEEE at SFSU locally, join the Discord and attend events. A paid national IEEE membership is optional if you want extra IEEE benefits later."
    }
  ],
  // Dev note: feeds research.html's #student-orgs-grid. Source: SF State School of
  // Engineering student organizations page
  // (https://engineering.sfsu.edu/student-organizations). Officer rosters are left out
  // on purpose so this list does not go stale every time a board turns over — contact
  // links only. IEEE is listed first since this is our site.
  studentOrgs: [
    {
      name: "Institute of Electrical and Electronics Engineers",
      acronym: "IEEE",
      description: "That's us. The student chapter for electrical and computer engineering at SF State, connecting students through hands-on projects, industry events, and scholarship.",
      links: [
        { label: "Email", href: "mailto:sfsu.ieee@gmail.com" },
        { label: "Discord", href: "https://discord.com/invite/zUatMA5DYS" },
        { label: "Instagram", href: "https://www.instagram.com/ieeesfsu/" }
      ]
    },
    {
      name: "American Society of Civil Engineering",
      acronym: "ASCE",
      description: "Bridges the gap between SF State civil engineering students and industry through social events, seminars, and career fairs.",
      links: [
        { label: "Email", href: "mailto:sfascesu@gmail.com" },
        { label: "Website", href: "https://www.ascesfsu.org" },
        { label: "Instagram", href: "https://instagram.com/ascesfsu" }
      ]
    },
    {
      name: "American Society of Heating, Refrigerating, and Air-conditioning Engineers",
      acronym: "ASHRAE",
      description: "For students exploring careers in energy efficiency and HVACR, with monthly professional meetings and funding to attend national conferences.",
      links: [
        { label: "Email", href: "mailto:ashraegg@mail.sfsu.edu" },
        { label: "Website", href: "https://ggashrae.org" }
      ]
    },
    {
      name: "American Society of Mechanical Engineers",
      acronym: "ASME",
      description: "The officially recognized ASME International student section at SF State, running career events, industry tours, seminars, and socials for future mechanical engineers.",
      links: [
        { label: "Email", href: "mailto:asme@mail.sfsu.edu" },
        { label: "Website", href: "https://www.sfasme.org/" },
        { label: "Instagram", href: "https://www.instagram.com/sfsuasme/" },
        { label: "Linktree", href: "https://linktr.ee/asmeatsfsu" }
      ]
    },
    {
      name: "Engineering Design Club",
      acronym: "EDC",
      description: "A newer org offering robotics, design, and controls experience — currently focused on building affordable, open-source prosthetics for amputees.",
      links: [{ label: "Email", href: "mailto:jmarti30@mail.sfsu.edu" }]
    },
    {
      name: "Engineering Students Advisory Board",
      acronym: "ESAB",
      description: "Student advisory board that keeps engineering and computer science students up to date on School of Engineering news, events, and opportunities.",
      links: [
        { label: "Email", href: "mailto:esabsfstate@gmail.com" },
        { label: "Instagram", href: "https://www.instagram.com/esabsfstate/" }
      ]
    },
    {
      name: "Golden Gate Racing",
      acronym: "SAE",
      description: "Designs and manufactures a completely bespoke race car, building skills in fabrication, budgeting, project management, and teamwork along the way.",
      links: [{ label: "Email", href: "mailto:sae.sfsu@gmail.com" }]
    },
    {
      name: "National Society of Black Engineers",
      acronym: "NSBE",
      description: "Works to increase the number of culturally responsible Black engineers through academic support, technical experience, career fairs, industry tours, and conferences.",
      links: [
        { label: "Email", href: "mailto:nsbeatsfsu@gmail.com" },
        { label: "Discord", href: "https://discord.gg/QUMrhxfFSc" },
        { label: "Instagram", href: "https://www.instagram.com/nsbe_at_sfsu/" }
      ]
    },
    {
      name: "Rapid Prototyping Lab",
      acronym: "RPL",
      description: "Student-led makerspace open to all SF State engineering students, with 3D printing, CAD software, manufacturing tools, and training for class and senior design projects. Based in SCI 109.",
      links: [
        { label: "Email", href: "mailto:rplabsfsu@gmail.com" },
        { label: "Website", href: "https://engineering.sfsu.edu/rpl-project" }
      ]
    },
    {
      name: "SF Hacks",
      acronym: "",
      description: "Plans and hosts a 24-hour hackathon that brings collegiate hackers, designers, and developers together for a weekend of building.",
      links: [
        { label: "Email", href: "mailto:sfhacksteam@gmail.com" },
        { label: "Website", href: "https://sfhacks.io/" },
        { label: "Discord", href: "https://discord.gg/255R44UjPt" },
        { label: "Instagram", href: "https://www.instagram.com/sf.hacks/" }
      ]
    },
    {
      name: "Society of Hispanic Professional Engineers",
      acronym: "SHPE",
      description: "Empowers the Hispanic community to reach its fullest potential through STEM awareness, access, support, and professional development.",
      links: [
        { label: "Email", href: "mailto:shpesfsu@gmail.com" },
        { label: "Website", href: "https://shpesfsu.wixsite.com/shpesfsu" },
        { label: "Linktree", href: "http://linktr.ee/shpesfsu" }
      ]
    },
    {
      name: "Society of Women Engineers",
      acronym: "SWE",
      description: "Focuses on empowering women in engineering and technology to reach their full potential and become leaders, while promoting the value of diversity and inclusion.",
      links: [
        { label: "Email", href: "mailto:swesfsu@gmail.com" },
        { label: "Linktree", href: "https://linktr.ee/SWESFSU" }
      ]
    },
    {
      name: "Solar Electric Vehicle Team",
      acronym: "SEVT",
      description: "Student-run team that designs, builds, and funds a single-occupant solar vehicle to race in the Formula Sun Grand Prix every summer.",
      links: [
        { label: "Email", href: "mailto:general@sevtsfsu.org" },
        { label: "Website", href: "http://www.sevtsfsu.org" }
      ]
    },
    {
      name: "Tau Beta Pi",
      acronym: "TBP",
      description: "The nation's oldest engineering honor society, founded in 1885 to recognize students for distinguished scholarship and exemplary character.",
      links: [
        { label: "Email", href: "mailto:tbpsfsu@gmail.com" },
        { label: "National site", href: "https://www.tbp.org/" }
      ]
    }
  ],
  // Dev note: feeds research.html's #research-labs-grid. Source: SF State College of
  // Engineering (https://engineering.sfsu.edu/research-labs-and-centers). EE/CE-related
  // labs are listed first since they're most relevant to IEEE members.
  researchLabs: [
    {
      name: "AI-LAMP: AI Lab for Augmented Multimodal Perception",
      director: "Dr. Sanchita Ghose",
      focus: "Computer Engineering",
      description: "Multimodal and cross-modal learning with deep neural networks, with a focus on computer vision research.",
      link: "https://sites.google.com/view/ai-lamp/",
      room: "SEC 404"
    },
    {
      name: "Nano-Electronics and Computing Research Laboratory (NeCRL)",
      director: "Dr. Hamid Mahmoodi",
      focus: "Electrical Engineering",
      description: "Designs dependable, energy-efficient computing circuits using emerging nanotechnologies.",
      link: "https://necrl.github.io/NECRL/",
      room: "SEC 318"
    },
    {
      name: "Intelligent Computing and Embedded Systems Laboratory (ICE Lab)",
      director: "Dr. Xiaorong Zhang",
      focus: "Computer Engineering",
      description: "Human-machine interfaces, neural-controlled prosthetics, and virtual reality rehabilitation systems.",
      link: "http://www.sfsu-icelab.org/",
      room: "SEC 313"
    },
    {
      name: "Personalized Health and Assistive Technologies Laboratory (PHAST Lab)",
      director: "Dr. Alyssa Kubota",
      focus: "Biomedical/Mechanical Engineering",
      description: "Human-robot interaction, particularly with socially assistive robots, and accessible technology design.",
      room: "SEC 404"
    },
    {
      name: "SFSU-Bioelectronics Lab",
      director: "Dr. Hao Jiang",
      focus: "Electrical Engineering",
      description: "Low-power integrated circuits for biomedical and bio-inspired computing applications.",
      link: "http://www.sfsu-bioelectronicslab.org/",
      room: "SEC 318"
    },
    {
      name: "Mobile and Intelligent Computing Laboratory (MIC Lab)",
      director: "Dr. Zhuwei Qin",
      focus: "Computer Engineering",
      description: "Efficient mobile computing, deep learning acceleration, and distributed edge computing.",
      link: "http://sfsu-miclab.org/",
      room: "SEC 313"
    },
    {
      name: "Computational Structural Simulations and Additive Manufacturing Lab (CSSAM Lab)",
      director: "Dr. Jenna Wong",
      focus: "Civil Engineering",
      description: "Finite element computational simulations and additive manufacturing applications for civil engineering.",
      room: "SEC 320"
    },
    {
      name: "Rapid Prototyping Laboratory (RPL)",
      director: "Dr. Kwok Siong Teh",
      focus: "Engineering (Cross-disciplinary)",
      description: "A student-run makerspace with 3D printing and modeling capabilities.",
      link: "https://www.facebook.com/SFSU-Rapid-Prototyping-Lab-940000839345311/"
      // Room not listed on the department site (marked "Location TBD" there).
    },
    {
      name: "Intelligent Structural Hazard Mitigation Laboratory (iSHM)",
      director: "Dr. Zhaoshuo Jiang",
      focus: "Civil Engineering",
      description: "Structural dynamics and vibrations research for community safety and infrastructure resilience.",
      room: "SEC 320"
    },
    {
      name: "Complex Fluids Lab",
      director: "Dr. Fatemeh Khalkhal",
      focus: "Mechanical Engineering",
      description: "Flow structures in polymer solutions, suspensions, and emulsions using computational and experimental methods.",
      link: "https://faculty.sfsu.edu/~fkhal/home",
      room: "SEC 315"
    },
    {
      name: "Controls for Assistive and REhabilitation Robotics Lab (CARE Lab)",
      director: "Dr. David Quintero",
      focus: "Mechanical Engineering",
      description: "Designs wearable robotic systems, including prosthetics and exoskeletons, for mobility assistance.",
      link: "https://www.careroboticslab.com/",
      room: "SEC 313"
    },
    {
      name: "Industrial Assessment Center (IAC)",
      director: "Dr. Ahmad R. Ganji",
      focus: "Engineering (Cross-disciplinary)",
      description: "Complimentary engineering assessments for regional manufacturers on energy, waste, and productivity.",
      link: "http://iac.sfsu.edu/",
      room: "SCI 215"
    },
    {
      name: "Biomechatronics Research Lab (BRL)",
      director: "Dr. Mojtaba Azadi",
      focus: "Biomedical Engineering",
      description: "Develops biomechanical assessment tools to detect changes in soft biological materials.",
      link: "https://sites.google.com/view/mojtabaazadi/facility",
      room: "SEC 316"
    },
    {
      name: "Gator Engineering Education Research Lab (GEER Lab)",
      director: "Dr. Stephanie Claussen",
      focus: "Engineering Education",
      description: "Research on equitable engineering education, ethics, and inclusive engineering practices.",
      link: "https://sfsuengineeringeducation.org/",
      room: "SEC 314"
    }
  ],
  officers: [
    {
      role: "Chair",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Leads chapter direction, partnerships, and semester priorities.",
      bio: "Replace this placeholder with a short intro, technical interests, and one sentence about what this officer wants the chapter to accomplish.",
      email: "chair@sfsu.edu",
      image: "https://placehold.co/720x840/004c79/f8fafc?text=Chair",
      alt: "Placeholder image labeled Chair."
    },
    {
      role: "Vice Chair",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Supports operations, meeting flow, and chapter logistics.",
      bio: "Use this slot for how the vice chair helps meetings run smoothly, supports project teams, and keeps momentum between events.",
      email: "vicechair@sfsu.edu",
      image: "https://placehold.co/720x840/6c307d/f8fafc?text=Vice+Chair",
      alt: "Placeholder image labeled Vice Chair."
    },
    {
      role: "Technical Projects Director",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Shapes project nights, build sessions, and hands-on technical programming.",
      bio: "This card works well for project themes, favorite tools, and how students can get involved in chapter builds.",
      email: "projects@sfsu.edu",
      image: "https://placehold.co/720x840/0a2a40/f8fafc?text=Projects+Director",
      alt: "Placeholder image labeled Technical Projects Director."
    },
    {
      role: "Treasurer",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Handles budgeting, purchasing, reimbursements, and sponsorship support.",
      bio: "You can use this bio to explain how the chapter manages funding, materials, or travel support for students.",
      email: "treasurer@sfsu.edu",
      image: "https://placehold.co/720x840/725400/f8fafc?text=Treasurer",
      alt: "Placeholder image labeled Treasurer."
    },
    {
      role: "Secretary",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Maintains notes, announcements, documentation, and chapter communication.",
      bio: "This is a good place to mention how chapter updates get shared and where students can find notes, recaps, or resources.",
      email: "secretary@sfsu.edu",
      image: "https://placehold.co/720x840/00629b/f8fafc?text=Secretary",
      alt: "Placeholder image labeled Secretary."
    },
    {
      role: "Outreach Director",
      name: "Officer Name",
      major: "Replace with major and graduation year",
      focus: "Builds community on campus through partnerships, outreach, and chapter visibility.",
      bio: "Use this slot for collaboration goals, community work, or the social side of chapter growth.",
      email: "outreach@sfsu.edu",
      image: "https://placehold.co/720x840/542461/f8fafc?text=Outreach+Director",
      alt: "Placeholder image labeled Outreach Director."
    }
  ]
  // Dev note: past-events.html no longer has its own hand-maintained list — it's built
  // automatically from `events` above (anything with an endISO/startISO in the past).
  // See the dev note on `events`.
};
