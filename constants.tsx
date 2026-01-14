
import React from 'react';
import { ComponentItem } from './types';

export const COMPONENT_ITEMS: ComponentItem[] = [
  {
    id: 'deep-focus',
    title: 'Deep Focus Timer',
    category: 'UI Component',
    views: 1204,
    copies: 45,
    description: 'Cyberpunk productivity timer with reactor core visuals and lockdown mode.',
    thumbnailClass: 'bg-slate-900',
    systemPrompt: "Design a productivity app interface using a dark mode, cyberpunk aesthetic with neon blue and magenta accents. The main screen features a large, glowing countdown timer that resembles a sci-fi reactor core; as the timer counts down, the core spins faster. Include a 'Lockdown Mode' toggle that visually slams digital shutters over non-essential apps, and a statistics page that visualizes focus time as a skyscraper being built in a futuristic city."
  },
  {
    id: 'flowstate',
    title: 'FlowState Kanban',
    category: 'UI Component',
    views: 892,
    copies: 32,
    description: 'Tablet-first glassmorphism project tool with fluid physics.',
    thumbnailClass: 'bg-teal-50',
    systemPrompt: "Create a tablet-first project management tool using Glassmorphism principles. The background should be a blurred, abstract gradient of calming teals and purples. Cards should appear as frosted glass panes with white text and subtle drop shadows to create depth. The user flow involves dragging cards between columns (To Do, In Progress, Done) with a fluid, water-like physics animation when a card is dropped."
  },
  {
    id: 'echo-voice',
    title: 'Echo Voice Memo',
    category: 'UI Component',
    views: 567,
    copies: 12,
    description: 'Minimalist Swiss Style recorder with topographic audio visualization.',
    thumbnailClass: 'bg-gray-50',
    systemPrompt: "Develop a minimalist, Swiss Style voice recorder app. The design should rely heavily on negative space, a stark black-and-white color palette, and bold Helvetica typography. The main feature is an audio visualizer that looks like a topographic map, changing shape based on the volume and pitch of the recording. Users can 'tag' specific moments in the audio by pinching the waveform, creating a visual anchor point."
  },
  {
    id: 'circadian',
    title: 'Circadian Calendar',
    category: 'UI Component',
    views: 2341,
    copies: 89,
    description: 'Neumorphic calendar that syncs UI color temperature with the sun.',
    thumbnailClass: 'bg-orange-50',
    systemPrompt: "Design a calendar app that syncs with the sun, utilizing a neumorphic (soft UI) design language. Buttons and cards should look like they are extruded from the background material (soft clay texture). The interface changes color temperature throughout the day—cool blues at dawn, bright whites at noon, and warm oranges at sunset—to reduce eye strain and align with the user's biological clock."
  },
  {
    id: 'writers-block',
    title: 'Writer\'s Block',
    category: 'UI Component',
    views: 1102,
    copies: 56,
    description: 'Retro 8-bit text editor where a monster eats words if you stop typing.',
    thumbnailClass: 'bg-green-50',
    systemPrompt: "Create a distraction-free writing app with a retro, 8-bit aesthetic. The interface should mimic an old DOS terminal with a blinking green cursor on a black background. The unique mechanic is 'The Monster': if the user stops typing for more than 10 seconds, a pixelated monster begins to creep from the side of the screen, eating the words; typing pushes the monster back."
  },
  {
    id: 'synapse',
    title: 'Synapse Mind Map',
    category: 'UI Component',
    views: 789,
    copies: 23,
    description: 'AR-compatible 3D mind mapping with futuristic medical aesthetic.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Design an AR-compatible mind mapping tool where nodes are 3D spheres floating in a void. The aesthetic should be futuristic and medical, using clean whites, sterile greys, and electric blue connecting lines. Users manipulate the nodes using hand gestures (pinch to group, swipe to disconnect). The background should be a subtle, moving neural network simulation."
  },
  {
    id: 'inbox-zero',
    title: 'Inbox Zero Game',
    category: 'UI Component',
    views: 3456,
    copies: 145,
    description: 'Gamified email client with juicy effects and RPG progression.',
    thumbnailClass: 'bg-pink-50',
    systemPrompt: "Create an email client that uses a candy-colored, 'juicy' game design. Swiping to archive an email triggers a confetti particle effect and a satisfying 'pop' sound. The inbox is visualized as a stack of colorful envelopes; as the user clears them, a background character (a friendly robot) levels up and gains new armor."
  },
  {
    id: 'teamsync',
    title: 'TeamSync Dashboard',
    category: 'UI Component',
    views: 923,
    copies: 28,
    description: 'High-density corporate bento box dashboard for enterprise teams.',
    thumbnailClass: 'bg-slate-200',
    systemPrompt: "Design a high-density data dashboard for enterprise teams using a 'bento box' grid layout. The style should be professional, flat, and information-dense, similar to a Bloomberg terminal but with modern UX. Use distinct widget blocks for 'Time Zone Overlap', 'Jira Ticket Status', and 'Server Health', utilizing a dark slate grey background with muted pastel data lines for readability."
  },
  {
    id: 'agenda-nlp',
    title: 'Agenda Smart List',
    category: 'UI Component',
    views: 1567,
    copies: 67,
    description: 'Chat-based task manager using NLP to parse dates and events.',
    thumbnailClass: 'bg-white border',
    systemPrompt: "Create a text-based task manager that uses Natural Language Processing (NLP). The UI should look like a simple chat interface (similar to iMessage or WhatsApp). When a user types 'Meeting with John tomorrow at 5', the app automatically parses this into a calendar event and highlights the key terms in bold, clickable bubbles. The design should be ultra-minimal, white background with black sans-serif text."
  },
  {
    id: 'vault',
    title: 'Vault Manager',
    category: 'UI Component',
    views: 888,
    copies: 34,
    description: 'Brutalist password manager with heavy mechanical animations.',
    thumbnailClass: 'bg-stone-200',
    systemPrompt: "Design a security-focused app with an industrial, brutalist aesthetic. Use raw concrete textures, heavy black borders, and monospaced typography. The 'Unlock' animation should resemble a heavy bank vault door rotating and opening. Passwords are hidden behind 'steel' panels that slide open with a heavy mechanical animation when tapped."
  },
  {
    id: 'zenith',
    title: 'Zenith Yoga',
    category: 'UI Component',
    views: 2100,
    copies: 90,
    description: 'Motion-capture yoga instructor with ethereal skeleton overlays.',
    thumbnailClass: 'bg-emerald-50',
    systemPrompt: "Design a yoga app that utilizes motion capture technology via the front camera. The UI should be airy and ethereal, using a palette of sage greens and creams. Overlaid on the user's camera feed is a 'skeleton' guide that glows red when alignment is wrong and turns gold when the pose is perfect."
  },
  {
    id: 'rogue-run',
    title: 'Rogue Run',
    category: 'UI Component',
    views: 4321,
    copies: 210,
    description: 'Zombie survival fitness tracker with distressed map interface.',
    thumbnailClass: 'bg-red-50',
    systemPrompt: "Create a fitness tracker that looks like a distressed, post-apocalyptic field guide. The map view should look like a crinkled, blood-stained paper map. The 'Start Run' button is a frantic 'Evacuate' switch. During the run, the audio interface pulses with a radar sweep animation showing 'zombies' closing in on the user's GPS location."
  },
  {
    id: 'hydro',
    title: 'Hydro Tracker',
    category: 'UI Component',
    views: 1234,
    copies: 45,
    description: 'Hydration app mimicking realistic water physics and tilt.',
    thumbnailClass: 'bg-cyan-50',
    systemPrompt: "Design a hydration app that mimics the physics of water. The main screen is a virtual glass that fills up as the user logs water intake. Use realistic fluid rendering—if the user tilts their phone, the water in the virtual glass tilts with it. The UI controls are translucent bubbles that float to the top of the screen."
  },
  {
    id: 'lucid',
    title: 'Lucid Dreams',
    category: 'UI Component',
    views: 777,
    copies: 33,
    description: 'Surrealist dream journal with AI-generated abstract art.',
    thumbnailClass: 'bg-purple-100',
    systemPrompt: "Create a dream logging app with a surrealist, collage-art aesthetic. The background should feature shifting clouds and floating objects (clocks, eyes, keys). Users can record voice notes which are transcribed into text that floats in 3D space. The 'Analyze' button uses AI to pull keywords and generates a unique abstract painting based on the dream's mood."
  },
  {
    id: 'ironclad',
    title: 'Ironclad Lifts',
    category: 'UI Component',
    views: 999,
    copies: 55,
    description: 'Grunge aesthetic weightlifting log with pyrotechnic PR effects.',
    thumbnailClass: 'bg-neutral-800 text-white',
    systemPrompt: "Design a workout logger with a heavy metal / grunge aesthetic. The font should be jagged and aggressive. Backgrounds should look like rusted metal or gym mat rubber. Completing a 'Personal Record' (PR) triggers a screen shake effect and pyrotechnic animations. The graphs for strength progress should look like lightning bolts."
  },
  {
    id: 'pulse',
    title: 'Pulse Monitor',
    category: 'UI Component',
    views: 654,
    copies: 22,
    description: 'Clinical grade heart monitor with clean vector EKG.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Create a medical-grade heart rate monitor app with a clean, clinical UI using pure whites and 'hospital blue' accents. The central element is a real-time EKG line graph that scrolls smoothly. The design needs to emphasize trust and precision, using thin vector lines and large, legible numbers for BPM (Beats Per Minute)."
  },
  {
    id: 'nurture',
    title: 'Nurture Tracker',
    category: 'UI Component',
    views: 1120,
    copies: 60,
    description: 'Earthy, watercolor pregnancy tracker with veggie comparisons.',
    thumbnailClass: 'bg-orange-50',
    systemPrompt: "Design a pregnancy app that moves away from the typical pastel pinks, opting for a modern, gender-neutral 'earthy' palette (terracotta, olive, beige). The baby's size comparison should be illustrated with beautiful watercolor paintings of fruits and vegetables. The interface uses soft, rounded card corners and gentle fade-in animations."
  },
  {
    id: 'focus-food',
    title: 'Focus Food',
    category: 'UI Component',
    views: 876,
    copies: 40,
    description: 'Tetris-style meal planner using macronutrient blocks.',
    thumbnailClass: 'bg-yellow-50',
    systemPrompt: "Create a nutrition app based on macronutrient blocks. The interface should look like a game of Tetris; users drag and drop food items (represented as colored blocks) into a 'Daily Jar'. If the user eats too much fat, the red blocks overflow the jar. The style is flat, vector-based, and highly colorful."
  },
  {
    id: 'breathe',
    title: 'Breathe Aid',
    category: 'UI Component',
    views: 1543,
    copies: 88,
    description: 'Dark mode anxiety relief app with pulsing breathing guides.',
    thumbnailClass: 'bg-gray-900',
    systemPrompt: "Design an emergency anxiety relief app with a 'Dark Mode only' interface to reduce sensory overload. The screen features a single, slowly pulsing circle that expands and contracts to guide breathing. The instruction text ('Inhale', 'Hold', 'Exhale') should be centered in a calming, serif font. There are no menus, just the breathing exercise immediately upon launch."
  },
  {
    id: 'stride',
    title: 'Stride Conquest',
    category: 'UI Component',
    views: 2200,
    copies: 110,
    description: 'Social walking app visualising steps as territory conquest.',
    thumbnailClass: 'bg-lime-50',
    systemPrompt: "Design a social walking app that visualizes steps as territory conquest on a map. The map style should be geometric and low-poly. As a user walks through a neighborhood, the map hexes turn their team's color (e.g., Neon Green vs. Hot Pink). The UI overlays are transparent dark glass with bright, competitive leaderboards."
  },
  {
    id: 'ledger',
    title: 'Ledger Crypto',
    category: 'UI Component',
    views: 1890,
    copies: 75,
    description: 'Holographic sci-fi crypto wallet with particle effects.',
    thumbnailClass: 'bg-black text-green-400',
    systemPrompt: "Design a cryptocurrency portfolio app with a holographic, sci-fi HUD interface. Data points should float in layers. The background is deep space black; positive gains are shown in glowing cyber-green, and losses in laser-red. The 'Send' transaction animation depicts a digital coin disintegrating into data streams and shooting off-screen."
  },
  {
    id: 'stash',
    title: 'Stash Investing',
    category: 'UI Component',
    views: 900,
    copies: 45,
    description: 'Gen Z micro-investing with Memphis design and piggy banks.',
    thumbnailClass: 'bg-yellow-200',
    systemPrompt: "Create a savings app targeted at Gen Z, using a 'Memphis Design' aesthetic (bold patterns, squiggly lines, contrasting colors like yellow and purple). The 'Round Up' feature is visualized as a piggy bank that gets physically larger on screen as it fills with coins. The typography is chunky and playful."
  },
  {
    id: 'canvas',
    title: 'Canvas Trading',
    category: 'UI Component',
    views: 670,
    copies: 25,
    description: 'Artistic stock analysis for iPad with pencil support.',
    thumbnailClass: 'bg-stone-100',
    systemPrompt: "Design a trading platform for iPad that treats charts as art. The background is a dark canvas texture. Candlestick charts are rendered with glow effects and smooth gradients. Users can use an Apple Pencil to draw support/resistance lines, which snap to the grid automatically. The feel is sophisticated and high-end."
  },
  {
    id: 'splitit',
    title: 'SplitIt Expenses',
    category: 'UI Component',
    views: 1450,
    copies: 60,
    description: 'Roommate expense tracker visualizing debts as tangled lines.',
    thumbnailClass: 'bg-indigo-50',
    systemPrompt: "Create a roommate expense tracker with a card-based material design. Each expense is a 'receipt' card. Users can drag a profile picture onto a receipt to 'claim' their portion. The 'Settle Up' screen visualizes debts as a web of connecting lines that untangle as payments are made."
  },
  {
    id: 'vision-ar',
    title: 'Vision Estate',
    category: 'UI Component',
    views: 890,
    copies: 35,
    description: 'AR real estate finder using floating roof tags.',
    thumbnailClass: 'bg-blue-100',
    systemPrompt: "Design a property finder app that works primarily through the camera. As the user points the phone at a house, a floating UI tag appears above the roof, displaying price, bedrooms, and square footage. The design style is minimal and semi-transparent so as not to obstruct the view of the house."
  },
  {
    id: 'bloom',
    title: 'Bloom Budget',
    category: 'UI Component',
    views: 1320,
    copies: 70,
    description: 'Pixel art budget garden where savings bloom flowers.',
    thumbnailClass: 'bg-green-100',
    systemPrompt: "Design a personal finance app where spending habits affect a virtual garden. The style is isometric pixel art. Saving money causes pixelated flowers to bloom; overspending causes weeds to appear. The 'Transactions' list is a scroll underneath the garden soil, visualized as roots."
  },
  {
    id: 'freelance-os',
    title: 'FreelanceOS',
    category: 'UI Component',
    views: 760,
    copies: 30,
    description: 'Modular widget dashboard for gig workers with panic button.',
    thumbnailClass: 'bg-slate-100',
    systemPrompt: "Create a dashboard for freelancers using a modular, widget-based interface. The user can resize widgets for 'Invoices Due', 'Active Timers', and 'Tax Estimates'. The color scheme is professional navy and gold. Include a 'Panic Button' feature that instantly generates a polite but firm 'Overdue Payment' email template."
  },
  {
    id: 'minted',
    title: 'Minted Gallery',
    category: 'UI Component',
    views: 540,
    copies: 15,
    description: 'Virtual museum for NFTs with ray-traced lighting.',
    thumbnailClass: 'bg-gray-100',
    systemPrompt: "Design a gallery app for digital collectibles that looks like a high-end virtual museum. The walls are white marble; frames are gold. Users navigate by swiping through 3D rooms. The lighting is ray-traced and realistic, casting shadows from the frames onto the floor."
  },
  {
    id: 'terminal',
    title: 'Terminal Trader',
    category: 'UI Component',
    views: 980,
    copies: 42,
    description: 'High-frequency monochrome trading UI prioritizing speed.',
    thumbnailClass: 'bg-black text-white',
    systemPrompt: "Design a mobile interface for high-frequency traders that prioritizes speed. The aesthetic is high-contrast monochrome (black background, white text) with no animations to ensure zero lag. Buttons are massive and placed at the bottom for thumb reach. The 'Buy' and 'Sell' buttons cover the bottom 20% of the screen for error-free tapping."
  },
  {
    id: 'legacy',
    title: 'Legacy Will',
    category: 'UI Component',
    views: 430,
    copies: 10,
    description: 'Solemn estate planning app with paper textures and wax seals.',
    thumbnailClass: 'bg-amber-50',
    systemPrompt: "Create an app for estate planning with a solemn, elegant, and paper-textured design. The background looks like heavy cream cardstock. Typography resembles a classic typewriter or serif book font. Steps are presented as chapters in a book. Security features (FaceID) are presented with a wax seal animation."
  },
  {
    id: 'mask',
    title: 'Mask Chat',
    category: 'UI Component',
    views: 1670,
    copies: 80,
    description: 'Anonymous chat where masks fade to reveal faces over time.',
    thumbnailClass: 'bg-purple-900 text-white',
    systemPrompt: "Design a social app where avatars are generative 3D masks. The UI is dark and mysterious, using deep purples and shadows. As users chat more, the masks slowly become transparent, revealing the user's real profile photo—a metaphor for building trust. Messages disappear in a puff of digital smoke after 24 hours."
  },
  {
    id: 'orbit',
    title: 'Orbit Networking',
    category: 'UI Component',
    views: 890,
    copies: 40,
    description: 'Conference networking visualizing people as solar systems.',
    thumbnailClass: 'bg-slate-900',
    systemPrompt: "Create a conference networking app that visualizes people as dots in a solar system. The user is the sun; other users orbit based on physical distance (Bluetooth signal). Tapping a 'planet' opens their LinkedIn profile. The aesthetic is minimalist space, with thin orbital lines and small, solid circles."
  },
  {
    id: 'hearth',
    title: 'Hearth Family',
    category: 'UI Component',
    views: 650,
    copies: 28,
    description: 'Skeuomorphic scrapbook for private family sharing.',
    thumbnailClass: 'bg-orange-100',
    systemPrompt: "Design a scrapbook-style app for families. The UI looks like a corkboard. Photos are 'pinned' with tape (visual texture). Comments look like sticky notes. The navigation bar resembles a wooden shelf containing physical photo albums (organized by year). The vibe is warm, nostalgic, and skeuomorphic."
  },
  {
    id: 'duet',
    title: 'Duet Dating',
    category: 'UI Component',
    views: 1980,
    copies: 95,
    description: 'Music-based dating app with vinyl record matching.',
    thumbnailClass: 'bg-fuchsia-100',
    systemPrompt: "Create a dating app where matches are based on Spotify history. The profile view is a vinyl record sleeve. Users flip the sleeve to see the bio. The 'Match' animation involves two vinyl records merging to mix a song. The color palette uses vibrant, neon 'nightclub' colors (cyan, magenta, electric blue)."
  },
  {
    id: 'vibecheck',
    title: 'VibeCheck',
    category: 'UI Component',
    views: 2450,
    copies: 120,
    description: 'Nightlife heatmap showing real-time bar activity.',
    thumbnailClass: 'bg-indigo-900',
    systemPrompt: "Design a nightlife discovery app that uses heatmaps. The map of the city is dark; popular bars glow red/orange based on real-time activity. The UI is translucent and floats over the map. Filters for 'Live Music', 'Chill', or 'Dancing' change the color of the heat blobs."
  },
  {
    id: 'lobby',
    title: 'Lobby LFG',
    category: 'UI Component',
    views: 1100,
    copies: 50,
    description: 'Tactical sci-fi LFG tool for gamers.',
    thumbnailClass: 'bg-emerald-900',
    systemPrompt: "Create a 'Looking For Group' app for gamers with a tactical, military sci-fi UI. Profiles look like 'operator dossiers' with stats bars for K/D ratio and win rate. The background features a subtle hexagonal mesh pattern. Voice chat integration is visualized as a green waveform in the header."
  },
  {
    id: 'debate',
    title: 'Debate Club',
    category: 'UI Component',
    views: 560,
    copies: 20,
    description: 'Structured discourse app with split-screen mechanics.',
    thumbnailClass: 'bg-gray-100',
    systemPrompt: "Design a discussion app that forces structure. The screen is split horizontally: Red side vs. Blue side. The middle is a 'Bridge' where agreed-upon facts are listed. The design is strictly symmetrical. Users have a timed turn to speak/type, visualized by a shrinking bar in their color."
  },
  {
    id: 'sprout',
    title: 'Sprout Volunteer',
    category: 'UI Component',
    views: 780,
    copies: 35,
    description: 'Volunteer matching where matches grow virtual plants.',
    thumbnailClass: 'bg-green-50',
    systemPrompt: "Create an app connecting volunteers to charities using a warm, illustration-heavy style. The icons are hand-drawn sketches. The 'match' mechanic involves planting a seed (the volunteer) in a pot (the charity), which then plays an animation of a sprout growing. Colors are earthy greens and soil browns."
  },
  {
    id: 'slow',
    title: 'Slow Pen Pal',
    category: 'UI Component',
    views: 920,
    copies: 42,
    description: 'Messaging app where delivery time mimics real distance.',
    thumbnailClass: 'bg-amber-50',
    systemPrompt: "Design a messaging app where messages take time to travel based on real-world distance. The interface resembles an airmail envelope. A map shows the 'letter' (a small plane icon) traveling across the ocean. The UI is vintage, using stamps and postmarks as design elements."
  },
  {
    id: 'recall',
    title: 'Recall Alumni',
    category: 'UI Component',
    views: 450,
    copies: 15,
    description: 'Yearbook-style alumni network with polaroid grid.',
    thumbnailClass: 'bg-blue-100',
    systemPrompt: "Create a yearbook-style app for universities. The main feed looks like a digital grid of polaroids. Tapping a photo flips it over to read the update. The filter menu is a 'Rolodex' animation. The design uses the university's specific colors but with a washed-out, retro filter applied to images."
  },
  {
    id: 'remix',
    title: 'Remix AI DJ',
    category: 'UI Component',
    views: 1560,
    copies: 72,
    description: 'Music player looking like a mixing deck with AI fader.',
    thumbnailClass: 'bg-gray-800',
    systemPrompt: "Design a music player interface that looks like a professional mixing deck. Two turntables dominate the screen. The user can drag songs onto the decks. Between them is an 'AI Fader' that glows AI-purple; when active, it automatically beat-matches the transition. The buttons have realistic metallic textures and shadows."
  },
  {
    id: 'flick',
    title: 'Flick Movies',
    category: 'UI Component',
    views: 2890,
    copies: 130,
    description: 'Tinder-style movie picker with cinema ticket visuals.',
    thumbnailClass: 'bg-red-100',
    systemPrompt: "Create a tinder-style movie recommendation app. The cards are high-resolution movie posters. Swiping right adds to the 'Watchlist'. The background is a blurred, darkened version of the current poster to maintain focus. The 'Match' screen looks like a vintage cinema ticket stub tearing off."
  },
  {
    id: 'palette',
    title: 'Palette Cam',
    category: 'UI Component',
    views: 1120,
    copies: 58,
    description: 'AR color picker extracting hex codes from the real world.',
    thumbnailClass: 'bg-white border-2',
    systemPrompt: "Design a tool for designers that extracts colors from the real world. The camera view covers the whole screen. When the user taps an object, a floating color bubble pops out with the Hex code. The bottom drawer collects these bubbles into a palette. The UI is minimal, letting the camera feed provide the color."
  },
  {
    id: 'immerse',
    title: 'Immerse Reader',
    category: 'UI Component',
    views: 890,
    copies: 40,
    description: 'E-book reader with ambient weather animations.',
    thumbnailClass: 'bg-slate-100',
    systemPrompt: "Design a reading app that uses ambient animations. If the book describes a rainy night, rain droplets gently slide down the screen (overlay) and the text background turns dark grey. If it's a sunny meadow, the page is warm cream with subtle lens flares. The typography is elegant Serif."
  },
  {
    id: 'pixelate',
    title: 'Pixelate Cam',
    category: 'UI Component',
    views: 1450,
    copies: 65,
    description: 'Gameboy Camera style 4-color dithered photography app.',
    thumbnailClass: 'bg-green-200',
    systemPrompt: "Create a camera app that turns the viewfinder into a Gameboy Camera style 4-color dithered image. The controls look like thick plastic buttons from the 90s. Users can swap 'cartridges' (filters) by dragging them into a slot at the bottom of the screen."
  },
  {
    id: 'spoiler',
    title: 'Spoiler Shield',
    category: 'UI Component',
    views: 670,
    copies: 22,
    description: 'TV tracker with redacted text classified document style.',
    thumbnailClass: 'bg-yellow-100',
    systemPrompt: "Design an app to track TV shows with a 'Redacted' classified document aesthetic. Titles of episodes that haven't been watched yet are covered by black bars; tapping them reveals the text with a 'declassifying' animation. The background looks like a manila folder."
  },
  {
    id: 'sculpt',
    title: 'Sculpt Companion',
    category: 'UI Component',
    views: 340,
    copies: 12,
    description: 'Mobile palette interface for VR modeling.',
    thumbnailClass: 'bg-gray-50',
    systemPrompt: "Design a mobile interface that acts as a palette for a VR headset. The mobile screen shows a grid of 3D materials (wood, metal, plastic). The user taps a material on the phone to 'load' it into their virtual hand. The buttons are large and high-contrast for quick glances."
  },
  {
    id: 'laugh',
    title: 'Laugh Meme',
    category: 'UI Component',
    views: 2100,
    copies: 98,
    description: 'Chaotic meme maker with deep fry button.',
    thumbnailClass: 'bg-pink-200',
    systemPrompt: "Create a meme generator with a chaotic, collage UI. The sticker library is a horizontal scroll of trending viral images. The text editor allows for 'impact font' with adjustable outlines. The 'Deep Fry' button is a literal fryer icon that increases saturation and noise the longer you hold it."
  },
  {
    id: 'verse',
    title: 'Verse Magnet',
    category: 'UI Component',
    views: 560,
    copies: 25,
    description: 'Magnetic poetry simulator with refrigerator physics.',
    thumbnailClass: 'bg-gray-200',
    systemPrompt: "Design an app that mimics magnetic poetry on a fridge. The background is a subtle, white textured refrigerator door. Words are small white rectangles with black text. Users drag and drop them. Physics are enabled—throwing a word makes it slide and rotate slightly before sticking."
  },
  {
    id: 'gig',
    title: 'Gig AR',
    category: 'UI Component',
    views: 1200,
    copies: 50,
    description: 'Concert companion with AR fireworks and flash sync.',
    thumbnailClass: 'bg-indigo-900 text-white',
    systemPrompt: "Create an app for use at concerts. When the user holds the phone up, the stage is enhanced with AR fireworks and lyrics floating in the air. The UI is minimal (shutter button only) to maximize the view. A 'Sync' button flashes the phone flashlight in time with the music and other users."
  },
  {
    id: 'cosmos',
    title: 'Cosmos Gazer',
    category: 'UI Component',
    views: 2300,
    copies: 110,
    description: 'AR star map with velvety blue interface and gold lines.',
    thumbnailClass: 'bg-blue-950 text-white',
    systemPrompt: "Design an astronomy app with a deep, velvety blue interface. The main view is an AR sky map. Constellations are drawn with thin, glowing gold lines. Tapping a star opens a 'Data Card' that looks like a futuristic glass pane with details on mass, distance, and age. The font is a thin, geometric sans-serif."
  },
  {
    id: 'lingo',
    title: 'Lingo Slang',
    category: 'UI Component',
    views: 1450,
    copies: 67,
    description: 'Street-art slang dictionary with graffiti aesthetic.',
    thumbnailClass: 'bg-stone-300',
    systemPrompt: "Create a language app focused on idioms, using a street-art / graffiti aesthetic. The background is a brick wall. New words are 'spray painted' onto the wall. The 'Quiz' mode looks like a subway map where you navigate stops by answering correctly."
  },
  {
    id: 'reaction',
    title: 'Reaction Lab',
    category: 'UI Component',
    views: 890,
    copies: 33,
    description: 'Virtual chemistry lab with skeuomorphic beakers.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Design a tablet app that acts as a virtual lab bench. The UI is skeuomorphic and clean. Beakers, test tubes, and burners are arranged on a shelf. Users drag chemicals (colored liquids) into beakers. If the mixture is volatile, the screen shakes and creates a cartoon explosion effect."
  },
  {
    id: 'timeline',
    title: 'Timeline AR',
    category: 'UI Component',
    views: 1100,
    copies: 48,
    description: 'Historical AR overlay with steampunk dial controls.',
    thumbnailClass: 'bg-amber-100',
    systemPrompt: "Create an app that overlays historical scenes on the current street view. The interface controls look like a steampunk time machine dial (brass and copper textures). Spinning the dial scrolls the year back (2024 -> 1920 -> 1850). The view transitions from color to sepia to black-and-white."
  },
  {
    id: 'coder',
    title: 'Coder Kids',
    category: 'UI Component',
    views: 950,
    copies: 40,
    description: 'Robotics-themed coding game for kids.',
    thumbnailClass: 'bg-indigo-100',
    systemPrompt: "Design a coding app for kids using a robotics theme. The coding blocks look like physical batteries and gears. The user drags them into a sequence to power a 3D robot. The 'Run' button is a big green power switch. Success is celebrated with the robot doing a dance."
  },
  {
    id: 'luthier',
    title: 'Luthier Guitar',
    category: 'UI Component',
    views: 1670,
    copies: 85,
    description: 'Guitar learning app visualizing sound as falling notes.',
    thumbnailClass: 'bg-orange-200',
    systemPrompt: "Create a music learning app that visualizes sound. The fretboard is displayed at the bottom. As the song plays, colored notes cascade down (Guitar Hero style) towards the strings. The aesthetic is warm wood textures (acoustic guitar body) with bright, glowing strings."
  },
  {
    id: 'atlas',
    title: 'Atlas Anatomy',
    category: 'UI Component',
    views: 1200,
    copies: 55,
    description: '3D medical atlas with peeling layers interface.',
    thumbnailClass: 'bg-red-50',
    systemPrompt: "Design a 3D medical atlas. The user interface allows 'peeling' layers of the body using a slider on the side. The slider goes from Skin -> Muscle -> Bone -> Organs. The rendering is hyper-realistic. Labels are white lines that float in 3D space, anchored to the body parts."
  },
  {
    id: 'debunk',
    title: 'Debunk Fallacy',
    category: 'UI Component',
    views: 560,
    copies: 20,
    description: 'Educational app using detective noir aesthetic.',
    thumbnailClass: 'bg-gray-800 text-white',
    systemPrompt: "Create an educational app that uses a detective noir aesthetic. Each logical fallacy is a 'suspect' card (e.g., 'The Strawman'). The user plays through scenarios (conversations) and has to 'flag' the fallacy by dragging the correct suspect card onto the dialogue bubble."
  },
  {
    id: 'scribe',
    title: 'Scribe Calligraphy',
    category: 'UI Component',
    views: 890,
    copies: 42,
    description: 'Tablet calligraphy trainer with realistic ink bleed.',
    thumbnailClass: 'bg-stone-50',
    systemPrompt: "Design a tablet app for Apple Pencil. The background mimics distinct paper types (parchment, rice paper). The UI is minimal; tools (brushes, nibs) are located in a wooden tray at the bottom. The ink engine simulates bleed and wetness—the ink looks shiny when first applied and dries matte over time."
  },
  {
    id: 'quantum',
    title: 'Quantum Box',
    category: 'UI Component',
    views: 1400,
    copies: 70,
    description: 'Physics sandbox with particle streams and gravity wells.',
    thumbnailClass: 'bg-black text-white',
    systemPrompt: "Create a simulation app with a minimalist, particle-based design. Users can place 'gravity wells' or 'black holes' (black circles) on a white canvas and shoot streams of particles to see how they bend. The UI controls are translucent sliders for 'Mass' and 'Velocity'."
  },
  {
    id: 'nomad',
    title: 'Nomad Life',
    category: 'UI Component',
    views: 1100,
    copies: 50,
    description: 'Rustic map app for campers with night mode.',
    thumbnailClass: 'bg-green-900 text-white',
    systemPrompt: "Design a map app for campers featuring a rustic, outdoorsy aesthetic. Icons are small pine trees, campfires, and waves. The 'Signal Strength' overlay shows cellular coverage as a topographic heat map. The 'Night Mode' turns the map deep red to preserve night vision for stargazing."
  },
  {
    id: 'jetset',
    title: 'JetSet Lounge',
    category: 'UI Component',
    views: 670,
    copies: 30,
    description: 'Luxury travel app with black and gold gradients.',
    thumbnailClass: 'bg-black border border-yellow-600',
    systemPrompt: "Create a luxury travel app using black and gold gradients. The font is a high-contrast serif (like Vogue). The membership card is a digital card that rotates with the phone's gyroscope, displaying a metallic sheen. Animations are slow, smooth, and expensive-feeling."
  },
  {
    id: 'souvenir',
    title: 'Souvenir Passport',
    category: 'UI Component',
    views: 980,
    copies: 45,
    description: 'Digital travel journal looking like a worn field guide.',
    thumbnailClass: 'bg-amber-100',
    systemPrompt: "Design a travel log that looks like a worn leather field journal. Each country visited gets a unique, artistic stamp on the page. Photos are taped in. The 'Stats' page looks like a flight board with flipping characters showing total miles traveled."
  },
  {
    id: 'local',
    title: 'Local Gems',
    category: 'UI Component',
    views: 1340,
    copies: 65,
    description: 'City guide using a compass instead of a map.',
    thumbnailClass: 'bg-white',
    systemPrompt: "Create a city guide that removes the map. Instead, it uses a compass interface. The user select 'Coffee' and the arrow points to the best-rated hidden cafe, displaying only distance. The background is a blurred live camera feed. The goal is to encourage exploration, not route following."
  },
  {
    id: 'turbulence',
    title: 'Turbulence Aid',
    category: 'UI Component',
    views: 560,
    copies: 25,
    description: 'Flight soother with haptic cancellation.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Design an app for nervous flyers. The interface is extremely simple, using soft, pastel bubbles. When turbulence hits, the user places their thumb on the screen. The phone vibrates in a counter-pattern to the plane's movement (haptic cancellation) while playing white noise."
  },
  {
    id: 'packit',
    title: 'PackIt AR',
    category: 'UI Component',
    views: 890,
    copies: 38,
    description: 'AR suitcase scanner using 3D Tetris blocks.',
    thumbnailClass: 'bg-indigo-50',
    systemPrompt: "Create a utility app where the user scans their suitcase with the camera. The app overlays 3D Tetris blocks representing their clothes to show the most efficient way to pack. The UI is wireframe neon, making it look like a futuristic scanner."
  },
  {
    id: 'transit',
    title: 'Transit Timer',
    category: 'UI Component',
    views: 1560,
    copies: 80,
    description: 'Subway app with Swiss transport design aesthetics.',
    thumbnailClass: 'bg-red-600 text-white',
    systemPrompt: "Design a subway app with a Swiss transport map aesthetic (thick colored lines, 45-degree angles). The 'Next Train' countdown is massive, taking up 50% of the screen. The background color matches the color of the subway line currently selected (e.g., Red Line = Red background)."
  },
  {
    id: 'exchange',
    title: 'Exchange AR',
    category: 'UI Component',
    views: 1100,
    copies: 55,
    description: 'Camera app converting price tags via OCR.',
    thumbnailClass: 'bg-green-50',
    systemPrompt: "Create a camera app that instantly converts price tags. The user points the camera at a menu; the app uses OCR to replace the printed prices with the user's home currency in the same font and perspective as the original menu. The UI is invisible until the screen is tapped."
  },
  {
    id: 'tides',
    title: 'Tides Forecast',
    category: 'UI Component',
    views: 780,
    copies: 35,
    description: 'Surf forecast with circular liquid tide clock.',
    thumbnailClass: 'bg-cyan-100',
    systemPrompt: "Design a weather app for surfers using a circular tide clock. The water level in the circle rises and falls with the real tide. Wind direction is shown as a flowing particle stream across the screen. The color palette is ocean blues, teals, and foam whites."
  },
  {
    id: 'concierge',
    title: 'Concierge Key',
    category: 'UI Component',
    views: 450,
    copies: 18,
    description: 'Hotel room controller with sleek dark UI.',
    thumbnailClass: 'bg-neutral-900 text-white',
    systemPrompt: "Create a hotel app that acts as a room key and controller. The interface is dark and sleek. A large central button unlocks the door via NFC. Sliders below control the room's smart lighting and thermostat. The background is a high-res image of the hotel lobby."
  },
  {
    id: 'kicks',
    title: 'Kicks Drop',
    category: 'UI Component',
    views: 2100,
    copies: 110,
    description: 'Streetwear shopping app with Hypebeast aesthetic.',
    thumbnailClass: 'bg-red-600 text-white',
    systemPrompt: "Design a streetwear shopping app with a 'Hypebeast' aesthetic (bold red box logos, graffiti font, stark white backgrounds). The 'Drop' countdown is a ticking bomb animation. The 'Buy' button requires a 'slide to unlock' gesture to prevent bots."
  },
  {
    id: 'fits',
    title: 'Fits Wardrobe',
    category: 'UI Component',
    views: 1450,
    copies: 70,
    description: 'Closet organizer with slot machine outfit generator.',
    thumbnailClass: 'bg-pink-50',
    systemPrompt: "Create a closet organizer app. The user uploads photos of their clothes, which are automatically background-removed. The main screen is a slot machine mechanic: the user pulls a lever, and the app mixes and matches a top, bottom, and shoes to suggest an outfit."
  },
  {
    id: 'thrift',
    title: 'Thrift Vintage',
    category: 'UI Component',
    views: 1200,
    copies: 58,
    description: 'Vintage marketplace with Windows 95 aesthetic.',
    thumbnailClass: 'bg-gray-200 border-2 border-gray-400',
    systemPrompt: "Design a marketplace with a retro 90s web aesthetic. Use classic Windows 95 windows, grey bevels, and pixelated icons. The 'Search' bar looks like an old browser address bar. Despite the retro look, the UX is modern and fluid."
  },
  {
    id: 'shade',
    title: 'Shade Match',
    category: 'UI Component',
    views: 980,
    copies: 45,
    description: 'Makeup color matcher with AR bottle overlay.',
    thumbnailClass: 'bg-rose-50',
    systemPrompt: "Create a beauty app using true-to-life color calibration. The UI is surrounded by a neutral grey border to prevent color contamination. The camera feed has a 'white balance' card overlay. When a user finds a foundation match, the bottle appears in AR on their vanity table."
  },
  {
    id: 'drop',
    title: 'Drop Buying',
    category: 'UI Component',
    views: 870,
    copies: 40,
    description: 'Group buying app where prices lower dynamically.',
    thumbnailClass: 'bg-purple-50',
    systemPrompt: "Design a shopping app focused on bulk discounts. The product sits in the middle. A progress bar wraps around it. As more users join the 'Drop', the price lowers dynamically. The UI uses gamified elements like progress bars and 'unlocked' price tiers with lock icons bursting open."
  },
  {
    id: 'lens',
    title: 'Lens Try-On',
    category: 'UI Component',
    views: 1100,
    copies: 52,
    description: 'Eyewear app with realistic reflection rendering.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Create an eyewear app. The bottom half of the screen is a carousel of glasses frames. The top half is the selfie camera. The lighting engine is key—reflections of the phone screen should appear in the virtual glasses lenses to sell the realism."
  },
  {
    id: 'sole',
    title: 'Sole Custom',
    category: 'UI Component',
    views: 1340,
    copies: 65,
    description: '3D shoe configurator with morphing animations.',
    thumbnailClass: 'bg-orange-50',
    systemPrompt: "Design a 3D shoe configurator. The shoe is center screen, rotatable. A color wheel and material selector (leather, suede, mesh) sit on the right. Changes apply instantly with a morphing animation. The 'Order' button shows a manufacturing timeline."
  },
  {
    id: 'bounty',
    title: 'Bounty Hunter',
    category: 'UI Component',
    views: 670,
    copies: 28,
    description: 'Coupon app with western wanted poster theme.',
    thumbnailClass: 'bg-amber-100',
    systemPrompt: "Create a coupon app with a 'Wanted Poster' theme. Products are pinned to a wooden board. The discount amount is stamped in red ink. When a user redeems a code, a western whistle sound plays and the poster is torn in half."
  },
  {
    id: 'unbox',
    title: 'Unbox Mystery',
    category: 'UI Component',
    views: 1560,
    copies: 82,
    description: 'Blind box shopping where you shake to open.',
    thumbnailClass: 'bg-fuchsia-50',
    systemPrompt: "Design a shopping app for blind boxes. The user buys a digital box. To open it, they must physically shake their phone. The box on screen rattles (haptic feedback matches the rattle). Then, the lid flies off with a burst of light to reveal the item."
  },
  {
    id: 'cart',
    title: 'Cart Sorter',
    category: 'UI Component',
    views: 980,
    copies: 45,
    description: 'Grocery list that auto-sorts into paper bags.',
    thumbnailClass: 'bg-green-50',
    systemPrompt: "Create a grocery list app that sorts itself. As the user adds items ('Milk', 'Bread', 'Shampoo'), the items fly into categorized buckets (Dairy, Bakery, Personal Care). The buckets are visualized as paper grocery bags. The design is clean, colorful, and flat."
  },
  {
    id: 'spectrum',
    title: 'Spectrum',
    category: 'UI Component',
    views: 560,
    copies: 25,
    description: 'Audio engineering tool with rotary knobs.',
    thumbnailClass: 'bg-black text-purple-400',
    systemPrompt: "Design an audio engineering tool. The background is matte black. The frequency spectrum is a rainbow-colored histogram reacting in real-time. The UI uses rotary knobs (skeuomorphic) for gain and zoom, allowing the user to turn them with a circular thumb motion."
  },
  {
    id: 'measure',
    title: 'Measure AR',
    category: 'UI Component',
    views: 1200,
    copies: 60,
    description: 'Utility app placing virtual yellow measuring tapes.',
    thumbnailClass: 'bg-yellow-50',
    systemPrompt: "Create a utility app that places virtual measuring tapes in the real world. The line style is dotted bright yellow (construction aesthetic). Points are anchored with white 'pins'. A magnification bubble appears where the user's finger touches the screen for precision placement."
  },
  {
    id: 'focus-cam',
    title: 'Focus Manual',
    category: 'UI Component',
    views: 890,
    copies: 40,
    description: 'Pro camera interface inspired by Leica rangefinders.',
    thumbnailClass: 'bg-gray-200',
    systemPrompt: "Design a pro camera interface inspired by Leica rangefinders. The shutter speed and ISO dials are semi-circles at the corners of the screen. Focus peaking highlights in-focus edges in neon green. The shutter button gives a heavy, mechanical haptic click."
  },
  {
    id: 'compass',
    title: 'Compass Way',
    category: 'UI Component',
    views: 780,
    copies: 35,
    description: 'Hiker navigation with high-contrast 3D dial.',
    thumbnailClass: 'bg-orange-600 text-white',
    systemPrompt: "Create a navigation app for hikers that works offline. The design is high-contrast orange and black (for visibility in sunlight). The compass is a large, floating 3D dial. Waypoints are clearly marked flags. Elevation is shown as a sidebar graph tracking the ascent."
  },
  {
    id: 'chroma',
    title: 'Chroma Aid',
    category: 'UI Component',
    views: 450,
    copies: 18,
    description: 'Accessibility app shifting colors for color blindness.',
    thumbnailClass: 'bg-blue-100',
    systemPrompt: "Design an accessibility app that shifts colors in real-time. The interface has a simple slider to cycle through Simulated Modes (Protanopia, Deuteranopia). The user points the camera at a confusing object (like a red/green map) and the app shifts the hues to high-contrast blue/yellow."
  },
  {
    id: 'ether',
    title: 'Ether Network',
    category: 'UI Component',
    views: 670,
    copies: 30,
    description: 'Wi-Fi analyzer with cyber-security aesthetic.',
    thumbnailClass: 'bg-slate-900 text-green-400',
    systemPrompt: "Create a Wi-Fi analyzer with a Cyber-Security aesthetic. Wi-Fi networks are visualized as nodes in a web. Secure networks are green shields; open networks are red unlocked padlocks. The 'Signal Strength' is a sonar ping animation radiating from the center."
  },
  {
    id: 'decibel',
    title: 'Decibel Meter',
    category: 'UI Component',
    views: 560,
    copies: 22,
    description: 'Noise level app with jittery speedometer gauge.',
    thumbnailClass: 'bg-gray-100',
    systemPrompt: "Design a noise level app. The main element is a speedometer-style gauge. The needle jitters responsively. Zones are marked 'Quiet Library', 'Traffic', and 'Jet Engine'. When the noise hits the 'Danger' zone, the entire UI flashes red to warn of hearing damage."
  },
  {
    id: 'skykey',
    title: 'SkyKey Sat',
    category: 'UI Component',
    views: 890,
    copies: 42,
    description: 'Satellite tracker with spaceship viewport UI.',
    thumbnailClass: 'bg-black text-cyan-400',
    systemPrompt: "Create a satellite tracking app. The view is a 3D globe. Satellites are moving white dots. The user's field of view is a translucent cone projecting from their location. The UI is translucent glass with thin white text, resembling a spaceship viewport."
  },
  {
    id: 'metronome',
    title: 'Haptic Metro',
    category: 'UI Component',
    views: 780,
    copies: 38,
    description: 'Musician tool using flash and vibration for tempo.',
    thumbnailClass: 'bg-gray-800 text-white',
    systemPrompt: "Design a metronome that uses haptics and light. The screen pulses white on the beat. The background is dark grey. The BPM selector is a weighted scroll wheel that spins with inertia. There is no sound by default—just the visual flash and the vibration in the hand."
  },
  {
    id: 'level',
    title: 'Bubble Level',
    category: 'UI Component',
    views: 1100,
    copies: 55,
    description: 'Carpentry tool with realistic viscous liquid physics.',
    thumbnailClass: 'bg-yellow-400',
    systemPrompt: "Design a carpentry tool. The screen looks like a physical yellow spirit level. The 'bubble' is rendered with realistic liquid physics (viscosity). When the phone is perfectly level, the bubble snaps into the center guides and the phone emits a solid beep."
  },
  {
    id: 'dreamscape',
    title: 'Dreamscape AI',
    category: 'UI Component',
    views: 3400,
    copies: 150,
    description: 'VR world generator transforming text to environment.',
    thumbnailClass: 'bg-indigo-100',
    systemPrompt: "Design an app that turns text into VR worlds. The input field is a floating text box in a void. As the user types, the background procedurally generates around them. If they type 'Forest', trees sprout instantly. The UI is minimal to let the generation take focus."
  },
  {
    id: 'link',
    title: 'Link BCI',
    category: 'UI Component',
    views: 1560,
    copies: 75,
    description: 'Brain-Computer Interface concept with heatmap.',
    thumbnailClass: 'bg-white border-2',
    systemPrompt: "Create a concept app for a Brain-Computer Interface (BCI). The screen displays a real-time heatmap of brain activity. Controls are labeled 'Focus', 'Relax', and 'Engage'. The buttons are not tapped, but activated by 'dwelling' (looking at them or focusing thought). The aesthetic is medical sci-fi."
  },
  {
    id: 'ghost',
    title: 'Ghost Hunter',
    category: 'UI Component',
    views: 2100,
    copies: 98,
    description: 'Paranormal AR app with night-vision glitch effects.',
    thumbnailClass: 'bg-green-900 text-green-400',
    systemPrompt: "Design a ghost hunting app with a grainy night-vision aesthetic. The camera feed is green and black. 'Anomalies' appear as glitch artifacts in the video feed. The EMF detector is a bar graph on the side that spikes erratically. The font is a jagged, digital glitch font."
  },
  {
    id: 'echoes',
    title: 'Echoes Garden',
    category: 'UI Component',
    views: 890,
    copies: 40,
    description: 'Digital memorial garden with glowing lanterns.',
    thumbnailClass: 'bg-indigo-950 text-white',
    systemPrompt: "Create an app to memorialize deceased loved ones. The interface is a serene, infinite garden. Each person is represented by a glowing lantern. Tapping a lantern opens a multimedia timeline of their life. The atmosphere is peaceful, using bloom effects and soft ambient music."
  },
  {
    id: 'hive',
    title: 'Hive Control',
    category: 'UI Component',
    views: 1200,
    copies: 60,
    description: 'Drone swarm controller with tactical map.',
    thumbnailClass: 'bg-slate-800 text-amber-400',
    systemPrompt: "Design an app to control a swarm of drones. The view is a top-down tactical map. The user draws a shape with their finger, and the drone dots realign to match that shape. The UI is military-grade, utilizing distinct blues and oranges for 'Ally' and 'Objective'."
  },
  {
    id: 'mirror',
    title: 'Mirror Twin',
    category: 'UI Component',
    views: 980,
    copies: 45,
    description: 'Health app with 3D avatar reflecting your state.',
    thumbnailClass: 'bg-cyan-50',
    systemPrompt: "Create a health app that shows a 3D avatar of the user. The avatar reflects real-time health data. If the user is dehydrated, the avatar looks parched. If they have a fever, the avatar glows red. The background is a sterile laboratory."
  },
  {
    id: 'cipher',
    title: 'Cipher Chat',
    category: 'UI Component',
    views: 1670,
    copies: 82,
    description: 'Messaging app visualizing encryption as code rain.',
    thumbnailClass: 'bg-black text-green-500',
    systemPrompt: "Design a messaging app that visualizes encryption. As the user types, the text appears as scrambled code. Only when the 'Send' button is pressed does it visually unscramble into readable text, then scramble again as it flies into the chat history. The theme is Matrix-green code rain."
  },
  {
    id: 'synthesizer',
    title: 'Visual Synth',
    category: 'UI Component',
    views: 1340,
    copies: 68,
    description: 'Music app where you paint sound on a canvas.',
    thumbnailClass: 'bg-black',
    systemPrompt: "Create a music app where the user 'paints' sound. The canvas is black. Touching the screen creates a colored light that emits a tone. Dragging creates a line (melody). Multi-touch allows chords. The visual style is neon lights on black glass."
  },
  {
    id: 'timecap',
    title: 'TimeCap Future',
    category: 'UI Component',
    views: 780,
    copies: 35,
    description: 'Message capsule app sending videos 50 years later.',
    thumbnailClass: 'bg-stone-300',
    systemPrompt: "Design an app to send messages 50 years into the future. The interface looks like a heavy, locking time capsule. Once a video is recorded and locked, the UI shows a countdown: 'Unlock Date: Jan 14, 2076'. The design is metallic and permanent."
  },
  {
    id: 'null-detox',
    title: 'Null Detox',
    category: 'UI Component',
    views: 2500,
    copies: 130,
    description: 'Digital detox app that does absolutely nothing.',
    thumbnailClass: 'bg-black',
    systemPrompt: "Design an app that does nothing. The screen is purely black. If the user touches it, a small ripple appears, but no interface. A discrete timer in the corner tracks 'Time Spent in Void'. The goal is to provide a sensory deprivation experience for meditation."
  }
];

