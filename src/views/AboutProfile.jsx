import React from "react";
import {
  Terminal,
  Github,
  Linkedin,
  Shield,
  Code,
  Server,
  Cpu,
} from "lucide-react";

import "./css/AboutProfile.css";

const AboutProfile = ({ profile }) => (
  <div className="animate-fadeIn">
    <div className="profileCard">
      <div className="profileBanner">
        <div className="profileBannerPattern">
          {Array(20)
            .fill(
              "01101110 11100011 01101111 00100000 01100011 01101111 01101101 01110000 01100001 01110100 01101001 01110110 01100101 01101100"
            )
            .join(" ")}
        </div>
      </div>

      <div className="profileCardContent">
        <div className="profileHeader">
          <div className="profileAvatar">
            <Terminal size={48} />
          </div>
          <div className="socialLinks">
            <a href={profile.social.github} target="_blank" rel="noreferrer">
              <Github size={20} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="linkedin"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="profileDetails">
          <h1>{profile.personal.name}</h1>
          <p className="handle">{profile.personal.handle}</p>
          <p className="bio">{profile.personal.bio}</p>
        </div>

        <div className="skillsGrid">
          <div className="skillCategory">
            <h3>
              <Shield size={24} style={{ color: "#a855f7" }} /> Segurança
            </h3>
            <div className="tags">
              {profile.skills.security.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="skillCategory">
            <h3>
              <Code size={24} style={{ color: "#d946ef" }} /> Dev
            </h3>
            <div className="tags">
              {profile.skills.development.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="skillCategory">
            <h3>
              <Server size={24} style={{ color: "#6366f1" }} /> SysAdmin
            </h3>
            <div className="tags">
              {profile.skills.sysadmin.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <h2 className="sectionTitle">
          <Cpu size={20} /> Experiência
        </h2>
        <div className="experienceTimeline">
          {profile.experience.map((xp, idx) => (
            <div key={idx} className="timelineItem">
              <div className="timelineDot"></div>
              <h3>{xp.role}</h3>
              <p className="company">
                {xp.company} | {xp.period}
              </p>
              <p className="description">{xp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutProfile;
