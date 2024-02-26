// ES6 import statement for express-jwt
import { expressjwt as expressJwt } from 'express-jwt';

const secretKey =
  process.env.JWT_SECRET ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InByb2R1Y3Rpb24iLCJpYXQiOjE1MTYyMzkwMjJ9.JNPUVVFZ4lr-dx_Cxa96iWiSrLdKp1y2AgzPqqnqSYU';

function authenticateJwt() {
  return expressJwt({ secret: secretKey, algorithms: ['HS256'] });
}

// ES6 export default
export default authenticateJwt;
