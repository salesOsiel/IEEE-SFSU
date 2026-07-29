/*
  Update chapter text, images, events, and officer details in this file.
  The layout and shared components live in app.js and the HTML pages.
*/
window.siteContent = {
  site: {
    shortName: "IEEE SFSU",
    fullName: "IEEE at San Francisco State University",
    tagline: "Advancing technology for humanity through hardware, robotics, and research.",
    email: "ieee@sfsu.edu",
    location: "Engineering Building, Room TBD",
    meetingTime: "Wednesdays at 4:30 PM",
    social: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Discord", href: "#" }
    ],
    footerLinks: [
      { label: "Home", href: "index.html" },
      { label: "About", href: "index.html#about" },
      { label: "Event Calendar", href: "event-calendar.html" },
      { label: "Officers", href: "officers.html" },
      { label: "Membership", href: "membership.html" }
    ]
  },
  navigation: [
    { label: "Home", href: "index.html" },
    {
      label: "About",
      links: [
        { label: "Our chapter", href: "index.html#about" },
        { label: "Focus areas", href: "index.html#pillars" },
        { label: "FAQ", href: "index.html#faq" }
      ]
    },
    { label: "Membership", href: "membership.html" },
    { label: "Officers", href: "officers.html" },
    { label: "Event Calendar", href: "event-calendar.html" },
    {
      label: "Past Events",
      links: [
        { label: "24-25", href: "past-events.html#year-24-25" },
        { label: "25-26", href: "past-events.html#year-25-26" },
        { label: "26-27", href: "past-events.html#year-26-27" }
      ]
    }
  ],
  aboutCopy:
    "IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity. IEEE at SF State is the student chapter of IEEE, an international organization. In addition to upholding the mission of the global organization, IEEE at SF State supports the study of electrical and computer engineering. The chapter encourages scholarship, social connection, and collaboration through research and hands-on practice, strengthens connections between students and the technology industry, and advances fields related to electronics and computing.",
  heroSlides: [
    {
      title: "Prototype Bench",
      caption: "Swap this placeholder for a chapter lab photo, soldering session, or PCB workshop shot.",
      image: "https://placehold.co/1200x820/0a2a40/f8fafc?text=Prototype+Bench",
      alt: "Placeholder image labeled Prototype Bench."
    },
    {
      title: "Robotics Build Team",
      caption: "Use the slideshow for team photos, competition robots, or outreach demos.",
      image: "https://placehold.co/1200x820/3d1846/f8fafc?text=Robotics+Build+Team",
      alt: "Placeholder image labeled Robotics Build Team."
    },
    {
      title: "Research Poster Night",
      caption: "This area is intentionally image-first to match the SHPE-style rotating gallery feel.",
      image: "https://placehold.co/1200x820/004c79/f8fafc?text=Research+Poster+Night",
      alt: "Placeholder image labeled Research Poster Night."
    },
    {
      title: "Community Demo Day",
      caption: "Replace with chapter showcases, officer photos, guest speaker sessions, or club fairs.",
      image: "https://placehold.co/1200x820/725400/f8fafc?text=Community+Demo+Day",
      alt: "Placeholder image labeled Community Demo Day."
    }
  ],
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
    { value: 25, suffix: "+", label: "active members" },
    { value: 12, suffix: "+", label: "planned events" },
    { value: 4, suffix: "", label: "technical lanes" },
    { value: 6, suffix: "+", label: "industry or research touchpoints" }
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
  featureStories: [
    {
      label: "Hands-on momentum",
      title: "Build nights that feel active, not overwhelming",
      description: "Use this section for short chapter narratives like open lab sessions, soldering intros, or quick project updates.",
      href: "membership.html"
    },
    {
      label: "Research and industry",
      title: "Make technical growth visible",
      description: "Highlight faculty conversations, alumni panels, or project showcases without adding too much homepage clutter.",
      href: "event-calendar.html"
    },
    {
      label: "SFSU pride",
      title: "Keep the tone polished but rooted on campus",
      description: "The palette blends IEEE blue with stronger SFSU purple and gold accents for a cleaner chapter identity.",
      href: "officers.html"
    }
  ],
  eventFilters: ["IEEE", "Solar Regatta", "ASME", "Chomp City", "Research"],
  googleCalendar: {
    apiKey: "",
    calendarId: "",
    maxResults: 6,
    timeZone: "America/Los_Angeles"
  },
  upcomingEvents: [
    {
      slug: "ieee-general-meeting",
      title: "IEEE General Meeting",
      category: "IEEE",
      date: "August 27, 2026",
      time: "4:30 PM to 5:30 PM",
      location: "Engineering Building, Room TBD",
      description: "A placeholder chapter meeting for announcements, project updates, and member planning.",
      details: "Replace this with the next IEEE meeting details once the semester schedule is confirmed.",
      image: "https://placehold.co/1200x720/004c79/f8fafc?text=IEEE+General+Meeting",
      alt: "Placeholder image labeled IEEE General Meeting.",
      ctaText: "Meeting details placeholder",
      registerLink: "#"
    },
    {
      slug: "solar-regatta-info-session",
      title: "Solar Regatta Info Session",
      category: "Solar Regatta",
      date: "September 10, 2026",
      time: "5:00 PM to 6:00 PM",
      location: "Maker Space TBD",
      description: "A placeholder partner-org event for students interested in electrical systems, boat design, and competition teams.",
      details: "Use this container for other organization events that IEEE members may want to attend.",
      image: "https://placehold.co/1200x720/3d1846/f8fafc?text=Solar+Regatta+Info+Session",
      alt: "Placeholder image labeled Solar Regatta Info Session.",
      ctaText: "Event details placeholder",
      registerLink: "#"
    }
  ],
  membershipBenefits: [
    {
      title: "Technical confidence",
      description: "Build comfort with hardware, embedded systems, robotics workflows, and engineering collaboration."
    },
    {
      title: "Community support",
      description: "Meet students with similar interests and keep a reliable place to ask questions, learn, and build."
    },
    {
      title: "Professional growth",
      description: "Use the chapter for resume projects, alumni advice, guest speakers, and career-oriented events."
    },
    {
      title: "Leadership room",
      description: "As the chapter grows, members can lead projects, workshops, outreach, and officer teams."
    }
  ],
  joinSteps: [
    {
      step: "1",
      title: "Join the interest list",
      description: "Replace this with your actual Google Form, Linktree, or campus organization portal link."
    },
    {
      step: "2",
      title: "Attend a meeting",
      description: "Come to an intro night, open lab, or social event to see the chapter culture in person."
    },
    {
      step: "3",
      title: "Choose your lane",
      description: "Members can lean into hardware, robotics, research, outreach, or simply show up and explore first."
    },
    {
      step: "4",
      title: "Stay connected",
      description: "Use Discord, email, or Instagram to keep up with meetings, workshops, and chapter updates."
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
      answer: "Not necessarily. Many chapters allow students to start locally and decide later whether they want the additional IEEE benefits."
    },
    {
      question: "What should go on this page long term?",
      answer: "For now, keep it simple: when to join, why it matters, and what a new member should do next."
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
  ],
  archiveYears: [
    {
      id: "year-24-25",
      year: "24-25",
      summary: "Placeholder archive area for chapter recaps, photos, and simple year-by-year highlights.",
      events: [
        {
          season: "Fall",
          title: "Microcontroller Intro Night",
          description: "A first-semester workshop where new members explored sensors, firmware basics, and simple breadboard projects."
        },
        {
          season: "Spring",
          title: "Student Project Showcase",
          description: "Members shared prototypes, posters, and demos with classmates, faculty, and friends."
        }
      ]
    },
    {
      id: "year-25-26",
      year: "25-26",
      summary: "Use this section for old flyers, event recaps, competition photos, or leadership transitions.",
      events: [
        {
          season: "Fall",
          title: "Industry Resume Night",
          description: "Students received feedback on resumes, project descriptions, and internship preparation."
        },
        {
          season: "Spring",
          title: "Robotics Demo Session",
          description: "A lightweight archive card for robot tests, final demos, or competition preparation."
        }
      ]
    },
    {
      id: "year-26-27",
      year: "26-27",
      summary: "Use this current-year archive section for events once they have passed.",
      events: [
        {
          season: "Fall",
          title: "Faculty Research Q and A",
          description: "Students learned how undergraduates could contribute to technical research and lab work."
        },
        {
          season: "Spring",
          title: "Community Outreach Day",
          description: "Members represented the chapter at a campus or local outreach event and shared engineering demos."
        }
      ]
    }
  ]
};
