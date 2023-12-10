// Middleware function for /api/users
const usersMiddleware = async (req, res, next) => {
    //console.log('Middleware for /api/users');
  
    // Your middleware logic here, for example:
    // - Fetch additional data from the database
    // - Validate something related to users
  
    // Continue to the next middleware or route handler
    next();
  };
  
  // Route to get all users with middleware applied
  router.get('/', usersMiddleware, async (req, res) => {
    try {
      const allUsers = await User.find();
      res.json({ data: allUsers });
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  