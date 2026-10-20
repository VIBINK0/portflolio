/**
 * Vibin K Portfolio - Core JavaScript
 * Frontend Engineer | Flutter Specialist
 * Implements: Dynamic Header scrolling, Mobile menu, World tabs switcher,
 * Equalizer counters, Journey track horizontal dragging, Project modal dialogs,
 * Portfolio filtering, Motorcycle Blueprint pins, and Android Native SMS Interceptor Simulator.
 */

(function () {
  'use strict';

  // --- 1. Header Scroll & Mobile Nav ---
  const header = document.querySelector('.hub-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.hub-nav nav');
  const isHomePage = !!document.querySelector('.editorial-hero');

  function updateHeaderScroll() {
    if (!header) return;
    const scrollY = window.scrollY;

    if (isHomePage) {
      if (scrollY > 280) {
        header.classList.remove('editorial-nav');
        header.classList.add('home-scrolled-nav');
        header.classList.add('compressed');
      } else {
        header.classList.add('editorial-nav');
        header.classList.remove('home-scrolled-nav');
        header.classList.remove('compressed');
      }
    } else {
      if (scrollY > 40) {
        header.classList.add('compressed');
      } else {
        header.classList.remove('compressed');
      }
    }
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuToggle.innerHTML = isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 2. Section 01: Engineering World Tabs Switcher ---
  const worldData = [
    {
      className: 'film-world',
      image: 'portfolio/trackki.jpg',
      timecode: 'FLUTTER • PRODUCTION',
      eyebrow: 'ARCHITECTURE & SCALABLE UI.',
      title: 'Flutter',
      desc: 'Production-grade cross-platform apps spanning Web, Android, iOS, and Desktop with Bloc & Riverpod state architecture.',
      href: 'portfolio.html',
      linkText: 'Enter this world'
    },
    {
      className: 'photo-world',
      image: 'portfolio/dconag.jpg',
      timecode: 'IOT • REAL-TIME',
      eyebrow: 'LOW-LATENCY TELEMETRY.',
      title: 'Real-Time',
      desc: 'High-throughput WebSockets, MQTT telemetry streams, and Firebase Realtime Database with millisecond device dispatch.',
      href: 'portfolio.html?filter=realtime',
      linkText: 'View Real-Time Systems'
    },
    {
      className: 'design-world',
      image: 'portfolio/oms.jpg',
      timecode: 'ANDROID • KOTLIN',
      eyebrow: 'HARDWARE TO GLASS.',
      title: 'Bridges',
      desc: 'Deep native integration combining Kotlin BroadcastReceivers, MethodChannel bridges, and battery-optimized system notifications.',
      href: 'products.html',
      linkText: 'Explore Native Bridges'
    },
    {
      className: 'product-world',
      image: 'portfolio/motologg-showcase.jpg',
      timecode: 'MOTO LOGG • SUITE',
      eyebrow: 'ENTHUSIAST MOTORCYCLE TECH.',
      title: 'MotoLogg',
      desc: 'Industrial motorcycle expense, fuel economy, and automated bank SMS debit detection suite with blueprint component mapping.',
      href: 'products.html',
      linkText: 'Explore MotoLogg'
    }
  ];

  const worldTabs = document.querySelectorAll('.world-tabs button');
  const worldPanel = document.getElementById('world-panel');

  function setWorldTab(index) {
    if (!worldPanel || !worldTabs.length) return;
    worldTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    const data = worldData[index];
    worldPanel.style.opacity = '0';
    worldPanel.style.transition = 'opacity 0.22s ease';

    setTimeout(() => {
      worldPanel.className = `world-panel ${data.className}`;
      worldPanel.setAttribute('aria-labelledby', `world-tab-${index}`);
      worldPanel.innerHTML = `
        <div class="world-art" aria-hidden="true">
          <img class="world-photo" src="${data.image}" alt="${data.title}" loading="lazy" width="480" height="360"/>
          <span class="frame-corner"></span>
          <span class="timecode">${data.timecode}</span>
        </div>
        <div class="world-description">
          <div class="eyebrow"><span></span> ${data.eyebrow}</div>
          <h3>${data.title}<span class="red">.</span></h3>
          <p>${data.desc}</p>
          <a class="text-link" href="${data.href}">
            ${data.linkText} 
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </a>
        </div>
      `;
      worldPanel.style.opacity = '1';
    }, 120);
  }

  worldTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => setWorldTab(idx));
  });

  // --- 3. Section 02: Numbers Equalizer & Counters ---
  const numbersSection = document.querySelector('.section.numbers');
  if (numbersSection) {
    const metricCards = numbersSection.querySelectorAll('.metric');
    let hasAnimatedNumbers = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedNumbers) {
          hasAnimatedNumbers = true;
          animateMetrics();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(numbersSection);

    function animateMetrics() {
      metricCards.forEach((card) => {
        const span = card.querySelector('span:not(.metric-index)');
        if (!span) return;
        const text = span.textContent.trim();
        const numMatch = text.match(/^(\d+)(.*)$/);
        if (!numMatch) return;
        const target = parseInt(numMatch[1], 10);
        const suffix = numMatch[2] || '';
        const duration = 1200;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          span.innerHTML = `${current}<i>${suffix}</i>`;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            span.innerHTML = `${target}<i>${suffix}</i>`;
          }
        }
        requestAnimationFrame(update);
      });
    }
  }

  // --- 4. Section 03: Career Journey Horizontal Drag ---
  const journeyTrack = document.querySelector('.journey-track');
  if (journeyTrack) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    journeyTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - journeyTrack.offsetLeft;
      scrollLeft = journeyTrack.scrollLeft;
      journeyTrack.style.cursor = 'grabbing';
    });

    journeyTrack.addEventListener('mouseleave', () => {
      isDown = false;
      journeyTrack.style.cursor = 'grab';
    });

    journeyTrack.addEventListener('mouseup', () => {
      isDown = false;
      journeyTrack.style.cursor = 'grab';
    });

    journeyTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - journeyTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      journeyTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // --- 5. Projects Data & Interactive Modal Dialog ---
  const googlePlayIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0"><path d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1z" fill="#00C1A6"/><path d="M16.9 15.5l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2-.1.1z" fill="#FFC107"/><path d="M13.6 12.2l-9.9 9.9c.4.4 1.1.4 1.8 0l11.4-6.6-3.3-3.3z" fill="#FF3A44"/><path d="M13.6 11.8l3.3-3.3-11.4-6.6c-.7-.4-1.4-.4-1.8 0l9.9 9.9z" fill="#0086F0"/></svg>`;

  const projectsData = {
    'dconag': {
      title: 'DCON AG',
      company: 'Mobitech Wireless Solutions · Erode',
      category: 'Real-Time IoT',
      image: 'portfolio/dconag.jpg',
      packageId: 'com.dconag.mobile',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.dconag.mobile',
      overview: 'Mobitech’s flagship smart agriculture telemetry and automation platform. Enables farmers to remotely schedule irrigation routines, monitor multi-node field sensors, and dispatch microsecond-precision commands over low-latency WebSockets and MQTT.',
      techStack: ['Flutter Mobile & Web', 'WebSockets', 'MQTT Telemetry', 'Bloc Architecture', 'Multi-Flavor Flavors'],
      achievements: [
        'Built real-time telemetry streaming pipelines connecting industrial IoT pump and valve nodes with instant status feedback.',
        'Engineered complex automated irrigation scheduling engine allowing precise timer routines and sensor-triggered actions.',
        'Migrated state architecture to Bloc, establishing clean separation between network streams, device drivers, and UI widgets.'
      ],
      codeSnippet: `// WebSocket Stream Connection in DCON AG
