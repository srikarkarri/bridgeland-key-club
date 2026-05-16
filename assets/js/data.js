/* Mock data for Bridgeland Key Club site.
   Real data should be wired from a published Google Sheet CSV.
   See HOURS_DATA_INTEGRATION.md (or comment block in hours.html) for swap-in steps.
*/
window.BKC_DATA = (function () {
  const CATEGORIES = [
    { id: 'community',    name: 'Community Service',  hue: 210 },
    { id: 'kiwanis',      name: 'Kiwanis Family',     hue: 42  },
    { id: 'environment',  name: 'Environmental',      hue: 145 },
    { id: 'tutoring',     name: 'Tutoring & Education', hue: 280 },
    { id: 'fundraising',  name: 'Fundraising',        hue: 350 },
    { id: 'leadership',   name: 'Leadership',         hue: 25  },
    { id: 'meeting',      name: 'Club Meetings',      hue: 200 },
  ];

  const EVENTS_BANK = [
    { name: 'Cypress Assistance Ministries Sort',     cat: 'community' },
    { name: 'Texas-Oklahoma District Convention',     cat: 'leadership' },
    { name: 'Earth Day Park Cleanup',                 cat: 'environment' },
    { name: 'Trick-or-Treat for UNICEF',              cat: 'fundraising' },
    { name: 'Elementary Tutoring at Pope ES',         cat: 'tutoring' },
    { name: 'Kiwanis Pancake Breakfast',              cat: 'kiwanis' },
    { name: 'General Meeting — Sept 12',              cat: 'meeting' },
    { name: 'General Meeting — Oct 10',               cat: 'meeting' },
    { name: 'General Meeting — Nov 14',               cat: 'meeting' },
    { name: 'General Meeting — Jan 16',               cat: 'meeting' },
    { name: 'Fall Festival Volunteer',                cat: 'community' },
    { name: 'Senior Citizen Holiday Cards',           cat: 'community' },
    { name: 'Bayou Cleanup w/ Galveston Bay',         cat: 'environment' },
    { name: 'Math Tutoring at Bridgeland MS',         cat: 'tutoring' },
    { name: 'Bake Sale — Spring',                     cat: 'fundraising' },
    { name: 'Officer Training Retreat',               cat: 'leadership' },
    { name: 'Houston Food Bank Sort',                 cat: 'community' },
    { name: 'Walk for Wishes',                        cat: 'fundraising' },
    { name: 'Aktion Club Buddy Day',                  cat: 'kiwanis' },
    { name: 'School Garden Planting',                 cat: 'environment' },
    { name: 'Reading Buddies — Library',              cat: 'tutoring' },
    { name: 'Spring Service Day',                     cat: 'community' },
  ];

  // Real names from the public 2026 OSC roster sample (first 60 used as basis)
  const NAMES = [
    'Gagan Sai Shauray Aduri','Rawan Al Bahadry','Oluwatomiwa Alabi','Vivaan Aneja','Sahas Anga','Anaswara Anoop',
    'Sanni Hitha Arimanda','Zachary Azaiez','Shivam Babu','Sahana Balaji','Maxwell Basham','Gage Bates',
    'Niva Bhatt','Michelle Blevins','Cole Braley','Kenneth Bui','Raaga Bukkaraju','Julia Burdziak',
    'Andrea Calles','Audrey Calvillo','Cooper Campbell','Jamie Campbell','Emma Cardenas','Zachary Carloto',
    'Rachael Carmel','Linda Cassani','Sophia Castillo','Samantha Castro','Diego Cervantes Leon','Jonathan Chadee',
    'Krish Chandy','Claire Chavey','Ariana Chavez','David Chavez','Shritan Chegowni','Advaith Cheri',
    'Avantika Chinta','Reuben Christensen','Neev Chadha','Grayson Clackley','Jesus Cueto Salazar',
    'Gabriella Daraphet','Natasha Darure','Noordeep Dhaliwal','Riya Dheeraj','Alexis Diaz','Frank Diaz',
    'Coldon Dickerson','Sarah Dinh','Peyton Distefano','Parnika Divi','Elyssa Do','Hemish Duri',
    'Rishika Duvva','Adnan Elmantar','Arianna Escobar','Askari Esparza','Andres Estrada Freites',
    'Kaycie Fielder','Liam Forcher','Richard Fordan','Destiny Foster','Riya Gadre','Louise Galo',
    'Varshini Gandreddy','Khloe Garcia','Thanvi Gazula','Liana Godinez','Aalya Goyal','Clint Green',
    'Savannah Griborio','Disha Gundappa','Danika Gupta','Kyle Ha','Teia Haferkamp','Brady Hartkemeyer',
    'Brooke Hartkemeyer','Heather Hartman','Kenley Hooker','Chloe Idowu','Lydia Idowu','Taylor Jackson',
    'Maha Jaffri','Vivaan Jain','Avykta Jakku','Akshay Jayasundar','Ria Jha','Jeff Jiju',
    'Induwari Jinadasa','Tyler John','Marvelous Johnson','Joshua Joseph','Aarna Kalapala','Anika Kammaradi',
    'Hyojin Kang','Srikar Karri','Mira Patel','Aanya Sharma','Olivia Nguyen','Ethan Park','Kayla Tran','Owen Reyes'
  ];

  // Deterministic pseudo-random so the page reloads consistently
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dateFromIdx(i) {
    // spread across 2025-09-01 to 2026-04-20
    const start = new Date(2025, 8, 1).getTime();
    const end   = new Date(2026, 3, 20).getTime();
    const t = start + (i / 600) * (end - start);
    const d = new Date(t);
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  function buildEntries() {
    const r = rng(42);
    const out = [];
    let id = 1;
    NAMES.forEach((name, ni) => {
      // each member gets 2-9 entries
      const count = 2 + Math.floor(r() * 8);
      for (let i = 0; i < count; i++) {
        const ev = EVENTS_BANK[Math.floor(r() * EVENTS_BANK.length)];
        const hours = +(0.5 + r() * 5.5).toFixed(1);
        out.push({
          id: id++,
          memberId: ni + 1,
          name,
          event: ev.name,
          category: ev.cat,
          date: dateFromIdx(out.length),
          hours,
        });
      }
    });
    // Sort by date ascending
    out.sort((a, b) => a.date.localeCompare(b.date));
    return out;
  }

  const ENTRIES = buildEntries();

  // Aggregate per member
  function memberTotals() {
    const map = new Map();
    ENTRIES.forEach((e) => {
      if (!map.has(e.name)) map.set(e.name, { name: e.name, total: 0, events: 0, byCat: {} });
      const m = map.get(e.name);
      m.total += e.hours;
      m.events += 1;
      m.byCat[e.category] = (m.byCat[e.category] || 0) + e.hours;
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }

  function categoryTotals() {
    const map = new Map();
    CATEGORIES.forEach((c) => map.set(c.id, { ...c, hours: 0, events: 0 }));
    ENTRIES.forEach((e) => {
      const c = map.get(e.category);
      if (c) { c.hours += e.hours; c.events += 1; }
    });
    return Array.from(map.values()).sort((a, b) => b.hours - a.hours);
  }

  function totalHours() { return ENTRIES.reduce((s, e) => s + e.hours, 0); }

  // Tier thresholds (Key Club service hour pins)
  const TIERS = [
    { name: '10-Hour',  hours: 10 },
    { name: '25-Hour',  hours: 25 },
    { name: '50-Hour',  hours: 50 },
    { name: '100-Hour', hours: 100 },
    { name: '200-Hour', hours: 200 },
  ];

  // Upcoming events for the calendar
  const UPCOMING = [
    { date: '2026-05-02', time: '9:00 AM', title: 'Spring Park Cleanup',          location: 'Bridgeland Lakeland Park', cat: 'environment', spots: 18 },
    { date: '2026-05-08', time: '7:30 AM', title: 'Pancake Breakfast w/ Kiwanis', location: 'Cypress Kiwanis Hall',     cat: 'kiwanis',     spots: 8  },
    { date: '2026-05-14', time: '3:30 PM', title: 'General Meeting',              location: 'Bridgeland HS, Rm 2208',    cat: 'meeting',     spots: 0  },
    { date: '2026-05-21', time: '5:00 PM', title: 'Tutoring at Pope Elementary',  location: 'Pope Elementary',           cat: 'tutoring',    spots: 12 },
    { date: '2026-05-28', time: '10:00 AM',title: 'Houston Food Bank Sort',       location: 'Houston Food Bank',         cat: 'community',   spots: 24 },
    { date: '2026-06-03', time: '6:00 PM', title: 'Officer Elections',            location: 'Bridgeland HS, Cafeteria',  cat: 'leadership',  spots: 0  },
    { date: '2026-06-12', time: '8:00 AM', title: 'Walk for Wishes',              location: 'Memorial Park',             cat: 'fundraising', spots: 30 },
    { date: '2026-07-10', time: '9:00 AM', title: 'Texas-Oklahoma District Convention', location: 'Dallas, TX',          cat: 'leadership',  spots: 14 },
  ];

  return {
    CATEGORIES, EVENTS_BANK, NAMES,
    ENTRIES,
    memberTotals, categoryTotals, totalHours,
    TIERS, UPCOMING,
  };
})();
