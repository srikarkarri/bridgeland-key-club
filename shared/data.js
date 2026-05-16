// Shared club data — referenced across pages.
window.BKC = {
  club: {
    name: "Bridgeland Key Club",
    school: "Bridgeland High School",
    division: "Division 3W",
    region: "Region 12",
    district: "Texas-Oklahoma District",
    chartered: 2017,
    location: "Bridgeland HS · The Commons",
    address: "10707 Mason Rd, Cypress, TX 77433",
    meetingTime: "1st & 3rd Wednesdays · 2:30 PM · The Commons",
    email: "bridgelandkeyclub@gmail.com",
    instagram: "@bridgelandkc",
    instagramUrl: "https://instagram.com/bridgelandkc",
    remind: "Text @{year}bkc to 81010",
    remindCodes: [
      { year: 2026, code: "@2026bkc" },
      { year: 2027, code: "@2027bkc" },
      { year: 2028, code: "@2028bkc" },
      { year: 2029, code: "@2029bkc" }
    ]
  },
  district: {
    ltGov: {
      name: "Amuktamalyada Panchanganmvenkata",
      title: "Lt. Governor · Division 3W",
      email: "ltg3w@tokeyclub.com"
    },
    region12Advisor: {
      name: "Brittany Stiborik",
      email: "region12@tokeyclub.com"
    },
    site: "https://tokeyclub.com",
    techPro: "techpro@tokeyclub.com"
  },
  kiwanis: {
    name: "Cypress Kiwanis Club",
    address: "PO Box 12345 · Cypress, TX 77433",
    president: "Mr. Andre Reyes",
    email: "cypresskiwanis@example.org",
    site: "https://kiwanis.org"
  },
  intl: {
    site: "https://keyclub.org"
  },
  webmaster: {
    name: "Srikar Karri",
    role: "Webmaster",
    email: "srikar.karri@gmail.com"
  },
  officers: [
    { role: "President",        name: "William Oliver",        year: 2026, email: "William.j.Oliver1127@gmail.com",  photo: "assets/officers/will-oliver.jpeg" },
    { role: "Vice President",   name: "Jayden Lin",            year: 2026, email: "jaydenlin178@gmail.com",          photo: "assets/officers/jayden-lin.jpeg" },
    { role: "Secretary",        name: "Rishab Sosale",         year: 2027, email: "rishab.sosale@gmail.com",         photo: "assets/officers/rishab-sosale.jpeg" },
    { role: "Treasurer",        name: "Natasha Darure",        year: 2026, email: "natasha.darure@gmail.com",        photo: "assets/officers/natasha-darure.png" },
    { role: "Editor",           name: "Brynna Mire",           year: 2027, email: "brynna.mire@gmail.com",           photo: "assets/officers/brynna-mire.jpeg" },
    { role: "District Editor",  name: "Riya Dheeraj",          year: 2026, email: "bridgelandkeyclub@gmail.com",     photo: "assets/officers/riya-dheeraj.jpeg" },
    { role: "Webmaster",        name: "Srikar Karri",          year: 2029, email: "srikar.karri@gmail.com",          photo: "assets/officers/srikar-karri.png" },
    { role: "Events Chair",     name: "Elyssa Do",             year: 2026, email: "edayrit123@gmail.com",            photo: "assets/officers/elyssa-do.png" },
    { role: "Events Chair",     name: "Samruddhi Muralidhara", year: 2026, email: "samruddhimuralidhara@gmail.com",  photo: "assets/officers/samruddhi-muralidhara.png" },
    { role: "Events Chair",     name: "Aiyanna Khauv",         year: 2027, email: "aiyannakhauv.25@gmail.com",       photo: "assets/officers/aiyanna-khauv.png" },
    { role: "Events Chair",     name: "Jonathan Chadee",       year: 2027, email: "jonjasonvchad@gmail.com",         photo: "assets/officers/jonathan-chadee.png" },
    { role: "Events Chair",     name: "Kyle Ha",               year: 2027, email: "kylekha10@gmail.com",             photo: "assets/officers/kyle-ha.jpeg" },
    { role: "Social Chair",     name: "Katelyn Le",            year: 2026, email: "katelynel09@gmail.com",           photo: "assets/officers/katelyn-le.jpeg" },
    { role: "Social Chair",     name: "Avani Deshpande",       year: 2026, email: "deshpandeavani@yahoo.com",        photo: "assets/officers/avani-deshpande.jpeg" },
    { role: "Builders Club",    name: "Yashvi Khurana",        year: 2027, email: "hifromyashvi@gmail.com",          photo: "assets/officers/yashvi-khurana.jpeg" },
    { role: "Builders Club",    name: "Sanni Arimanda",        year: 2027, email: "sanni.arimanda08@gmail.com",      photo: "assets/officers/sanni-arimanda.jpeg" },
    { role: "Builders Club",    name: "Samhita Vasireddy",     year: 2028, email: "sami.vasireddy@gmail.com",        photo: "assets/officers/sami-vasireddy.jpeg" }
  ],
  events: [
    { date: "2026-05-02", time: "9:00 AM", title: "Cypress Park Cleanup",   where: "Cypress Park",        type: "Service", hours: 3 },
    { date: "2026-05-08", time: "3:30 PM", title: "Officer Elections",      where: "Room 2208",           type: "Meeting", hours: 1 },
    { date: "2026-05-15", time: "5:00 PM", title: "Spring Banquet",         where: "BHS Cafeteria",       type: "Social",  hours: 0 },
    { date: "2026-05-21", time: "8:00 AM", title: "Field Day Volunteers",   where: "Keith Elementary",    type: "Service", hours: 5 },
    { date: "2026-06-04", time: "9:00 AM", title: "Food Bank Sort",         where: "Houston Food Bank",   type: "Service", hours: 4 },
    { date: "2026-06-11", time: "7:00 PM", title: "End-of-Year Social",     where: "Topgolf",             type: "Social",  hours: 0 },
    { date: "2026-07-12", time: "All Day", title: "TXOK District Conv.",    where: "Dallas, TX",          type: "District",hours: 0 }
  ],
  stats: {
    members: 249,
    hoursThisYear: 5581,
    eventsThisSemester: 18,
    yearsActive: 9
  },
  requirements: {
    semesterHours: 15,
    yearHours: 30,
    semesterSocials: 2,
    yearSocials: 4
  },
  news: [
    { date: "2026-04-22", title: "We swept Division 3W awards at DCON", excerpt: "Bridgeland brought home Distinguished Club, Distinguished Webmaster, and three single-service nods.", tag: "Awards" },
    { date: "2026-04-08", title: "5,000 hours and counting (somehow)", excerpt: "We crossed five thousand verified service hours this academic year, a new chapter record.", tag: "Milestone" },
    { date: "2026-03-30", title: "Mr. Reyes named Cypress Kiwanian of the Year", excerpt: "Our sponsor and biggest cheerleader got the recognition he deserves. We made him a card.", tag: "Community" },
    { date: "2026-03-15", title: "Spring food drive: 1,200 lbs collected", excerpt: "Thank you to every member, parent, and homeroom teacher who pitched in.", tag: "Service" }
  ],
  faqs: [
    { q: "When do you meet?", a: "1st and 3rd Wednesdays of each month at 2:30 PM in The Commons. Meetings run about 35 minutes." },
    { q: "How much are dues?", a: "$45 per year. This covers your Key Club International membership, district dues, and a club shirt." },
    { q: "Do I need to commit to a number of hours?", a: "Yes. 15 service hours per semester (30 per year) to stay in good standing for credit." },
    { q: "Can I run for officer?", a: "Absolutely. Elections happen each April. You'll need at least one full semester as a member in good standing." },
    { q: "What if I miss a meeting?", a: "Check the recap email and meeting slides we post here within 24 hours. No strikes for missed meetings, only missed events you signed up for." },
    { q: "How do I get my hours logged?", a: "Sign in at the event with the historian. Hours appear in the tracker within 48 hours." },
    { q: "Are events on weekends?", a: "Most service events are Saturdays. Socials are usually weeknights or Friday evenings." }
  ]
};