class TelemetryBloc extends Bloc<TelemetryEvent, TelemetryState> {
  final WebSocketService _wsService;
  StreamSubscription? _telemetrySub;

  TelemetryBloc(this._wsService) : super(TelemetryInitial()) {
    on<SubscribeToNode>((event, emit) async {
      await _telemetrySub?.cancel();
      _telemetrySub = _wsService.streamNode(event.nodeId).listen(
        (data) => add(OnTelemetryReceived(data)),
        onError: (err) => add(OnTelemetryError(err)),
      );
    });
  }
}`
    },
    'oms': {
      title: 'Flocon (OMS)',
      company: 'Mobitech Wireless Solutions · Erode',
      category: 'Real-Time IoT / Enterprise Web',
      image: 'portfolio/oms.jpg',
      packageId: 'com.floconag.mobile',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.floconag.mobile',
      overview: 'Smart water flow management and Operations Monitoring System (OMS) for community lift irrigation, reservoir-to-field automated release gates, multi-node pressure monitoring, and centralized pump flow diagnostics.',
      techStack: ['Flutter Mobile & Web', 'Real-Time Streams', 'FCM Push Alerts', 'Custom Web Routing', 'Canvas Charts'],
      achievements: [
        'Engineered real-time reservoir and canal water release tracking with dynamic line pressure and flow rate alerts.',
        'Architected a custom web routing system for Flutter Web to handle deep links, browser history, and nested tabs.',
        'Optimized heavy sensor telemetry charting with canvas painters, sustaining 60fps across modern browsers.'
      ],
      codeSnippet: `// High-Frequency Sensor Stream Aggregator in Flocon OMS
