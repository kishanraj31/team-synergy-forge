import React from 'react';

const TeamSettingsPage: React.FC = () => {
  const pageStyles: React.CSSProperties = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  };

  const headingStyles: React.CSSProperties = {
    color: '#1e1e1e',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '2rem',
    borderBottom: '3px solid #a5d8ff',
    paddingBottom: '1rem',
  };

  const subHeadingStyles: React.CSSProperties = {
    color: '#1e1e1e',
    fontSize: '1.8rem',
    fontWeight: '600',
    marginTop: '2.5rem',
    marginBottom: '1.5rem',
  };

  const sectionStyles: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const sectionTitleStyles: React.CSSProperties = {
    color: '#1e1e1e',
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  };

  const memberListStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const memberItemStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    color: '#1e1e1e',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  const avatarStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#a5d8ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.75rem',
    color: '#1e1e1e',
    fontWeight: '600',
    fontSize: '0.9rem',
  };

  const descriptionStyles: React.CSSProperties = {
    color: '#6c757d',
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '1rem',
  };

  const notificationItemStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#ffffff',
    marginBottom: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  const notificationLabelStyles: React.CSSProperties = {
    color: '#1e1e1e',
    fontSize: '1rem',
    fontWeight: '500',
  };

  const toggleStyles: React.CSSProperties = {
    width: '48px',
    height: '24px',
    backgroundColor: '#b2f2bb',
    borderRadius: '12px',
    position: 'relative',
    cursor: 'pointer',
    border: '2px solid #a5d8ff',
  };

  const toggleKnobStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    position: 'absolute',
    top: '0px',
    right: '0px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>Team and Workspace Settings</h1>
      
      <h2 style={subHeadingStyles}>General</h2>
      
      <div style={sectionStyles}>
        <h3 style={sectionTitleStyles}>
          👥 Team Members
        </h3>
        <ul style={memberListStyles}>
          <li style={memberItemStyles}>
            <div style={avatarStyles}>A</div>
            Alice Johnson
          </li>
          <li style={memberItemStyles}>
            <div style={avatarStyles}>B</div>
            Bob Smith
          </li>
          <li style={memberItemStyles}>
            <div style={avatarStyles}>C</div>
            Charlie Brown
          </li>
        </ul>
      </div>

      <div style={sectionStyles}>
        <h3 style={sectionTitleStyles}>
          ⚙️ Workspace Settings
        </h3>
        <p style={descriptionStyles}>
          Manage your workspace preferences, including project visibility, 
          collaboration settings, and team permissions. Configure how your 
          team interacts with projects and tasks within the SynergySphere platform.
        </p>
      </div>

      <div style={sectionStyles}>
        <h3 style={sectionTitleStyles}>
          🔔 Notifications
        </h3>
        <div style={notificationItemStyles}>
          <span style={notificationLabelStyles}>Email Notifications</span>
          <div style={toggleStyles}>
            <div style={toggleKnobStyles}></div>
          </div>
        </div>
        <div style={notificationItemStyles}>
          <span style={notificationLabelStyles}>In-App Alerts</span>
          <div style={toggleStyles}>
            <div style={toggleKnobStyles}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSettingsPage;
