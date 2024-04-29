const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/ll-chicken-sandwich_development",
      test: "postgres://postgres:postgres@localhost:5432/ll-chicken-sandwich_test",
      e2e: "postgres://postgres:postgres@localhost:5432/ll-chicken-sandwich_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
