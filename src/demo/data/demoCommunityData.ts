export const demoCommunityData: Record<string, any> = {
  "courses": [
    {
      "_id": "course-cs",
      "name": "Computer Science",
      "code": "CS",
      "studentsCount": 24
    },
    {
      "_id": "course-math",
      "name": "Applied Mathematics",
      "code": "MATH",
      "studentsCount": 18
    }
  ],
  "roleRequests": [
    {
      "_id": "role-request-1",
      "user": "Strange",
      "username": "strange",
      "requestedRole": "teacher",
      "status": "pending",
      "createdAt": "2025-09-26T00:00:00.000Z"
    },
    {
      "_id": "role-request-2",
      "user": "Roshan",
      "username": "roshan",
      "requestedRole": "teacher",
      "status": "pending",
      "createdAt": "2025-09-06T00:00:00.000Z"
    }
  ],
  "premiumRequests": [
    {
      "_id": "premium-request-1",
      "user": {
        "_id": "demo-arnav",
        "username": "arnav",
        "email": "mashalarnav.dev@gmail.com"
      },
      "fullName": "Arnav Student",
      "paymentMethodId": "demo-payment-arnav-2025",
      "status": "pending",
      "adminNotes": "",
      "createdAt": "2025-06-21T00:00:00.000Z"
    }
  ],
  "subscribers": [
    {
      "_id": "subscriber-1",
      "email": "strangefortuner@gmail.com",
      "isActive": false,
      "createdAt": "2026-07-11T00:00:00.000Z"
    },
    {
      "_id": "subscriber-2",
      "email": "mashalarnav.dev@gmail.com",
      "isActive": true,
      "createdAt": "2025-09-26T00:00:00.000Z"
    },
    {
      "_id": "subscriber-3",
      "email": "abdullahghawte1@gmail.com",
      "isActive": true,
      "createdAt": "2025-06-21T00:00:00.000Z"
    },
    {
      "_id": "subscriber-4",
      "email": "jasongrace@gmail.com",
      "isActive": false,
      "createdAt": "2026-06-21T00:00:00.000Z"
    },
    {
      "_id": "subscriber-5",
      "email": "luzvictoria6911@gmail.com",
      "isActive": true,
      "createdAt": "2025-09-06T00:00:00.000Z"
    },
    {
      "_id": "subscriber-6",
      "email": "londaisop@gmail.com",
      "isActive": true,
      "createdAt": "2025-06-01T00:00:00.000Z"
    },
    {
      "_id": "subscriber-7",
      "email": "kazan@example.edu",
      "isActive": false,
      "createdAt": "2026-06-01T00:00:00.000Z"
    },
    {
      "_id": "subscriber-8",
      "email": "jane.student@example.edu",
      "isActive": true,
      "createdAt": "2026-02-24T00:00:00.000Z"
    },
    {
      "_id": "subscriber-9",
      "email": "jack.teacher@example.edu",
      "isActive": true,
      "createdAt": "2025-05-12T00:00:00.000Z"
    },
    {
      "_id": "subscriber-10",
      "email": "john.admin@example.edu",
      "isActive": false,
      "createdAt": "2026-05-12T00:00:00.000Z"
    },
    {
      "_id": "subscriber-11",
      "email": "james.admin.teacher@example.edu",
      "isActive": true,
      "createdAt": "2026-02-04T00:00:00.000Z"
    }
  ],
  "notifications": [
    {
      "_id": "notification-1",
      "sender": {
        "_id": "demo-faizan",
        "username": "faizan",
        "firstName": "Faizan",
        "lastName": "Developer",
        "profile": {
          "avatar": "/assets/userProfiles/Faizan.gif",
          "bio": "Academic Vault administrator sharing verified study resources and platform updates."
        },
        "premium": {
          "isPremium": true
        },
        "updatedAt": "2026-10-15T12:30:31.772Z"
      },
      "type": "new_news",
      "link": "/news/news-faizan-1",
      "message": "Study Skills Week is coming up",
      "isRead": false,
      "createdAt": "2025-08-25T20:36:58.656Z"
    },
    {
      "_id": "notification-2",
      "sender": {
        "_id": "demo-faizan",
        "username": "faizan",
        "firstName": "Faizan",
        "lastName": "Developer",
        "profile": {
          "avatar": "/assets/userProfiles/Faizan.gif",
          "bio": "Academic Vault administrator sharing verified study resources and platform updates."
        },
        "premium": {
          "isPremium": true
        },
        "updatedAt": "2026-10-15T12:30:31.772Z"
      },
      "type": "new_notice",
      "link": "/notices/notice-faizan-1",
      "message": "Check your course registration",
      "isRead": false,
      "createdAt": "2026-06-12T05:09:05.677Z"
    },
    {
      "_id": "notification-3",
      "sender": {
        "_id": "demo-mode-admin-teacher",
        "username": "james.admin.teacher",
        "firstName": "Mode",
        "lastName": "Admin Teacher",
        "profile": {
          "avatar": "/assets/userProfiles/AdminTeacher.jpg",
          "bio": "Dedicated admin and teacher account for exploring both demo permission sets."
        },
        "premium": {
          "isPremium": false
        },
        "updatedAt": "2026-10-04T12:30:31.772Z"
      },
      "type": "new_news",
      "link": "/news/news-james-admin-teacher-4",
      "message": "Practice explaining ideas at peer sessions",
      "isRead": true,
      "createdAt": "2025-04-03T15:34:48.038Z"
    },
    {
      "_id": "notification-4",
      "sender": {
        "_id": "demo-mode-admin-teacher",
        "username": "james.admin.teacher",
        "firstName": "Mode",
        "lastName": "Admin Teacher",
        "profile": {
          "avatar": "/assets/userProfiles/AdminTeacher.jpg",
          "bio": "Dedicated admin and teacher account for exploring both demo permission sets."
        },
        "premium": {
          "isPremium": false
        },
        "updatedAt": "2026-10-04T12:30:31.772Z"
      },
      "type": "new_notice",
      "link": "/notices/notice-james-admin-teacher-7",
      "message": "Plan review sessions around your assessment dates",
      "isRead": true,
      "createdAt": "2025-04-06T20:06:02.311Z"
    }
  ]
};
