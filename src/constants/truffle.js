module.exports = {
	networks: {
		development: {
			protocol: 'http',
			host: '127.0.0.1',
			port: 7545,
			network_id: '*',
		},
		// ropsten: {
		// 	provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/z3Gn6k0E1Kgu1W0I1WXU"),
		// 	network_id: 3,
		// }
		ropsten: {
			protocol: 'https',
			host: 'ropsten.infura.io',
			key: 'z3Gn6k0E1Kgu1W0I1WXU',
			port: 8545,
			network_id: 3,
		},
	},
	migrations_directory: './migrations',
};