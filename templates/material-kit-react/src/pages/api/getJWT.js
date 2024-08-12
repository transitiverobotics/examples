import jwt from 'jsonwebtoken';

// export default function handler(req, res) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }

export default function handler(req, res) {
  console.log('gwtJWT', req.body, req.user);
  const token = jwt.sign({
      ...JSON.parse(req.body),
      id: process.env.TRANSITIVE_USER, // Transitive portal user id
      userId: req.user,  // user name on dashboard
      validity: 86400,   // number of seconds
    }, process.env.JWT_SECRET);
  res.json({token});
};
