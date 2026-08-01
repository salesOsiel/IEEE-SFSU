// Desktop Environment - Hyprland/Arch Linux style with macOS glassmorphism

class DesktopEnvironment {
  constructor() {
    this.windows = [];
    this.windowQueue = [];
    this.maxWindows = 3;
    this.highestZIndex = 100;
    this.matrixCanvas = null;
    this.matrixCtx = null;
    this.matrixDrops = [];
    this.matrixAnimationFrame = null;
    this.matrixLastFrame = 0;
    this.matrixColumnWidth = 18;
    this.matrixFontSize = 16;
    this.matrixChars = 'IEEE SFSU 0101010110 <>[]{} / +-*';
    
    this.init();
  }
  
  init() {
    this.initMatrixRain();
    this.initWaybar();
    this.initNavigation();
    this.initWindowSystem();
  }
  
  // Matrix Rain Animation
  initMatrixRain() {
    this.matrixCanvas = document.getElementById('matrix-rain');
    if (!this.matrixCanvas) {
      console.error('Matrix rain canvas not found');
      return;
    }
    
    this.matrixCtx = this.matrixCanvas.getContext('2d');
    if (!this.matrixCtx) {
      console.error('Could not get 2D context for matrix rain');
      return;
    }
    
    this.resizeMatrixCanvas();
    
    const resizeCanvas = () => this.resizeMatrixCanvas();
    
    globalThis.addEventListener('resize', resizeCanvas);
    
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.drawMatrixFrame();
      return;
    }

