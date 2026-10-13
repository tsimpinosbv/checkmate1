/*
  Check Mate – ρυθμίσεις
  ----------------------
  Χωρίς Firebase (firebase: null) η εφαρμογή δουλεύει σε ΤΟΠΙΚΗ λειτουργία:
  τα δεδομένα μένουν μόνο στη συσκευή/browser που τα καταχώρισε.

  Για ΚΟΙΝΗ χρήση από πολλούς (χειριστής + βοηθός, σε κινητά και υπολογιστές),
  ακολούθησε τα βήματα του README και επικόλλησε εδώ το firebaseConfig
  που δίνει η κονσόλα του Firebase, π.χ.:

  firebase: {
    apiKey: "AIza...",
    authDomain: "checkmate-volley.firebaseapp.com",
    projectId: "checkmate-volley",
    storageBucket: "checkmate-volley.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef"
  },

  Τα στοιχεία αυτά ΔΕΝ είναι μυστικά· την πρόσβαση την ελέγχουν οι κανόνες
  του αρχείου firestore.rules (μόνο τα email που θα ορίσεις εκεί).
*/
window.CHECKMATE_CONFIG = {
  firebase: null,

  // Προαιρετικά: προεπιλεγμένες αμοιβές ανά θέση (σε €), π.χ. { op: 40, as: 25 }
  defaultFees: { op: null, as: null }
};