Stream<FlowMetrics> aggregateFlowTelemetry(String canalId) {
  return _telemetryChannel.stream
      .where((packet) => packet.nodeId == canalId)
      .map((packet) => FlowMetrics.fromBinary(packet.payload))
      .distinct((prev, curr) => prev.pressure == curr.pressure && prev.flowLpm == curr.flowLpm);
}`
    },
    'tcon': {
      title: 'TCON',
      company: 'Mobitech Wireless Solutions · Erode',
      category: 'Real-Time IoT',
      image: 'portfolio/tcon.jpg',
      packageId: 'com.dconag.lite',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.dconag.lite',
      overview: 'Compact, resilient timer-based smart agricultural motor and valve starter app. Provides small-to-medium scale farmers with real-time phase voltage monitoring, dry-run protection, and scheduled pump timing over GSM and cloud sync.',
      techStack: ['Flutter Mobile', 'GSM / Cloud Gateway', 'Timer Engine', 'Reactive State', 'Offline Buffering'],
      achievements: [
        'Designed lightweight, low-bandwidth state synchronization protocol for rural farms with intermittent 2G/4G connectivity.',
        'Implemented real-time 3-phase voltage (415V) and motor load current diagnostics with automated motor trip safety alerts.',
        'Crafted intuitive circular timer controls allowing farmers to configure cyclic pump runtimes with single-tap dispatch.'
      ],
      codeSnippet: `// Timer & Phase Safety Dispatcher in TCON
class MotorStarterController {
  Future<StarterResult> dispatchTimedCycle({
    required String motorId,
    required Duration runtime,
    required double maxCurrentLimit,
  }) async {
    final payload = CommandPayload(
      command: 'RUN_TIMER',
      durationSeconds: runtime.inSeconds,
      tripThresholdAmps: maxCurrentLimit,
    );
    return await _gatewayService.sendEncrypted(motorId, payload);
  }
}`
    },
    'ridenrepeat': {
      title: 'Ride N Repeat',
      company: 'Lawpoc Systems · Coimbatore',
      category: 'Mobile App',
      image: 'portfolio/ridenrepeat.jpg',
      packageId: 'apps.lawpoc.ridenrepeat',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=apps.lawpoc.ridenrepeat',
      overview: 'Dedicated navigation, ride planning, and safety companion app built specifically for motorcyclists and riding groups. Features live convoy tracking, biker group route coordination, crash detection, and automated emergency SOS alerts.',
      techStack: ['Flutter Mobile', 'Google Maps SDK', 'Background Geolocation', 'Crash Sensor Telemetry', 'SOS Emergency Engine'],
      achievements: [
        'Engineered real-time biker convoy tracking with live GPS pings and leader-sweeper route adherence indicators.',
        'Integrated accelerometer & gyroscope anomaly detection algorithms to trigger automated crash alerts and SOS dispatch.',
        'Optimized high-frequency background GPS streaming with adaptive throttling to minimize mobile battery consumption on long road tours.'
      ],
      codeSnippet: `// Biker Convoy Location Stream & SOS Emergency Trigger