export const DESIGN_SYSTEMS: ComponentItem[] = [
  {
    id: 'ds-classic',
    title: 'Modern Classic',
    category: 'Design System',
    views: 1200,
    copies: 45,
    description: 'The industry standard. Clean, reliable, and accessible. Uses a safe blue palette and rounded corners.',
    thumbnailClass: 'bg-blue-50',
    systemPrompt: "Create a design system using Tailwind CSS. Use a primary color of blue-600. Set border radius to 'rounded-lg' (8px). Use Inter font. Backgrounds should be white or gray-50. Input fields should have a gray-300 border. Buttons should be solid blue with white text. Focus states should use a blue ring. Do NOT use gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-gray-50 min-h-screen p-8 flex items-center justify-center text-slate-900">
  <div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
       <h1 class="text-xl font-bold text-gray-900">Tasks</h1>
       <button class="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">+ New Task</button>
    </div>
    
    <div class="p-4 space-y-3">
        <!-- Input -->
        <div class="flex gap-2 mb-4">
            <input type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" placeholder="What needs to be done?" />
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">Add</button>
        </div>

        <!-- List -->
        <div class="space-y-1">
            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked />
                <span class="text-gray-400 line-through text-sm">Review Q3 Financials</span>
            </label>
            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span class="text-gray-700 text-sm group-hover:text-gray-900">Email Marketing Team</span>
                <span class="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Today</span>
            </label>
            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span class="text-gray-700 text-sm group-hover:text-gray-900">Update Documentation</span>
            </label>
        </div>
    </div>
    <div class="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
        <span>2 items left</span>
        <button class="hover:text-gray-900">Clear completed</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-neobrutalism',
    title: 'Neo-Brutalism',
    category: 'Design System',
    views: 3400,
    copies: 120,
    description: 'Bold, raw, and quirky. High contrast, thick borders, and hard shadows. No border radius.',
    thumbnailClass: 'bg-yellow-100 border-2 border-black',
    systemPrompt: "Implement a Neo-Brutalism design style. Use strict black borders (border-2 border-black) for all containers and buttons. Use distinct, saturated colors like yellow-300, pink-400, or lime-400. Set shadows to hard offsets (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]). Do NOT use rounded corners (rounded-none). Fonts should be bold and monospaced or sans-serif. Use solid colors only.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Space Mono', monospace; }</style>
</head>
<body class="bg-[#FFFDF5] min-h-screen p-8 flex items-center justify-center text-black">
  <div class="w-full max-w-md border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
    <div class="bg-[#FF6B6B] p-4 border-b-4 border-black">
       <h1 class="text-4xl font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#000] font-[Public_Sans]">To-Do List</h1>
    </div>
    
    <div class="p-6 space-y-6">
        <div class="flex gap-0">
            <input type="text" class="w-full px-4 py-3 border-4 border-black font-bold uppercase placeholder-gray-500 focus:outline-none focus:bg-[#FFDE00] transition-colors" placeholder="ADD TASK..." />
            <button class="bg-black text-white border-4 border-black px-6 py-3 font-black uppercase hover:bg-white hover:text-black transition-colors ml-[-4px] relative z-10">
                Add
            </button>
        </div>

        <ul class="space-y-4">
            <li class="flex items-center gap-4 bg-[#86EFAC] border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
                <div class="w-6 h-6 bg-white border-4 border-black flex items-center justify-center">
                    <div class="w-2 h-2 bg-black"></div>
                </div>
                <span class="font-bold uppercase line-through decoration-4 decoration-black">Buy Coffee</span>
            </li>
            <li class="flex items-center gap-4 bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer hover:bg-[#C4B5FD]">
                <div class="w-6 h-6 bg-white border-4 border-black"></div>
                <span class="font-bold uppercase">Ship Feature</span>
            </li>
            <li class="flex items-center gap-4 bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer hover:bg-[#FFDE00]">
                <div class="w-6 h-6 bg-white border-4 border-black"></div>
                <span class="font-bold uppercase">Fix Bugs</span>
            </li>
        </ul>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-glass',
    title: 'Dark Glass',
    category: 'Design System',
    views: 890,
    copies: 30,
    description: 'Ultra-premium frosted glass on a deep black background. Minimalist and depth-focused.',
    thumbnailClass: 'bg-black',
    systemPrompt: "Create a Dark Glassmorphism design system. The background MUST be solid black (#000000). Components should be dark, semi-transparent white/gray (bg-white/5 or bg-gray-900/40) with strong backdrop-blur (backdrop-blur-xl). Borders should be very subtle white/10. Text must be white. Do NOT use gradients. Use white for accents.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-black min-h-screen p-8 flex items-center justify-center text-white selection:bg-white/20">
  <!-- Ambient background blobs -->
  <div class="fixed top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
  <div class="fixed bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="w-full max-w-md bg-[#111]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative z-10">
    <div class="flex justify-between items-center mb-8">
       <div>
           <h1 class="text-3xl font-light tracking-tight text-white mb-1">Focus</h1>
           <p class="text-white/40 text-sm">Stay productive today</p>
       </div>
       <div class="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
       </div>
    </div>
    
    <div class="space-y-3">
        <!-- Item 1 -->
        <div class="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                <div class="w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span class="text-white/90 font-light">Finalize design tokens</span>
        </div>

        <!-- Item 2 (Checked) -->
        <div class="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all opacity-50">
            <div class="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="text-white/50 font-light line-through">Morning standup</span>
        </div>

        <!-- Item 3 -->
        <div class="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors"></div>
            <span class="text-white/90 font-light">Review pull requests</span>
        </div>
        
        <!-- Input Overlay -->
        <div class="mt-6 pt-4 border-t border-white/5">
            <input type="text" placeholder="Add a new task..." class="w-full bg-transparent outline-none text-white placeholder-white/30 font-light" />
        </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-ios',
    title: 'Cupertino (iOS)',
    category: 'Design System',
    views: 560,
    copies: 12,
    description: 'Inspired by Apple iOS 17. Large rounded corners, blurs, and system blue accents.',
    thumbnailClass: 'bg-gray-100',
    systemPrompt: "Replicate the iOS design language. Use a light gray background (#F2F2F7). Cards should be pure white with standard rounded corners (rounded-[20px]). Buttons should be system blue (#007AFF) with full pill shape (rounded-full). Fonts should be SF Pro (or sans-serif). Use slight transparency on navigation elements. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }</style>
</head>
<body class="bg-[#F2F2F7] min-h-screen p-8 flex items-center justify-center text-black">
  <div class="w-full max-w-sm">
    <h1 class="text-[34px] font-bold mb-4 ml-1 tracking-tight text-black">Reminders</h1>
    
    <div class="bg-white rounded-[18px] overflow-hidden shadow-sm mb-6">
        <div class="flex items-center gap-3 p-4 border-b border-[#E5E5EA] active:bg-[#F2F2F7] transition-colors cursor-pointer group">
            <div class="w-6 h-6 rounded-full border-2 border-[#C7C7CC] group-hover:border-[#007AFF] transition-colors"></div>
            <div class="flex-1">
                <p class="text-[17px] text-black leading-snug">Call Mom</p>
                <p class="text-[13px] text-[#8E8E93]">Today, 5:00 PM</p>
            </div>
        </div>
        <div class="flex items-center gap-3 p-4 border-b border-[#E5E5EA] active:bg-[#F2F2F7] transition-colors cursor-pointer group">
            <div class="w-6 h-6 rounded-full bg-[#007AFF] border-2 border-[#007AFF] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="flex-1">
                <p class="text-[17px] text-[#8E8E93] line-through leading-snug">Pick up groceries</p>
            </div>
        </div>
        <div class="flex items-center gap-3 p-4 active:bg-[#F2F2F7] transition-colors cursor-pointer group">
            <div class="w-6 h-6 rounded-full border-2 border-[#C7C7CC] group-hover:border-[#007AFF] transition-colors"></div>
            <div class="flex-1">
                <p class="text-[17px] text-black leading-snug">Schedule dentist</p>
            </div>
            <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
    </div>

    <div class="flex items-center gap-2 cursor-pointer opacity-100 hover:opacity-70 transition-opacity ml-1">
        <div class="w-6 h-6 bg-[#007AFF] rounded-full flex items-center justify-center text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14m-7-7h14"/></svg>
        </div>
        <span class="text-[17px] font-semibold text-[#007AFF]">New Reminder</span>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-linear',
    title: 'Linear-esque',
    category: 'Design System',
    views: 4100,
    copies: 200,
    description: 'Dark mode, subtle borders, and solid refined colors. The startup aesthetic.',
    thumbnailClass: 'bg-gray-900 border border-gray-700',
    systemPrompt: "Design a dark-themed interface inspired by Linear. Background should be nearly black (#080808). Borders should be extremely subtle (#222). Use white text with variable opacity (text-white, text-white/60). Accents should be purple or indigo but muted. Everything uses 1px borders. Buttons must be solid colors, no gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-[#080808] min-h-screen p-8 flex items-center justify-center text-[#EEE]">
  <div class="w-full max-w-lg border border-[#222] bg-[#121212] rounded-lg shadow-sm">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-[#222] flex justify-between items-center bg-[#161616]">
       <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#5E6AD2]"></span>
          <h2 class="text-sm font-medium text-[#EEE]">My Issues</h2>
       </div>
       <div class="text-xs text-[#666] font-mono">3 / 12</div>
    </div>

    <!-- Filter Bar -->
    <div class="px-4 py-2 border-b border-[#222] flex gap-4 text-xs text-[#888]">
       <span class="text-[#EEE] cursor-pointer">Active</span>
       <span class="hover:text-[#CCC] cursor-pointer transition-colors">Backlog</span>
       <span class="hover:text-[#CCC] cursor-pointer transition-colors">Done</span>
    </div>

    <!-- List -->
    <div class="divide-y divide-[#1F1F1F]">
       <div class="group px-4 py-3 flex items-center gap-3 hover:bg-[#1A1A1A] transition-colors cursor-pointer">
          <div class="mt-0.5">
             <div class="w-4 h-4 border border-[#444] rounded-[4px] group-hover:border-[#666]"></div>
          </div>
          <div class="flex-1">
             <div class="text-sm text-[#EEE] group-hover:text-white">Refactor navigation component</div>
             <div class="text-[11px] text-[#666] mt-0.5 flex items-center gap-1.5">
                <span class="text-[#888]">LIN-242</span>
                <span class="w-1 h-1 bg-[#333] rounded-full"></span>
                <span class="text-orange-400">High Priority</span>
             </div>
          </div>
          <div class="w-5 h-5 rounded-full bg-[#222] text-[10px] flex items-center justify-center text-[#888] border border-[#333]">AR</div>
       </div>

       <div class="group px-4 py-3 flex items-center gap-3 hover:bg-[#1A1A1A] transition-colors cursor-pointer">
          <div class="mt-0.5">
             <div class="w-4 h-4 border border-[#444] rounded-[4px] group-hover:border-[#666]"></div>
          </div>
          <div class="flex-1">
             <div class="text-sm text-[#EEE] group-hover:text-white">Design system color audit</div>
             <div class="text-[11px] text-[#666] mt-0.5 flex items-center gap-1.5">
                <span class="text-[#888]">LIN-245</span>
             </div>
          </div>
          <div class="w-5 h-5 rounded-full bg-[#222] text-[10px] flex items-center justify-center text-[#888] border border-[#333]">AR</div>
       </div>
       
       <div class="px-4 py-3">
          <div class="text-sm text-[#555] italic flex items-center gap-2">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14m-7-7h14"/></svg>
             Create new issue...
          </div>
       </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-wireframe',
    title: 'Lo-Fi Wireframe',
    category: 'Design System',
    views: 150,
    copies: 5,
    description: 'Monochrome, skeletal design for prototyping. Focus on layout over aesthetics.',
    thumbnailClass: 'bg-white border-2 border-dashed border-gray-300',
    systemPrompt: "Create a Low-Fidelity Wireframe style. Use only black, white, and shades of gray. Images should be represented by crossed boxes with a distinct background. Buttons should be outlined rectangles. Use a monospace or simple sans font. Borders should be 2px solid gray-300 to indicate structure. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Courier Prime', monospace; }</style>
</head>
<body class="bg-white min-h-screen p-8 flex items-center justify-center text-black">
  <div class="w-full max-w-md border-2 border-black p-4 bg-gray-50">
    <div class="text-center border-b-2 border-black pb-4 mb-4">
       <h1 class="text-xl font-bold uppercase">[APP_TITLE]</h1>
    </div>

    <div class="flex gap-2 mb-6">
       <input type="text" class="flex-1 bg-white border-2 border-gray-400 p-2 text-sm" placeholder="[INPUT_TASK_NAME]" />
       <button class="bg-gray-200 border-2 border-black px-4 text-xs font-bold uppercase hover:bg-gray-300">[BTN]</button>
    </div>

    <div class="space-y-3">
       <div class="flex items-center gap-3 p-2 border-2 border-dashed border-gray-300 bg-white">
          <div class="w-5 h-5 border-2 border-black"></div>
          <span class="flex-1 text-sm">Wireframe Task 1</span>
          <div class="w-4 h-4 border-2 border-black flex items-center justify-center text-[10px]">X</div>
       </div>
       
       <div class="flex items-center gap-3 p-2 border-2 border-dashed border-gray-300 bg-white">
          <div class="w-5 h-5 border-2 border-black bg-black"></div>
          <span class="flex-1 text-sm line-through text-gray-500">Completed Task</span>
          <div class="w-4 h-4 border-2 border-black flex items-center justify-center text-[10px]">X</div>
       </div>
       
       <div class="flex items-center gap-3 p-2 border-2 border-dashed border-gray-300 bg-white opacity-50">
          <div class="w-5 h-5 border-2 border-black"></div>
          <span class="flex-1 text-sm">Pending...</span>
       </div>
    </div>
    
    <div class="mt-6 pt-4 border-t-2 border-black flex justify-between text-xs text-gray-500">
       <span>[FILTER_ALL]</span>
       <span>[FILTER_ACTIVE]</span>
       <span>[FILTER_DONE]</span>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-cyberpunk',
    title: 'Cyberpunk 2077',
    category: 'Design System',
    views: 900,
    copies: 40,
    description: 'High tech, low life. Neon yellow, glitch effects, and angular clipped corners.',
    thumbnailClass: 'bg-yellow-300',
    systemPrompt: "Design a Cyberpunk aesthetic. Primary colors are Neon Yellow (#FCEE0A) and Cyan on a Black background. Use angular, clipped corners (clip-path). Text should be glitchy or segmented. Borders are often decorative and disconnected. High contrast is mandatory. Solid neon colors only.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Rajdhani', sans-serif; }
    .clip-corner { clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%); }
    .clip-btn { clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%); }
  </style>
</head>
<body class="bg-[#050505] min-h-screen p-8 flex items-center justify-center text-[#FCEE0A]">
  <div class="w-full max-w-md relative">
    <div class="border-l-4 border-[#FCEE0A] bg-[#111] p-6 clip-corner relative z-10">
       <div class="flex justify-between items-end mb-6 border-b border-[#333] pb-2">
          <h1 class="text-4xl font-bold uppercase tracking-widest leading-none">Missions</h1>
          <span class="text-[#00F0FF] font-['Share_Tech_Mono'] text-xs">SYS.READY</span>
       </div>

       <div class="space-y-4">
          <!-- Active Task -->
          <div class="bg-black border border-[#00F0FF] p-4 relative group cursor-pointer hover:bg-[#00F0FF]/10 transition-colors">
             <div class="absolute top-0 right-0 w-3 h-3 bg-[#00F0FF]"></div>
             <div class="flex items-center gap-4">
                <div class="w-4 h-4 border border-[#00F0FF]"></div>
                <div class="flex-1">
                   <h3 class="text-white text-xl font-bold uppercase leading-none mb-1">Retrieve Data</h3>
                   <p class="text-[#00F0FF] text-xs font-['Share_Tech_Mono']">SECTOR 4 // HIGH RISK</p>
                </div>
             </div>
          </div>

          <!-- Completed Task -->
          <div class="bg-black border border-[#333] p-4 relative opacity-60">
             <div class="flex items-center gap-4">
                <div class="w-4 h-4 bg-[#FCEE0A] flex items-center justify-center text-black font-bold text-xs">✓</div>
                <div class="flex-1">
                   <h3 class="text-[#555] text-xl font-bold uppercase leading-none mb-1 line-through">Hack Terminal</h3>
                   <p class="text-[#555] text-xs font-['Share_Tech_Mono']">COMPLETED</p>
                </div>
             </div>
          </div>
       </div>

       <!-- Input -->
       <div class="mt-8 flex gap-2">
          <input type="text" class="flex-1 bg-black border border-[#FCEE0A] text-[#FCEE0A] p-3 font-['Share_Tech_Mono'] text-sm focus:shadow-[0_0_10px_#FCEE0A] outline-none" placeholder="NEW_OBJECTIVE" />
          <button class="bg-[#FCEE0A] text-black font-black uppercase px-6 py-3 clip-btn hover:bg-[#00F0FF] hover:text-black transition-colors">Exec</button>
       </div>
    </div>
    
    <!-- Decor -->
    <div class="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-[#00F0FF] opacity-50"></div>
    <div class="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-[#00F0FF] opacity-50"></div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-material',
    title: 'Material Design 3',
    category: 'Design System',
    views: 780,
    copies: 15,
    description: 'Google\'s latest design language. Dynamic color, playful shapes, and elevation.',
    thumbnailClass: 'bg-purple-50',
    systemPrompt: "Implement Material Design 3 (Material You). Use large rounded corners (rounded-3xl) for containers. Primary action buttons are pill-shaped. Use tonal palettes (e.g., surface-container-low, primary-container). Ripple effects on click. Backgrounds are often slightly tinted. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Roboto', sans-serif; }</style>
</head>
<body class="bg-[#FFFBFE] min-h-screen p-8 flex items-center justify-center text-[#1C1B1F]">
  <div class="w-full max-w-sm bg-[#F3EDF7] rounded-[28px] p-6 shadow-sm relative h-[500px] flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pl-2">
       <h1 class="text-[28px] font-normal text-[#1C1B1F]">My Tasks</h1>
       <div class="w-10 h-10 rounded-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" class="w-full h-full object-cover" />
       </div>
    </div>

    <!-- List -->
    <div class="space-y-2 flex-1 overflow-y-auto">
       <div class="flex items-center gap-4 p-4 bg-[#E8DEF8] rounded-[16px] text-[#1D192B] cursor-pointer hover:shadow-md transition-shadow">
          <div class="w-[18px] h-[18px] border-2 border-[#1D192B] rounded-[2px]"></div>
          <span class="text-base font-medium tracking-wide">Buy groceries</span>
       </div>
       
       <div class="flex items-center gap-4 p-4 bg-[#F7F2FA] rounded-[16px] text-[#49454F] cursor-pointer hover:bg-[#E8DEF8] transition-colors">
          <div class="w-[18px] h-[18px] border-2 border-[#49454F] rounded-[2px]"></div>
          <span class="text-base font-normal tracking-wide">Walk the dog</span>
       </div>
       
       <div class="flex items-center gap-4 p-4 bg-[#F7F2FA] rounded-[16px] text-[#49454F] cursor-pointer hover:bg-[#E8DEF8] transition-colors">
          <div class="w-[18px] h-[18px] bg-[#1D192B] border-2 border-[#1D192B] rounded-[2px] flex items-center justify-center">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="text-base font-normal tracking-wide line-through opacity-60">Pay bills</span>
       </div>
    </div>

    <!-- FAB -->
    <button class="absolute bottom-6 right-6 w-14 h-14 bg-[#D0BCFF] hover:bg-[#E8DEF8] text-[#21005D] rounded-[16px] shadow-lg flex items-center justify-center transition-all active:scale-95">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </button>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-retro',
    title: 'Windows 95',
    category: 'Design System',
    views: 1200,
    copies: 55,
    description: 'Nostalgic desktop UI. Beveled edges, gray backgrounds, and pixelated fonts.',
    thumbnailClass: 'bg-gray-300 border-t-white border-l-white border-b-black border-r-black border-2',
    systemPrompt: "Recreate the Windows 95 / Retro PC aesthetic. Use the distinct 'Teal' background color (#008080) for the desktop. Windows should be gray (#C0C0C0) with 3D bevel borders (border-t-white border-l-white border-r-black border-b-black). Use a pixelated font (e.g., MS Sans Serif). Buttons pop up and depress on click. Solid colors only.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.cdnfonts.com/css/ms-sans-serif');
    body { font-family: 'MS Sans Serif', sans-serif; }
    .win-shadow { box-shadow: 1px 1px 0px 1px #000; }
    .win-border { border-top: 2px solid #FFF; border-left: 2px solid #FFF; border-right: 2px solid #000; border-bottom: 2px solid #000; }
    .win-border-inset { border-top: 2px solid #000; border-left: 2px solid #000; border-right: 2px solid #FFF; border-bottom: 2px solid #FFF; }
  </style>
</head>
<body class="bg-[#008080] min-h-screen p-8 flex items-center justify-center">
  <div class="w-full max-w-md bg-[#C0C0C0] win-border p-1 win-shadow">
    <!-- Title Bar -->
    <div class="bg-[#000080] px-2 py-1 flex justify-between items-center mb-1">
       <span class="text-white font-bold tracking-wide text-sm">ToDo.exe</span>
       <div class="flex gap-1">
           <button class="bg-[#C0C0C0] win-border w-4 h-4 flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white">
              <div class="w-2 h-0.5 bg-black"></div>
           </button>
           <button class="bg-[#C0C0C0] win-border w-4 h-4 flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white">
              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M1,1 L9,9 M9,1 L1,9" stroke="black" stroke-width="2" /></svg>
           </button>
       </div>
    </div>

    <!-- Menu Bar -->
    <div class="flex gap-4 px-2 mb-2 text-sm">
        <span class="underline">F</span>ile
        <span class="underline">E</span>dit
        <span class="underline">V</span>iew
        <span class="underline">H</span>elp
    </div>

    <!-- Content -->
    <div class="px-2 pb-2">
       <div class="bg-white win-border-inset h-48 overflow-y-auto p-1 mb-3">
           <div class="flex items-center gap-2 px-1 hover:bg-[#000080] hover:text-white cursor-pointer mb-1">
               <span>[ ]</span>
               <span>Defrag Hard Drive</span>
           </div>
           <div class="flex items-center gap-2 px-1 hover:bg-[#000080] hover:text-white cursor-pointer mb-1">
               <span>[x]</span>
               <span>Install Doom</span>
           </div>
           <div class="flex items-center gap-2 px-1 hover:bg-[#000080] hover:text-white cursor-pointer mb-1">
               <span>[ ]</span>
               <span>Dial-up Internet</span>
           </div>
       </div>

       <div class="flex gap-2">
          <input type="text" class="flex-1 bg-white win-border-inset px-1 py-0.5 outline-none" />
          <button class="px-4 py-0.5 bg-[#C0C0C0] win-border active:win-border-inset font-bold text-sm">Add</button>
       </div>
    </div>
    
    <!-- Status Bar -->
    <div class="win-border-inset bg-[#C0C0C0] px-2 py-0.5 text-xs mt-1 text-gray-600">
        3 objects(s)
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-pastel',
    title: 'Soft Pastel',
    category: 'Design System',
    views: 650,
    copies: 25,
    description: 'Gentle, soothing colors. Creamy backgrounds, soft radii, and playful vibes.',
    thumbnailClass: 'bg-pink-100',
    systemPrompt: "Create a Soft Pastel design theme. Use a palette of pale pinks, mints, and lavenders. Backgrounds should be off-white or cream (#FFFDF9). Borders should be thick but colored with pastel shades. Fonts should be rounded (e.g., Nunito or Quicksand). High radius on all elements. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Nunito', sans-serif; }</style>
</head>
<body class="bg-[#FFFDF9] min-h-screen p-8 flex items-center justify-center text-slate-700">
  <div class="w-full max-w-md bg-white rounded-[3rem] border-4 border-pink-200 shadow-[8px_8px_0px_#FBCFE8] p-8">
    <h1 class="text-3xl font-extrabold text-center mb-8 text-slate-700">Little Things <span class="text-pink-300">♥</span></h1>
    
    <div class="space-y-4">
        <!-- Item 1 -->
        <div class="flex items-center gap-4 bg-blue-50 border-2 border-blue-200 p-4 rounded-3xl hover:bg-blue-100 transition-colors cursor-pointer group">
            <div class="w-8 h-8 rounded-full border-2 border-blue-300 bg-white flex items-center justify-center text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">✓</div>
            <span class="font-bold text-slate-600 text-lg">Water Plants</span>
        </div>

        <!-- Item 2 -->
        <div class="flex items-center gap-4 bg-green-50 border-2 border-green-200 p-4 rounded-3xl hover:bg-green-100 transition-colors cursor-pointer group">
            <div class="w-8 h-8 rounded-full border-2 border-green-300 bg-white flex items-center justify-center text-green-300 opacity-0 group-hover:opacity-100 transition-opacity">✓</div>
            <span class="font-bold text-slate-600 text-lg">Bake Cookies</span>
        </div>

        <!-- Item 3 (Done) -->
        <div class="flex items-center gap-4 bg-gray-50 border-2 border-gray-100 p-4 rounded-3xl opacity-60">
            <div class="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold">✓</div>
            <span class="font-bold text-slate-400 text-lg line-through">Nap Time</span>
        </div>
    </div>

    <!-- Input -->
    <div class="mt-8 relative">
        <input type="text" placeholder="Add new task..." class="w-full bg-yellow-50 border-2 border-yellow-200 rounded-full py-4 px-6 font-bold text-slate-600 placeholder-yellow-300 focus:outline-none focus:border-yellow-400 transition-colors" />
        <button class="absolute right-2 top-2 bottom-2 bg-yellow-300 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm hover:bg-yellow-400 transition-colors">
            +
        </button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-corp',
    title: 'Enterprise Corp',
    category: 'Design System',
    views: 220,
    copies: 2,
    description: 'Serious, dense, and data-heavy. Small fonts, squared corners, and high information density.',
    thumbnailClass: 'bg-slate-200',
    systemPrompt: "Design an Enterprise SaaS interface (like Salesforce or Oracle). Use dense layouts with small font sizes (text-xs). Use a cool gray palette. Borders should be distinct (gray-300). Buttons should be compact and functional. Focus on utility over aesthetics. Solid colors.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Roboto', sans-serif; }</style>
</head>
<body class="bg-slate-50 min-h-screen p-8 flex items-center justify-center text-slate-900">
  <div class="w-full max-w-lg bg-white border border-slate-300 shadow-sm">
    <!-- Toolbar -->
    <div class="bg-slate-100 border-b border-slate-300 p-2 flex items-center justify-between">
       <div class="flex gap-2">
           <span class="text-xs font-bold text-slate-700 uppercase pt-1">Task Manager</span>
       </div>
       <div class="flex gap-1">
           <button class="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-2 py-0.5 text-[10px] font-medium shadow-sm">Filter</button>
           <button class="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-2 py-0.5 text-[10px] font-medium shadow-sm">Export</button>
       </div>
    </div>

    <!-- Grid Header -->
    <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-300 text-[10px] font-bold text-slate-500 py-1 px-2">
        <div class="col-span-1 text-center"></div>
        <div class="col-span-6 border-l border-slate-200 pl-2">DESCRIPTION</div>
        <div class="col-span-3 border-l border-slate-200 pl-2">ASSIGNEE</div>
        <div class="col-span-2 border-l border-slate-200 pl-2 text-center">STATUS</div>
    </div>

    <!-- Rows -->
    <div class="text-xs">
        <div class="grid grid-cols-12 border-b border-slate-200 hover:bg-blue-50 py-1.5 px-2 items-center">
            <div class="col-span-1 text-center"><input type="checkbox" class="rounded-sm" /></div>
            <div class="col-span-6 pl-2 font-medium text-slate-800">Q4 Budget Approval</div>
            <div class="col-span-3 pl-2 text-slate-500">J. Doe</div>
            <div class="col-span-2 pl-2 text-center"><span class="bg-yellow-100 text-yellow-800 px-1 py-0.5 border border-yellow-200 rounded-sm text-[9px] font-bold">PENDING</span></div>
        </div>
        <div class="grid grid-cols-12 border-b border-slate-200 hover:bg-blue-50 py-1.5 px-2 items-center">
            <div class="col-span-1 text-center"><input type="checkbox" class="rounded-sm" /></div>
            <div class="col-span-6 pl-2 font-medium text-slate-800">System Maintenance</div>
            <div class="col-span-3 pl-2 text-slate-500">Admin</div>
            <div class="col-span-2 pl-2 text-center"><span class="bg-red-100 text-red-800 px-1 py-0.5 border border-red-200 rounded-sm text-[9px] font-bold">HIGH</span></div>
        </div>
        <div class="grid grid-cols-12 border-b border-slate-200 bg-slate-50/50 py-1.5 px-2 items-center opacity-70">
            <div class="col-span-1 text-center"><input type="checkbox" checked class="rounded-sm" /></div>
            <div class="col-span-6 pl-2 font-medium text-slate-800 line-through">Client Onboarding</div>
            <div class="col-span-3 pl-2 text-slate-500">M. Scott</div>
            <div class="col-span-2 pl-2 text-center"><span class="bg-green-100 text-green-800 px-1 py-0.5 border border-green-200 rounded-sm text-[9px] font-bold">DONE</span></div>
        </div>
    </div>

    <!-- Footer -->
    <div class="p-2 bg-slate-50 border-t border-slate-300 flex justify-between items-center">
        <span class="text-[10px] text-slate-400">Showing 1-3 of 14 records</span>
        <button class="bg-slate-800 text-white px-3 py-1 text-[10px] hover:bg-slate-700">Add Record +</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-elegant',
    title: 'Elegant Navy',
    category: 'Design System',
    views: 450,
    copies: 18,
    description: 'Sophisticated dark navy and gold. Serif headings, high contrast, and refined spacing.',
    thumbnailClass: 'bg-slate-900 border border-amber-500/30',
    systemPrompt: "Create a luxurious interface using Dark Navy (#0B1120) and Metallic Gold (#D4AF37). Headings should use a Serif font (Playfair Display). Body text sans-serif. Use generous padding and fine 1px borders for elegance. Buttons should be ghost style or outlined gold. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
  <style>
     h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
     body { font-family: 'Lato', sans-serif; }
  </style>
</head>
<body class="bg-[#0B1120] min-h-screen p-8 flex items-center justify-center text-[#F5F5F5]">
  <div class="w-full max-w-md bg-[#151E32] border border-[#D4AF37]/30 p-10 shadow-2xl relative">
    <!-- Decorative Corners -->
    <div class="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]"></div>
    <div class="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]"></div>

    <div class="text-center mb-10">
       <h1 class="text-3xl italic text-[#F5F5F5]">Agenda</h1>
       <div class="w-8 h-px bg-[#D4AF37] mx-auto mt-4"></div>
    </div>

    <div class="space-y-6">
        <div class="flex items-baseline justify-between border-b border-[#D4AF37]/20 pb-4 group cursor-pointer">
            <span class="text-lg font-light text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors">Review Portfolio</span>
            <span class="text-xs uppercase tracking-widest text-[#94A3B8]">09:00</span>
        </div>
        
        <div class="flex items-baseline justify-between border-b border-[#D4AF37]/20 pb-4 group cursor-pointer">
            <span class="text-lg font-light text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors">Client Luncheon</span>
            <span class="text-xs uppercase tracking-widest text-[#94A3B8]">12:30</span>
        </div>

        <div class="flex items-baseline justify-between border-b border-[#D4AF37]/20 pb-4 group cursor-pointer opacity-50">
            <span class="text-lg font-light text-[#F5F5F5] line-through decoration-[#D4AF37]">Morning Yoga</span>
            <span class="text-xs uppercase tracking-widest text-[#94A3B8] flex items-center gap-2">Done <span class="text-[#D4AF37]">✓</span></span>
        </div>
    </div>

    <div class="mt-12 text-center">
        <button class="border border-[#D4AF37] text-[#D4AF37] px-8 py-2 text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0B1120] transition-colors duration-500">
            Append
        </button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-nature',
    title: 'Organic Nature',
    category: 'Design System',
    views: 380,
    copies: 10,
    description: 'Earth tones, olive greens, and beige. Rounded, organic shapes and soft textures.',
    thumbnailClass: 'bg-stone-100',
    systemPrompt: "Design an organic, nature-inspired theme. Use colors like Sage Green, Clay, and Off-White. Corner radius should be large and organic. Use a humanist sans-serif font. Shadows should be soft and diffuse. Buttons should feel tactile. Solid earth tones.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>body { font-family: 'Outfit', sans-serif; }</style>
</head>
<body class="bg-[#F2F0E9] min-h-screen p-8 flex items-center justify-center text-[#44403C]">
  <div class="w-full max-w-md bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgba(87,83,78,0.05)] border border-[#E7E5E4]">
    <h1 class="text-3xl font-medium text-[#292524] mb-6 pl-2">Daily Habits</h1>
    
    <div class="space-y-3">
        <!-- Item 1 -->
        <div class="flex items-center gap-4 bg-[#F5F5F4] p-4 rounded-[20px] hover:bg-[#E7E5E4] transition-colors cursor-pointer group">
            <div class="w-6 h-6 rounded-full border-2 border-[#A8A29E] flex items-center justify-center group-hover:border-[#65A30D] group-hover:bg-[#65A30D] transition-colors">
                <svg class="w-3 h-3 text-white opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="text-lg text-[#57534E]">Meditation</span>
        </div>

        <!-- Item 2 -->
        <div class="flex items-center gap-4 bg-[#F5F5F4] p-4 rounded-[20px] hover:bg-[#E7E5E4] transition-colors cursor-pointer group">
            <div class="w-6 h-6 rounded-full border-2 border-[#A8A29E] flex items-center justify-center group-hover:border-[#65A30D] group-hover:bg-[#65A30D] transition-colors">
                <svg class="w-3 h-3 text-white opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="text-lg text-[#57534E]">Water Plants</span>
        </div>

        <!-- Item 3 (Done) -->
        <div class="flex items-center gap-4 bg-[#ECFCCB] p-4 rounded-[20px]">
            <div class="w-6 h-6 rounded-full bg-[#65A30D] flex items-center justify-center">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="text-lg text-[#3F6212] font-medium">Morning Walk</span>
        </div>
    </div>

    <!-- Input -->
    <div class="mt-8 flex gap-2">
        <input type="text" placeholder="New habit..." class="flex-1 bg-transparent border-b-2 border-[#E7E5E4] py-2 px-2 outline-none focus:border-[#65A30D] transition-colors text-[#57534E]" />
        <button class="bg-[#57534E] text-[#F2F0E9] px-6 py-2 rounded-full hover:bg-[#44403C] transition-colors">Add</button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-playful',
    title: 'Playful Pop',
    category: 'Design System',
    views: 600,
    copies: 22,
    description: 'Vibrant, high energy, and fun. Memphis style patterns, bold colors, and offset layers.',
    thumbnailClass: 'bg-cyan-100 border-2 border-black',
    systemPrompt: "Create a Playful/Memphis design style. Use a white background with confetti patterns or shapes. Primary colors are Cyan, Magenta, and Yellow. Use thick black borders on everything. Elements should be offset to look like stickers. No gradients, just solid pop colors.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Fredoka', sans-serif; }
    .pattern-dot { background-image: radial-gradient(#000 15%, transparent 16%); background-size: 20px 20px; }
  </style>
</head>
<body class="bg-cyan-50 min-h-screen p-8 flex items-center justify-center text-black overflow-hidden relative">
  <!-- Background Decor -->
  <div class="absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full border-4 border-black"></div>
  <div class="absolute bottom-10 left-10 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-purple-400 border-r-[30px] border-r-transparent rotate-12 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"></div>

  <div class="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#000] rounded-3xl relative z-10">
    <div class="bg-[#FF00FF] border-4 border-black inline-block px-6 py-2 rounded-full mb-6 rotate-[-2deg] shadow-[4px_4px_0px_0px_#000]">
        <h1 class="text-3xl font-bold text-white tracking-wide">FUN LIST!</h1>
    </div>

    <div class="space-y-6">
        <!-- Item -->
        <div class="relative group cursor-pointer">
            <div class="absolute inset-0 bg-yellow-300 border-4 border-black rounded-xl translate-x-1 translate-y-1"></div>
            <div class="relative bg-white border-4 border-black p-4 rounded-xl flex items-center gap-4 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform">
                <div class="w-8 h-8 border-4 border-black rounded-full flex items-center justify-center"></div>
                <span class="text-xl font-bold">Buy Candy</span>
            </div>
        </div>

        <!-- Item Done -->
        <div class="relative group cursor-pointer opacity-50">
            <div class="absolute inset-0 bg-green-300 border-4 border-black rounded-xl translate-x-1 translate-y-1"></div>
            <div class="relative bg-white border-4 border-black p-4 rounded-xl flex items-center gap-4">
                <div class="w-8 h-8 bg-black border-4 border-black rounded-full flex items-center justify-center text-white">✓</div>
                <span class="text-xl font-bold line-through">Walk Dog</span>
            </div>
        </div>
        
        <!-- Input -->
        <div class="flex gap-2 mt-8">
            <input type="text" placeholder="Do what?" class="w-full border-4 border-black rounded-xl p-3 text-lg font-bold outline-none focus:bg-blue-50 transition-colors" />
            <button class="bg-black text-white p-3 rounded-xl border-4 border-black hover:bg-white hover:text-black transition-colors font-bold">GO</button>
        </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ds-mono',
    title: 'High Fashion Mono',
    category: 'Design System',
    views: 310,
    copies: 8,
    description: 'Stark black and white. Helvetica, uppercase, and extreme whitespace.',
    thumbnailClass: 'bg-white border border-black',
    systemPrompt: "Design a High Fashion Monochrome aesthetic. Use ONLY black and white. No grays. Fonts should be Helvetica or Arial, strictly uppercase for headers. Borders are 1px solid black. Layouts should be sparse with extreme padding. No gradients.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }</style>
</head>
<body class="bg-white min-h-screen p-8 flex items-center justify-center text-black">
  <div class="w-full max-w-md border border-black min-h-[500px] flex flex-col">
    <div class="p-8 border-b border-black text-center">
       <h1 class="text-2xl font-bold uppercase tracking-[0.4em]">Index</h1>
       <p class="text-[10px] mt-2 uppercase tracking-widest">S/S 2024 Collection</p>
    </div>

    <div class="flex-1 p-8 space-y-8">
       <div class="group cursor-pointer">
          <div class="flex justify-between items-baseline mb-2">
             <span class="text-sm font-bold uppercase tracking-widest group-hover:underline">01. Research</span>
             <span class="text-[10px] font-bold">[ ACTIVE ]</span>
          </div>
          <div class="h-px bg-black w-full"></div>
       </div>

       <div class="group cursor-pointer">
          <div class="flex justify-between items-baseline mb-2">
             <span class="text-sm font-bold uppercase tracking-widest group-hover:underline">02. Prototype</span>
             <span class="text-[10px] font-bold">[ PENDING ]</span>
          </div>
          <div class="h-px bg-black w-full"></div>
       </div>

       <div class="group cursor-pointer opacity-30">
          <div class="flex justify-between items-baseline mb-2">
             <span class="text-sm font-bold uppercase tracking-widest line-through">03. Concept</span>
             <span class="text-[10px] font-bold">[ ARCHIVED ]</span>
          </div>
          <div class="h-px bg-black w-full"></div>
       </div>
    </div>

    <div class="p-8 border-t border-black">
       <button class="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black border border-black transition-colors">
          Initialize New Entry
       </button>
    </div>
  </div>
</body>
</html>`
  }
];