    this.startMatrixRain();
  }

  resizeMatrixCanvas() {
    if (!this.matrixCanvas || !this.matrixCtx) return;

    const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
    const width = globalThis.innerWidth;
    const height = Math.max(globalThis.innerHeight - 48, 1);

    this.matrixCanvas.width = Math.floor(width * dpr);
    this.matrixCanvas.height = Math.floor(height * dpr);
    this.matrixCanvas.style.width = `${width}px`;
    this.matrixCanvas.style.height = `${height}px`;
    this.matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.initMatrixDrops();
  }

  initMatrixDrops() {
    if (!this.matrixCanvas || globalThis.innerWidth === 0) {
      console.warn('Matrix canvas not ready, retrying...');
      setTimeout(() => this.initMatrixDrops(), 100);
      return;
    }
    
    const columns = Math.ceil(globalThis.innerWidth / this.matrixColumnWidth);
    this.matrixDrops = Array.from({ length: columns }, () => Math.random() * -40);
  }
  
  // Inactive fallback from the first wallpaper pass. The live loop is startMatrixRain().
  startLegacyMatrixRain() {
    const draw = () => {
      if (!this.matrixCanvas || !this.matrixCtx) return;
      
      // Semi-transparent black to create fade effect
      this.matrixCtx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      this.matrixCtx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
      
      // Green/cyan text
      this.matrixCtx.font = '15px monospace';
      
      for (let i = 0; i < this.matrixDrops.length; i++) {
        // Mix of Matrix characters and tech symbols
        const chars = 'アイウエオカキクケコサシスセソ0123456789<>{}[]=/\\';
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Random cyan/blue tint (subtle)
        const colors = ['#0f8', '#0af', '#08f', '#0ff'];
        this.matrixCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        
        this.matrixCtx.fillText(text, i * 20, this.matrixDrops[i] * 20);
        
        // Reset drop or continue falling
        if (this.matrixDrops[i] * 20 > this.matrixCanvas.height && Math.random() > 0.975) {
          this.matrixDrops[i] = 0;
        }
        
        this.matrixDrops[i]++;
      }
    };
    
    this.matrixInterval = setInterval(draw, 50);
  }

  startMatrixRain() {
    if (this.matrixAnimationFrame) {
      cancelAnimationFrame(this.matrixAnimationFrame);
    }

    const animate = (timestamp) => {
      if (timestamp - this.matrixLastFrame > 42) {
        this.drawMatrixFrame();
        this.matrixLastFrame = timestamp;
      }

      this.matrixAnimationFrame = requestAnimationFrame(animate);
    };

    this.matrixAnimationFrame = requestAnimationFrame(animate);
  }

  drawMatrixFrame() {
    if (!this.matrixCanvas || !this.matrixCtx) return;

    const width = globalThis.innerWidth;
    const height = Math.max(globalThis.innerHeight - 48, 1);

    this.matrixCtx.fillStyle = 'rgba(2, 6, 23, 0.16)';
    this.matrixCtx.fillRect(0, 0, width, height);
    this.matrixCtx.font = `${this.matrixFontSize}px "Fira Code", "JetBrains Mono", monospace`;
    this.matrixCtx.textBaseline = 'top';

    for (let i = 0; i < this.matrixDrops.length; i++) {
      const x = i * this.matrixColumnWidth;
      const y = this.matrixDrops[i] * this.matrixFontSize;
      const charIndex = Math.floor(Math.random() * this.matrixChars.length);
      const text = this.matrixChars.charAt(charIndex);
      const isLead = Math.random() > 0.965;

      this.matrixCtx.fillStyle = isLead
        ? 'rgba(226, 232, 240, 0.86)'
        : `rgba(${Math.random() > 0.65 ? '125, 211, 252' : '16, 134, 214'}, ${0.38 + Math.random() * 0.28})`;
      this.matrixCtx.fillText(text, x, y);

      if (y > height && Math.random() > 0.965) {
        this.matrixDrops[i] = Math.random() * -30;
      } else {
        this.matrixDrops[i] += 0.9 + Math.random() * 0.45;
      }
    }
  }
  
  // Waybar Modules
  initWaybar() {
    this.initBattery();
    this.initClock();
  }
  
  initBattery() {
    const batteryElement = document.getElementById('battery');
    const batteryIcon = batteryElement.querySelector('.battery-icon');
    const batteryLevel = batteryElement.querySelector('.battery-level');
    
    if ('getBattery' in globalThis.navigator) {
      globalThis.navigator.getBattery().then(battery => {
        const updateBattery = () => {
          const level = Math.round(battery.level * 100);
          batteryLevel.textContent = `${level}%`;
          
          if (battery.charging) {
            batteryIcon.textContent = '⚡';
          } else if (level < 20) {
            batteryIcon.textContent = '🪫';
          } else {
            batteryIcon.textContent = '🔋';
          }
        };
        
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      });
    }
  }
  
  initClock() {
    const clockElement = document.getElementById('clock');
    const timeDisplay = clockElement.querySelector('.time-display');
    const calendarTooltip = document.getElementById('calendar-tooltip');
    
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      
      // Update calendar tooltip
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const dateString = now.toLocaleDateString('en-US', options);
      
      calendarTooltip.innerHTML = `
        <div class="date">${dateString}</div>
        <div class="calendar">
          Week ${this.getWeekNumber(now)} • ${now.toLocaleDateString('en-US', { month: 'short' })} ${now.getDate()}
        </div>
      `;
    };
    
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
  
  // Navigation from original navbar
  initNavigation() {
    const navContainer = document.getElementById('waybar-navigation');
    
    if (!window.siteContent || !window.siteContent.navigation) {
      return;
    }
    
    // Create merged navigation structure
    const mergedNav = this.createMergedNavigation(window.siteContent.navigation);
    
    mergedNav.forEach(item => {
      const navItem = this.renderNavItem(item);
      navContainer.appendChild(navItem);
    });
    
    // Add brand link handler
    const brandLink = document.querySelector('.brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.openWindow('home', 'index.html');
      });
    }
  }
  
  createMergedNavigation(originalNav) {
    // Merge Home and About into a single dropdown
    const mergedNav = [];
    
    originalNav.forEach(item => {
      if (item.label === 'Home') {
        // Skip Home as it will be merged with About
        return;
      } else if (item.label === 'About') {
        // Create merged Home/About dropdown
        const mergedItem = {
          label: 'Home',
          links: [
            { label: 'Home', href: 'index.html' },
            ...item.links
          ]
        };
        mergedNav.push(mergedItem);
      } else {
        // Keep other items as-is, but convert to hover dropdowns if they have links
        if (item.links) {
          mergedNav.push({
            ...item,
            hoverDropdown: true
          });
        } else {
          mergedNav.push(item);
        }
      }
    });
    
    return mergedNav;
  }
  
  renderNavItem(item) {
    const navItem = document.createElement('div');
    navItem.className = 'nav-item';
    
    if (!item.links) {
      // Simple link
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.textContent = item.label;
      link.href = item.href;
      
      // Map href to workspace
      const workspace = this.mapHrefToWorkspace(item.href);
      link.dataset.workspace = workspace;
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleNavClick(link, workspace, item.href);
      });
      
      navItem.appendChild(link);
    } else {
      // Hover dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown hover-dropdown';
      
      const trigger = document.createElement('div');
      trigger.className = 'nav-dropdown-trigger';
      trigger.innerHTML = `
        <span>${item.label}</span>
        <svg class="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      `;
      
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu';
      
      item.links.forEach(link => {
        const dropdownItem = document.createElement('a');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.textContent = link.label;
        dropdownItem.href = link.href;
        
        // Map href to workspace
        const workspace = this.mapHrefToWorkspace(link.href);
        dropdownItem.dataset.workspace = workspace;
        
        dropdownItem.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleNavClick(dropdownItem, workspace, link.href);
        });
        
        dropdownMenu.appendChild(dropdownItem);
      });
      
      dropdown.appendChild(trigger);
      dropdown.appendChild(dropdownMenu);
      navItem.appendChild(dropdown);
    }
    
    return navItem;
  }
  
  mapHrefToWorkspace(href) {
    // Map navigation hrefs to workspace names
    if (href === 'index.html' || href === 'index.html#about' || href === 'index.html#pillars' || href === 'index.html#faq') {
      return 'home';
    } else if (href === 'event-calendar.html') {
      return 'events';
    } else if (href === 'membership.html') {
      return 'projects';
    } else if (href === 'officers.html') {
      return 'officers';
    } else if (href === 'past-events.html' || href.startsWith('past-events.html#')) {
      return 'past-events';
    }
    return 'home';
  }
  
  handleNavClick(element, workspace, href) {
    // Remove active state from all nav items
    document.querySelectorAll('.nav-link, .nav-dropdown-trigger, .dropdown-item').forEach(el => {
      el.classList.remove('active');
    });
    
    // Add active state to clicked item and its parent trigger
    element.classList.add('active');
    const parentTrigger = element.closest('.nav-dropdown')?.querySelector('.nav-dropdown-trigger');
    if (parentTrigger) {
      parentTrigger.classList.add('active');
    }
    
    // Open window for this workspace
    this.openWindow(workspace, href);
  }
  
  // Window System
  initWindowSystem() {
    this.windowContainer = document.getElementById('window-container');
  }
  
  openWindow(workspace, page) {
    // Check if window already exists
    const existingWindow = this.windows.find(w => w.workspace === workspace);
    
    if (existingWindow) {
      this.focusWindow(existingWindow);
      // If it's a hash link, scroll to section
      if (page.includes('#')) {
        this.scrollToSection(existingWindow, page);
      }
      return;
    }
    
    // Check capacity limit
    if (this.windows.length >= this.maxWindows) {
      this.closeOldestWindow();
    }
    
    // Create new window
    const window = this.createWindow(workspace, page);
    this.windows.push(window);
    this.windowQueue.push(window);
    
    // Focus new window
    this.focusWindow(window);
    
    // If it's a hash link, scroll to section after content loads
    if (page.includes('#')) {
      setTimeout(() => {
        this.scrollToSection(window, page);
      }, 100);
    }
  }
  
  scrollToSection(window, page) {
    const hash = page.split('#')[1];
    if (!hash) return;
    
    const contentContainer = window.element.querySelector('.window-content');
    if (!contentContainer) return;
    
    const section = contentContainer.querySelector(`#${hash}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  calculateNonOverlappingPosition(width, height) {
    const waybarHeight = 48;
    const padding = 20;
    const verticalLift = 86;
    
    // Get existing window positions
    const existingRects = this.windows.map(w => {
      const rect = w.element.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top - waybarHeight,
        right: rect.left + rect.width,
        bottom: rect.bottom - waybarHeight
      };
    });

    // Try different positions starting above center in the desktop area.
    const viewportWidth = globalThis.innerWidth;
    const desktopHeight = globalThis.innerHeight - waybarHeight;
    const centerX = (viewportWidth - width) / 2;
    const centerY = (desktopHeight - height) / 2 - verticalLift;
    
    // Define possible positions (cascading pattern)
    const positions = [
      { left: centerX, top: centerY },
      { left: centerX + 50, top: centerY + 50 },
      { left: centerX - 50, top: centerY + 50 },
      { left: centerX + 50, top: centerY - 50 },
      { left: centerX - 50, top: centerY - 50 },
      { left: centerX + 100, top: centerY + 100 },
      { left: centerX - 100, top: centerY + 100 },
      { left: centerX + 100, top: centerY - 100 },
      { left: centerX - 100, top: centerY - 100 },
      { left: centerX + 150, top: centerY + 150 }
    ];
    
    // Find first non-overlapping position
    for (const pos of positions) {
      // Ensure position is within viewport
      const adjustedLeft = Math.max(padding, Math.min(pos.left, viewportWidth - width - padding));
      const adjustedTop = Math.max(padding, Math.min(pos.top, desktopHeight - height - padding));
      
      const newRect = {
        left: adjustedLeft,
        top: adjustedTop,
        right: adjustedLeft + width,
        bottom: adjustedTop + height
      };
      
      // Check if this position overlaps with any existing window
      let overlaps = false;
      for (const existing of existingRects) {
        if (this.rectsOverlap(newRect, existing)) {
          overlaps = true;
          break;
        }
      }
      
      if (!overlaps) {
        return { left: adjustedLeft, top: adjustedTop };
      }
    }
    
    // If all positions overlap, return the first position with slight offset.
    return {
      left: Math.max(padding, Math.min(centerX + 30, viewportWidth - width - padding)),
      top: Math.max(padding, Math.min(centerY + 30, desktopHeight - height - padding))
    };
  }
  
  rectsOverlap(rect1, rect2) {
    return !(rect1.right <= rect2.left || 
             rect1.left >= rect2.right || 
             rect1.bottom <= rect2.top || 
             rect1.top >= rect2.bottom);
  }
  
  createWindow(workspace, page) {
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.dataset.workspace = workspace;
    
    // Set initial size (75vw x 75vh)
    const width = globalThis.innerWidth * 0.75;
    const height = globalThis.innerHeight * 0.75;
    
    // Calculate non-overlapping position based on existing windows
    const position = this.calculateNonOverlappingPosition(width, height);
    
    windowEl.style.width = `${width}px`;
    windowEl.style.height = `${height}px`;
    windowEl.style.left = `${position.left}px`;
    windowEl.style.top = `${position.top}px`;
    windowEl.style.zIndex = ++this.highestZIndex;
    
    // Store original position for potential reset
    windowEl.dataset.originalLeft = position.left;
    windowEl.dataset.originalTop = position.top;
    
    // Get window title
    const titles = {
      home: 'Home - IEEE at SFSU',
      events: 'Event Calendar',
      projects: 'Projects & Membership',
      officers: 'Officers 2026-2027',
      'past-events': 'Past Events Archive',
      contact: 'Contact & FAQ'
    };
    
    // Create window structure
    windowEl.innerHTML = `
      <div class="window-titlebar">
        <div class="window-titlebar-left">
          <span class="window-title">${titles[workspace] || workspace}</span>
        </div>
        <div class="window-titlebar-center">
          <button class="traffic-light close" data-action="close"></button>
          <button class="traffic-light minimize" data-action="minimize"></button>
          <button class="traffic-light maximize" data-action="maximize"></button>
        </div>
        <div class="window-titlebar-right">
          <div class="social-pills">
            <a href="https://discord.gg/C6fNY8T6uz" class="social-pill" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ieeesfsu/" class="social-pill" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="social-pill" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="window-content" id="window-content-${workspace}">
        <div class="window-loading">
          <div class="spinner"></div>
          <p style="margin-top: 12px;">Loading...</p>
        </div>
      </div>
    `;
    
    // Add event listeners
    this.initWindowEvents(windowEl, workspace);
    
    // Add to container
    this.windowContainer.appendChild(windowEl);
    
    // Load content
    this.loadWindowContent(workspace, page, windowEl);
    
    return {
      element: windowEl,
      workspace: workspace,
      page: page,
      maximized: false
    };
  }
  
  initWindowEvents(windowEl, workspace) {
    const titlebar = windowEl.querySelector('.window-titlebar');
    const closeBtn = windowEl.querySelector('[data-action="close"]');
    const minimizeBtn = windowEl.querySelector('[data-action="minimize"]');
    const maximizeBtn = windowEl.querySelector('[data-action="maximize"]');
    
    // Focus on click
    windowEl.addEventListener('mousedown', () => {
      this.focusWindow(this.windows.find(w => w.workspace === workspace));
    });
    
    // Dragging
    let isDragging = false;
    let dragFrame = null;
    let dragStart = { x: 0, y: 0, left: 0, top: 0 };
    let nextDragPosition = { left: 0, top: 0 };

    const applyDragFrame = () => {
      dragFrame = null;
      const translateX = nextDragPosition.left - dragStart.left;
      const translateY = nextDragPosition.top - dragStart.top;
      windowEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    const finishDrag = (e) => {
      if (!isDragging) return;

      if (dragFrame) {
        cancelAnimationFrame(dragFrame);
        applyDragFrame();
      }

      isDragging = false;
      windowEl.style.left = `${nextDragPosition.left}px`;
      windowEl.style.top = `${nextDragPosition.top}px`;
      windowEl.style.transform = '';
      windowEl.classList.remove('is-dragging');
      titlebar.style.cursor = 'grab';
      windowEl.dataset.originalLeft = nextDragPosition.left;
      windowEl.dataset.originalTop = nextDragPosition.top;

      if (e && titlebar.hasPointerCapture(e.pointerId)) {
        titlebar.releasePointerCapture(e.pointerId);
      }
    };

    titlebar.addEventListener('pointerdown', (e) => {
      if (e.target.classList.contains('traffic-light') || e.target.closest('.social-pill')) return;
      const activeWindow = this.windows.find(w => w.workspace === workspace);
      this.focusWindow(activeWindow);
      if (activeWindow?.maximized) return;

      const containerRect = this.windowContainer.getBoundingClientRect();
      const rect = windowEl.getBoundingClientRect();
      isDragging = true;
      dragStart.left = rect.left - containerRect.left;
      dragStart.top = rect.top - containerRect.top;
      dragStart.x = e.clientX - dragStart.left;
      dragStart.y = e.clientY - dragStart.top;
      nextDragPosition.left = dragStart.left;
      nextDragPosition.top = dragStart.top;

      windowEl.classList.add('is-dragging');
      titlebar.style.cursor = 'grabbing';
      titlebar.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    titlebar.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const bounds = this.windowContainer.getBoundingClientRect();
      const maxLeft = Math.max(0, bounds.width - windowEl.offsetWidth);
      const maxTop = Math.max(0, bounds.height - windowEl.offsetHeight);
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      nextDragPosition.left = Math.max(0, Math.min(newX, maxLeft));
      nextDragPosition.top = Math.max(0, Math.min(newY, maxTop));

      if (!dragFrame) {
        dragFrame = requestAnimationFrame(applyDragFrame);
      }
    });

    titlebar.addEventListener('pointerup', finishDrag);
    titlebar.addEventListener('pointercancel', finishDrag);
    
    // Close button
    closeBtn.addEventListener('click', () => {
      this.closeWindow(workspace);
    });
    
    // Minimize button (hide window)
    minimizeBtn.addEventListener('click', () => {
      windowEl.style.display = 'none';
    });
    
    // Maximize button
    maximizeBtn.addEventListener('click', () => {
      this.toggleMaximize(workspace);
    });
  }
  
  focusWindow(window) {
    if (!window) return;
    
    window.element.style.zIndex = ++this.highestZIndex;
    window.element.style.display = 'flex';
  }
  
  closeWindow(workspace) {
    const windowIndex = this.windows.findIndex(w => w.workspace === workspace);
    if (windowIndex === -1) return;
    
    const window = this.windows[windowIndex];
    window.element.remove();
    
    this.windows.splice(windowIndex, 1);
    this.windowQueue = this.windowQueue.filter(w => w.workspace !== workspace);
    
    // Remove active state from navigation items
    document.querySelectorAll(`[data-workspace="${workspace}"]`).forEach(el => {
      el.classList.remove('active');
    });
    
    // Also remove active state from parent triggers
    document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
      const hasActiveChild = trigger.closest('.nav-dropdown').querySelector(`[data-workspace="${workspace}"].active`);
      if (!hasActiveChild) {
        trigger.classList.remove('active');
      }
    });
  }
  
  closeOldestWindow() {
    if (this.windowQueue.length === 0) return;
    
    const oldestWindow = this.windowQueue.shift();
    
    // Remove the window without offset adjustment (since we're replacing it)
    const windowIndex = this.windows.findIndex(w => w.workspace === oldestWindow.workspace);
    if (windowIndex !== -1) {
      this.windows[windowIndex].element.remove();
      this.windows.splice(windowIndex, 1);
      
      // Remove active state from navigation items
      document.querySelectorAll(`[data-workspace="${oldestWindow.workspace}"]`).forEach(el => {
        el.classList.remove('active');
      });
    }
  }
  
  toggleMaximize(workspace) {
    const window = this.windows.find(w => w.workspace === workspace);
    if (!window) return;
    
    window.maximized = !window.maximized;
    
    if (window.maximized) {
      window.element.classList.add('maximized');
    } else {
      window.element.classList.remove('maximized');
      
      // Recalculate position and restore size
      const width = globalThis.innerWidth * 0.75;
      const height = globalThis.innerHeight * 0.75;
      const position = this.calculateNonOverlappingPosition(width, height);
      
      window.element.style.width = `${width}px`;
      window.element.style.height = `${height}px`;
      window.element.style.left = `${position.left}px`;
      window.element.style.top = `${position.top}px`;
      
      // Update stored original position
      window.element.dataset.originalLeft = position.left;
      window.element.dataset.originalTop = position.top;
    }
  }
  
  loadWindowContent(workspace, page, windowEl) {
    const contentContainer = windowEl.querySelector(`#window-content-${workspace}`);
    
    // Direct content rendering using existing content.js data
    if (window.siteContent) {
      this.renderWindowContent(workspace, contentContainer);
    } else {
      contentContainer.innerHTML = '<p style="padding: 20px;">Loading content...</p>';
      // Retry after content loads
      setTimeout(() => {
        if (window.siteContent) {
          this.renderWindowContent(workspace, contentContainer);
        }
      }, 100);
    }
  }
  
  renderWindowContent(workspace, container) {
    const content = window.siteContent;
    if (!content) return;
    
    // Clear loading state
    container.innerHTML = '';
    
    switch(workspace) {
      case 'home':
        this.renderHomeContent(container, content);
        break;
      case 'events':
        this.renderEventsContent(container, content);
        break;
      case 'projects':
        this.renderMembershipContent(container, content);
        break;
      case 'officers':
        this.renderOfficersContent(container, content);
        break;
      case 'past-events':
        this.renderPastEventsContent(container, content);
        break;
      case 'contact':
        this.renderContactContent(container, content);
        break;
    }
  }
  
  renderHomeContent(container, content) {
    // Create home content structure
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="inline-flex items-center rounded-full border border-ieee-300/20 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ieee-100">
            IEEE at San Francisco State University
          </p>
          <h1 class="mt-6 text-3xl font-black text-white leading-tight">
            Build circuits. Ship robots. Grow as an engineer.
          </h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            A clean, student-first chapter space for hardware, robotics, research, and career-building opportunities at SF State.
          </p>
        </section>

        <section id="about" class="grid gap-6 lg:grid-cols-2">
          <article class="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">About IEEE at SF State</p>
            <h2 class="mt-4 text-2xl font-bold text-white">
              A chapter built for hands-on learning, collaboration, and momentum.
            </h2>
            <p class="mt-4 text-sm leading-7 text-slate-300">${content.aboutCopy}</p>
          </article>

          <div class="grid gap-4">
            ${content.quickFacts.map(item => `
              <article class="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-ieee-200">${item.label}</p>
                <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
                <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
              </article>
            `).join('')}
          </div>
        </section>

        <section>
          <div class="rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-[#0a223a]/90 via-[#081627]/95 to-[#20132f]/90 p-6 shadow-panel">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ieee-200">Chapter snapshot</p>
            <h2 class="mt-3 text-2xl font-bold text-white">Simple metrics that are easy to update later.</h2>
            <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              ${content.chapterStats.map(item => `
                <article class="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-panel">
                  <p class="text-4xl font-black text-white">${item.value}${item.suffix}</p>
                  <p class="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">${item.label}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </section>

        <section id="pillars">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Focus areas</p>
          <h2 class="mt-3 text-2xl font-bold text-white">Technical lanes that reflect the chapter's identity.</h2>
          <div class="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            ${content.pillars.map((item, index) => `
              <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <p class="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                  index % 2 === 0 ? "bg-ieee-500/15 text-ieee-100" : "bg-sfsu-500/15 text-sfsu-100"
                }">
                  ${item.title}
                </p>
                <p class="mt-5 text-sm leading-7 text-slate-300">${item.description}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  ${item.details.map(detail => `
                    <span class="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-300">
                      ${detail}
                    </span>
                  `).join('')}
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section id="faq">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Quick FAQ</p>
          <h2 class="mt-3 text-2xl font-bold text-white">Helpful answers for new members.</h2>
          <div class="mt-6 grid gap-4">
            ${content.faqItems.map(item => `
              <details class="rounded-[1.5rem] border border-white/10 bg-slate-900/75 p-5 shadow-panel">
                <summary class="flex list-none cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-white">
                  <span>${item.question}</span>
                  <span class="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Open</span>
                </summary>
                <p class="mt-4 text-sm leading-7 text-slate-300">${item.answer}</p>
              </details>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }
  
  renderEventsContent(container, content) {
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ieee-200">Event Calendar</p>
          <h1 class="mt-4 text-3xl font-black text-white">
            Future meetings, build sessions, and partner org events.
          </h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            The homepage gives quick previews, while this page holds upcoming IEEE meetings and selected opportunities from
            Solar Regatta, ASME, Chomp City, and research groups.
          </p>
        </section>

        <section>
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Browse events</p>
              <h2 class="mt-3 text-2xl font-bold text-white">Filter by organization or focus area.</h2>
            </div>
            <div class="flex flex-wrap gap-3">
              ${content.eventFilters.map(filter => `
                <button class="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-ieee-300/40 hover:bg-ieee-500/10 hover:text-ieee-100">
                  ${filter}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="mt-8 grid gap-6 lg:grid-cols-2">
            ${content.upcomingEvents.map(event => `
              <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <div class="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <img src="${event.image}" alt="${event.alt}" class="h-52 w-full object-cover" loading="lazy" />
                </div>
                <div class="mt-6 flex items-center justify-between gap-3">
                  <span class="rounded-full bg-ieee-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ieee-100">${event.category}</span>
                  <span class="text-sm font-medium text-slate-400">${event.date}</span>
                </div>
                <h3 class="mt-4 text-xl font-bold text-white">${event.title}</h3>
                <p class="mt-3 text-sm leading-7 text-slate-300">${event.description}</p>
                <div class="mt-4 rounded-lg bg-slate-950/50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Details</p>
                  <p class="mt-2 text-sm text-slate-300">${event.details}</p>
                  <p class="mt-2 text-sm text-slate-400">${event.time} • ${event.location}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }
  
  renderMembershipContent(container, content) {
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Membership</p>
          <h1 class="mt-4 text-3xl font-black text-white">A clear place for students to get involved.</h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            This page keeps the chapter invite simple: why students should join, what they get, and what the next step looks like.
          </p>
        </section>

        <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          ${content.membershipBenefits.map((item, index) => `
            <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] ${
                index % 2 === 0 ? "text-ieee-200" : "text-sfsu-300"
              }">
                Benefit ${index + 1}
              </p>
              <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
            </article>
          `).join('')}
        </section>

        <section>
          <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <article class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ieee-200">How membership can work</p>
              <h2 class="mt-4 text-2xl font-bold text-white">Keep the options easy to understand.</h2>
              <div class="mt-6 space-y-5 text-base leading-8 text-slate-300">
                <p>
                  A local chapter membership section can explain the basics without overwhelming students who are seeing IEEE for the first time.
                </p>
                <p>
                  If you want, you can later split this into local chapter membership, national IEEE membership, and leadership opportunities.
                </p>
              </div>
            </article>

            <div class="grid gap-5">
              <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sfsu-300">Option 1</p>
                <h3 class="mt-3 text-xl font-bold text-white">Local chapter involvement</h3>
                <p class="mt-3 text-sm leading-7 text-slate-300">
                  Great for students who want the meetings, workshops, and community first. Use this section to explain low-friction entry.
                </p>
              </article>
              <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-ieee-200">Option 2</p>
                <h3 class="mt-3 text-xl font-bold text-white">IEEE national membership</h3>
                <p class="mt-3 text-sm leading-7 text-slate-300">
                  Add this when you want to explain national resources, competitions, discounts, publications, or conference access.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">How to join</p>
              <h2 class="mt-3 text-2xl font-bold text-white">A simple path from curious to involved.</h2>
            </div>
            <p class="max-w-2xl text-base leading-7 text-slate-300">
              These four cards are a helpful structure for a small chapter because they guide students without requiring a lot of extra copy.
            </p>
          </div>
          <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            ${content.joinSteps.map(item => `
              <article class="rounded-[1.8rem] border border-white/10 bg-slate-900/75 p-6 shadow-panel">
                <p class="text-sm font-black text-ieee-200">${item.step}</p>
                <h3 class="mt-3 text-xl font-bold text-white">${item.title}</h3>
                <p class="mt-3 text-sm leading-7 text-slate-300">${item.description}</p>
              </article>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }
  
  renderOfficersContent(container, content) {
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Officers 2026-2027</p>
          <h1 class="mt-4 text-3xl font-black text-white">A clean home for the leadership team.</h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            This page is intentionally card-based so it is easy to swap names, bios, roles, and photos every academic year.
          </p>
        </section>

        <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          ${content.officers.map(officer => `
            <article class="rounded-[1.9rem] border border-white/10 bg-slate-900/75 overflow-hidden shadow-panel">
              <div class="overflow-hidden border-b border-white/10">
                <img src="${officer.image}" alt="${officer.alt}" class="h-64 w-full object-cover" />
              </div>
              <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-ieee-200">${officer.role}</p>
                <h3 class="mt-3 text-xl font-bold text-white">${officer.name}</h3>
                <p class="mt-2 text-sm text-slate-400">${officer.major}</p>
                <p class="mt-4 text-sm leading-7 text-slate-300">${officer.focus}</p>
                <p class="mt-4 text-sm leading-7 text-slate-300">${officer.bio}</p>
                <a href="mailto:${officer.email}" class="mt-4 inline-flex items-center text-sm font-semibold text-ieee-200 transition hover:text-white">
                  ${officer.email}
                </a>
              </div>
            </article>
          `).join('')}
        </section>
      </div>
    `;
  }
  
  renderContactContent(container, content) {
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Contact & FAQ</p>
          <h1 class="mt-4 text-3xl font-black text-white">Get in touch with IEEE at SF State.</h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            Find answers to common questions or reach out directly to our team.
          </p>
        </section>

        <section class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Contact Information</p>
            <h2 class="mt-3 text-2xl font-bold text-white">Reach out to us</h2>
            <div class="mt-6 space-y-4 text-slate-300">
              <p>
                <strong class="text-white">Email:</strong><br>
                <a href="mailto:${content.site.email}" class="text-ieee-200 hover:text-white transition">${content.site.email}</a>
              </p>
              <p>
                <strong class="text-white">Location:</strong><br>
                ${content.site.location}
              </p>
              <p>
                <strong class="text-white">Meeting Time:</strong><br>
                ${content.site.meetingTime}
              </p>
            </div>
            
            <div class="mt-8">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Follow us</p>
              <div class="mt-4 flex flex-wrap gap-3">
                ${content.site.social.map(item => `
                  <a href="${item.href}" class="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white" target="_blank" rel="noopener">
                    ${item.label}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <div id="faq">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Quick FAQ</p>
            <h2 class="mt-3 text-2xl font-bold text-white">Helpful answers for new members.</h2>
            <div class="mt-6 grid gap-4">
              ${content.faqItems.map(item => `
                <details class="rounded-[1.5rem] border border-white/10 bg-slate-900/75 p-5 shadow-panel">
                  <summary class="flex list-none cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-white">
                    <span>${item.question}</span>
                    <span class="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Open</span>
                  </summary>
                  <p class="mt-4 text-sm leading-7 text-slate-300">${item.answer}</p>
                </details>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  }
  
  renderPastEventsContent(container, content) {
    container.innerHTML = `
      <div class="px-6 py-8 space-y-8">
        <section>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sfsu-300">Past Events</p>
          <h1 class="mt-4 text-3xl font-black text-white">Chapter history and archives.</h1>
          <p class="mt-4 text-base leading-7 text-slate-300">
            Explore past events, photos, and achievements from previous academic years.
          </p>
        </section>

        ${content.archiveYears.map(year => `
          <section id="${year.id}" class="space-y-6">
            <div class="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-panel">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ieee-200">${year.year}</p>
              <h2 class="mt-4 text-2xl font-bold text-white">${year.year} Archive</h2>
              <p class="mt-4 text-base leading-7 text-slate-300">${year.summary}</p>
              
              <div class="mt-6 space-y-4">
                ${year.events.map(event => `
                  <article class="rounded-xl border border-white/10 bg-slate-950/50 p-6">
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sfsu-300">${event.season}</p>
                    <h3 class="mt-2 text-xl font-bold text-white">${event.title}</h3>
                    <p class="mt-3 text-sm leading-7 text-slate-300">${event.description}</p>
                  </article>
                `).join('')}
              </div>
            </div>
          </section>
        `).join('')}
      </div>
    `;
  }
}

// Initialize desktop environment when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DesktopEnvironment();
});
