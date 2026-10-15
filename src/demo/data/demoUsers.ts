import type { User } from "@/types";

export const demoUsers: Array<User & Record<string, any>> = [
  {
    "_id": "demo-faizan",
    "firstName": "Faizan",
    "lastName": "Developer",
    "username": "faizan",
    "email": "shaikhfaizan.dev@gmail.com",
    "role": [
      "admin",
      "teacher",
      "student"
    ],
    "premium": {
      "isPremium": true
    },
    "bio": "Academic Vault administrator sharing verified study resources and platform updates.",
    "profile": {
      "avatar": "/assets/userProfiles/Faizan.gif",
      "bio": "Academic Vault administrator sharing verified study resources and platform updates."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 149,
      "followingCount": 207,
      "friendsCount": 24
    },
    "isEmailVerified": true,
    "twoFactorEnabled": true,
    "updatedAt": "2026-10-15T12:30:31.772Z"
  },
  {
    "_id": "demo-strange",
    "firstName": "Strange",
    "lastName": "Student",
    "username": "strange",
    "email": "strangefortuner@gmail.com",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": true
    },
    "bio": "Curious learner collecting clear explanations and useful revision guides.",
    "profile": {
      "avatar": "/assets/userProfiles/Strange.gif",
      "bio": "Curious learner collecting clear explanations and useful revision guides."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 118,
      "followingCount": 254,
      "friendsCount": 5
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-14T12:30:31.772Z"
  },
  {
    "_id": "demo-arnav",
    "firstName": "Arnav",
    "lastName": "Student",
    "username": "arnav",
    "email": "mashalarnav.dev@gmail.com",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Computer science student interested in algorithms and building useful tools.",
    "profile": {
      "avatar": "/assets/userProfiles/Arnav.jpg",
      "bio": "Computer science student interested in algorithms and building useful tools."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 50,
      "followingCount": 208,
      "friendsCount": 9
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-13T12:30:31.772Z"
  },
  {
    "_id": "demo-abdullah",
    "firstName": "Abdullah",
    "lastName": "Student",
    "username": "abdullah",
    "email": "abdullahghawte1@gmail.com",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Sharing class notes, practice questions, and helpful study routines.",
    "profile": {
      "avatar": "/assets/userProfiles/Abdullah.jpg",
      "bio": "Sharing class notes, practice questions, and helpful study routines."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 337,
      "followingCount": 137,
      "friendsCount": 44
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-12T12:30:31.772Z"
  },
  {
    "_id": "demo-abdulrahman",
    "firstName": "Abdulrahman",
    "lastName": "Student",
    "username": "abdulrahman",
    "email": "jasongrace@gmail.com",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Applied mathematics student who enjoys making tricky topics approachable.",
    "profile": {
      "avatar": "/assets/userProfiles/Abdulrahman.jpg",
      "bio": "Applied mathematics student who enjoys making tricky topics approachable."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 415,
      "followingCount": 101,
      "friendsCount": 50
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-11T12:30:31.772Z"
  },
  {
    "_id": "demo-shoib",
    "firstName": "Shoib",
    "lastName": "Teacher",
    "username": "shoib",
    "email": "luzvictoria6911@gmail.com",
    "role": [
      "teacher",
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Teacher sharing course announcements, feedback, and approved academic material.",
    "profile": {
      "avatar": "/assets/userProfiles/Shoib.png",
      "bio": "Teacher sharing course announcements, feedback, and approved academic material."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 97,
      "followingCount": 123,
      "friendsCount": 96
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-10T12:30:31.772Z"
  },
  {
    "_id": "demo-roshan",
    "firstName": "Roshan",
    "lastName": "Student",
    "username": "roshan",
    "email": "londaisop@gmail.com",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Design-minded student working on small campus and learning projects.",
    "profile": {
      "avatar": "/assets/userProfiles/Roshan.png",
      "bio": "Design-minded student working on small campus and learning projects."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 103,
      "followingCount": 187,
      "friendsCount": 66
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-09T12:30:31.772Z"
  },
  {
    "_id": "demo-kazan",
    "firstName": "Kazan",
    "lastName": "Admin",
    "username": "kazan",
    "email": "kazan@example.edu",
    "role": [
      "admin"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Academic Vault administrator managing the learning community.",
    "profile": {
      "avatar": "/assets/userProfiles/Kazan.jpg",
      "bio": "Academic Vault administrator managing the learning community."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 404,
      "followingCount": 69,
      "friendsCount": 54
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-08T12:30:31.772Z"
  },
  {
    "_id": "demo-mode-student",
    "firstName": "Mode",
    "lastName": "Student",
    "username": "jane.student",
    "email": "jane.student@example.edu",
    "role": [
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Dedicated student-mode account for exploring the Academic Vault demo.",
    "profile": {
      "avatar": "/assets/userProfiles/Student.jpg",
      "bio": "Dedicated student-mode account for exploring the Academic Vault demo."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 285,
      "followingCount": 45,
      "friendsCount": 16
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-07T12:30:31.772Z"
  },
  {
    "_id": "demo-mode-teacher",
    "firstName": "Mode",
    "lastName": "Teacher",
    "username": "jack.teacher",
    "email": "jack.teacher@example.edu",
    "role": [
      "teacher",
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Dedicated teacher-mode account for exploring teacher tools in the demo.",
    "profile": {
      "avatar": "/assets/userProfiles/Teacher.png",
      "bio": "Dedicated teacher-mode account for exploring teacher tools in the demo."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 139,
      "followingCount": 227,
      "friendsCount": 30
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-06T12:30:31.772Z"
  },
  {
    "_id": "demo-mode-admin",
    "firstName": "Mode",
    "lastName": "Admin",
    "username": "john.admin",
    "email": "john.admin@example.edu",
    "role": [
      "admin"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Dedicated admin-mode account for exploring administrative tools in the demo.",
    "profile": {
      "avatar": "/assets/userProfiles/Admin.png",
      "bio": "Dedicated admin-mode account for exploring administrative tools in the demo."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 248,
      "followingCount": 250,
      "friendsCount": 31
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-05T12:30:31.772Z"
  },
  {
    "_id": "demo-mode-admin-teacher",
    "firstName": "Mode",
    "lastName": "Admin Teacher",
    "username": "james.admin.teacher",
    "email": "james.admin.teacher@example.edu",
    "role": [
      "admin",
      "teacher",
      "student"
    ],
    "premium": {
      "isPremium": false
    },
    "bio": "Dedicated admin and teacher account for exploring both demo permission sets.",
    "profile": {
      "avatar": "/assets/userProfiles/AdminTeacher.jpg",
      "bio": "Dedicated admin and teacher account for exploring both demo permission sets."
    },
    "settings": {
      "theme": "system"
    },
    "socials": {
      "followersCount": 151,
      "followingCount": 223,
      "friendsCount": 6
    },
    "isEmailVerified": true,
    "twoFactorEnabled": false,
    "updatedAt": "2026-10-04T12:30:31.772Z"
  }
];
