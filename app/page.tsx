"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ExternalLink,
  Award,
  Code,
  Briefcase,
  User,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isAnimating) return // Don't update during animations

      const sections = ["hero", "about", "skills", "projects", "achievements", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isAnimating])

  const scrollToSection = (sectionId: string) => {
    if (isAnimating) return // Prevent multiple animations

    setIsMobileMenuOpen(false)

    setIsAnimating(true)
    setActiveSection(sectionId)

    const sections = ["hero", "about", "skills", "projects", "achievements", "contact"]
    const animations = {
      hero: "smooth-zoom-in-3d",
      about: "smooth-slide-in-right",
      skills: "smooth-flip-in",
      projects: "smooth-slide-in-left",
      achievements: "smooth-slide-in-top",
      contact: "smooth-slide-in-bottom",
    }

    // Hide all sections with smooth transitions
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element && section !== sectionId) {
        element.classList.add("section-hidden")
        element.classList.remove("section-active")
      }
    })

    // Show target section with animation
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      // Remove any existing animation classes
      Object.values(animations).forEach((animClass) => {
        targetElement.classList.remove(animClass)
      })

      targetElement.classList.remove("section-hidden")
      targetElement.classList.add("section-active")

      // Add the specific animation
      setTimeout(() => {
        targetElement.classList.add(animations[sectionId as keyof typeof animations])
      }, 50)

      // Smooth scroll to section
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Reset animation state and show all sections
      setTimeout(() => {
        sections.forEach((section) => {
          const element = document.getElementById(section)
          if (element) {
            element.classList.remove("section-hidden")
            element.classList.add("section-active")
            // Remove animation classes
            Object.values(animations).forEach((animClass) => {
              element.classList.remove(animClass)
            })
          }
        })
        setIsAnimating(false)
      }, 1200)
    }
  }

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent("Hi Bilal! I found your portfolio and would like to connect.")
    window.open(`https://wa.me/923275571150?text=${message}`, "_blank")
  }

  const sendEmail = () => {
    window.open(
      "mailto:Wolfeyyes504@gmail.com?subject=Portfolio Contact&body=Hi Bilal, I found your portfolio and would like to discuss...",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-background section-container">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-playfair font-bold text-xl sm:text-2xl text-gradient">MYB</div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "hero", label: "Home", icon: User },
                { id: "about", label: "About", icon: User },
                { id: "skills", label: "Skills", icon: Code },
                { id: "projects", label: "Projects", icon: Briefcase },
                { id: "achievements", label: "Achievements", icon: Award },
                { id: "contact", label: "Contact", icon: MessageCircle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors nav-3d-effect ${
                    activeSection === id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              <div className="hidden sm:flex items-center space-x-4">
                <a
                  href="https://github.com/Bilalktk79"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bilalktk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/the_real_ktk?igsh=czRscGF6N21ydTA0&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

              <button
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""} md:hidden`}>
          <div className="px-4 py-4 space-y-2">
            {[
              { id: "hero", label: "Home", icon: User },
              { id: "about", label: "About", icon: User },
              { id: "skills", label: "Skills", icon: Code },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "achievements", label: "Achievements", icon: Award },
              { id: "contact", label: "Contact", icon: MessageCircle },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeSection === id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
              <a
                href="https://github.com/Bilalktk79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/bilalktk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/the_real_ktk?igsh=czRscGF6N21ydTA0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden ai-background section-slide section-active hero-mobile pt-16"
      >
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full pulse-glow"></div>
          <div
            className="floating-element absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full pulse-glow"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full pulse-glow"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="floating-element absolute bottom-20 right-10 w-12 h-12 bg-accent/15 rounded-full pulse-glow"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Matrix-style particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="matrix-particle absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 profile-mobile rounded-full overflow-hidden profile-glow">
                  <img src="/images/profile.jpg" alt="Muhammad Bilal Yousaf" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">MYB</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="font-playfair text-3xl sm:text-5xl md:text-7xl hero-title-mobile font-bold text-gradient">
                  Muhammad Bilal Yousaf
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl hero-subtitle-mobile text-muted-foreground max-w-3xl mx-auto">
                  Software Engineering Student & <span className="text-primary font-semibold">Gen AI Beginner</span>
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Hitec University Taxila • Passionate about AI Innovation
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg enhanced-glow"
              >
                View My Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={sendWhatsAppMessage}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg border-primary/50 hover:bg-primary/10 bg-transparent"
              >
                WhatsApp Me
              </Button>
            </div>

            <div className="hidden sm:flex items-center justify-center space-x-8 pt-8">
              <a
                href="https://github.com/Bilalktk79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/bilalktk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/the_real_ktk?igsh=czRscGF6N21ydTA0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              >
                <Instagram className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-muted/30 section-slide section-active">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate about leveraging AI to solve real-world problems
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-foreground">Hello, I'm Bilal!</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I'm a dedicated Software Engineering student at{" "}
                  <span className="text-primary font-semibold">Hitec University Taxila</span>, currently exploring the
                  fascinating world of Large Language Models and Generative AI as a beginner.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  With a strong foundation in data science tools like NumPy, Pandas, Matplotlib, Seaborn, and
                  Scikit-learn, I'm passionate about creating intelligent solutions that make a difference.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-base sm:text-lg text-foreground">Education</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">Software Engineering</span>
                    <span className="text-xs sm:text-sm text-primary">Current</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Hitec University Taxila</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-muted-foreground">FSc (Pre-Engineering)</span>
                    <span className="text-xs sm:text-sm text-primary">65%+</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Federal College of Science and Commerce</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["AI/ML", "Python", "Data Science", "Graphic Design", "Communication", "E-commerce"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 about-image-mobile rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 profile-glow">
                  <img src="/images/profile.jpg" alt="Muhammad Bilal Yousaf" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary/10 rounded-full pulse-glow particle-float"></div>
                <div
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full pulse-glow particle-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-20 section-gradient section-slide section-active">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="ai-section-expanded">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                  🤖 Artificial Intelligence & Machine Learning
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Exploring the frontiers of Generative AI and building intelligent solutions
                </p>
              </div>

              <div className="flex justify-center">
                <Card className="ai-card-3d gradient-card advanced-skill hover:shadow-xl transition-all duration-300 w-full max-w-md skill-card-mobile">
                  <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl sm:text-2xl">🧠</span>
                      </div>
                      <h4 className="font-playfair text-xl sm:text-2xl font-semibold text-foreground mb-2">
                        Generative AI
                      </h4>
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 sm:px-4 py-1">
                        Beginner
                      </Badge>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {["AI Content Generation", "Image Generation", "Text-to-Code", "AI Automation"].map(
                        (skill, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-background/50 skill-card-hover"
                          >
                            <span className="text-sm sm:text-base text-muted-foreground font-medium">{skill}</span>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full pulse-glow"></div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Data Science Tools - Intermediate Level */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  📊 Data Science & Analytics
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">Python Libraries and Data Analysis Tools</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    category: "Data Manipulation",
                    skills: ["NumPy", "Pandas", "Data Cleaning", "Data Preprocessing"],
                    level: "Intermediate",
                  },
                  {
                    category: "Data Visualization",
                    skills: ["Matplotlib", "Seaborn"],
                    level: "Intermediate",
                  },
                  {
                    category: "Machine Learning",
                    skills: ["Scikit-learn", "Model Training", "Feature Engineering", "Model Evaluation"],
                    level: "Beginner",
                  },
                ].map((skillGroup, index) => (
                  <Card
                    key={index}
                    className="gradient-card intermediate-skill hover:shadow-xl transition-all duration-300 skill-card-hover skill-card-mobile"
                  >
                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-base sm:text-lg text-foreground">{skillGroup.category}</h4>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs"
                        >
                          {skillGroup.level}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {skillGroup.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center justify-between p-2 rounded-md bg-background/50"
                          >
                            <span className="text-sm text-muted-foreground">{skill}</span>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Other Skills */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <Card className="gradient-card beginner-skill hover:shadow-xl transition-all duration-300 skill-card-hover skill-card-mobile">
                <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">🎨</div>
                    <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground">
                      Design & Creative
                    </h3>
                    <Badge variant="outline" className="mt-2 border-purple-500 text-purple-600 text-xs">
                      Expert
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Graphic Design",
                      "Adobe Illustrator",
                      "UI/UX Design",
                      "Visual Communication",
                      "Brand Identity",
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-background/50">
                        <span className="text-sm text-muted-foreground">{skill}</span>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card beginner-skill hover:shadow-xl transition-all duration-300 skill-card-hover skill-card-mobile">
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">💼</div>
                    <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground">
                      Business & Communication
                    </h3>
                    <Badge variant="outline" className="mt-2 border-purple-500 text-purple-600 text-xs">
                      Proficient
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {["E-commerce", "Communication", "Project Management", "Problem Solving", "Team Collaboration"].map(
                      (skill, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md bg-background/50">
                          <span className="text-sm text-muted-foreground">{skill}</span>
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-20 bg-muted/30 section-slide section-active">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing my work in AI, data science, and software development
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 project-grid-mobile">
            {[
              {
                title: "Customer Churn Prediction System",
                description:
                  "ML model to predict customer churn using advanced analytics and machine learning algorithms.",
                tech: ["Python", "Scikit-learn", "Pandas", "Data Analysis"],
                status: "Completed",
                github: "https://github.com/Bilalktk79/customer-churn-prediction",
                demo: "#",
              },
              {
                title: "Crime Alert System",
                description: "Real-time crime detection and alert system using data analysis and predictive modeling.",
                tech: ["Python", "Data Science", "Alert Systems", "Analytics"],
                status: "Completed",
                github: "https://github.com/Bilalktk79/crime-alert-system",
                demo: "#",
              },
              {
                title: "Data Annotation Platform",
                description: "Comprehensive platform for data labeling and annotation for machine learning projects.",
                tech: ["Python", "Web Development", "Data Processing", "ML"],
                status: "Completed",
                github: "https://github.com/Bilalktk79/data-annotation-platform",
                demo: "#",
              },
              {
                title: "Fake News Detection",
                description: "NLP-based system to identify and classify fake news using machine learning techniques.",
                tech: ["NLP", "Python", "Machine Learning", "Text Analysis"],
                status: "Completed",
                github: "https://github.com/Bilalktk79/fake-news-detection",
                demo: "#",
              },
              {
                title: "AI-Powered Content Generator",
                description: "Leveraging LLMs to create intelligent content generation tools for various applications.",
                tech: ["LLM", "Generative AI", "Python", "API Integration"],
                status: "In Progress",
                github: "https://github.com/Bilalktk79/ai-content-generator",
                demo: "#",
              },
              {
                title: "Smart E-commerce Analytics",
                description: "Advanced analytics dashboard for e-commerce businesses with predictive insights.",
                tech: ["Data Science", "Analytics", "Python", "Visualization"],
                status: "In Progress",
                github: "https://github.com/Bilalktk79/ecommerce-analytics",
                demo: "#",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-primary/20 project-card-3d"
              >
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <Badge
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className="text-xs shrink-0"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 sm:pt-4">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 text-xs sm:text-sm p-1 sm:p-2"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent/80 text-xs sm:text-sm p-1 sm:p-2"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-12 sm:py-20 section-slide section-active">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Achievements & Certifications
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Recognition and certifications that showcase my expertise
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Graphic Design Certificate",
                issuer: "Pioneer's Superior Science School & College",
                date: "August - October 2022",
                description: "Comprehensive training in Adobe Illustrator and graphic design principles",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-25%20at%2012.26.45_7c22171a.jpg-DNnU1bCDOTeU9IhdDOhfXw9KDufECa.jpeg",
              },
              {
                title: "HITEC Olympiad 2025",
                issuer: "HITEC University Taxila",
                date: "April 2025",
                description: "Certificate of Achievement in Graphic Designing competition",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-25%20at%2012.26.44_d6bc0a8f.jpg-eWzUbQwJzqCwqxVtH3EQ4HmiOyCgbX.jpeg",
              },
              {
                title: "Robo Fiesta 6.0 Participation",
                issuer: "Hi Robo Tec",
                date: "December 2023",
                description: "Certificate of Appreciation for participation as Accommodation Team member",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-25%20at%2012.26.45_85e919e9.jpg-mXTa7xmjrLZJoZsNppbcn55W3217hO.jpeg",
              },
              {
                title: "Digital Marketing Certification",
                issuer: "Professional Development Institute",
                date: "2024",
                description: "Advanced certification in digital marketing strategies and analytics",
                image: "/digital-marketing-certificate.png",
              },
              {
                title: "Python Programming Excellence",
                issuer: "Tech Academy",
                date: "2024",
                description: "Advanced Python programming and data science certification",
                image: "/python-programming-certificate.png",
              },
              {
                title: "AI Innovation Award",
                issuer: "University Tech Fair",
                date: "2024",
                description: "Recognition for innovative AI project development and implementation",
                image: "/ai-innovation-award-certificate.png",
              },
            ].map((achievement, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-playfair text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary font-medium">{achievement.issuer}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 bg-muted/30 section-slide section-active">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's connect and discuss opportunities in AI and software development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-foreground">Let's Connect</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I'm always interested in discussing new opportunities, collaborating on exciting projects, or simply
                  connecting with fellow tech enthusiasts. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-foreground">Email</p>
                    <a
                      href="mailto:Wolfeyyes504@gmail.com"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      Wolfeyyes504@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-foreground">Phone</p>
                    <a
                      href="tel:+923275571150"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      +92 327 557 1150
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button onClick={sendWhatsAppMessage} className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={sendEmail}
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-base sm:text-lg text-foreground">Follow Me</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://github.com/Bilalktk79"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bilalktk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/the_real_ktk?igsh=czRscGF6N21ydTA0&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-primary/20 contact-form-mobile">
              <CardContent className="space-y-4 sm:space-y-6">
                <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground">Send a Message</h3>
                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const name = formData.get("name")
                    const email = formData.get("email")
                    const subject = formData.get("subject")
                    const message = formData.get("message")

                    const emailBody = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0A%0AMessage:%0A${message}`
                    window.open(`mailto:Wolfeyyes504@gmail.com?subject=${subject}&body=${emailBody}`, "_blank")
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground enhanced-glow"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="font-playfair font-bold text-lg sm:text-xl text-gradient">MYB</div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © 2024 Muhammad Bilal Yousaf. All rights reserved.
            </p>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="https://github.com/Bilalktk79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/bilalktk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/the_real_ktk?igsh=czRscGF6N21ydTA0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
