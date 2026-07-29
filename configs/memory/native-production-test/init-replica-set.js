const desired = {
  _id: 'hypha-rs',
  members: [
    { _id: 0, host: 'host.docker.internal:27117', priority: 3 },
    { _id: 1, host: 'host.docker.internal:27118', priority: 2 },
    { _id: 2, host: 'host.docker.internal:27119', priority: 1 },
  ],
  settings: {
    electionTimeoutMillis: 3000,
    heartbeatIntervalMillis: 500,
  },
};

try {
  const status = rs.status();
  if (status.ok === 1) {
    printjson({ status: 'already-initialized', set: status.set });
  }
} catch (error) {
  if (error.codeName !== 'NotYetInitialized') throw error;
  printjson(rs.initiate(desired));
}
