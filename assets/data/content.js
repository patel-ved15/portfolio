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
      { num: "8", label: "Engineering projects", sub: "CFD · UAV · rover systems" },
      { num: "3", label: "Certificates", sub: "DRDO · MathWorks · CFD++" }
    ],
    coursework: [
      {
        title: "Core",
        courses: [
          "Advanced Mechanics of Solids",
          "Fluid Mechanics",
          "Applied Thermodynamics",
          "Material Science and Engineering",
          "Heat Transfer",
          "Design of Machine Elements",
          "Advanced Manufacturing Processes",
          "Mechanisms and Machines",
          "Manufacturing Management",
          "Engines Motors and Mobility"
        ]
      },
      {
        title: "Electives / Robotics Minor",
        courses: [
          "Robotics",
          "Artificial Intelligence for Robotics",
          "Finite Element Method",
          "Internet of Things"
        ]
      },
      {
        title: "Humanities",
        courses: [
          "Science Technology and Modernity",
          "Cinematic Adaptation"
        ]
      }
    ]
  },

  /* -------------------------------------------------------
     PROJECTS
     `domain` is the label shown on the home index.
     `categories` drives the filter buttons on projects.html.
     ------------------------------------------------------- */
  projects: [
    {
      id: "modular-rover-chassis",
      title: "Modular Aluminium Rover Chassis Design",
      domain: "Mechanical Design",
      categories: ["Mechanical Design"],
      summary: "A reconfigurable 6061 aluminium-extrusion chassis for a model Mars rover, sized around its suspension, arm and payload subsystems.",
      description: [
        "The project involved designing and analysing a modular aluminium-extrusion chassis for a model Mars rover. The primary design consideration was adaptability: as the rover's payload configuration and robotic-arm assembly evolved, the chassis needed to accommodate frequent changes in component placement and frame configuration without sacrificing structural rigidity.",
        "The chassis was designed in Fusion 360 using 6061 aluminium T20 extrusions. The frame measured approximately 560 × 390 × 150 mm and consisted of 32 extrusion members arranged in a rectangular configuration, with additional internal members for structural support. Commercially available corner brackets were used to connect the extrusions, allowing the assembly to be reconfigured without requiring permanent joints or extensive remanufacturing.",
        "The CAD assembly was developed to accommodate the rover's major subsystems, including the rocker-bogie suspension, motors, gearboxes, batteries, electronics enclosure, robotic arm and differential mechanism. Assembly checks and interference checks were performed to assess component integration and accessibility.",
        "Static structural and fatigue analyses were carried out to evaluate the chassis under the design loading conditions. The structural assessment considered a total rover mass of approximately 80 kg, including payload, with loads applied at individual mounting and support points.",
        "The project emphasised modular mechanical design, lightweight structural construction, CAD-based assembly validation and finite element analysis for evaluating the suitability of an adaptable rover chassis."
      ],
      tech: ["Fusion 360", "T20 aluminium", "ANSYS", "Structural analysis"],
      cover: "assets/img/projects/chassis.webp",
      coverCaption: "Rover chassis CAD assembly, sized around the rocker-bogie suspension and payload bay."
    },
    {
      id: "cfd-solver",
      title: "2D Incompressible Flow Solver Development",
      domain: "CFD / MATLAB",
      categories: ["CFD"],
      summary: "A from-scratch finite-difference solver for two-dimensional incompressible flow, covering steady and transient benchmark cases.",
      description: [
        "The project involved developing a two-dimensional incompressible fluid-flow solver from scratch in MATLAB using the Finite Difference Method (FDM). The solver was designed to handle both steady-state and transient flow problems on a semi-staggered grid.",
        "The governing continuity and momentum equations were derived from the fundamental fluid mechanics equations, discretised, and non-dimensionalised before implementation. Multiple spatial discretisation schemes were incorporated, including forward, backward and central differencing, First-Order Upwind Differencing (FUDS), and QUICK. This allowed different numerical approaches to be applied and evaluated within the solver.",
        "A complete SIMPLE (Semi-Implicit Method for Pressure-Linked Equations) algorithm was implemented for pressure–velocity coupling. Its formulation included momentum prediction, pressure correction through a pressure Poisson equation, velocity correction, pressure under-relaxation and convergence criteria.",
        "The solver was extended to accommodate different computational geometries through appropriate boundary-condition implementations. Its capabilities were examined using standard CFD benchmark problems, including lid-driven cavity flow, forward-facing step, backward-facing step and square-cylinder flow. Both steady and transient flow behaviour were investigated, including vortex shedding and associated flow characteristics.",
        "The project provided practical experience in numerical discretisation, computational fluid dynamics, iterative solution methods and the development of CFD algorithms."
      ],
      tech: ["MATLAB", "Finite difference method", "SIMPLE", "QUICK"],
      cover: "assets/img/projects/cfd-solver.webp",
      coverCaption: "Solver output for a two-dimensional incompressible flow benchmark case."
    },
    {
      id: "rc-f22",
      title: "RC F-22 Aircraft Design and Fabrication",
      domain: "Aerospace",
      categories: ["Aerospace"],
      summary: "A 750 mm span RC F-22 built from Depron and balsa, with twin 80 mm EDFs and a SpeedyBee flight controller.",
      description: [
        "The project involved the CAD design, structural development and fabrication of a radio-controlled F-22 Raptor model aircraft. An existing aircraft blueprint was used as a reference, but the geometry and internal construction were adapted to suit the intended scale, propulsion system and flight requirements.",
        "The aircraft was designed in Fusion 360 with a wingspan of approximately 750 mm. The primary structure was constructed using Depron foam, reinforced internally with balsa wood to provide structural support without significantly increasing the aircraft's weight. Internal structural elements, including wing supports, spars, ribs and control-surface arrangements, were designed to suit the scaled geometry.",
        "Manufacturing involved a combination of laser cutting, hot-wire cutting and manual cutting to produce the aircraft components. The propulsion system consisted of two 80 mm electric ducted fans (EDFs), powered through 50 A electronic speed controllers and a lithium-ion battery system. Servos were integrated to actuate the control surfaces.",
        "Flight testing was carried out initially through manual control, followed by integration of a SpeedyBee flight controller. This enabled progression towards flight-controller-assisted autonomous operation.",
        "One of the major engineering challenges was adapting the reference blueprint to a smaller scale while retaining suitable control-surface geometry and flight characteristics. The project provided practical experience in aircraft CAD design, lightweight structural construction, propulsion integration, flight-control electronics and RC aircraft testing."
      ],
      tech: ["Fusion 360", "Depron", "EDF", "RC flight control"],
      cover: "assets/img/projects/f22.svg",
      coverCaption: "Placeholder artwork for the RC F-22. Replace with a project photo."
    },
    {
      id: "rover-wheel",
      title: "Topology-Optimised 3D-Printed Rover Wheel",
      domain: "Design / Additive Manufacturing",
      categories: ["Design & Additive Manufacturing"],
      summary: "A 300 mm multi-material rover wheel that balances traction on loose soil with the ability to slide over hard surfaces.",
      description: [
        "The project involved designing and manufacturing a lightweight wheel for a model Mars rover, with the objective of achieving high traction on loose soil while retaining the ability to slide over hard surfaces such as concrete. The design therefore focused on balancing traction, weight and surface-dependent friction rather than maximising grip under all conditions.",
        "The wheel was designed with an outer diameter of 300 mm and a width of 110 mm. A hybrid construction was adopted, using PETG for the internal structural body and TPU for the external gripping surface. The hub and outer wheel were designed as separate components to accommodate the wheel's mechanical arrangement.",
        "The central assembly houses the motor within a 3D-printed enclosure. Two shielded thin-section bearings, each with a 60 mm inner diameter, connect the central assembly to the wheel structure, providing the required bearing-supported arrangement.",
        "Topology optimisation was used to develop the internal wheel structure, with the design evaluated against a load of approximately 20 kg per wheel. Multiple design iterations were carried out, modifying both the internal structural geometry and the external tread pattern. The tread was developed as a custom pattern based on the rover's intended terrain requirements.",
        "A physical prototype was successfully 3D-printed and tested on terrain. Although full integration with the rover has not yet taken place, the single-wheel prototype demonstrated the intended performance during terrain testing. The project combined topology optimisation, multi-material additive manufacturing, mechanical integration and application-specific tread design."
      ],
      tech: ["Fusion 360", "PETG", "TPU", "Topology optimisation"],
      cover: "assets/img/projects/rover-wheel.webp",
      coverCaption: "Topology-optimised rover wheel, prepared for multi-material additive manufacturing."
    },
    {
      id: "hopf-oscillator",
      title: "Adaptive Hopf Oscillator for Gait Generation",
      domain: "Robotics / Control Systems",
      categories: ["Robotics & Control"],
      summary: "Adaptive Hopf oscillators in MATLAB that generate rhythmic walking patterns from sensor feedback.",
      description: [
        "The project focused on implementing adaptive Hopf oscillators in MATLAB for generating walking patterns through sensor-feedback-based control. Hopf oscillators provide a mathematical framework for generating periodic signals, making them useful for developing rhythmic motion patterns in robotic systems.",
        "An existing Hopf oscillator model was modified to incorporate adaptation of three key characteristics: amplitude, frequency and phase. This allowed the generated oscillatory signals to adjust in response to changing input conditions rather than remaining fixed at predefined values.",
        "Both single-oscillator and multiple-oscillator implementations were developed. The single-oscillator approach provided a basic framework for generating periodic outputs, while the multiple-oscillator implementation extended the approach to a system involving multiple oscillatory components.",
        "Sensor feedback was incorporated as an input to the adaptive system. Based on the changing input conditions, the oscillator adjusted its behaviour and generated outputs in the form of motor commands for walking-pattern generation. MATLAB was used to implement the oscillator equations, modify the existing model and investigate its response under different input conditions.",
        "The project explored the application of nonlinear dynamical systems to robotic motion generation, particularly the use of adaptive oscillators to produce rhythmic motor-control signals. It provided experience in mathematical modelling, differential-equation-based control implementation, feedback integration and the development of adaptive motion-generation algorithms."
      ],
      tech: ["MATLAB", "Nonlinear dynamics", "Adaptive control"],
      cover: "assets/img/projects/hopf-oscillator.webp",
      coverCaption: "Adaptive Hopf oscillator response used for rhythmic gait generation."
    },
    {
      id: "rc-b2",
      title: "RC B-2 Flying-Wing Aircraft Design",
      domain: "Aerospace",
      categories: ["Aerospace"],
      summary: "A 1.75 m span flying-wing B-2 built for manual flight, using elevons for combined pitch and roll control.",
      description: [
        "The project focused on designing and manufacturing a radio-controlled B-2 bomber model aircraft, translating the distinctive flying-wing configuration of the original aircraft into a functional RC platform. An existing blueprint was used as a reference, with modifications made to suit the intended dimensions, construction methods and propulsion requirements.",
        "The aircraft was modelled in Fusion 360 with an approximate wingspan of 1.75 m. The design retained the characteristic B-2 planform while incorporating a lightweight internal structure. Depron foam was used for the main aircraft body, with balsa wood reinforcement integrated internally to improve structural support.",
        "The internal wing architecture, including spars, ribs and control surfaces, was designed to suit the flying-wing configuration. Elevons were incorporated to provide combined pitch and roll control. Most components were manufactured using laser cutting, while a few oversized parts that exceeded the available laser-cutting bed dimensions were produced manually.",
        "Propulsion was provided by two 80 mm electric ducted fans, with 50 A electronic speed controllers and a lithium-ion battery system. Unlike the F-22 project, this aircraft did not use a flight controller and was operated manually.",
        "Flight testing highlighted the control challenges associated with flying-wing aircraft. Maintaining stability required continuous manual counter-inputs to correct deviations during flight. The project provided practical experience in flying-wing configuration design, lightweight aircraft fabrication, elevon-based control and manual flight testing."
      ],
      tech: ["Fusion 360", "Depron", "Laser cutting", "Elevons"],
      cover: "assets/img/projects/b2.svg",
      coverCaption: "Placeholder artwork for the RC B-2. Replace with a project photo."
    },
    {
      id: "robotic-arm",
      title: "5-DOF Robotic Arm Joint Mechanism Design",
      domain: "Robotics / Mechanical Design",
      categories: ["Robotics & Control", "Mechanical Design"],
      summary: "Five custom 3D-printed joints for a 1 m reach, 8 kg payload rover arm, using cycloidal and bevel-gear transmissions.",
      description: [
        "The project involved developing a set of custom 3D-printed mechanical joints for a five-degree-of-freedom robotic arm intended for a model Mars rover. The arm was designed for an approximate reach of 1 m and a target payload capacity of 8 kg, requiring the joint mechanisms to accommodate significant loads while maintaining compactness and controlling mechanical backlash.",
        "The five degrees of freedom consist of base rotation, shoulder movement, elbow movement, wrist pitch and wrist rotation. The joint mechanisms were designed from scratch, with different transmission arrangements selected according to the requirements of each section of the arm.",
        "Cycloidal drive mechanisms were incorporated into the base, shoulder and elbow joints to provide the required reduction and torque transmission. The wrist mechanism uses bevel-gear arrangements to enable pitch and rotational movement within the end section of the arm. PETG was selected as the primary material for the 3D-printed joint structures, with bolted connections used for mechanical assembly.",
        "Brushed DC motors were selected for actuation and integrated into the joint designs. Torque calculations and structural simulations were performed to assess the mechanical requirements and evaluate the suitability of the designed components under loading conditions.",
        "A key design challenge was minimising backlash, particularly because unwanted mechanical play can affect the positioning accuracy of a multi-joint robotic arm. The joint designs are currently in the manufacturing stage. The project combines transmission-system design, mechanical calculations, CAD modelling, structural simulation and additive manufacturing for robotic mechanisms."
      ],
      tech: ["PETG", "Cycloidal drives", "Bevel gears", "Structural simulation"],
      cover: "assets/img/projects/robotic-arm.svg",
      coverCaption: "Placeholder artwork for the 5-DOF robotic arm joints. Replace with a project photo."
    },
    {
      id: "quick-simple",
      title: "QUICK and SIMPLE Scheme Implementation",
      domain: "CFD / Numerical Methods",
      categories: ["CFD"],
      summary: "A MATLAB study of the QUICK discretisation scheme and SIMPLE pressure–velocity coupling, built from first principles.",
      description: [
        "This project focused on the mathematical formulation and numerical implementation of two important computational fluid dynamics techniques: the QUICK discretisation scheme and the SIMPLE pressure–velocity coupling algorithm. The implementation was developed in MATLAB, using An Introduction to Computational Fluid Dynamics: The Finite Volume Method by H. K. Versteeg and W. Malalasekera as a primary reference.",
        "The work began with the governing equations and their numerical formulation. Finite-difference approximations were derived using Taylor-series expansions, with forward, backward and central differencing methods examined alongside first-order upwind discretisation.",
        "Particular attention was given to the QUICK (Quadratic Upstream Interpolation for Convective Kinematics) scheme. The method uses a quadratic interpolation based on two upstream nodes and one downstream node to estimate face values for convective flux calculations. Its discretisation was formulated and implemented to investigate the advantages of higher-order interpolation over conventional first-order schemes.",
        "The project also covered the SIMPLE algorithm for pressure–velocity coupling. The predictor–corrector procedure was implemented through intermediate velocity calculations, formulation of a pressure-correction equation, and subsequent correction of pressure and velocity fields to satisfy continuity.",
        "The work developed a deeper understanding of numerical accuracy, stability, discretisation errors and the computational considerations involved in solving incompressible flow problems."
      ],
      tech: ["MATLAB", "Numerical methods", "CFD"],
      cover: "assets/img/projects/quick-simple.svg",
      coverCaption: "Placeholder artwork for the QUICK and SIMPLE implementation. Replace with a project photo."
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
        "Built the solver in-house, retaining full control of every simulation parameter.",
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
     CREDENTIALS — certificates and letters in one list.
     Delete `sample: true` once the real document is attached.
     ------------------------------------------------------- */
  credentials: [
    {
      id: "drdo-internship",
      type: "Certificate",
      title: "Summer Internship — DRDO CEMILAC",
      issuer: "Centre for Military Airworthiness and Certification, DRDO",
      date: "2026",
      summary: "Summer internship at DRDO CEMILAC, Bengaluru, working on an in-house 2D incompressible flow solver and transient aerodynamic analysis.",
      skills: ["Aerodynamics", "CFD", "MATLAB"],
      credentialUrl: null,
      file: null,
      thumbnail: "assets/img/certificate-placeholder.svg",
      sample: true
    },
    {
      id: "matlab-onramp",
      type: "Certificate",
      title: "MATLAB Onramp",
      issuer: "MathWorks",
      date: "3 Aug 2026",
      summary: "MathWorks' introductory MATLAB course covering arrays, plotting, control flow, functions and basic data analysis.",
      skills: ["MATLAB"],
      credentialUrl: null,
      file: "assets/docs/certs/matlab-onramp.pdf",
      thumbnail: "assets/img/certs/matlab-onramp-thumb.webp"
    },
    {
      id: "lor-drdo",
      type: "Letter",
      title: "Letter of Recommendation — DRDO Scientist",
      issuer: "DRDO CEMILAC, Bengaluru",
      date: "31 Oct 2026",
      summary: "Recommendation from the DRDO CEMILAC scientist who supervised the summer internship on the 2D incompressible flow solver.",
      recommender: "G Senthilkumar",
      recommenderTitle: "Scientist",
      affiliation: "DRDO CEMILAC, Bengaluru",
      relationship: "Summer internship supervisor",
      visibility: "public",
      file: "assets/docs/lors/lor-drdo.pdf",
      thumbnail: "assets/img/lors/lor-drdo-thumb.webp"
    },
    {
      id: "cfdpp-training",
      type: "Certificate",
      title: "CFD++ Simulation Training",
      issuer: "CFD++ vendor-led training",
      date: "2026",
      summary: "Instructor-led training on CFD++ simulation workflows, delivered by the software vendor alongside the internship.",
      skills: ["CFD++", "Simulation"],
      credentialUrl: null,
      file: null,
      thumbnail: "assets/img/certificate-placeholder.svg",
      sample: true
    }
  ]
};
