const log = (message) => {
  console.log(`[HierarchyAPI] ${message}`);
};

const errorLogger = (message) => {
  console.error(`[HierarchyAPI] ${message}`);
};

module.exports = {
  log,
  errorLogger
};
