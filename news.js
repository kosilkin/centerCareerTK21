
    * { box-sizing: border-box; }
    :root {
      --text: #1f2a44;
      --muted: #5d6b86;
      --line: rgba(96, 114, 158, 0.14);
      --panel: rgba(255, 255, 255, 0.95);
      --blue1: #2558c7;
      --blue2: #3b82f6;
      --purple: #7b5cff;
      --orange1: #ff8f3c;
      --orange2: #ff5f6d;
      --green1: #12b886;
      --green2: #00a884;
      --shadow: 0 18px 42px rgba(71, 92, 133, 0.10);
      --radius-xl: 28px;
      --radius-lg: 22px;
      --radius-md: 18px;
      --radius-sm: 14px;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(255, 197, 90, 0.22), transparent 24%),
        radial-gradient(circle at top right, rgba(76, 133, 255, 0.24), transparent 22%),
        radial-gradient(circle at bottom left, rgba(123, 100, 255, 0.14), transparent 20%),
        linear-gradient(135deg, #eef5ff 0%, #fffdf7 48%, #f6f2ff 100%);
    }

    .bg-pattern {
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: 0.22;
      background-image:
        linear-gradient(rgba(72, 95, 150, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(72, 95, 150, 0.08) 1px, transparent 1px);
      background-size: 34px 34px;
      z-index: 0;
    }

    header {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, var(--blue1) 0%, var(--blue2) 42%, var(--purple) 100%);
      color: white;
      padding: 28px 36px 30px;
      z-index: 1;
    }

    header::before,
    header::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
    }

    header::before {
      width: 220px;
      height: 220px;
      right: 40px;
      top: -90px;
    }

    header::after {
      width: 160px;
      height: 160px;
      left: 22%;
      bottom: -70px;
    }

    .header-inner {
      position: relative;
      z-index: 5;
      max-width: 1280px;
      margin: 0 auto;
    }

    .header-topline {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 18px;
      flex-wrap: wrap;
    }

    .header-label {
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .header-title {
      margin: 0;
      font-size: 40px;
      line-height: 1.1;
    }

    .header-text {
      margin: 14px 0 0;
      max-width: 760px;
      font-size: 16px;
      line-height: 1.55;
      color: rgba(255,255,255,0.94);
    }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      position: relative;
      z-index: 10;
      pointer-events: auto;
    }

    .header-btn {
      border: 1px solid rgba(255,255,255,0.24);
      background: rgba(255,255,255,0.12);
      color: white;
      padding: 11px 16px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      backdrop-filter: blur(5px);
    }

    .top-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }

    .top-links a {
      text-decoration: none;
      color: white;
      font-size: 14px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.22);
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 18px 50px;
    }

    .row-2 {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .panel {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-xl);
      background: var(--panel);
      border: 1px solid var(--line);
      box-shadow: var(--shadow);
    }

    .panel::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(circle at 100% 0%, rgba(76, 133, 255, 0.10), transparent 28%),
        radial-gradient(circle at 0% 100%, rgba(255, 180, 74, 0.10), transparent 22%);
    }

    .panel-content {
      position: relative;
      z-index: 1;
      padding: 24px;
    }

    .panel-title {
      margin: 0 0 16px;
      font-size: 24px;
      color: #243250;
    }

    .panel-text {
      margin: 0;
      font-size: 15px;
      line-height: 1.65;
      color: #576884;
    }

    .info-mark {
      display: inline-block;
      margin-top: 18px;
      padding: 11px 15px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 700;
      color: #5f4700;
      background: linear-gradient(135deg, #fff4ca, #ffe3a3);
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .team-card {
      border-radius: var(--radius-lg);
      padding: 16px;
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,249,255,0.94));
      border: 1px solid rgba(93, 114, 160, 0.12);
      min-height: 180px;
    }

    .team-top {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }

    .team-photo {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      flex: 0 0 72px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 22px;
      font-weight: 700;
      background: linear-gradient(135deg, #7ea7ff, #4a63ff);
      background-size: cover;
      background-position: center;
      box-shadow: 0 10px 22px rgba(74, 99, 255, 0.22);
    }

    .team-name { margin: 0; font-size: 17px; color: #243250; }
    .team-role { margin: 6px 0 0; font-size: 13px; font-weight: 700; color: #4a63c9; }
    .team-desc { margin: 0; font-size: 14px; line-height: 1.55; color: #62728f; }

    .calendar-wrap { margin-bottom: 20px; }
    .calendar-head {
      display: flex; justify-content: space-between; align-items: center; gap: 12px;
      margin-bottom: 16px; flex-wrap: wrap;
    }
    .calendar-tools { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .calendar-nav-btn {
      border: none; cursor: pointer; color: white; font-size: 14px; font-weight: 700;
      padding: 9px 12px; border-radius: 12px;
      background: linear-gradient(135deg, var(--blue1), var(--purple));
    }
    .calendar-month { font-size: 18px; font-weight: 700; color: #25324f; min-width: 160px; text-align: center; }
    .calendar-mark, .head-badge {
      padding: 8px 12px; border-radius: 999px; font-size: 13px; font-weight: 700;
      color: #4f6184; background: linear-gradient(135deg, #eef3ff, #f3ebff);
    }

    .calendar-weekdays, .calendar-grid {
      display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 10px;
    }
    .calendar-weekdays { margin-bottom: 10px; }
    .weekday {
      text-align: center; font-size: 12px; font-weight: 700; color: #687894; text-transform: uppercase;
    }
    .day {
      min-height: 110px; border-radius: var(--radius-md); background: rgba(247, 250, 255, 0.96);
      border: 1px solid rgba(92, 115, 164, 0.10); padding: 10px; overflow: hidden;
      display: flex; flex-direction: column; gap: 6px; cursor: pointer;
    }
    .day.muted { opacity: 0.35; cursor: default; }
    .day.has-events { border-color: rgba(37,88,199,.24); }
    .day-number { font-size: 14px; font-weight: 700; color: #31415f; line-height: 1; }
    .day-events { display: flex; flex-direction: column; gap: 6px; margin-top: 2px; }
    .mini-event {
      display: block; width: 100%; padding: 5px 7px; border-radius: 9px; font-size: 10px; line-height: 1.2;
      font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .event-blue { background: linear-gradient(135deg, var(--blue2), var(--blue1)); }
    .event-orange { background: linear-gradient(135deg, #ff9a3d, #ff5d67); }
    .event-green { background: linear-gradient(135deg, var(--green1), var(--green2)); }

    .jobs-panel { margin-bottom: 20px; }
    .section-head {
      display: flex; justify-content: space-between; align-items: center; gap: 14px;
      flex-wrap: wrap; margin-bottom: 16px;
    }
    .jobs-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .job-card {
      border-radius: var(--radius-lg);
      padding: 18px;
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,251,255,0.94));
      border: 1px solid rgba(94, 116, 160, 0.12);
      min-height: 240px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .job-card::after {
      content: ""; position: absolute; right: -20px; bottom: -20px; width: 90px; height: 90px;
      border-radius: 50%; background: rgba(76, 133, 255, 0.08);
    }
    .job-tag {
      display: inline-block; margin-bottom: 12px; padding: 6px 10px; border-radius: 999px;
      font-size: 12px; font-weight: 700; color: #2457c5; background: #eaf1ff; align-self: flex-start;
    }
    .job-title { margin: 0 0 8px; font-size: 18px; color: #22314e; position: relative; z-index: 1; }
    .job-text {
      margin: 0;
      margin-bottom: 50px;
      font-size: 14px; line-height: 1.55; color: #5a6a87; position: relative; z-index: 1;
      flex: 1;
    }
    .job-btn {
      text-decoration: none; color: white; font-size: 13px; font-weight: 700;
      padding: 10px 14px; border-radius: 12px;
      background: linear-gradient(135deg, var(--orange1), var(--orange2));
      position: relative; z-index: 1; margin-top: auto; align-self: flex-start;
    }

    .directions-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 10px; }
    .direction-card {
      overflow: hidden; border-radius: 24px; background: white;
      border: 1px solid rgba(96, 116, 157, 0.12); box-shadow: 0 12px 28px rgba(82, 97, 135, 0.08);
      display: flex; flex-direction: column;
    }
    .direction-top { padding: 18px; color: white; position: relative; }
    .direction-top::after {
      content: ""; position: absolute; right: -16px; top: -16px; width: 70px; height: 70px;
      border-radius: 50%; background: rgba(255,255,255,0.14);
    }
    .direction-card:nth-child(1n) .direction-top { background: linear-gradient(135deg, var(--blue1), #4a8cff); }
    .direction-card:nth-child(2n) .direction-top { background: linear-gradient(135deg, var(--green2), #23c59b); }
    .direction-card:nth-child(3n) .direction-top { background: linear-gradient(135deg, #ff8d3d, #ff5e6d); }
    .direction-card:nth-child(4n) .direction-top { background: linear-gradient(135deg, var(--purple), #b265ff); }
    .direction-title { margin: 0; font-size: 20px; }
    .direction-sub { margin: 8px 0 0; font-size: 13px; line-height: 1.45; opacity: 0.95; }
    .direction-body { padding: 16px 18px 18px; display:flex; flex-direction:column; flex:1; }
    .direction-body p { margin:0 0 14px; color:#4d5d7a; line-height:1.5; font-size:14px; flex:1; }
    .direction-link {
      text-decoration:none; color:white; font-size:13px; font-weight:700; padding:10px 14px;
      border-radius:12px; background: linear-gradient(135deg, var(--blue1), var(--purple)); align-self:flex-start;
    }

    .modal {
      position: fixed; inset: 0; background: rgba(14, 21, 38, 0.58); display: none;
      align-items: center; justify-content: center; padding: 18px; z-index: 1000;
    }
    .modal.show { display: flex; }

    .modal-box {
      width: min(1200px, 100%); max-height: 92vh; overflow: auto; border-radius: 28px;
      background: rgba(255,255,255,0.98); box-shadow: 0 24px 70px rgba(22, 33, 61, 0.28);
      border: 1px solid rgba(108, 126, 170, 0.16); padding: 22px;
    }
    .modal-box.narrow { width: min(460px, 100%); }

    .modal-head {
      display: flex; justify-content: space-between; align-items: center; gap: 14px;
      flex-wrap: wrap; margin-bottom: 16px;
    }
    .modal-title { margin: 0; font-size: 28px; color: #243250; }
    .close-btn, .btn, .small-btn {
      border: none; cursor: pointer; font-family: Arial, sans-serif;
    }
    .close-btn {
      padding: 10px 14px; border-radius: 12px; color: white; font-size: 14px; font-weight: 700;
      background: linear-gradient(135deg, #7d8aa3, #5f6b83);
    }

    .field { margin-bottom: 12px; }
    .field label {
      display: block; margin-bottom: 6px; font-size: 14px; font-weight: 700; color: #31415f;
    }
    .field input, .field textarea, .field select {
      width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid #d7dff0;
      background: white; font-size: 14px; font-family: Arial, sans-serif; color: #233250; outline: none;
    }
    .field textarea { min-height: 96px; resize: vertical; }

    .btn {
      padding: 12px 16px; border-radius: 14px; font-size: 14px; font-weight: 700;
      color: white; background: linear-gradient(135deg, var(--blue1), var(--purple));
    }
    .btn.secondary { background: linear-gradient(135deg, var(--orange1), var(--orange2)); }
    .btn.gray { background: linear-gradient(135deg, #8b97ad, #6b768d); }
    .small-btn {
      padding: 8px 12px; border-radius: 10px; font-size: 13px; font-weight: 700; color: white;
      background: linear-gradient(135deg, var(--blue1), var(--purple));
    }
    .small-btn.delete { background: linear-gradient(135deg, var(--orange1), var(--orange2)); }

    .muted-text { color: #60708b; font-size: 14px; line-height: 1.55; }
    .error { margin-top: 10px; color: #d63a3a; font-size: 14px; font-weight: 700; }
    .success { margin-top: 10px; color: #0c8b57; font-size: 14px; font-weight: 700; }
    .hidden { display: none !important; }

    .admin-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 8px;
    }
    .admin-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,251,255,0.94));
      border: 1px solid rgba(94, 116, 160, 0.12); border-radius: 22px; padding: 18px;
    }
    .admin-card h3 { margin: 0 0 14px; font-size: 20px; color: #243250; }

    .list { display: grid; gap: 12px; margin-top: 16px; }
    .item {
      padding: 14px; border-radius: 18px; background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,249,255,0.94));
      border: 1px solid rgba(93, 114, 160, 0.12);
    }
    .item-title { margin: 0 0 8px; font-size: 16px; color: #243250; }
    .item-text { margin: 0 0 6px; font-size: 14px; line-height: 1.5; color: #5e6d88; }
    .item-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
    .form-toolbar { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; margin-bottom: 6px; }
    .edit-note { font-size: 13px; color: #4a63c9; font-weight: 700; margin-bottom: 10px; min-height: 18px; }


    .admin-toolbar {
      display: flex; justify-content: space-between; align-items: center; gap: 12px;
      flex-wrap: wrap; margin: 14px 0 18px;
      padding: 14px 16px; border-radius: 18px;
      background: linear-gradient(135deg, rgba(238,243,255,0.95), rgba(245,240,255,0.95));
      border: 1px solid rgba(94, 116, 160, 0.12);
    }
    .admin-toolbar-text { color: #51617d; font-size: 14px; line-height: 1.55; }
    .admin-shell {
      display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 18px; margin-top: 12px;
      align-items: start;
    }
    .admin-sidebar {
      position: sticky; top: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,251,255,0.94));
      border: 1px solid rgba(94, 116, 160, 0.12); border-radius: 24px; padding: 16px;
      box-shadow: 0 12px 28px rgba(82, 97, 135, 0.08);
    }
    .admin-sidebar-title { margin: 0 0 8px; font-size: 18px; color: #243250; }
    .admin-sidebar-text { margin: 0 0 14px; color: #60708b; font-size: 14px; line-height: 1.5; }
    .admin-tab-list { display: grid; gap: 8px; }
    .admin-tab-btn {
      width: 100%; text-align: left; border: 1px solid rgba(96,114,158,0.12); cursor: pointer;
      padding: 12px 14px; border-radius: 16px; background: rgba(255,255,255,0.8);
      color: #31415f; font-size: 14px; font-weight: 700; font-family: Arial, sans-serif;
      transition: .18s ease;
    }
    .admin-tab-btn:hover { transform: translateY(-1px); border-color: rgba(59,130,246,0.25); }
    .admin-tab-btn.active {
      color: white; border-color: transparent;
      background: linear-gradient(135deg, var(--blue1), var(--purple));
      box-shadow: 0 12px 24px rgba(74,99,255,0.22);
    }
    .admin-main { display: grid; gap: 18px; }
    .admin-section { display: none; }
    .admin-section.active { display: block; }
    .admin-section-head {
      display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;
      flex-wrap: wrap; margin-bottom: 14px;
    }
    .admin-section-title { margin: 0; font-size: 26px; color: #243250; }
    .admin-section-text { margin: 6px 0 0; color: #60708b; font-size: 14px; line-height: 1.55; max-width: 740px; }
    .admin-section-layout {
      display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.85fr); gap: 18px;
    }
    .admin-form-card, .admin-list-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,251,255,0.94));
      border: 1px solid rgba(94, 116, 160, 0.12); border-radius: 22px; padding: 18px;
      box-shadow: 0 12px 28px rgba(82, 97, 135, 0.08);
    }
    .admin-card-title { margin: 0 0 14px; font-size: 19px; color: #243250; }
    .admin-card-note {
      margin: 0 0 14px; padding: 10px 12px; border-radius: 14px;
      background: #f6f8ff; color: #587; /* will get overridden below if needed */
      color: #55657f; font-size: 13px; line-height: 1.5;
      border: 1px solid rgba(96,114,158,0.10);
    }
    .admin-list-card .list { margin-top: 0; }

    .day-event-list { display:grid; gap:12px; }
    .day-event-card {
      padding: 16px; border-radius: 18px; background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,249,255,0.94));
      border: 1px solid rgba(93, 114, 160, 0.12);
    }
    .day-event-meta { color:#5a6a87; font-size:14px; line-height:1.5; margin:6px 0 12px; }

    .runtime-error-box {
      position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 99999;
      background: #fff4f4; color: #8a1f1f; border: 1px solid #f1b7b7; border-radius: 12px;
      padding: 12px 14px; font: 14px/1.45 Arial,sans-serif; display:none; box-shadow: 0 8px 24px rgba(0,0,0,.12)
    }

    .slot-list { display:grid; gap:8px; margin:12px 0 0; }
    .slot-chip {
      display:flex; justify-content:space-between; align-items:center; gap:10px;
      padding:10px 12px; border-radius:12px; background:#eef3ff; color:#31415f; font-size:13px; font-weight:700;
    }
    .slot-chip.full { background:#fff0f0; color:#a33a3a; }
    .booking-note { margin-top:10px; color:#60708b; font-size:13px; line-height:1.5; }
    .booking-meta { margin:10px 0 0; color:#5a6a87; font-size:13px; line-height:1.5; }
    .booking-modal-box { width: min(1180px, 100%); }
    .booking-grid { display:grid; gap:18px; grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr); align-items:start; }
    .slot-select-card {
      border-radius:22px; border:1px solid rgba(93, 114, 160, 0.12);
      background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,249,255,0.94));
      padding:18px;
    }
    .booking-calendar-card {
      margin-top:14px; padding:18px; border-radius:20px; background:#fff; border:1px solid rgba(93,114,160,0.12);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
    }
    .booking-calendar-head {
      display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px;
    }
    .booking-calendar-month {
      font-size:20px; font-weight:700; color:#243250; text-align:center; flex:1;
    }
    .booking-calendar-nav {
      border:none; cursor:pointer; border-radius:12px; min-width:44px; padding:10px 12px; font-size:15px; font-weight:700;
      color:white; background:linear-gradient(135deg, var(--blue1), var(--purple));
    }
    .booking-calendar-weekdays, .booking-calendar-grid {
      display:grid; grid-template-columns:repeat(7, minmax(0, 1fr)); gap:10px;
    }
    .booking-calendar-weekday {
      text-align:center; font-size:12px; font-weight:700; color:#6b7a95; text-transform:uppercase;
    }
    .booking-calendar-day {
      min-height:88px; border-radius:18px; border:1px solid rgba(93,114,160,0.10); background:#f7faff;
      display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:10px 8px;
      cursor:pointer; font: inherit; color:#2f3f5e;
    }
    .booking-calendar-day.empty {
      background:transparent; border:none; cursor:default;
    }
    .booking-calendar-day.has-slots {
      background:#eef3ff; border-color:rgba(37,88,199,0.18);
    }
    .booking-calendar-day.is-selected {
      background:linear-gradient(135deg, var(--blue1), var(--purple)); color:white; border-color:transparent;
      box-shadow:0 8px 18px rgba(59,130,246,0.24);
    }
    .booking-calendar-day.is-full {
      background:#fff2f2; color:#a33a3a; border-color:rgba(214,58,58,0.16);
    }
    .booking-calendar-day small {
      font-size:11px; line-height:1.2; text-align:center;
    }
    .booking-calendar-empty {
      margin-top:12px; color:#60708b; font-size:14px; line-height:1.55;
    }
    .booking-day-title { margin:0 0 8px; font-size:20px; color:#243250; }
    .booking-day-subtitle { margin:0 0 14px; color:#60708b; font-size:14px; line-height:1.55; }
    .booking-time-list { display:grid; gap:10px; }
    .booking-time-item {
      width:100%; text-align:left; border:none; cursor:pointer; padding:14px 16px; border-radius:16px;
      background:#eef3ff; color:#2f3f5e; font:inherit; display:flex; align-items:center; justify-content:space-between; gap:14px;
    }
    .booking-time-item.is-selected { background:linear-gradient(135deg, var(--blue1), var(--purple)); color:white; box-shadow:0 10px 22px rgba(59,130,246,0.24); }
    .booking-time-item.is-full { background:#fff2f2; color:#a33a3a; }
    .booking-time-main { display:flex; flex-direction:column; gap:4px; }
    .booking-time-label { font-size:16px; font-weight:700; }
    .booking-time-meta { font-size:13px; line-height:1.45; opacity:0.9; }
    .booking-side-divider { height:1px; background:rgba(93,114,160,0.12); margin:16px 0; }
    .booking-day-empty { padding:16px; border-radius:16px; background:#f7faff; color:#60708b; font-size:14px; line-height:1.55; }
    .btn.is-loading {
      position:relative; pointer-events:none; opacity:0.92; padding-left:42px;
    }
    .btn.is-loading::before {
      content:""; position:absolute; left:15px; top:50%; width:16px; height:16px; margin-top:-8px;
      border-radius:50%; border:2px solid rgba(255,255,255,0.45); border-top-color:white; animation:spin .8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .registrations-toolbar {
      display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-bottom:14px;
    }
    .registrations-table-wrap {
      overflow:auto; border:1px solid rgba(93,114,160,0.12); border-radius:18px; background:white;
    }
    .registrations-table { width:100%; border-collapse:collapse; min-width:860px; }
    .registrations-table th, .registrations-table td {
      padding:12px 14px; border-bottom:1px solid rgba(93,114,160,0.10); text-align:left; font-size:14px; color:#33425f;
    }
    .registrations-table th { background:#f5f8ff; font-size:13px; text-transform:uppercase; color:#60708b; }
    .registrations-empty { padding:18px; color:#60708b; font-size:14px; }
    .preview-note { margin-top:8px; font-size:13px; color:#60708b; }
    .inline-note { margin-top:8px; font-size:13px; color:#4a63c9; font-weight:700; }

    img { max-width: 100%; height: auto; }
    body { overflow-x: hidden; }
    .panel, .modal-box, .item, .team-card, .job-card, .direction-card, .admin-card, .admin-form-card, .admin-list-card, .slot-select-card {
      min-width: 0;
    }
    .header-title, .header-text, .panel-title, .item-title, .job-title, .direction-title, .team-name, .team-role, .team-desc,
    .item-text, .panel-text, .muted-text, .booking-day-title, .booking-day-subtitle, .booking-time-meta, .booking-note,
    .registrations-empty, .admin-sidebar-text, .admin-toolbar-text, .day-event-meta, .runtime-error-box, .inline-note {
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .header-btn, .btn, .close-btn, .small-btn, .booking-calendar-nav, .calendar-nav-btn, .booking-time-item, .admin-tab-btn {
      touch-action: manipulation;
    }
    .top-links {
      scrollbar-width: thin;
    }
    .top-links::-webkit-scrollbar,
    .admin-tab-list::-webkit-scrollbar,
    .registrations-table-wrap::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

    @media (max-width: 980px) {
      header {
        padding: 24px 20px 28px;
      }
      .header-topline {
        flex-direction: column;
        align-items: stretch;
      }
      .header-actions {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .header-btn {
        width: 100%;
        text-align: center;
      }
      .top-links {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 4px;
        margin-top: 16px;
        scroll-snap-type: x proximity;
      }
      .top-links a {
        flex: 0 0 auto;
        white-space: nowrap;
        scroll-snap-align: start;
      }
      .calendar-head,
      .section-head,
      .modal-head {
        align-items: stretch;
      }
      .calendar-tools {
        width: 100%;
        justify-content: space-between;
      }
      .calendar-month {
        min-width: 0;
        flex: 1;
      }
      .booking-grid,
      .admin-shell,
      .admin-section-layout {
        grid-template-columns: 1fr;
      }
      .admin-sidebar {
        position: static;
      }
      .admin-tab-list {
        grid-auto-flow: column;
        grid-auto-columns: minmax(170px, 1fr);
        overflow-x: auto;
        padding-bottom: 4px;
      }
      .registrations-toolbar {
        display: grid;
        grid-template-columns: 1fr;
      }
      .registrations-toolbar .field {
        min-width: 0 !important;
      }
    }

    @media (max-width: 760px) {
      :root {
        --radius-xl: 22px;
        --radius-lg: 18px;
        --radius-md: 16px;
        --radius-sm: 12px;
      }
      header {
        padding: 18px 14px 22px;
      }
      .header-label {
        font-size: 12px;
      }
      .header-title {
        font-size: clamp(28px, 8vw, 34px);
        line-height: 1.08;
      }
      .header-text {
        font-size: 14px;
        line-height: 1.5;
        margin-top: 12px;
      }
      .header-actions {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .header-btn {
        padding: 12px 14px;
        font-size: 14px;
      }
      .top-links {
        gap: 8px;
        margin-top: 14px;
        padding-bottom: 2px;
      }
      .top-links a {
        padding: 9px 12px;
        font-size: 13px;
      }
      .container {
        padding: 14px 10px 28px;
      }
      .panel-content,
      .modal-box {
        padding: 14px;
      }
      .panel-title,
      .modal-title {
        font-size: 22px;
      }
      .row-2,
      .team-grid,
      .jobs-grid,
      .directions-grid,
      .admin-grid,
      .booking-grid,
      .admin-shell,
      .admin-section-layout {
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .team-card,
      .job-card,
      .direction-card,
      .slot-select-card,
      .admin-form-card,
      .admin-list-card,
      .admin-sidebar,
      .admin-toolbar {
        border-radius: 18px;
      }
      .team-card {
        min-height: 0;
        padding: 14px;
      }
      .team-top {
        align-items: flex-start;
        gap: 12px;
      }
      .team-photo {
        width: 58px;
        height: 58px;
        flex-basis: 58px;
        font-size: 18px;
      }
      .calendar-head,
      .section-head,
      .modal-head {
        gap: 10px;
      }
      .calendar-tools {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 8px;
        align-items: center;
      }
      .calendar-nav-btn,
      .booking-calendar-nav {
        min-width: 40px;
        padding: 9px 10px;
      }
      .calendar-month,
      .booking-calendar-month {
        font-size: 17px;
      }
      .calendar-mark,
      .head-badge {
        width: 100%;
        text-align: center;
      }
      .calendar-weekdays,
      .calendar-grid,
      .booking-calendar-weekdays,
      .booking-calendar-grid {
        gap: 4px;
      }
      .weekday,
      .booking-calendar-weekday {
        font-size: 10px;
      }
      .day {
        min-height: 78px;
        padding: 6px;
        gap: 4px;
        border-radius: 14px;
      }
      .day-number {
        font-size: 12px;
      }
      .mini-event {
        font-size: 8px;
        padding: 4px 5px;
        border-radius: 8px;
      }
      .booking-modal-box,
      .modal-box {
        width: 100%;
        max-height: calc(100dvh - 10px);
        border-radius: 22px;
      }
      .modal {
        align-items: stretch;
        padding: 5px;
      }
      .booking-calendar-card {
        padding: 12px;
        margin-top: 12px;
      }
      .booking-calendar-day {
        min-height: 58px;
        padding: 6px 4px;
        gap: 4px;
        border-radius: 14px;
      }
      .booking-calendar-day strong,
      .booking-calendar-day span {
        font-size: 12px;
      }
      .booking-calendar-day small {
        font-size: 9px;
      }
      .booking-day-title {
        font-size: 18px;
      }
      .booking-day-subtitle,
      .booking-meta,
      .booking-note {
        font-size: 13px;
      }
      .booking-time-list {
        gap: 8px;
      }
      .booking-time-item {
        padding: 12px;
        border-radius: 14px;
        gap: 10px;
        flex-direction: column;
        align-items: flex-start;
      }
      .booking-time-label {
        font-size: 15px;
      }
      .booking-time-meta {
        font-size: 12px;
      }
      .field input,
      .field textarea,
      .field select {
        font-size: 16px;
        padding: 12px 13px;
      }
      .btn,
      .close-btn,
      .small-btn {
        width: 100%;
        justify-content: center;
        padding: 12px 14px;
      }
      .form-toolbar,
      .item-actions {
        display: grid;
        grid-template-columns: 1fr;
      }
      .admin-toolbar {
        gap: 12px;
      }
      .admin-toolbar .btn {
        width: 100%;
      }
      .admin-sidebar {
        padding: 12px;
      }
      .admin-tab-list {
        grid-auto-columns: minmax(140px, 1fr);
      }
      .registrations-table-wrap {
        margin: 0 -2px;
        border-radius: 16px;
      }
      .registrations-table {
        min-width: 640px;
      }
      .runtime-error-box {
        left: 8px;
        right: 8px;
        bottom: 8px;
        font-size: 13px;
      }
    }

    @media (max-width: 420px) {
      header {
        padding-left: 12px;
        padding-right: 12px;
      }
      .container {
        padding-left: 8px;
        padding-right: 8px;
      }
      .panel-content,
      .modal-box {
        padding: 12px;
      }
      .calendar-tools {
        grid-template-columns: 38px 1fr 38px;
      }
      .calendar-mark,
      .head-badge,
      .info-mark {
        font-size: 12px;
        padding: 8px 10px;
      }
      .day {
        min-height: 72px;
      }
      .booking-calendar-day {
        min-height: 54px;
      }
      .job-card {
        padding: 14px;
        min-height: 0;
      }
      .job-text {
        margin-bottom: 18px;
      }
      .direction-top,
      .direction-body {
        padding-left: 14px;
        padding-right: 14px;
      }
    }


    @media (max-width: 1100px) {
      .row-2, .jobs-grid, .directions-grid, .admin-grid, .booking-grid, .admin-shell, .admin-section-layout { grid-template-columns: 1fr; }
      .admin-sidebar { position: static; }
    }
    @media (max-width: 760px) {
      header { padding: 24px 18px 26px; }
      .header-title { font-size: 31px; }
      .container { padding: 16px 12px 34px; }
      .team-grid, .jobs-grid, .directions-grid, .admin-grid, .admin-shell, .admin-section-layout { grid-template-columns: 1fr; }
      .calendar-weekdays, .calendar-grid { gap: 6px; }
      .day { min-height: 90px; padding: 8px; }
      .mini-event { font-size: 9px; padding: 4px 6px; }
      .booking-calendar-weekdays, .booking-calendar-grid { gap: 6px; }
      .booking-calendar-day { min-height: 68px; padding: 8px 6px; }
      .panel-content, .modal-box { padding: 18px; }
    }
  

    .section-link-btn {
      text-decoration: none; color: white; font-size: 13px; font-weight: 700;
      padding: 10px 14px; border-radius: 12px;
      background: linear-gradient(135deg, var(--blue1), var(--purple));
    }
    .news-panel, .internships-panel { margin-bottom: 20px; }
    .news-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .news-card {
      border-radius: var(--radius-lg); overflow: hidden; background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,251,255,0.94));
      border: 1px solid rgba(94, 116, 160, 0.12); box-shadow: 0 12px 28px rgba(82, 97, 135, 0.08);
      display: flex; flex-direction: column; min-height: 100%;
    }
    .news-card-media {
      min-height: 160px; background: linear-gradient(135deg, #dbe8ff, #eef3ff); background-size: cover; background-position: center;
      display:flex; align-items:center; justify-content:center; color:#4a63c9; font-size:18px; font-weight:700; padding:16px; text-align:center;
    }
    .news-card-body { padding: 18px; display:flex; flex-direction:column; gap:10px; flex:1; }
    .news-card-date { font-size: 12px; font-weight: 700; color: #4a63c9; text-transform: uppercase; letter-spacing: .04em; }
    .news-card-title { margin:0; font-size:20px; color:#22314e; }
    .news-card-text { margin:0; color:#5a6a87; line-height:1.6; font-size:14px; flex:1; }
    .news-card-actions { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:auto; }
    .news-video-mark { padding:8px 12px; border-radius:999px; font-size:12px; font-weight:700; color:#0b7d57; background:#e8fff5; }
    .news-layout { display:grid; grid-template-columns: minmax(0, 1fr); gap:20px; }
    .news-page-list { display:grid; gap:18px; }
    .news-page-card { border-radius: var(--radius-xl); background: var(--panel); border:1px solid var(--line); box-shadow: var(--shadow); overflow:hidden; }
    .news-page-card-inner { display:grid; grid-template-columns: 280px minmax(0,1fr); }
    .news-page-cover { min-height: 100%; background: linear-gradient(135deg, #dbe8ff, #eef3ff); background-size: cover; background-position: center; display:flex; align-items:center; justify-content:center; padding:20px; font-weight:700; color:#4a63c9; text-align:center; }
    .news-page-content { padding: 24px; display:grid; gap:14px; }
    .news-page-meta { display:flex; gap:10px; flex-wrap:wrap; align-items:center; color:#60708b; font-size:14px; }
    .news-page-summary { margin:0; font-size:16px; line-height:1.65; color:#42516c; }
    .news-page-text { margin:0; line-height:1.75; color:#42516c; white-space:pre-line; }
    .news-video-wrap { border-radius: 18px; overflow:hidden; background:#eef3ff; border:1px solid rgba(94,116,160,.12); }
    .news-video-wrap iframe, .news-video-wrap video { display:block; width:100%; min-height: 320px; border:0; }
    .back-link { text-decoration:none; color:#2457c5; font-weight:700; }
    .page-hero-note { margin-top:12px; color: rgba(255,255,255,.9); max-width:760px; line-height:1.6; }
    @media (max-width: 1100px) { .news-grid { grid-template-columns: 1fr; } .news-page-card-inner { grid-template-columns: 1fr; } }
    @media (max-width: 760px) { .news-card-media { min-height: 140px; } .news-page-content { padding: 18px; } .news-video-wrap iframe, .news-video-wrap video { min-height: 220px; } }


.direction-page-cover {
  background-size: cover;
  background-position: center;
}

.direction-page-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}
