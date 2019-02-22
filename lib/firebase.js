const Firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_SLUG}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_SLUG}.firebaseio.com`,
  projectId: process.env.FIREBASE_SLUG,
  storageBucket: `${process.env.FIREBASE_SLUG}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
}

if (!Firebase.apps.length) Firebase.initializeApp(config)

module.exports = Firebase.apps[0].database()
