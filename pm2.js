const pm2 = require('pm2');
const config = require(process.cwd() + '/config/config.global');

pm2.connect(function () {
	pm2.start({
		script: './bin/www',
		name: config.info.name,
		exec_mode: 'cluster',
		instances: config.pm2.instance,
		max_memory_restart: config.pm2.max_memory + 'M'
	}, function (err) {
		if (err) return console.error('Error while launching applications', err.stack || err);

		console.log('PM2 and application [' + config.info.name + '] has been succesfully started');
		console.log('[' + config.info.name + '] IN MODE : ' + config.info.env_type);

		// Display logs in standard output
		pm2.launchBus(function (err, bus) {
			console.log('[PM2] Log streaming started');

			bus.on('log:out', function (packet) {
				console.log('[App:%s] %s', packet.process.name, packet.data);
			});

			bus.on('log:err', function (packet) {
				console.error('[App:%s][Err] %s', packet.process.name, packet.data);
			});
		});
	});
});