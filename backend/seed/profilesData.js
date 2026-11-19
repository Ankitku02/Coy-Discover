const mockProfiles = [
  {
    name: "Ananya Sharma",
    age: 22,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Architecture student at SPA Delhi. Coffee enthusiast, watercolor painter, and indie music lover.",
    cityOrCollege: "SPA Delhi",
    interests: ["Architecture", "Coffee", "Indie Music", "Art"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Rohan Verma",
    age: 23,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "CS grad from IIT Bombay. Building things that matter. Weekend trekker and sourdough baker.",
    cityOrCollege: "IIT Bombay",
    interests: ["Coding", "Trekking", "Baking", "Startups"],
    hasLikedUser: false
  },
  {
    name: "Priya Nair",
    age: 21,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    bio: "Literature major at St. Stephen's. Obsessed with Murakami, vinyl records, and golden hour photography.",
    cityOrCollege: "St. Stephen's College, DU",
    interests: ["Literature", "Vinyl Records", "Photography", "Poetry"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Kabir Malhotra",
    age: 24,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Fintech analyst by day, jazz guitarist by night. Let's debate whether Mumbai or Delhi street food is better.",
    cityOrCollege: "Mumbai",
    interests: ["Jazz", "Guitar", "Foodie", "Finance"],
    hasLikedUser: false
  },
  {
    name: "Diya Patel",
    age: 22,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    bio: "UX Designer at NID Ahmedabad. Trying to make interfaces human. Dog mom to an unruly golden retriever.",
    cityOrCollege: "NID Ahmedabad",
    interests: ["Design", "Dogs", "Pottery", "Typography"],
    hasLikedUser: false
  },
  {
    name: "Aarav Kapoor",
    age: 23,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    bio: "Mechanical engineer turned startup operator. Big fan of Formula 1 and late night highway drives.",
    cityOrCollege: "BITS Pilani",
    interests: ["Formula 1", "Automobiles", "Podcasts", "Fitness"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Sneha Reddy",
    age: 21,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    bio: "Law student at NLSIU Bengaluru. Debater, chai addict, and amateur film photographer.",
    cityOrCollege: "NLSIU Bengaluru",
    interests: ["Debate", "Film Photography", "Chai", "True Crime"],
    hasLikedUser: false
  },
  {
    name: "Aditya Mehta",
    age: 24,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    bio: "Product guy at a gaming studio. FIFA enthusiast, sci-fi reader, and aspiring stand-up comic.",
    cityOrCollege: "Bangalore",
    interests: ["Gaming", "Sci-Fi", "Stand-up Comedy", "Board Games"],
    hasLikedUser: false
  },
  {
    name: "Meera Sengupta",
    age: 22,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
    bio: "Studying Economics at Presidency University Kolkata. Loves vintage fashion and indie cinema.",
    cityOrCollege: "Presidency University, Kolkata",
    interests: ["Cinema", "Vintage Fashion", "Economics", "Museums"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Vikram Joshi",
    age: 25,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    bio: "Full-stack developer & open-source contributor. Weekend cyclist exploring suburban trails.",
    cityOrCollege: "Pune",
    interests: ["Cycling", "Open Source", "Coffee", "Tech"],
    hasLikedUser: false
  },
  {
    name: "Ishita Roy",
    age: 22,
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
    bio: "Biotech researcher. Fascinated by genetics. In my free time, I write book reviews and bake cookies.",
    cityOrCollege: "IISc Bengaluru",
    interests: ["Science", "Books", "Baking", "Plants"],
    hasLikedUser: false
  },
  {
    name: "Tanmay Bansal",
    age: 23,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    bio: "Consultant living on PPTs and airport lounges. Running half-marathons to stay sane.",
    cityOrCollege: "Gurgaon",
    interests: ["Running", "Marathon", "Travel", "Podcasts"],
    hasLikedUser: false
  },
  {
    name: "Tara Deshmukh",
    age: 21,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    bio: "Graphic designer & illustrator. Always carrying a sketchbook. Looking for good brunch spots.",
    cityOrCollege: "Symbiosis Pune",
    interests: ["Illustration", "Brunch", "Art", "Anime"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Arjun Singhania",
    age: 24,
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
    bio: "Data scientist. I will predict your music taste from 3 songs. Tennis player on Sundays.",
    cityOrCollege: "Hyderabad",
    interests: ["Data Science", "Tennis", "Electronic Music", "Chess"],
    hasLikedUser: false
  },
  {
    name: "Kavya Iyer",
    age: 23,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
    bio: "Classical Bharatanatyam dancer and psychologist. Deep conversations over masala chai.",
    cityOrCollege: "Chennai",
    interests: ["Dance", "Psychology", "Classical Music", "Yoga"],
    hasLikedUser: false
  },
  {
    name: "Rishi Chawla",
    age: 22,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    bio: "Journalism student at Jamia. Curious about people and their untold stories. Street food explorer.",
    cityOrCollege: "Delhi",
    interests: ["Journalism", "Street Photography", "Writing", "History"],
    hasLikedUser: false
  },
  {
    name: "Rhea Khurana",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    bio: "Fashion marketing student at NIFT Delhi. Vintage thrift hunter and EDM enthusiast.",
    cityOrCollege: "NIFT Delhi",
    interests: ["Fashion", "Thrifting", "EDM", "Festivals"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Sameer Sheikh",
    age: 24,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
    bio: "Civil engineer working on metro rail projects. Love hiking, rock climbing, and guitar jams.",
    cityOrCollege: "Lucknow",
    interests: ["Rock Climbing", "Hiking", "Guitar", "Travel"],
    hasLikedUser: false
  },
  {
    name: "Pooja Hegde",
    age: 23,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    bio: "Brand strategist. I write micro-fiction on napkins and rate filter coffees wherever I travel.",
    cityOrCollege: "Bengaluru",
    interests: ["Writing", "Filter Coffee", "Branding", "Swimming"],
    hasLikedUser: false
  },
  {
    name: "Devendra Rathore",
    age: 25,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "Wildlife biologist. Most comfortable in jungles. Tell me your favorite animal trivia.",
    cityOrCollege: "Jaipur",
    interests: ["Wildlife", "Nature", "Birdwatching", "Camping"],
    hasLikedUser: false
  },
  {
    name: "Nandini Bhatt",
    age: 21,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Maths honours student at LSR. Puzzles, Rubik's cube, and late night synthwave tunes.",
    cityOrCollege: "Lady Shri Ram College, DU",
    interests: ["Math", "Synthwave", "Puzzles", "Cats"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Karan Oberoi",
    age: 24,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Culinary arts graduate. Cooking pasta from scratch is my love language. Let's cook together.",
    cityOrCollege: "IHM Mumbai",
    interests: ["Cooking", "Culinary Arts", "Wine Tasting", "Food"],
    hasLikedUser: false
  },
  {
    name: "Simran Kaur",
    age: 22,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    bio: "Dental surgeon in making. Bhangra dancer, sunrise watcher, and eternal optimist.",
    cityOrCollege: "Chandigarh",
    interests: ["Dance", "Fitness", "Road Trips", "Music"],
    hasLikedUser: false
  },
  {
    name: "Aman Agarwal",
    age: 23,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    bio: "E-commerce founder. Passionate about D2C brands, chess tournaments, and cold brews.",
    cityOrCollege: "Kolkata",
    interests: ["Startups", "Chess", "Cold Brew", "Economics"],
    hasLikedUser: false
  },
  {
    name: "Sanya Mir",
    age: 22,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
    bio: "Film student at FTII Pune. Directing short films and documenting indie bands on 35mm.",
    cityOrCollege: "FTII Pune",
    interests: ["Filmmaking", "Direction", "35mm Film", "Rock"],
    hasLikedUser: false
  },
  {
    name: "Pranav Saxena",
    age: 23,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    bio: "Robotics engineer. Building autonomous rovers. Huge enthusiast of stargazing and telescopes.",
    cityOrCollege: "IIT Kanpur",
    interests: ["Robotics", "Astronomy", "Stargazing", "Drones"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Anushka Sen",
    age: 21,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    bio: "Fine arts student. Oil painting on large canvases. Always up for visiting art galleries.",
    cityOrCollege: "Kala Bhavana, Visva-Bharati",
    interests: ["Painting", "Art Galleries", "Pottery", "Poetry"],
    hasLikedUser: false
  },
  {
    name: "Gaurav Trivedi",
    age: 24,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    bio: "Cybersecurity analyst. Ethical hacker by day, badminton player every evening.",
    cityOrCollege: "Ahmedabad",
    interests: ["Badminton", "Cybersecurity", "Gaming", "Tech"],
    hasLikedUser: false
  },
  {
    name: "Zoya Akhtar",
    age: 22,
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
    bio: "Creative copywriter. I make memes for a living and write poetry for fun. Cat enthusiast.",
    cityOrCollege: "Mumbai",
    interests: ["Copywriting", "Memes", "Cats", "Indie Pop"],
    hasLikedUser: false
  },
  {
    name: "Kartik Nambiar",
    age: 25,
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
    bio: "Marine engineer. Sailing across international waters. Scuba diving instructor.",
    cityOrCollege: "Kochi",
    interests: ["Scuba Diving", "Sailing", "Ocean", "Photography"],
    hasLikedUser: false
  },
  {
    name: "Ridhima Goswami",
    age: 23,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
    bio: "Environmental scientist. Passionate about sustainability, zero-waste living, and trail running.",
    cityOrCollege: "Dehradun",
    interests: ["Environment", "Trail Running", "Sustainability", "Mountains"],
    hasLikedUser: true // Will match on like!
  },
  {
    name: "Varun Bajaj",
    age: 24,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    bio: "Product designer. Minimalist aesthetics, mechanical keyboards, and specialty espresso.",
    cityOrCollege: "Gurgaon",
    interests: ["Keyboards", "Espresso", "Minimalism", "UI/UX"],
    hasLikedUser: false
  }
];

module.exports = mockProfiles;
