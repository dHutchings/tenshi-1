pref("toolkit.defaultChromeURI", "chrome://angel-player/content/main.xul");

pref("tenshi.enableDebug", false);

// This prevents the middle mouse button from messing up things (we do our own
// scroll handling).
// TODO(rqou): Which of these are strictly necessary?
pref("middlemouse.contentLoadURL", false);
pref("middlemouse.openNewWindow", false);
pref("middlemouse.paste", false);
pref("middlemouse.scrollbarPosition", false);
pref("general.autoScroll", false);
