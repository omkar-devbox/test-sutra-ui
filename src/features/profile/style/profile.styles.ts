export const profileStyles = {
  container: "flex flex-col gap-6 w-full mx-auto p-2 md:p-6 min-h-full transition-all duration-300",

  heroBanner:
    "relative overflow-hidden bg-gradient-to-r from-[#001929] via-[#003b5c] to-[#0077be] text-white rounded-[32px] p-6 md:p-10 shadow-2xl border border-white/15 transition-all duration-300 hover:shadow-cyan-900/20",

  bannerDecorGlow1:
    "absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-pulse",

  bannerDecorGlow2:
    "absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none",

  avatarRing:
    "relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/40 p-1 flex items-center justify-center text-4xl font-black text-white shadow-2xl overflow-hidden shrink-0 group hover:border-cyan-300 transition-all duration-300",

  avatarBadge:
    "w-full h-full rounded-[22px] bg-gradient-to-br from-[#005c99] to-[#00253d] flex items-center justify-center text-3xl md:text-4xl font-black text-white tracking-widest shadow-inner",

  statusDot:
    "absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 border-3 border-[#001929] shadow-md animate-pulse",

  badge:
    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/15 backdrop-blur-md text-white border border-white/25 shadow-sm hover:bg-white/25 transition-all",

  statCard:
    "flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-xl border border-[#0077be]/20 rounded-2xl p-4 md:p-5 transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl hover:border-[#0077be]/40",

  tabBarContainer:
    "flex items-center gap-2 p-2 bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-xl rounded-2xl border border-[#0077be]/20 shadow-md overflow-x-auto custom-scrollbar",

  tabButton: (isActive: boolean) =>
    `flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all duration-200 cursor-pointer select-none ${isActive
      ? "bg-gradient-to-r from-[#0077be] to-[#005c99] text-white shadow-lg shadow-[#0077be]/30 scale-[1.02]"
      : "text-[#004066]/70 dark:text-[#ebf7ff]/70 hover:bg-[#0077be]/10 dark:hover:bg-[#0077be]/20 hover:text-[#0077be]"
    }`,

  card:
    "bg-white/80 dark:bg-[#00253d]/80 backdrop-blur-2xl border border-[#0077be]/20 rounded-[32px] p-6 md:p-9 shadow-xl shadow-[#004066]/5 dark:shadow-none transition-all duration-300 hover:border-[#0077be]/30",

  inputGroup: "flex flex-col gap-2",

  label: "text-xs font-black uppercase tracking-wider text-[#004066]/80 dark:text-[#ebf7ff]/80 flex items-center justify-between",

  input:
    "w-full px-4.5 py-3.5 bg-slate-50/80 dark:bg-[#001929]/90 border border-slate-200 dark:border-[#0077be]/30 rounded-2xl text-sm font-medium text-[#004066] dark:text-[#ebf7ff] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077be] focus:border-transparent transition-all shadow-inner",

  disabledInput:
    "w-full px-4.5 py-3.5 bg-slate-100/80 dark:bg-[#001929]/40 border border-slate-200/80 dark:border-[#0077be]/15 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 cursor-not-allowed",

  primaryBtn:
    "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#0077be] to-[#005c99] hover:from-[#005c99] hover:to-[#004066] text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-[#0077be]/25 hover:shadow-xl hover:shadow-[#0077be]/40 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",

  secondaryBtn:
    "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-100 dark:bg-[#001929] hover:bg-slate-200 dark:hover:bg-[#003152] text-[#004066] dark:text-[#ebf7ff] font-bold text-xs md:text-sm uppercase tracking-wider rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer border border-[#0077be]/15",

  toggleCard:
    "flex items-center justify-between p-4.5 bg-slate-50/70 dark:bg-[#001929]/70 rounded-2xl border border-[#0077be]/20 hover:border-[#0077be]/40 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md",
};
