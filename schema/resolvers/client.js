const clientsResolvers = {
  clients: (args, req) => {
    return [
      { id: "123", client: "111", name: "erick garcia", address: "cra sur", city: "medellin" },
      { id: "22", client: "222", name: "juanito garcia", address: "av norte", city: "medellin" },
    ];
  }
}

module.exports = clientsResolvers;

