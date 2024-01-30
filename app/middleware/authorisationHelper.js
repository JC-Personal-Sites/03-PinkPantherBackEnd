const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
	UserIsInRole: (userRoles = []) => {
		return (req, res, next) => {
			if (!req.headers.authorization) {
				return res.status(403).json({ message: 'No Authorization' });
			}
			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				return res.status(403).json({ message: 'No token provided' });
			}

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				if (!decoded.roles.some(r => userRoles.includes(r.userRole))) {
					// user's role is not authorized
					return res.status(401).json({ message: 'Unauthorized' });
				}

				// role authorization successful
				next();
			} catch (ex) {
				return res.status(500).json({ message: 'Token expired', token: null });
			}
		}
	},
	UserIsInType: (userTypes = []) => {
		return (req, res, next) => {
			if (!req.headers.authorization) {
				return res.status(403).json({ message: 'No Authorization' });
			}
			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				return res.status(403).json({ message: 'No token provided' });
			}

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				if (!userTypes.includes(decoded.userType)) {
					// user's type is not authorized
					return res.status(401).json({ message: 'Unauthorized' });
				}

				// user type authorization successful
				next();
			} catch (ex) {
				return res.status(500).json({ message: 'Token expired', token: null });
			}
		}
	}
};