class ConvoyTrackingService {
  Stream<List<RiderLocation>> listenToConvoy(String rideId) {
    return _firestore
        .collection('rides')
        .doc(rideId)
        .collection('riders')
        .snapshots()
        .map((snap) => snap.docs.map((d) => RiderLocation.fromSnapshot(d)).toList());
  }

  Future<void> dispatchEmergencySOS({required LatLng location, required String riderId}) async {
    await _sosRelay.broadcastCrashAlert(riderId: riderId, coords: location, timestamp: DateTime.now());
  }
}`
    },
    'ala': {
      title: 'ALA (User App)',
      company: 'Lawpoc Systems · Coimbatore',
      category: 'Mobile App',
      image: 'portfolio/ala.jpg',
      packageId: 'apps.alanow.user',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=apps.alanow.user',
      overview: 'High-speed on-demand delivery app connecting users with neighborhood restaurants, supermarkets, and delivery partners across Tamil Nadu with real-time GPS tracking and fluid cart checkout.',
      techStack: ['Flutter Mobile', 'Google Maps / Polyline Routing', 'FCM Push Notifications', 'Payment Gateways', 'Geofencing'],
      achievements: [
        'Built real-time order lifecycle tracking displaying delivery rider position, polyline routing, and precise ETA calculations.',
        'Engineered high-performance catalog browsing with instant search, multi-merchant cart aggregation, and discount engine.',
        'Implemented low-latency push notification pipeline handling order confirmations, kitchen prep status, and rider arrival triggers.'
      ],
      codeSnippet: `// Live Order Tracking & Driver Route Polyline Stream
class OrderTrackingBloc extends Bloc<OrderTrackingEvent, OrderTrackingState> {
  final DeliveryTrackingService _service;

  void subscribeToDriverPosition(String orderId) {
    _service.streamDriverLocation(orderId).listen((coords) {
      add(UpdateDriverMarker(coords));
      add(RecalculatePolylineETA(coords));
    });
  }
}`
    },
    'wisually': {
      title: 'Wisually',
      company: 'Lawpoc Systems · Coimbatore',
      category: 'Mobile App',
      image: 'portfolio/wisually.jpg',
      packageId: 'com.lawpoc.wisually',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lawpoc.wisually',
      overview: 'Interactive 1-to-1 video feedback and customer experience platform. Enables organizations to dispatch video survey questions, collect asynchronous user video recordings, and analyze audience responses with audio/sentiment analytics.',
      techStack: ['Flutter Mobile', 'Camera & Audio APIs', 'Chunked Video Upload', 'Media Streaming', 'Cloud Storage'],
      achievements: [
        'Built custom camera and audio recording interface with real-time waveform visualizers and response duration limiters.',
        'Implemented background chunked video compression and upload queue to handle high-resolution recordings on mobile networks.',
        'Designed fluid interactive response review flow with video player scrubbing and instant feedback tagging.'
      ],
      codeSnippet: `// Video Capture & Resumable Media Upload Engine
class VideoResponseRecorder {
  final CameraController _cameraController;
  final MediaUploadManager _uploadManager;

  Future<void> stopAndUpload({required String surveyId}) async {
    final XFile rawVideo = await _cameraController.stopVideoRecording();
    final compressedFile = await VideoCompressor.compress(rawVideo.path);
    await _uploadManager.queueResumableUpload(
      surveyId: surveyId,
      filePath: compressedFile.path,
    );
  }
}`
    },
    'trackki': {
      title: 'Trackki',
      company: 'Lawpoc Systems · Coimbatore',
      category: 'Enterprise Web & Mobile',
      image: 'portfolio/trackki.jpg',
      packageId: 'com.lawpoc.apps.trackki',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lawpoc.apps.trackki',
      overview: 'Scalable organization management system for forms, asset allocation, and attendance tracking with live synchronization.',
      techStack: ['Flutter Web & Mobile', 'Firebase RTDB', 'Offline Queue Engine', 'Stripe', 'Cashfree'],
      achievements: [
        'Engineered dynamic form builder supporting offline draft saving and auto-sync on network reconnection.',
        'Built real-time asset assignment table with live status indicators and check-in audit logs.',
        'Delivered responsive web dashboard optimized for desktop browsers with keyboard shortcuts.'
      ],
      codeSnippet: `// Offline Sync & Queue Manager
