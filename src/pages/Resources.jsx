// src/pages/Resources.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaBook, FaVideo, FaHeadset, 
  FaHeart, FaBrain, FaHandsHelping, FaPhone,
  FaExternalLinkAlt, FaSearch, FaFilter,
  FaYoutube, FaFileAlt, FaPodcast,
  FaCheckCircle, FaStar, FaClock, FaUserMd,
  FaAmbulance, FaComments, FaMobile, FaLaptop,
  FaGlobe, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck,
  FaChevronRight, FaNewspaper, FaMicrophone, FaMusic,
  FaUsers, FaHeartbeat, FaLeaf, FaSpa, FaTimes, FaPlayCircle
} from "react-icons/fa";

export default function Resources() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeModalResource, setActiveModalResource] = useState(null);

  // Resource Categories
  const categories = [
    { id: "all", label: "All Resources", icon: <FaBook /> },
    { id: "articles", label: "Articles & Guides", icon: <FaNewspaper /> },
    { id: "videos", label: "Videos & Talks", icon: <FaVideo /> },
    { id: "podcasts", label: "Podcasts", icon: <FaMicrophone /> },
    { id: "crisis", label: "Crisis Support", icon: <FaAmbulance /> },
    { id: "wellness", label: "Wellness Habits", icon: <FaLeaf /> },
    { id: "community", label: "Community", icon: <FaUsers /> },
    { id: "professional", label: "Professional Help", icon: <FaUserMd /> },
  ];

  // Verified External Resources List
  const resources = [
    // Articles & Guides
    {
      id: 1,
      title: "NIMH Guide: Managing Stress & Anxiety in College",
      description: "Official National Institute of Mental Health guide outlining stress triggers, anxiety symptoms, and practical coping strategies for university students.",
      category: "articles",
      type: "article",
      icon: <FaNewspaper />,
      image: "📚",
      readTime: "6 min read",
      date: "Verified Resource",
      author: "National Institute of Mental Health (NIMH)",
      featured: true,
      link: "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet",
      tags: ["stress", "anxiety", "academic", "nimh"],
      categoryTheme: "green"
    },
    {
      id: 2,
      title: "Sleep Hygiene & Academic Cognitive Performance",
      description: "Comprehensive Harvard Health breakdown detailing how sleep deprivation degrades class concentration and steps to optimize circadian rhythms.",
      category: "articles",
      type: "article",
      icon: <FaNewspaper />,
      image: "😴",
      readTime: "8 min read",
      date: "Verified Resource",
      author: "Harvard Health Publishing",
      featured: true,
      link: "https://www.health.harvard.edu/mind-and-mood/sleep-and-mental-health",
      tags: ["sleep", "harvard", "brain-health", "focus"],
      categoryTheme: "green"
    },
    {
      id: 3,
      title: "Mindfulness Techniques for Exam Anxiety",
      description: "Mayo Clinic guide offering actionable grounding techniques, 5-4-3-2-1 sensory exercises, and breathing patterns to manage high-pressure tests.",
      category: "articles",
      type: "article",
      icon: <FaNewspaper />,
      image: "📝",
      readTime: "5 min read",
      date: "Verified Resource",
      author: "Mayo Clinic Staff",
      featured: false,
      link: "https://www.mayoclinic.org/diseases-conditions/test-anxiety/in-depth/test-anxiety/art-20048220",
      tags: ["exam-stress", "mayo-clinic", "mindfulness"],
      categoryTheme: "green"
    },

    // Videos & Talks
    {
      id: 4,
      title: "TED Talk: How to Make Stress Your Friend",
      description: "Psychologist Kelly McGonigal urges us to see stress as a positive response and introduces an unexpected strategy for stress reduction.",
      category: "videos",
      type: "video",
      icon: <FaYoutube />,
      image: "🧘",
      readTime: "14 min watch",
      date: "TED Talks",
      author: "Dr. Kelly McGonigal",
      featured: true,
      link: "https://www.youtube.com/watch?v=RcGyVTAoXEU",
      tags: ["ted-talk", "stress-management", "psychology"],
      categoryTheme: "red"
    },
    {
      id: 5,
      title: "All It Takes Is 10 Mindful Minutes",
      description: "Mindfulness expert Andy Puddicombe describes the transformative power of doing nothing for just 10 minutes a day to refresh your mental focus.",
      category: "videos",
      type: "video",
      icon: <FaYoutube />,
      image: "🎬",
      readTime: "10 min watch",
      date: "TED Talks",
      author: "Andy Puddicombe (Headspace)",
      featured: false,
      link: "https://www.youtube.com/watch?v=gz4g31B67wa",
      tags: ["mindfulness", "meditation", "headspace"],
      categoryTheme: "red"
    },

    // Podcasts
    {
      id: 6,
      title: "The Happiness Lab with Dr. Laurie Santos",
      description: "Yale professor Dr. Laurie Santos shares science-backed research on emotions and actionable habits to feel happier during demanding academic years.",
      category: "podcasts",
      type: "podcast",
      icon: <FaMicrophone />,
      image: "🎙️",
      readTime: "35 min ep",
      date: "Weekly Podcast",
      author: "Pushkin Industries / Yale",
      featured: true,
      link: "https://www.happinesslab.fm/",
      tags: ["happiness", "yale", "science", "podcast"],
      categoryTheme: "purple"
    },
    {
      id: 7,
      title: "Huberman Lab: Master Your Sleep & Focus",
      description: "Neuroscience professor Andrew Huberman breaks down protocols for improving sleep quality, daily focus metrics, and stress resilience.",
      category: "podcasts",
      type: "podcast",
      icon: <FaMicrophone />,
      image: "🎧",
      readTime: "45 min ep",
      date: "Weekly Podcast",
      author: "Dr. Andrew Huberman",
      featured: false,
      link: "https://www.hubermanlab.com/",
      tags: ["neuroscience", "sleep", "focus", "huberman"],
      categoryTheme: "purple"
    },

    // Crisis Support (Global & Local BD Options)
    {
      id: 8,
      title: "988 Suicide & Crisis Lifeline",
      description: "Free, confidential 24/7 support for anyone experiencing mental health distress, suicidal crisis, or emotional hardship.",
      category: "crisis",
      type: "crisis",
      icon: <FaPhone />,
      image: "📞",
      readTime: "24/7 Hotline",
      date: "Immediate Access",
      author: "Global Lifeline Network",
      featured: true,
      link: "https://988lifeline.org/",
      tags: ["crisis", "hotline", "24-7", "emergency"],
      categoryTheme: "red"
    },
    {
      id: 9,
      title: "Moner Bandhu – Mental Health Support BD",
      description: "Professional mental health and counseling organization providing accessible care, tele-counseling, and emergency support in Bangladesh.",
      category: "crisis",
      type: "crisis",
      icon: <FaComments />,
      image: "🇧🇩",
      readTime: "Active Counseling",
      date: "Bangladesh Helpline",
      author: "Moner Bandhu Team",
      featured: true,
      link: "https://www.monerbandhu.org/",
      tags: ["bangladesh", "moner-bandhu", "crisis", "tele-counseling"],
      categoryTheme: "red"
    },
    {
      id: 10,
      title: "Kaanbon – Emotional Support Helpline",
      description: "First non-profit suicide prevention hotline in Bangladesh offering empathetic, confidential listening services to individuals in distress.",
      category: "crisis",
      type: "crisis",
      icon: <FaHandsHelping />,
      image: "🤝",
      readTime: "Helpline",
      date: "Bangladesh",
      author: "Kaanbon BD",
      featured: false,
      link: "https://kaanbon.org/",
      tags: ["kaanbon", "helpline", "bangladesh", "support"],
      categoryTheme: "red"
    },

    // Wellness Habits
    {
      id: 11,
      title: "Interactive Box Breathing & Calming Guide",
      description: "Interactive visual breathing tool used by athletes and Navy SEALs to instantly reduce heart rate and lower acute anxiety spikes.",
      category: "wellness",
      type: "wellness",
      icon: <FaHeart />,
      image: "🌿",
      readTime: "3 min exercise",
      date: "Daily Habit",
      author: "Mindful Health Tools",
      featured: true,
      link: "https://www.healthline.com/health/box-breathing",
      tags: ["breathing", "calm", "anxiety-tool"],
      categoryTheme: "teal"
    },

    // Community Support
    {
      id: 12,
      title: "7 Cups – Online Peer Counseling & Therapy",
      description: "Free 24/7 online chat support with trained peer listeners and licensed therapists in a safe, non-judgmental community space.",
      category: "community",
      type: "community",
      icon: <FaUsers />,
      image: "👥",
      readTime: "24/7 Community",
      date: "Global Network",
      author: "7 Cups Community",
      featured: false,
      link: "https://www.7cups.com/",
      tags: ["peer-support", "chat", "online-community"],
      categoryTheme: "pink"
    },

    // Professional Help
    {
      id: 13,
      title: "Psychology Today Therapist Directory",
      description: "Search comprehensive database of licensed psychologists, clinical counselors, and tele-health providers tailored to your location.",
      category: "professional",
      type: "professional",
      icon: <FaUserMd />,
      image: "🏥",
      readTime: "Directory Search",
      date: "Global Search",
      author: "Psychology Today",
      featured: true,
      link: "https://www.psychologytoday.com/us/therapists",
      tags: ["therapist", "find-help", "professional"],
      categoryTheme: "indigo"
    },
    {
      id: 14,
      title: "Open Path Psychotherapy Collective",
      description: "Non-profit network providing affordable in-person and online psychotherapy for students and individuals seeking low-cost care.",
      category: "professional",
      type: "professional",
      icon: <FaCalendarCheck />,
      image: "🎯",
      readTime: "Affordable Care",
      date: "Sliding Scale Network",
      author: "Open Path Collective",
      featured: false,
      link: "https://openpathcollective.org/",
      tags: ["affordable-therapy", "open-path", "counseling"],
      categoryTheme: "indigo"
    }
  ];

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(r => r.featured);

  // Helper functions for dynamic safe classes
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case "article": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "video": return "bg-rose-100 text-rose-800 border-rose-200";
      case "podcast": return "bg-purple-100 text-purple-800 border-purple-200";
      case "crisis": return "bg-red-100 text-red-800 border-red-200";
      case "wellness": return "bg-teal-100 text-teal-800 border-teal-200";
      case "community": return "bg-pink-100 text-pink-800 border-pink-200";
      case "professional": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryBorderColor = (categoryTheme) => {
    switch (categoryTheme) {
      case "green": return "border-l-emerald-500";
      case "red": return "border-l-rose-500";
      case "purple": return "border-l-purple-500";
      case "teal": return "border-l-teal-500";
      case "pink": return "border-l-pink-500";
      case "indigo": return "border-l-indigo-500";
      default: return "border-l-blue-500";
    }
  };

  const getTypeEmoji = (type) => {
    const emojis = {
      article: "📄",
      video: "🎬",
      podcast: "🎙️",
      crisis: "🆘",
      wellness: "🌿",
      community: "👥",
      professional: "🏥"
    };
    return emojis[type] || "📌";
  };

  const handleOpenLink = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="p-3 hover:bg-gray-200 rounded-2xl transition bg-white shadow-sm border border-gray-100 cursor-pointer"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-gray-800 flex items-center">
                📚 Verified Student Health Hub
              </h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Curated scientific articles, crisis lines, videos, podcasts & therapy tools</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/check-in')}
              className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center cursor-pointer text-sm"
            >
              <FaHeart className="mr-2" /> Check-in Today
            </button>
          </div>
        </div>

        {/* Emergency Crisis Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 rounded-3xl p-5 text-white mb-8 shadow-xl shadow-rose-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white animate-pulse">
                <FaAmbulance size={26} />
              </div>
              <div>
                <p className="font-extrabold text-base md:text-lg">Need Immediate Crisis Support?</p>
                <p className="text-xs md:text-sm text-rose-100 mt-0.5">Free, confidential 24/7 hotlines & listening services available globally and in Bangladesh.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <a 
                href="tel:988" 
                className="flex-1 sm:flex-none px-5 py-2.5 bg-white text-rose-700 rounded-2xl font-extrabold text-xs md:text-sm hover:bg-rose-50 transition flex items-center justify-center shadow-sm"
              >
                <FaPhone className="mr-2" /> Call 988 Lifeline
              </a>
              <button 
                onClick={() => setSelectedCategory("crisis")}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-rose-800/60 border border-rose-400/40 rounded-2xl font-extrabold text-xs md:text-sm hover:bg-rose-800/80 transition"
              >
                View Crisis Lines
              </button>
            </div>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by topic, keyword (e.g. stress, sleep, BD helpline)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm font-medium"
              />
            </div>
            <div className="flex items-center space-x-3 overflow-x-auto pb-1 md:pb-0">
              <FaFilter className="text-gray-400 flex-shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm font-bold text-gray-700 cursor-pointer bg-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c.id !== "all").map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm font-bold text-gray-700 cursor-pointer bg-white"
              >
                <option value="all">All Resource Types</option>
                <option value="article">Articles</option>
                <option value="video">Videos</option>
                <option value="podcast">Podcasts</option>
                <option value="crisis">Crisis Support</option>
                <option value="wellness">Wellness Tools</option>
                <option value="community">Community</option>
                <option value="professional">Professional Help</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Section */}
        {searchTerm === "" && selectedCategory === "all" && selectedType === "all" && (
          <div className="mb-10">
            <h2 className="text-xl font-black text-gray-800 flex items-center mb-4">
              <FaStar className="text-amber-500 mr-2" />
              Featured Academic & Mental Health Picks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.slice(0, 3).map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200 hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-4xl">{resource.image}</span>
                      <div>
                        <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full border ${getTypeBadgeStyle(resource.type)}`}>
                          {getTypeEmoji(resource.type)} {resource.type.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold text-amber-600 block mt-1">⭐ Editor's Choice</span>
                      </div>
                    </div>
                    <h3 className="font-extrabold text-gray-800 text-base mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-3">{resource.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 border-t border-gray-100 pt-3 mb-4">
                      <span className="flex items-center"><FaClock className="mr-1 text-gray-400" /> {resource.readTime}</span>
                      <span className="truncate max-w-[120px]">{resource.author}</span>
                    </div>
                    <button 
                      onClick={() => handleOpenLink(resource.link)}
                      className="w-full py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <span>Open External Link</span>
                      <FaExternalLinkAlt className="ml-2 text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Resource Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Matching Resources Found</h3>
            <p className="text-xs text-gray-400 mb-4">Try adjusting your search criteria or selecting a different category filter.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedType("all");
              }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className={`bg-white rounded-3xl p-6 shadow-sm border-l-4 ${getCategoryBorderColor(resource.categoryTheme)} border-y border-r border-gray-100 hover:shadow-md transition flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{resource.image}</span>
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full border ${getTypeBadgeStyle(resource.type)}`}>
                        {getTypeEmoji(resource.type)} {resource.type.toUpperCase()}
                      </span>
                    </div>
                    {resource.featured && (
                      <FaStar className="text-amber-400 text-sm" />
                    )}
                  </div>

                  <h3 className="font-extrabold text-gray-800 text-base mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-3">{resource.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 border-t border-gray-100 pt-3 mb-4">
                    <span className="flex items-center"><FaClock className="mr-1" /> {resource.readTime}</span>
                    <span className="truncate max-w-[120px]">{resource.author}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveModalResource(resource)}
                      className="flex-1 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition rounded-2xl text-xs font-bold cursor-pointer"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleOpenLink(resource.link)}
                      className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition rounded-2xl text-xs font-bold flex items-center justify-center cursor-pointer"
                    >
                      <span>Visit</span>
                      <FaExternalLinkAlt className="ml-1.5 text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Action Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-5 text-white text-center shadow-lg shadow-blue-100">
            <FaPhone className="text-2xl mx-auto mb-2 text-blue-200" />
            <h4 className="font-extrabold text-sm">24/7 National Hotline</h4>
            <p className="text-[11px] text-blue-100 mt-0.5">Emergency Helpline</p>
            <p className="text-base font-black mt-2">Call 988</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-5 text-white text-center shadow-lg shadow-emerald-100">
            <FaComments className="text-2xl mx-auto mb-2 text-emerald-200" />
            <h4 className="font-extrabold text-sm">Crisis Text Line</h4>
            <p className="text-[11px] text-emerald-100 mt-0.5">Free 24/7 Text Support</p>
            <p className="text-base font-black mt-2">Text HOME to 741741</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-5 text-white text-center shadow-lg shadow-purple-100">
            <FaUserMd className="text-2xl mx-auto mb-2 text-purple-200" />
            <h4 className="font-extrabold text-sm">Find Local Therapists</h4>
            <p className="text-[11px] text-purple-100 mt-0.5">Verified Network</p>
            <button 
              onClick={() => handleOpenLink("https://www.psychologytoday.com/us/therapists")}
              className="mt-2 px-4 py-1.5 bg-white text-purple-700 rounded-xl text-xs font-black hover:bg-purple-50 transition cursor-pointer"
            >
              Browse Network
            </button>
          </div>

          <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-3xl p-5 text-white text-center shadow-lg shadow-rose-100">
            <FaHandsHelping className="text-2xl mx-auto mb-2 text-rose-200" />
            <h4 className="font-extrabold text-sm">Moner Bandhu BD</h4>
            <p className="text-[11px] text-rose-100 mt-0.5">Bangladesh Counseling</p>
            <button 
              onClick={() => handleOpenLink("https://www.monerbandhu.org/")}
              className="mt-2 px-4 py-1.5 bg-white text-rose-700 rounded-xl text-xs font-black hover:bg-rose-50 transition cursor-pointer"
            >
              Visit Portal
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center text-xs text-gray-400 border-t border-gray-200/80 pt-6">
          <p>All external links lead to official medical or non-profit organizations. If you are experiencing a severe medical emergency, please contact your local emergency services immediately.</p>
        </div>

      </div>

      {/* RESOURCE PREVIEW MODAL */}
      {activeModalResource && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setActiveModalResource(null)}
              className="absolute right-5 top-5 p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">{activeModalResource.image}</span>
              <div>
                <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full border ${getTypeBadgeStyle(activeModalResource.type)}`}>
                  {getTypeEmoji(activeModalResource.type)} {activeModalResource.type.toUpperCase()}
                </span>
                <p className="text-xs font-bold text-gray-400 mt-1">{activeModalResource.author}</p>
              </div>
            </div>

            <h3 className="text-lg font-black text-gray-800 mb-2">{activeModalResource.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">{activeModalResource.description}</p>

            <div className="bg-slate-50 p-3.5 rounded-2xl mb-6 text-xs text-slate-600 space-y-1">
              <p><span className="font-bold">Format:</span> {activeModalResource.type}</p>
              <p><span className="font-bold">Estimated Duration:</span> {activeModalResource.readTime}</p>
              <p><span className="font-bold">Tags:</span> {activeModalResource.tags.join(", ")}</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setActiveModalResource(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl text-xs hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleOpenLink(activeModalResource.link);
                  setActiveModalResource(null);
                }}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-2xl text-xs hover:bg-blue-700 transition flex items-center justify-center cursor-pointer shadow-md shadow-blue-200"
              >
                <span>Launch Link</span>
                <FaExternalLinkAlt className="ml-2 text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}