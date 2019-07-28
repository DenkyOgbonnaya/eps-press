const rules = {
    visitor: {
      static: ["posts:list", "home-page:visit"]
    },
    0: {
      static: [
        "posts:list",
        "post:create",
        "post:reply",
        "comment:reply",
        "comment:like",
        "post:like",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit"
      ],
      dynamic: {
        "post:edit": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        },
        "comment:edit": ({userId, commentOwnerId}) => {
            if (!userId || !commentOwnerId) return false;
            return userId === commentOwnerId;
          }
      }
    },
    1: {
      static: [
        "posts:list",
        "post:create",
        "post:edit",
        "commet:edit",
        "comment:delete",
        "post:delete",
        "post:reply",
        "comment:reply",
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit"
      ]
    }
  };
  
  export default rules;