class FormSyncManager {
  Future<void> submitForm(FormData form) async {
    final isOnline = await checkConnectivity();
    if (isOnline) {
      await _apiService.postForm(form);
    } else {
      await _localDb.queueFormSubmission(form);
    }
  }
}`
    },
    'majic-astros': {
      title: 'Majic Astros',
      company: 'Lawpoc Systems · Coimbatore',
      category: 'Mobile App',
      image: 'portfolio/majic-astros.jpg',
      packageId: 'com.lawpoc.apps.magicastros',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lawpoc.apps.magicastros',
      overview: 'Cross-platform astrology and live consultation application featuring real-time data synchronization and multi-channel payments.',
      techStack: ['Flutter', 'Firebase Realtime DB', 'Cloud Firestore', 'Razorpay', 'PhonePe', 'Cashfree', 'Stripe'],
      achievements: [
        'Implemented live data synchronization using Firebase Realtime Database for instantaneous consultation status & availability.',
        'Integrated multiple domestic and international payment gateways (Razorpay, PhonePe, Cashfree, Stripe) with webhook reconciliations.',
        'Engineered responsive mobile UI with fluid micro-interactions, scaling across Android and iOS.'
      ],
      codeSnippet: `// Real-Time Firebase Consultation Listener
Stream<ConsultationSession> streamConsultation(String sessionId) {
  return _databaseRef.child('sessions').child(sessionId).onValue.map((event) {
    final data = Map<String, dynamic>.from(event.snapshot.value as Map);
    return ConsultationSession.fromMap(data);
  });
}`
    },
    'motologg': {
      title: 'MOTO LOGG 🏍️',
      company: 'Flagship Independent Suite',
      category: 'Flagship Product',
      image: 'portfolio/motologg-showcase.jpg',
      packageId: 'com.vibink.motologg',
      overview: 'Industrial motorcycle expense, fuel economy, and automated Android bank SMS debit detection suite.',
      techStack: ['Flutter 3.x', 'Dart 3.9+', 'Riverpod v3', 'Android Kotlin', 'BroadcastReceiver', 'Cloud Firestore'],
      achievements: [
        'Engineered native Android Kotlin BroadcastReceiver (SmsReceiver.kt) with regex TransactionParser and deduplication shield.',
        'Created interactive motorcycle blueprint callout system linking expenses directly to Fuel Tank, Engine, Bodywork, and Rider Gear.',
        'Calculates real-world fuel economy (km/L) and running costs per kilometer (₹/km) with odometer delta comparisons.',
        'Multi-bike virtual garage supporting Bajaj Pulsar NS200, Honda Unicorn 160, Yamaha MT-15, and custom motorcycle models.'
      ],
      codeSnippet: `// Android Native Kotlin SMS BroadcastReceiver Snippet
class SmsReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
    for (sms in messages) {
      val transaction = TransactionParser.parse(sms.displayMessageBody)
      if (transaction != null && !DuplicateManager.isDuplicate(transaction.fingerprint)) {
        DuplicateManager.mark(transaction.fingerprint)
        NotificationHelper.show1TapSaveNotification(context, transaction)
        MethodChannelBridge.sendToFlutter(transaction.toMap())
      }
    }
  }
}`
    }
  };

  const projectDialog = document.querySelector('.project-dialog');

  function openProjectModal(id) {
    const p = projectsData[id];
    if (!p || !projectDialog) return;

    projectDialog.innerHTML = `
      <div class="project-modal-wrapper" style="position: relative;">
        <button class="dialog-close" aria-label="Close modal" style="position: absolute; top: -10px; right: -10px; background: #ede8e0; border: 0; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; color: #24241e;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
        <div class="eyebrow" style="margin-bottom: 12px;"><span></span> ${p.category}</div>
        <h2 id="project-dialog-title" style="font-size: clamp(30px, 3.8vw, 46px); font-weight: 500; letter-spacing: -0.04em; color: #24241e; margin-bottom: 6px;">${p.title}</h2>
        <span style="font-size: 11px; color: #9a8879; display: block; margin-bottom: 14px; font-weight: 600;">${p.company}</span>

        ${p.playStoreUrl ? `
          <div style="margin-bottom: 16px;">
            <span class="playstore-pill">
              ${googlePlayIconSvg}
              <span>Live on Google Play</span>
              <code>${p.packageId || ''}</code>
            </span>
          </div>
        ` : ''}

        <p style="font-size: 14px; line-height: 1.7; color: #5a544d; margin-bottom: 20px;">${p.overview}</p>
        
        <div style="border-radius: 14px; overflow: hidden; margin-bottom: 24px; border: 1px solid #e5dfd4;">
          <img class="dialog-image" src="${p.image}" alt="${p.title}" style="width: 100%; max-height: 280px; object-fit: cover; display: block;"/>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #24241e; margin-bottom: 10px; letter-spacing: -0.2px;">Key Engineering Contributions:</h4>
          <ul style="padding-left: 20px; font-size: 13px; line-height: 1.7; color: #696257; margin: 0;">
            ${p.achievements.map(a => `<li style="margin-bottom: 6px;">${a}</li>`).join('')}
          </ul>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
          ${p.techStack.map(t => `<span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #ede8e0; color: #594e43; border: 1px solid #dbd3c6;">${t}</span>`).join('')}
        </div>

        ${p.codeSnippet ? `
          <div style="background: #1b1917; border-radius: 12px; padding: 18px; color: #e7e5e4; font-family: monospace; font-size: 11px; line-height: 1.6; overflow-x: auto; margin-bottom: 24px;">
            <span style="display: block; font-size: 9px; letter-spacing: 1px; color: #a8a29e; margin-bottom: 8px; text-transform: uppercase;">Architecture Snapshot:</span>
            <pre style="margin: 0;"><code>${escapeHtml(p.codeSnippet)}</code></pre>
          </div>
        ` : ''}

        <div class="modal-actions">
          ${p.playStoreUrl ? `
            <a class="button-playstore" href="${p.playStoreUrl}" target="_blank" rel="noopener noreferrer">
              ${googlePlayIconSvg}
              <span>View on Google Play</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          ` : ''}
          ${id === 'motologg' ? `
            <a class="button button-red" href="products.html">
              Explore MOTO LOGG Suite 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
            <a class="button" href="https://github.com/vibink/motologg" target="_blank" rel="noopener noreferrer" style="border-radius: 30px;">
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          ` : `
            <a class="button button-red" href="contact.html">
              Discuss this project with Vibin 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          `}
        </div>
      </div>
    `;

    projectDialog.showModal();
    document.body.style.overflow = 'hidden';

    projectDialog.querySelector('.dialog-close').addEventListener('click', closeProjectModal);
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function closeProjectModal() {
    if (!projectDialog) return;
    projectDialog.close();
    document.body.style.overflow = '';
  }

  if (projectDialog) {
    projectDialog.addEventListener('click', (e) => {
      if (e.target === projectDialog) {
        closeProjectModal();
      }
    });

    projectDialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  }

  document.querySelectorAll('.project-card, .project-card-vibin').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card.id);
    });
  });

  // --- 6. Portfolio Category Filtering ---
  const filterButtons = document.querySelectorAll('.filters button');
  const projectGrid = document.querySelector('.project-grid, .projects-container');

  if (filterButtons.length && projectGrid) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.getAttribute('data-filter') || btn.textContent.trim();
        filterProjects(filter);
      });
    });

    function filterProjects(filter) {
      const cards = projectGrid.querySelectorAll('.project-card, .project-card-vibin');
      cards.forEach(card => {
        const id = card.id;
        const p = projectsData[id];
        const match = filter === 'All' || (p && p.category.toLowerCase().includes(filter.toLowerCase()));
        card.style.display = match ? '' : 'none';
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      const matchBtn = Array.from(filterButtons).find(b => b.textContent.trim().toLowerCase().includes(filterParam.toLowerCase()));
      if (matchBtn) matchBtn.click();
    }
  }

  // --- 7. MOTO LOGG Interactive Motorcycle Blueprint Widget ---
  const blueprintPins = document.querySelectorAll('.blueprint-pin');
  const blueprintInfoBox = document.getElementById('blueprint-info-box');

  const blueprintCallouts = {
    'fuel': {
      title: 'Fuel Tank Callout',
      badge: '⛽ FUEL & CONSUMPTION',
      desc: 'Refueling stops, petrol costs per liter, full-tank top-ups, and automated mileage delta calculation (km/L & ₹/km).',
      metric1Label: 'Average Mileage',
      metric1Value: '38.5 km/L',
      metric2Label: 'Running Cost',
      metric2Value: '₹2.72 / km'
    },
    'engine': {
      title: 'Engine & Drivetrain Callout',
      badge: '🔧 ENGINE & SERVICE',
      desc: 'Scheduled servicing intervals, full-synthetic 10W-50 oil refills, chain maintenance, spark plug replacements, and valve tune-ups.',
      metric1Label: 'Last Service Interval',
      metric1Value: '12,500 km',
      metric2Label: 'Service Cost',
      metric2Value: '₹1,450'
    },
    'bodywork': {
      title: 'Bodywork & Performance Callout',
      badge: '⚡ PERFORMANCE & MODS',
      desc: 'Aftermarket aerodynamic body panels, customized free-flow exhaust setups, high-flow air filters, and ECU flash parameters.',
      metric1Label: 'Total Mod Invested',
      metric1Value: '₹8,200',
      metric2Label: 'Power Gain',
      metric2Value: '+2.4 HP'
    },
    'gear': {
      title: 'Rider & Bike Gear Callout',
      badge: '🪖 SAFETY & ACCESSORIES',
      desc: 'ECE/DOT-certified helmets, heavy-duty crash guards, auxiliary fog lights, water-resistant panniers, and riding armor.',
      metric1Label: 'Gear Total',
      metric1Value: '₹14,500',
      metric2Label: 'Items Tracked',
      metric2Value: '5 Pieces'
    }
  };

  if (blueprintPins.length && blueprintInfoBox) {
    blueprintPins.forEach(pin => {
      pin.addEventListener('click', () => {
        const area = pin.getAttribute('data-area');
        const data = blueprintCallouts[area];
        if (!data) return;

        blueprintPins.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');

        blueprintInfoBox.innerHTML = `
          <div class="blueprint-info-badge"><span></span> ${data.badge}</div>
          <h4 style="font-size: 22px; font-weight: 700; color: #24241e; margin-bottom: 8px;">${data.title}</h4>
          <p style="font-size: 13px; line-height: 1.6; color: #6b6357; margin-bottom: 18px;">${data.desc}</p>
          <div class="blueprint-metrics-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
            <div style="background: #fff; border: 1px solid #e4ded4; border-radius: 10px; padding: 12px 14px;">
              <small style="font-size: 10px; color: #948677; text-transform: uppercase; display: block;">${data.metric1Label}</small>
              <strong style="font-size: 20px; font-weight: 700; color: #b75116;">${data.metric1Value}</strong>
            </div>
            <div style="background: #fff; border: 1px solid #e4ded4; border-radius: 10px; padding: 12px 14px;">
              <small style="font-size: 10px; color: #948677; text-transform: uppercase; display: block;">${data.metric2Label}</small>
              <strong style="font-size: 20px; font-weight: 700; color: #24241e;">${data.metric2Value}</strong>
            </div>
          </div>
          <div style="font-size: 11px; color: #877a6d; display: flex; align-items: center; gap: 8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Auto-linked to Cloud Firestore database via ExpenseModel
          </div>
        `;
      });
    });
  }

  // --- 8. MOTO LOGG Bank SMS Auto-Detection Simulator ---
  const smsTestButtons = document.querySelectorAll('.sms-test-btn');
  const mockNotifCard = document.getElementById('mock-notif-card');
  const mockFeedList = document.getElementById('mock-feed-list');
  const mockFeedCount = document.getElementById('mock-feed-count');

  let loggedExpenses = [
    { title: 'Indian Oil Refuel', category: 'Fuel Tank', amount: '₹285' },
    { title: 'Motul 7100 Engine Oil', category: 'Engine & Service', amount: '₹1,450' }
  ];

  function renderMockFeed() {
    if (!mockFeedList) return;
    mockFeedList.innerHTML = loggedExpenses.map(item => `
      <div class="mock-feed-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #fff; border: 1px solid #e5dfd4; border-radius: 8px; font-size: 11px; margin-bottom: 6px;">
        <div>
          <span class="title" style="color: #24241e; font-weight: 600; display: block;">${item.title}</span>
          <span class="category" style="color: #948677; font-size: 9px;">${item.category}</span>
        </div>
        <span class="amount" style="color: #b75116; font-weight: 700;">${item.amount}</span>
      </div>
    `).join('');
    if (mockFeedCount) {
      mockFeedCount.textContent = `${loggedExpenses.length} Logged`;
    }
  }

  if (smsTestButtons.length && mockNotifCard) {
    renderMockFeed();

    smsTestButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = btn.getAttribute('data-amount');
        const merchant = btn.getAttribute('data-merchant');
        const category = btn.getAttribute('data-category');
        const mode = btn.getAttribute('data-mode') || 'UPI Debit';

        // Trigger Android notification slide down
        mockNotifCard.classList.remove('flash-in');
        void mockNotifCard.offsetWidth; // trigger reflow
        mockNotifCard.classList.add('flash-in');

        mockNotifCard.innerHTML = `
          <div class="android-notif-top" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 10px; color: #877a6d;">
            <span class="android-notif-app" style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #24241e;">
              <i style="color: #b75116; font-style: normal;">⚡</i> MOTO LOGG · Android Native Intercept
            </span>
            <span>Just now</span>
          </div>
          <div class="android-notif-body" style="font-size: 12px; color: #433d36; line-height: 1.5; margin-bottom: 12px;">
            <strong>Bank Alert (${mode}):</strong> ₹${amount} debited at <strong>${merchant}</strong>. Parsed category: <em>${category}</em>.
          </div>
          <div class="android-notif-actions" style="display: flex; gap: 10px;">
            <button class="notif-btn-save" id="btn-save-expense" style="background: #b75116; color: #fff; font-weight: 700; font-size: 11px; padding: 6px 14px; border-radius: 6px; border: 0; cursor: pointer;">
              1-Tap Save to Garage
            </button>
            <button class="notif-btn-dismiss" id="btn-dismiss-expense" style="background: transparent; color: #877a6d; font-size: 11px; padding: 6px 12px; border: 1px solid #dcd4c7; border-radius: 6px; cursor: pointer;">
              Dismiss
            </button>
          </div>
        `;

        mockNotifCard.querySelector('#btn-save-expense').addEventListener('click', () => {
          loggedExpenses.unshift({
            title: merchant,
            category: category,
            amount: `₹${amount}`
          });
          renderMockFeed();

          mockNotifCard.innerHTML = `
            <div style="font-size: 11px; color: #15803d; font-weight: 700; padding: 10px 0; display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Transaction verified by DuplicateManager &amp; logged to Firestore!
            </div>
          `;
          setTimeout(() => {
            mockNotifCard.classList.remove('flash-in');
          }, 2400);
        });

        mockNotifCard.querySelector('#btn-dismiss-expense').addEventListener('click', () => {
          mockNotifCard.innerHTML = `
            <div style="font-size: 11px; color: #877a6d; padding: 6px 0;">
              Debit notification dismissed without logging.
            </div>
          `;
        });
      });
    });
  }

  // --- 9. Reveal on Scroll ---
  const revealElements = document.querySelectorAll('.section, .editorial-hero, .home-introduction');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.05 });

  revealElements.forEach(el => revealObserver.observe(el));

})();
