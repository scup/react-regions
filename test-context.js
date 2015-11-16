var context = require.context('./spec', true, /spec\.jsx$/);
context.keys().forEach(context);
