/* =========================================================
   Ved Patel — site content
   ---------------------------------------------------------
   This is the only file you need to edit for text content.
   Add / remove objects in the arrays below and the pages
   update automatically.

   Search for "TODO" to find the sample entries that still
   need real details. Delete `sample: true` once an entry is
   real; the "Sample" badge disappears.
   ========================================================= */

window.CONTENT = {
  site: {
    name: "Ved Patel",
    tagline: "Mechanical engineering undergraduate working where simulation meets hardware — aerodynamic modelling, structural validation and machines that actually get built.",
    heroCaption: "Pilani, Rajasthan · 2026",
    roleLines: [
      {
        role: "B.E. Mechanical Engineering",
        org: "BITS Pilani",
        meta: "Class of 2028 · CGPA 8.49/10"
      },
      {
        role: "System Engineer — Mechanical Subsystem",
        org: "CRISS Robotics, BITS Pilani",
        meta: "Feb 2026 – present"
      },
      {
        role: "Design Core",
        org: "Radio Control Club, BITS Pilani",
        meta: "Jan 2025 – present"
      }
    ],
    email: "f20240433@pilani.bits-pilani.ac.in",
    location: "Pilani, Rajasthan, India",
    photo: "assets/img/portrait.jpg",
    cv: "assets/docs/Ved_Patel_CV.pdf",
    contacts: [
      { label: "f20240433@pilani.bits-pilani.ac.in", href: "mailto:f20240433@pilani.bits-pilani.ac.in", icon: "mail" },
      { label: "Curriculum Vitae", href: "assets/docs/Ved_Patel_CV.pdf", icon: "doc", external: true },
      { label: "Pilani, Rajasthan, India", href: null, icon: "pin" }
      /* Add GitHub / LinkedIn entries here when ready, e.g.
         { label: "GitHub", href: "https://github.com/username", icon: "github", external: true }
      */
    ],
    bio: [
      "Ved Patel is an undergraduate in Mechanical Engineering at BITS Pilani (Class of 2028). His work sits where simulation meets hardware: aerodynamic modelling, structural validation and the design of machines that are actually built and tested.",
      "As a summer intern at DRDO CEMILAC, he wrote a two-dimensional incompressible flow solver from scratch in MATLAB, using finite differences to capture transient phenomena such as von Kármán vortex shedding — and removing a commercial CFD licensing bill in the process. At BITS he is a System Engineer on the mechanical subsystem of CRISS Robotics' autonomous Mars rover, and Design Core at the Radio Control Club, where he takes scale aircraft from XFLR5 airfoil optimisation through carbon, foam and balsa construction to flight test.",
      "He is interested in the point at which predictions become decisions: making aerodynamic and structural models accurate enough to commit to a build."
    ],
    interests: [
      "Aerodynamics",
      "Computational fluid dynamics",
      "UAV design & flight testing",
      "Structural analysis (FEA)",
      "Rover mechanical systems",
      "CAD / CAE",
      "Composite fabrication"
    ],
    stats: [
      { num: "8.49", label: "CGPA", sub: "B.E. Mechanical, BITS Pilani" },
      { num: "3", label: "Engineering projects", sub: "CFD · UAV · rover systems" },
      { num: "2nd", label: "in Asia, ERC 2025", sub: "CRISS Robotics" },
      { num: "₹50L+", label: "Licensing costs saved", sub: "In-house CFD solver, DRDO" }
    ]
  },

  /* -------------------------------------------------------
     PROJECTS
     status: "Ongoing" | "Completed"
     categories: used by the filter buttons
     ------------------------------------------------------- */
  projects: [
    {
      id: "cfd-solver",
      title: "A 2D Incompressible Flow Solver in MATLAB",
      categories: ["Computational Fluid Dynamics"],
      year: "2026",
      status: "Completed",
      role: "Summer Intern",
      org: "DRDO CEMILAC, Bengaluru",
      summary: "A from-scratch finite-difference solver for two-dimensional incompressible flow, built to study transient aerodynamics without commercial CFD licensing.",
      description: [
        "During a summer internship at the Centre for Military Airworthiness and Certification (CEMILAC), DRDO, I built a two-dimensional incompressible flow solver from first principles in MATLAB. The solver discretises the governing equations with the finite-difference method on a structured grid and marches the solution in time, retaining full control over discretisation, boundary conditions and post-processing.",
        "The motivation was both technical and practical: commercial CFD licences are expensive, and an in-house solver makes every simulation parameter visible and adjustable. Building the tool internally avoided an estimated ₹50 lakh in licensing costs while producing the transient flow behaviour the project needed.",
        "The solver was used to capture and analyse complex transient aerodynamic phenomena, including von Kármán vortex shedding behind a bluff body. Alongside the project I completed an instructor-led training course on CFD++ delivered by the software vendor."
      ],
      highlights: [
        "Finite-difference discretisation of the 2D incompressible flow equations on a structured grid",
        "Transient simulation of von Kármán vortex shedding",
        "An estimated ₹50L+ in commercial CFD licensing avoided",
        "Vendor-led CFD++ simulation training completed"
      ],
      tech: ["MATLAB", "Finite difference method", "CFD", "CFD++", "Post-processing"],
      cover: "assets/img/projects/cfd.svg",
      coverCaption: "Schematic of the structured finite-difference grid and transient wake used in the solver.",
      gallery: [],
      links: [
        { label: "Curriculum Vitae", href: "assets/docs/Ved_Patel_CV.pdf", external: true }
      ]
    },
    {
      id: "mars-rover",
      title: "Mechanical Subsystem for an Autonomous Mars Rover",
      categories: ["Robotics", "Mechanical Design"],
      year: "2026 – present",
      status: "Ongoing",
      role: "System Engineer — Mechanical Subsystem",
      org: "CRISS Robotics, BITS Pilani",
      summary: "Rugged chassis and structural systems for a student-built autonomous Mars rover, validated for fatigue life and load capacity ahead of international competition.",
      description: [
        "CRISS Robotics designs and builds autonomous rovers for extreme environments and international competitions. As System Engineer on the mechanical subsystem, I design and assemble the rover's structural framework and chassis in SolidWorks and Fusion 360, balancing stiffness and mass against the realities of fabrication and field repair.",
        "Structural durability, fatigue life and load capacity are validated in ANSYS under the high-stress cases the rover is expected to see. The work has to survive more than a simulation review: the hardware is assembled, driven and repaired by the team, so tolerances, access and manufacturability matter as much as the stress margins.",
        "The team placed 2nd in Asia at the European Rover Challenge 2025, finished in the Top 10 at the International Rover Challenge, and was the only Indian team invited to ARCh 2026."
      ],
      highlights: [
        "2nd in Asia, European Rover Challenge 2025",
        "Top 10, International Rover Challenge",
        "Only Indian team invited to ARCh 2026",
        "Structural durability and fatigue validation in ANSYS"
      ],
      tech: ["SolidWorks", "Fusion 360", "ANSYS", "Structural analysis", "Design for manufacture"],
      cover: "assets/img/projects/rover.svg",
      coverCaption: "Schematic of the rover chassis, wheel modules and load paths.",
      gallery: [],
      links: [
        { label: "Curriculum Vitae", href: "assets/docs/Ved_Patel_CV.pdf", external: true }
      ]
    },
    {
      id: "rc-aircraft",
      title: "Scale RC Aircraft: Design, Fabrication and Flight Testing",
      categories: ["Aerodynamics", "UAV"],
      year: "2025 – present",
      status: "Ongoing",
      role: "Design Core",
      org: "Radio Control Club, BITS Pilani",
      summary: "B-2 and F-22 scale builds taken from airfoil optimisation and composite fabrication through flight-controller integration and simulator practice.",
      description: [
        "The Radio Control Club is BITS Pilani's aeromodelling group, focused on the engineering, fabrication and flight testing of custom unmanned aircraft. As part of the design core I have engineered scale models of the B-2 and F-22, and optimised custom airfoils in XFLR5 to study how different structural geometries behave in flight.",
        "Airframes are built light: carbon-fibre and epoxy layups where stiffness matters, and Depron, foam and balsa composite construction where repairability and weight dominate. The builds are finished with integrated flight controllers and autonomous navigation systems.",
        "Flight dynamics are rehearsed in Picasim before hardware takes to the air, so that multi-axis behaviour and failure modes are familiar before they are expensive."
      ],
      highlights: [
        "B-2 and F-22 scale airframes designed and flown",
        "Custom airfoils optimised in XFLR5",
        "Carbon-fibre/epoxy, Depron, foam and balsa construction",
        "Pixhawk flight-controller integration and Picasim practice"
      ],
      tech: ["XFLR5", "Composite fabrication", "Pixhawk", "Picasim", "Airframe design"],
      cover: "assets/img/projects/uav.svg",
      coverCaption: "Plan-view schematic of the scale airframe and airfoil sections.",
      gallery: [],
      links: [
        { label: "Curriculum Vitae", href: "assets/docs/Ved_Patel_CV.pdf", external: true }
      ]
    }
  ],

  /* -------------------------------------------------------
     EXPERIENCE — shown on the home page
     ------------------------------------------------------- */
  experience: [
    {
      period: "May 2026 – Jul 2026",
      role: "Summer Intern",
      org: "DRDO CEMILAC, Bengaluru",
      points: [
        "Developed a 2D incompressible fluid-flow solver from scratch in MATLAB using the finite-difference method.",
        "Captured and analysed transient aerodynamic phenomena including von Kármán vortex shedding.",
        "Bypassed commercial CFD licensing, saving an estimated ₹50L+ while retaining full control of simulation parameters.",
        "Completed an instructor-led CFD++ training course delivered by the software vendor."
      ]
    },
    {
      period: "Feb 2026 – present",
      role: "System Engineer — Mechanical Subsystem",
      org: "CRISS Robotics, BITS Pilani",
      points: [
        "Designed and assembled rugged mechanical frameworks and chassis for an autonomous Mars rover prototype in SolidWorks and Fusion 360.",
        "Validated structural durability, fatigue life and load capacity in ANSYS for high-stress, extreme-environment duty.",
        "Contributed to 2nd place in Asia at ERC 2025, a Top 10 finish at the International Rover Challenge, and the only Indian team invitation to ARCh 2026."
      ]
    },
    {
      period: "Jan 2025 – present",
      role: "Design Core",
      org: "Radio Control Club, BITS Pilani",
      points: [
        "Engineered scale RC aircraft (B-2 and F-22) and optimised custom airfoils in XFLR5 across varied structural geometries.",
        "Fabricated lightweight airframes with carbon-fibre and epoxy layups, plus Depron, foam and balsa composite builds.",
        "Integrated flight controllers and autonomous navigation systems; practised multi-axis flight dynamics in Picasim."
      ]
    }
  ],

  leadership: [
    {
      period: "Apr 2026 – present",
      role: "Coordinator, PCrA",
      org: "APOGEE, BITS Pilani",
      note: "External correspondence and inter-college outreach for the technical festival — 1,000+ external students; a campus-wide photography and printing drive raised ₹25L+."
    },
    {
      period: "Apr 2026 – present",
      role: "Treasurer",
      org: "Gurjari Association, BITS Pilani",
      note: "Directed a ₹2L budget for Garba Nite and generated ₹3L+ in gross revenue; hosted 3,000+ attendees."
    },
    {
      period: "—",
      role: "Umang Head",
      org: "National Service Scheme (NSS)",
      note: "Raised ₹16L+ over two years to sponsor 150+ underprivileged students."
    }
  ],

  /* -------------------------------------------------------
     CERTIFICATES
     TODO: replace the sample entries below, drop the real
     PDFs into assets/docs/certificates/ and set `file`.
     ------------------------------------------------------- */
  certificates: [
    {
      id: "cfdpp-training",
      title: "CFD++ Simulation Training",
      issuer: "CFD++ vendor-led training",
      date: "2026",
      credentialUrl: null,
      file: null,
      thumbnail: "assets/img/certificate-placeholder.svg",
      skills: ["CFD++", "Simulation"],
      sample: true
    },
    {
      id: "drdo-internship",
      title: "Summer Internship — DRDO CEMILAC",
      issuer: "Centre for Military Airworthiness and Certification, DRDO",
      date: "2026",
      credentialUrl: null,
      file: null,
      thumbnail: "assets/img/certificate-placeholder.svg",
      skills: ["Aerodynamics", "CFD"],
      sample: true
    },
    {
      id: "erc-2025",
      title: "European Rover Challenge 2025 — Finalist",
      issuer: "European Rover Challenge, AGH Kraków",
      date: "2025",
      credentialUrl: null,
      file: null,
      thumbnail: "assets/img/certificate-placeholder.svg",
      skills: ["Robotics", "Mechanical design"],
      sample: true
    }
  ],

  /* -------------------------------------------------------
     LETTERS OF RECOMMENDATION
     `visibility`: "public" (PDF shown and downloadable) or
                   "on-request" (details only, no file linked)
     TODO: replace recommender names and add the PDFs.
     ------------------------------------------------------- */
  letters: [
    {
      id: "lor-drdo",
      recommender: "[Supervisor name]",
      title: "Scientist / Engineer",
      affiliation: "DRDO CEMILAC, Bengaluru",
      relationship: "Summer internship supervisor",
      date: "2026",
      visibility: "public",
      file: "assets/docs/lors/sample-lor-drdo.pdf",
      thumbnail: "assets/img/letter-placeholder.svg",
      sample: true
    },
    {
      id: "lor-bits",
      recommender: "[Faculty name]",
      title: "Faculty, Department of Mechanical Engineering",
      affiliation: "BITS Pilani",
      relationship: "Course instructor and project guide",
      date: "2026",
      visibility: "public",
      file: "assets/docs/lors/sample-lor-bits.pdf",
      thumbnail: "assets/img/letter-placeholder.svg",
      sample: true
    },
    {
      id: "lor-criss",
      recommender: "[Mentor name]",
      title: "Faculty Advisor",
      affiliation: "CRISS Robotics, BITS Pilani",
      relationship: "Team mentor",
      date: "2026",
      visibility: "on-request",
      file: null,
      thumbnail: "assets/img/letter-placeholder.svg",
      sample: true
    }
  ]
};
